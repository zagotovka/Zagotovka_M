#!/usr/bin/env python3
"""
Build ONE file for the first flashing of a Zagotovka_M device and program it
into the chip:

    [ bootloader, padded with 0xFF up to 0x08040000 ] + [ application, Bank A ]

The result goes to 0x08000000.

What the script does (in this order):
  1. Builds Zagotovka_FIRST_FLASH_<version>.bin from the bootloader and the
     newest Bank A file. If a file is missing or wrong, it stops here with the
     reason, before the chip is touched.
  2. Reads FLASH->OPTCR (0x40023C14). Bit 29 is nDBANK.
  3. nDBANK = 1 (Single Bank): writes nDBANK = 0, waits until the chip answers
     again after the reset and checks that the bit is really cleared. After
     the mode change the old flash content is garbage, so the erase in step 4
     is mandatory.
     nDBANK = 0 (Dual Bank): the mode change is skipped.
  4. Full chip erase (new sector layout).
  5. Programs the FIRST_FLASH file at 0x08000000, verifies it and resets.

Why the mode is changed here and not in the bootloader: changing nDBANK changes
the organisation of the flash, and everything that was in it (including the
bootloader itself) becomes unreadable. It can only be done from outside, before
the firmware is written.

Where the script lives:   <project>/scripts/make_first_flash.py
How to run it:            open the scripts folder and run

                              python make_first_flash.py

It does not matter from which folder it is started: all paths are counted from
the project root (the folder above scripts/). Only the Python 3 standard
library is needed, plus STM32_Programmer_CLI (comes with STM32CubeProgrammer).

Input files:
  bootloader  Bootloader/DO_NOT_TOUCH/Zagotovka_M_BOOTLOADER.bin   (put there by hand)
  Bank A      Proshivka/Zagotovka_Bank_A_v*.bin (the newest version wins),
              then the development build Bank_A/Zagotovka_Bank_A.bin
Output:
  Proshivka/First_flash/Zagotovka_FIRST_FLASH_<version>.bin
  (the version is taken from the Bank A file name)

Options:
  --image-only            only build the file, do not touch the chip
  --cli PATH              path to STM32_Programmer_CLI (or set the environment
                          variable STM32_PROGRAMMER_CLI)
  --connect "port=SWD"    connection parameters for the programmer
  --bootloader X.bin --bank-a Y.bin -o Z.bin     use other files
"""

import argparse
import hashlib
import os
import re
import shutil
import struct
import subprocess
import sys
import time
from pathlib import Path

# ---- project layout (relative to the project root) ------------------------
ROOT = Path(__file__).resolve().parent.parent
RELEASE_DIR = ROOT / "Proshivka"
BOOT_BIN = ROOT / "Bootloader" / "DO_NOT_TOUCH" / "Zagotovka_M_BOOTLOADER.bin"
OUTPUT_DIR = RELEASE_DIR / "First_flash"
BANK_A_BUILD = ROOT / "Bank_A" / "Zagotovka_Bank_A.bin"

# ---- flash layout ----------------------------------------------------------
FLASH_BASE = 0x08000000
BOOT_SIZE = 0x00040000          # 256 KB reserved for the bootloader
BANK_A_ADDR = FLASH_BASE + BOOT_SIZE      # 0x08040000
BANK_B_ADDR = 0x08100000
BANK_CAPACITY = 0x000C0000      # 768 KB, same as BANK_CAPACITY in the bootloader
SRAM_BASE = 0x20000000
SRAM_END = 0x20080000

# ---- option bytes ----------------------------------------------------------
OPTCR_ADDR = 0x40023C14         # FLASH->OPTCR
NDBANK_BIT = 1 << 29            # 1 = Single Bank, 0 = Dual Bank
RESET_WAIT_S = 40               # how long to wait for the chip after the mode change

VERSION_RE = re.compile(r"_v(\d+)\.(\d+)\.(\d+)([A-Za-z]?)\.bin$")
ANSI_RE = re.compile(r"\x1b\[[0-9;?]*[A-Za-z]")
OPTCR_RE = re.compile(r"0x40023C14\s*:\s*(?:0x)?([0-9A-Fa-f]{8})", re.IGNORECASE)


def rel(p):
    try:
        return str(Path(p).resolve().relative_to(ROOT))
    except ValueError:
        return str(p)


def version_key(path):
    m = VERSION_RE.search(path.name)
    if not m:
        return (0, 0, 0, "", path.stat().st_mtime)
    return (int(m.group(1)), int(m.group(2)), int(m.group(3)), m.group(4).lower(),
            path.stat().st_mtime)


def newest(paths):
    paths = [p for p in paths if p.is_file()]
    return max(paths, key=version_key) if paths else None


def find_bootloader():
    if BOOT_BIN.is_file():
        return BOOT_BIN
    sys.exit("ERROR: bootloader not found: %s\n"
             "Build the Zagotovka_M_BOOTLOADER project (Convert to binary must be on)\n"
             "and copy its .bin to that place, or pass it with --bootloader." % rel(BOOT_BIN))


def find_bank_a():
    if RELEASE_DIR.is_dir():
        found = newest([p for p in RELEASE_DIR.iterdir()
                        if p.suffix.lower() == ".bin"
                        and p.name.lower().startswith("zagotovka_bank_a")])
        if found:
            return found
    if BANK_A_BUILD.is_file():
        print("NOTE: no released Bank A file in %s, using the development build %s"
              % (rel(RELEASE_DIR), rel(BANK_A_BUILD)))
        return BANK_A_BUILD
    sys.exit("ERROR: Bank A .bin not found in %s or %s.\n"
             "Build the Bank_A configuration or pass the file with --bank-a."
             % (rel(RELEASE_DIR), rel(BANK_A_BUILD)))


def read_image(path):
    try:
        return Path(path).read_bytes()
    except OSError as e:
        sys.exit("ERROR: cannot read %s: %s" % (path, e))


def vectors(image):
    if len(image) < 8:
        return None, None
    return struct.unpack_from("<II", image, 0)


def check_boot(image):
    if len(image) > BOOT_SIZE:
        sys.exit("ERROR: bootloader is %d bytes, more than the 256 KB (%d) reserved for it"
                 % (len(image), BOOT_SIZE))
    msp, reset = vectors(image)
    if msp is None:
        sys.exit("ERROR: bootloader file is too small")
    if not (SRAM_BASE < msp <= SRAM_END):
        sys.exit("ERROR: bootloader initial stack pointer 0x%08X is not in SRAM; "
                 "is this really the bootloader .bin?" % msp)
    if not (FLASH_BASE <= reset < BANK_A_ADDR):
        sys.exit("ERROR: bootloader reset vector 0x%08X is outside 0x%08X..0x%08X; "
                 "is this really the bootloader .bin?" % (reset, FLASH_BASE, BANK_A_ADDR - 1))


def check_bank_a(image):
    if len(image) > BANK_CAPACITY:
        sys.exit("ERROR: application is %d bytes, more than the 768 KB (%d) of a bank"
                 % (len(image), BANK_CAPACITY))
    msp, reset = vectors(image)
    if msp is None:
        sys.exit("ERROR: application file is too small")
    if not (SRAM_BASE < msp <= SRAM_END):
        sys.exit("ERROR: application initial stack pointer 0x%08X is not in SRAM; "
                 "is this really the application .bin?" % msp)
    if BANK_B_ADDR <= reset < BANK_B_ADDR + BANK_CAPACITY:
        sys.exit("ERROR: this is the Bank B build (reset vector 0x%08X). "
                 "The first flashing needs the Bank A build." % reset)
    if not (BANK_A_ADDR <= reset < BANK_A_ADDR + BANK_CAPACITY):
        sys.exit("ERROR: application reset vector 0x%08X is outside Bank A "
                 "(0x%08X..0x%08X); wrong file?"
                 % (reset, BANK_A_ADDR, BANK_A_ADDR + BANK_CAPACITY - 1))


# ---- building the image ----------------------------------------------------

def build_image(args):
    boot_path = Path(args.bootloader) if args.bootloader else find_bootloader()
    app_path = Path(args.bank_a) if args.bank_a else find_bank_a()

    if args.output:
        out_path = Path(args.output)
    else:
        m = VERSION_RE.search(app_path.name)
        suffix = "_v%s.%s.%s%s" % m.groups() if m else ""
        out_path = OUTPUT_DIR / ("Zagotovka_FIRST_FLASH%s.bin" % suffix)

    boot = read_image(boot_path)
    app = read_image(app_path)
    check_boot(boot)
    check_bank_a(app)

    out = boot.ljust(BOOT_SIZE, b"\xff") + app
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_bytes(out)

    print("Bootloader : %-48s %7d bytes at 0x%08X" % (rel(boot_path), len(boot), FLASH_BASE))
    print("Padding    : %-48s %7d bytes (0xFF)" % ("", BOOT_SIZE - len(boot)))
    print("Bank A     : %-48s %7d bytes at 0x%08X" % (rel(app_path), len(app), BANK_A_ADDR))
    print("Output     : %s, %d bytes" % (rel(out_path), len(out)))
    print("SHA-256    : %s" % hashlib.sha256(out).hexdigest())
    return out_path


# ---- working with STM32_Programmer_CLI -------------------------------------

def cli_candidates(explicit):
    """Where STM32_Programmer_CLI may be, on Windows, macOS and Linux."""
    names = ["STM32_Programmer_CLI.exe" if os.name == "nt" else "STM32_Programmer_CLI"]
    found = [explicit,
             os.environ.get("STM32_PROGRAMMER_CLI"),
             shutil.which("STM32_Programmer_CLI")]
    tail = Path("STMicroelectronics") / "STM32Cube" / "STM32CubeProgrammer"
    roots = []
    if sys.platform.startswith("win"):
        for env in ("ProgramFiles", "ProgramFiles(x86)", "LOCALAPPDATA"):
            if os.environ.get(env):
                roots.append(Path(os.environ[env]) / tail / "bin")
        roots.append(Path("C:/Program Files") / tail / "bin")
    elif sys.platform == "darwin":
        roots.append(Path("/Applications") / tail / "STM32CubeProgrammer.app" /
                     "Contents" / "MacOS" / "bin")
        roots.append(Path.home() / tail / "STM32CubeProgrammer.app" /
                     "Contents" / "MacOS" / "bin")
        roots.append(Path.home() / tail / "bin")
    else:
        roots.append(Path.home() / tail / "bin")
        roots.append(Path("/opt") / tail / "bin")
        roots.append(Path("/usr/local") / tail / "bin")
    for root in roots:
        for name in names:
            found.append(str(root / name))
    return found


def find_cli(explicit):
    for c in cli_candidates(explicit):
        if c and (Path(c).is_file() or shutil.which(c)):
            return c
    sys.exit("ERROR: STM32_Programmer_CLI not found.\n"
             "The image file is built, but the chip was not touched.\n"
             "Install STM32CubeProgrammer (it contains STM32_Programmer_CLI) and then either\n"
             "  - add its 'bin' folder to PATH, or\n"
             "  - give the full path: python make_first_flash.py --cli <path>, or\n"
             "  - set the environment variable STM32_PROGRAMMER_CLI.\n"
             "Or use --image-only to build only the file.")


def run_cli(cli, connect, args, timeout):
    cmd = [cli, "-c"] + connect.split() + args
    print("  $ " + " ".join(cmd))
    try:
        r = subprocess.run(cmd, capture_output=True, text=True,
                           encoding="utf-8", errors="replace", timeout=timeout)
    except subprocess.TimeoutExpired:
        return 1, "TIMEOUT after %d s" % timeout
    return r.returncode, (r.stdout or "") + (r.stderr or "")


def read_optcr(cli, connect, quiet=False):
    """Returns the value of FLASH->OPTCR, or None if it could not be read."""
    rc, out = run_cli(cli, connect + " mode=HOTPLUG",
                      ["-r32", "0x%08X" % OPTCR_ADDR, "4"], timeout=30)
    # The value is taken from the text even when the return code is not 0:
    # the programmer can report a non-zero code after a successful read.
    clean = ANSI_RE.sub("", out).replace("\r", "")
    m = OPTCR_RE.search(clean)
    if m:
        return int(m.group(1), 16)
    if not quiet:
        print("  could not read OPTCR (return code %d); output of the programmer:" % rc)
        print(out)
        print("  raw end of the output: %r" % out[-200:])
    return None


def wait_for_chip(cli, connect, timeout_s):
    """Waits until the chip answers over SWD again after the reset."""
    t0 = time.time()
    while time.time() - t0 < timeout_s:
        time.sleep(2)
        value = read_optcr(cli, connect, quiet=True)
        if value is not None:
            return value
        print("  waiting for the chip... %d s" % int(time.time() - t0))
    return None


def program_chip(cli, connect, image):
    print("\n[1/4] Reading the flash mode (FLASH->OPTCR)")
    optcr = read_optcr(cli, connect)
    if optcr is None:
        sys.exit("ERROR: cannot read OPTCR. Check the ST-LINK connection and the board power.")
    print("  OPTCR = 0x%08X, nDBANK = %d (%s)"
          % (optcr, 1 if optcr & NDBANK_BIT else 0,
             "Single Bank" if optcr & NDBANK_BIT else "Dual Bank"))

    if optcr & NDBANK_BIT:
        print("\n[2/4] Single Bank -> Dual Bank (nDBANK = 0)")
        rc, out = run_cli(cli, connect, ["-ob", "nDBANK=0"], timeout=60)
        if rc != 0:
            # The programmer may report an error because the chip resets under it.
            # The real answer is whether the bit is cleared after the reset.
            print("  WARNING: the programmer returned code %d, checking the result anyway:" % rc)
            print(out)
        print("  option written, waiting for the chip to restart (up to %d s)" % RESET_WAIT_S)
        optcr = wait_for_chip(cli, connect, RESET_WAIT_S)
        if optcr is None:
            sys.exit("ERROR: the chip did not answer after the mode change.\n"
                     "Switch the board power off and on, then run the script again.")
        if optcr & NDBANK_BIT:
            sys.exit("ERROR: nDBANK is still 1 (OPTCR = 0x%08X), the mode was not changed.\n"
                     "Switch the board power off and on, then run the script again." % optcr)
        print("  Dual Bank is on (OPTCR = 0x%08X)" % optcr)
        print("  the old flash content is garbage now, the erase below is mandatory")
    else:
        print("\n[2/4] Already Dual Bank, no mode change needed")

    print("\n[3/4] Full chip erase")
    rc, out = run_cli(cli, connect, ["-e", "all"], timeout=180)
    if rc != 0:
        print(out)
        sys.exit("ERROR: the flash erase failed.")

    print("\n[4/4] Programming %s and verifying" % rel(image))
    rc, out = run_cli(cli, connect,
                      ["-w", str(image), "0x%08X" % FLASH_BASE, "-v", "-rst"],
                      timeout=300)
    if rc != 0:
        print(out)
        sys.exit("ERROR: programming or verification failed.")
    print("\nDONE. The terminal must show: [BOOT] Flash: Dual Bank (OK)")


def run():
    ap = argparse.ArgumentParser(
        description="Make a single first-flash .bin (bootloader + Bank A) and program it")
    ap.add_argument("--bootloader", help="bootloader .bin (default: found automatically)")
    ap.add_argument("--bank-a", help="Bank A application .bin (default: found automatically)")
    ap.add_argument("-o", "--output", help="output file (default: Proshivka/First_flash/Zagotovka_FIRST_FLASH_<version>.bin)")
    ap.add_argument("--image-only", action="store_true",
                    help="only build the file, do not touch the chip")
    ap.add_argument("--cli", help="path to STM32_Programmer_CLI")
    ap.add_argument("--connect", default="port=SWD",
                    help="connection parameters for the programmer (default: port=SWD)")
    args = ap.parse_args()

    out_path = build_image(args)
    if args.image_only:
        print("The chip was not touched (--image-only). The chip must be in Dual Bank "
              "(nDBANK = 0) before this file is flashed at 0x%08X." % FLASH_BASE)
        return
    cli = find_cli(args.cli)
    program_chip(cli, args.connect, out_path)


def main():
    code = 0
    try:
        run()
    except SystemExit as e:
        code = e.code if isinstance(e.code, int) else 1
        if isinstance(e.code, str):
            print(e.code, file=sys.stderr)
    # Started by a double click on Windows: keep the window open
    if os.name == "nt" and len(sys.argv) == 1:
        input("\nPress Enter to close...")
    sys.exit(code)


if __name__ == "__main__":
    main()
