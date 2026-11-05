//! make_first_flash - builds ONE file for the first flashing of a Zagotovka_M device
//!
//!     [ bootloader, padded with 0xFF up to 0x08040000 ] + [ application, Bank A ]
//!
//! and programs it at 0x08000000 through probe-rs. No STM32CubeProgrammer and no
//! Python are needed: one executable for Windows, Linux and macOS.
//!
//! Steps: build image -> read FLASH->OPTCR -> (Single Bank -> Dual Bank)
//!        -> mass erase of both banks -> program -> reset, read back, compare -> run.
//!
//! Where it lives: <project>/scripts/make_first_flash(.exe)
//! Paths are counted from the project root (the folder above scripts/).
//! The root is found automatically; override with --root or FIRST_FLASH_ROOT.
//!
//! The erase and the option bytes are handled directly through the flash controller
//! registers (offsets, keys and bit positions are from RM0410 - check them there).
//! Only the page programming is done by the probe-rs flash algorithm.
//!
//! Options: see --help.

use anyhow::{anyhow, bail, Context};
use probe_rs::flashing::{download_file_with_options, BinLoader, BinOptions, DownloadOptions};
use probe_rs::probe::list::Lister;
use probe_rs::{Core, MemoryInterface, Permissions, Session};
use sha2::{Digest, Sha256};
use std::env;
use std::fs;
use std::io::{self, Write};
use std::path::{Path, PathBuf};
use std::process::exit;
use std::thread::sleep;
use std::time::{Duration, Instant, SystemTime};

type AResult<T> = anyhow::Result<T>;

// ---- flash layout ----------------------------------------------------------
const FLASH_BASE: u32 = 0x0800_0000;
const BOOT_SIZE: usize = 0x0004_0000; // 256 KB reserved for the bootloader
const BANK_A_ADDR: u32 = FLASH_BASE + BOOT_SIZE as u32; // 0x08040000
const BANK_B_ADDR: u32 = 0x0810_0000;
const BANK_CAPACITY: u32 = 0x000C_0000; // 768 KB
const SRAM_BASE: u32 = 0x2000_0000;
const SRAM_END: u32 = 0x2008_0000;

// ---- project layout (relative to the project root) -------------------------
struct Layout {
    root: PathBuf,
    release_dir: PathBuf,
    boot_bin: PathBuf,
    output_dir: PathBuf,
    bank_a_build: PathBuf,
}

impl Layout {
    fn new(root: PathBuf) -> Self {
        Layout {
            release_dir: root.join("Proshivka"),
            boot_bin: root
                .join("Bootloader")
                .join("DO_NOT_TOUCH")
                .join("Zagotovka_M_BOOTLOADER.bin"),
            output_dir: root.join("Proshivka").join("First_flash"),
            bank_a_build: root.join("Bank_A").join("Zagotovka_Bank_A.bin"),
            root,
        }
    }

    fn rel(&self, p: &Path) -> String {
        p.strip_prefix(&self.root).unwrap_or(p).display().to_string()
    }
}

fn detect_root(explicit: Option<&PathBuf>) -> PathBuf {
    if let Some(r) = explicit {
        return r.clone();
    }
    if let Ok(r) = env::var("FIRST_FLASH_ROOT") {
        if !r.is_empty() {
            return PathBuf::from(r);
        }
    }
    let exe_dir = env::current_exe()
        .ok()
        .and_then(|p| p.parent().map(|d| d.to_path_buf()));
    let cwd = env::current_dir().ok();

    let mut cands: Vec<PathBuf> = Vec::new();
    for base in [exe_dir.clone(), cwd].into_iter().flatten() {
        cands.push(base.clone());
        if let Some(p) = base.parent() {
            cands.push(p.to_path_buf());
        }
    }
    for c in &cands {
        if c.join("Bootloader").is_dir() || c.join("Proshivka").is_dir() {
            return c.clone();
        }
    }
    exe_dir
        .and_then(|d| d.parent().map(|p| p.to_path_buf()))
        .unwrap_or_else(|| PathBuf::from("."))
}

// ---- command line ----------------------------------------------------------
struct Args {
    bootloader: Option<PathBuf>,
    bank_a: Option<PathBuf>,
    output: Option<PathBuf>,
    image_only: bool,
    verify_only: bool,
    chip: String,
    speed_khz: u32,
    root: Option<PathBuf>,
}

fn print_usage() {
    println!(
        "Make a single first-flash .bin (bootloader + Bank A) and program it\n\n\
         USAGE: make_first_flash [OPTIONS]\n\n\
         OPTIONS:\n\
         \x20 --bootloader <FILE>   bootloader .bin (default: found automatically)\n\
         \x20 --bank-a <FILE>       Bank A application .bin (default: found automatically)\n\
         \x20 -o, --output <FILE>   output file (default: Proshivka/First_flash/Zagotovka_FIRST_FLASH_<version>.bin)\n\
         \x20 --image-only          only build the file, do not touch the chip\n\
         \x20 --verify-only         build the file and only compare the chip flash with it\n\
         \x20 --chip <NAME>         probe-rs chip name (default: STM32F767ZITx)\n\
         \x20 --speed <KHZ>         SWD clock request (default: 4000; the probe may lower it)\n\
         \x20 --root <DIR>          project root (default: found automatically)\n\
         \x20 -h, --help            show this help"
    );
}

fn parse_args(argv: Vec<String>) -> Result<Args, String> {
    let mut a = Args {
        bootloader: None,
        bank_a: None,
        output: None,
        image_only: false,
        verify_only: false,
        chip: "STM32F767ZITx".to_string(),
        speed_khz: 4000,
        root: None,
    };
    let mut it = argv.into_iter();
    while let Some(arg) = it.next() {
        // support both "--opt value" and "--opt=value"
        let (name, inline) = match arg.split_once('=') {
            Some((n, v)) if n.starts_with("--") => (n.to_string(), Some(v.to_string())),
            _ => (arg.clone(), None),
        };
        let value = |it: &mut std::vec::IntoIter<String>| -> Result<String, String> {
            match &inline {
                Some(v) => Ok(v.clone()),
                None => it
                    .next()
                    .ok_or_else(|| format!("ERROR: option {} needs a value", name)),
            }
        };
        match name.as_str() {
            "-h" | "--help" => {
                print_usage();
                exit(0);
            }
            "--image-only" => a.image_only = true,
            "--bootloader" => a.bootloader = Some(PathBuf::from(value(&mut it)?)),
            "--bank-a" => a.bank_a = Some(PathBuf::from(value(&mut it)?)),
            "-o" | "--output" => a.output = Some(PathBuf::from(value(&mut it)?)),
            "--verify-only" => a.verify_only = true,
            "--chip" => a.chip = value(&mut it)?,
            "--speed" => {
                a.speed_khz = value(&mut it)?
                    .parse::<u32>()
                    .map_err(|_| "ERROR: --speed needs a number in kHz".to_string())?
            }
            "--root" => a.root = Some(PathBuf::from(value(&mut it)?)),
            other => return Err(format!("ERROR: unknown option {} (see --help)", other)),
        }
    }
    Ok(a)
}

// ---- file names and versions -----------------------------------------------
type Ver = (u64, u64, u64, String);

fn num(s: &str) -> Option<u64> {
    if !s.is_empty() && s.chars().all(|c| c.is_ascii_digit()) {
        s.parse().ok()
    } else {
        None
    }
}

/// "..._v1.2.3.bin" or "..._v1.2.3b.bin"
fn parse_tail(t: &str) -> Option<Ver> {
    let mut parts = t.splitn(3, '.');
    let a = num(parts.next()?)?;
    let b = num(parts.next()?)?;
    let c = parts.next()?;
    let digits = c.chars().take_while(|ch| ch.is_ascii_digit()).count();
    if digits == 0 {
        return None;
    }
    let (n, rest) = c.split_at(digits);
    let letter = match rest.len() {
        0 => String::new(),
        1 if rest.chars().all(|ch| ch.is_ascii_alphabetic()) => rest.to_string(),
        _ => return None,
    };
    Some((a, b, num(n)?, letter))
}

fn parse_version(name: &str) -> Option<Ver> {
    let stem = name.strip_suffix(".bin")?;
    for (i, _) in stem.match_indices("_v") {
        if let Some(v) = parse_tail(&stem[i + 2..]) {
            return Some(v);
        }
    }
    None
}

fn file_name(p: &Path) -> String {
    p.file_name()
        .map(|n| n.to_string_lossy().into_owned())
        .unwrap_or_default()
}

fn version_key(p: &Path) -> (u64, u64, u64, String, SystemTime) {
    let mtime = fs::metadata(p)
        .and_then(|m| m.modified())
        .unwrap_or(SystemTime::UNIX_EPOCH);
    match parse_version(&file_name(p)) {
        Some((a, b, c, l)) => (a, b, c, l.to_lowercase(), mtime),
        None => (0, 0, 0, String::new(), mtime),
    }
}

fn newest(paths: Vec<PathBuf>) -> Option<PathBuf> {
    paths
        .into_iter()
        .filter(|p| p.is_file())
        .max_by_key(|p| version_key(p))
}

fn find_bootloader(l: &Layout) -> Result<PathBuf, String> {
    if l.boot_bin.is_file() {
        return Ok(l.boot_bin.clone());
    }
    Err(format!(
        "ERROR: bootloader not found: {}\n\
         Build the Zagotovka_M_BOOTLOADER project (Convert to binary must be on)\n\
         and copy its .bin to that place, or pass it with --bootloader.",
        l.rel(&l.boot_bin)
    ))
}

fn find_bank_a(l: &Layout) -> Result<PathBuf, String> {
    if l.release_dir.is_dir() {
        if let Ok(rd) = fs::read_dir(&l.release_dir) {
            let list: Vec<PathBuf> = rd
                .filter_map(|e| e.ok())
                .map(|e| e.path())
                .filter(|p| {
                    let ext_ok = p
                        .extension()
                        .map(|e| e.to_string_lossy().to_lowercase() == "bin")
                        .unwrap_or(false);
                    ext_ok && file_name(p).to_lowercase().starts_with("zagotovka_bank_a")
                })
                .collect();
            if let Some(f) = newest(list) {
                return Ok(f);
            }
        }
    }
    if l.bank_a_build.is_file() {
        println!(
            "NOTE: no released Bank A file in {}, using the development build {}",
            l.rel(&l.release_dir),
            l.rel(&l.bank_a_build)
        );
        return Ok(l.bank_a_build.clone());
    }
    Err(format!(
        "ERROR: Bank A .bin not found in {} or {}.\n\
         Build the Bank_A configuration or pass the file with --bank-a.",
        l.rel(&l.release_dir),
        l.rel(&l.bank_a_build)
    ))
}

fn read_image(path: &Path) -> Result<Vec<u8>, String> {
    fs::read(path).map_err(|e| format!("ERROR: cannot read {}: {}", path.display(), e))
}

// ---- image checks ----------------------------------------------------------
fn vectors(img: &[u8]) -> Option<(u32, u32)> {
    if img.len() < 8 {
        return None;
    }
    let msp = u32::from_le_bytes(img[0..4].try_into().unwrap());
    let reset = u32::from_le_bytes(img[4..8].try_into().unwrap());
    Some((msp, reset))
}

fn check_boot(img: &[u8]) -> Result<(), String> {
    if img.len() > BOOT_SIZE {
        return Err(format!(
            "ERROR: bootloader is {} bytes, more than the 256 KB ({}) reserved for it",
            img.len(),
            BOOT_SIZE
        ));
    }
    let (msp, reset) = vectors(img).ok_or("ERROR: bootloader file is too small")?;
    if !(msp > SRAM_BASE && msp <= SRAM_END) {
        return Err(format!(
            "ERROR: bootloader initial stack pointer 0x{:08X} is not in SRAM; \
             is this really the bootloader .bin?",
            msp
        ));
    }
    if !(reset >= FLASH_BASE && reset < BANK_A_ADDR) {
        return Err(format!(
            "ERROR: bootloader reset vector 0x{:08X} is outside 0x{:08X}..0x{:08X}; \
             is this really the bootloader .bin?",
            reset,
            FLASH_BASE,
            BANK_A_ADDR - 1
        ));
    }
    Ok(())
}

fn check_bank_a(img: &[u8]) -> Result<(), String> {
    if img.len() > BANK_CAPACITY as usize {
        return Err(format!(
            "ERROR: application is {} bytes, more than the 768 KB ({}) of a bank",
            img.len(),
            BANK_CAPACITY
        ));
    }
    let (msp, reset) = vectors(img).ok_or("ERROR: application file is too small")?;
    if !(msp > SRAM_BASE && msp <= SRAM_END) {
        return Err(format!(
            "ERROR: application initial stack pointer 0x{:08X} is not in SRAM; \
             is this really the application .bin?",
            msp
        ));
    }
    if reset >= BANK_B_ADDR && reset < BANK_B_ADDR + BANK_CAPACITY {
        return Err(format!(
            "ERROR: this is the Bank B build (reset vector 0x{:08X}). \
             The first flashing needs the Bank A build.",
            reset
        ));
    }
    if !(reset >= BANK_A_ADDR && reset < BANK_A_ADDR + BANK_CAPACITY) {
        return Err(format!(
            "ERROR: application reset vector 0x{:08X} is outside Bank A \
             (0x{:08X}..0x{:08X}); wrong file?",
            reset,
            BANK_A_ADDR,
            BANK_A_ADDR + BANK_CAPACITY - 1
        ));
    }
    Ok(())
}

// ---- building the image ----------------------------------------------------
fn build_image(args: &Args, l: &Layout) -> Result<PathBuf, String> {
    let boot_path = match &args.bootloader {
        Some(p) => p.clone(),
        None => find_bootloader(l)?,
    };
    let app_path = match &args.bank_a {
        Some(p) => p.clone(),
        None => find_bank_a(l)?,
    };

    let out_path = match &args.output {
        Some(p) => p.clone(),
        None => {
            let suffix = match parse_version(&file_name(&app_path)) {
                Some((a, b, c, letter)) => format!("_v{}.{}.{}{}", a, b, c, letter),
                None => String::new(),
            };
            l.output_dir.join(format!("Zagotovka_FIRST_FLASH{}.bin", suffix))
        }
    };

    let boot = read_image(&boot_path)?;
    let app = read_image(&app_path)?;
    check_boot(&boot)?;
    check_bank_a(&app)?;

    let mut out = boot.clone();
    out.resize(BOOT_SIZE, 0xFF);
    out.extend_from_slice(&app);

    if let Some(parent) = out_path.parent() {
        fs::create_dir_all(parent)
            .map_err(|e| format!("ERROR: cannot create {}: {}", parent.display(), e))?;
    }
    fs::write(&out_path, &out)
        .map_err(|e| format!("ERROR: cannot write {}: {}", out_path.display(), e))?;

    let sha: String = Sha256::digest(&out)
        .iter()
        .map(|b| format!("{:02x}", b))
        .collect();

    println!(
        "Bootloader : {:<48} {:>7} bytes at 0x{:08X}",
        l.rel(&boot_path),
        boot.len(),
        FLASH_BASE
    );
    println!(
        "Padding    : {:<48} {:>7} bytes (0xFF)",
        "",
        BOOT_SIZE - boot.len()
    );
    println!(
        "Bank A     : {:<48} {:>7} bytes at 0x{:08X}",
        l.rel(&app_path),
        app.len(),
        BANK_A_ADDR
    );
    println!("Output     : {}, {} bytes", l.rel(&out_path), out.len());
    println!("SHA-256    : {}", sha);
    Ok(out_path)
}

// ---- the chip, through probe-rs --------------------------------------------
const RESET_WAIT_S: u64 = 40;

const FLASH_REGS: u64 = 0x4002_3C00;
const REG_KEYR: u64 = FLASH_REGS + 0x04;
const REG_OPTKEYR: u64 = FLASH_REGS + 0x08;
const REG_SR: u64 = FLASH_REGS + 0x0C;
const REG_CR: u64 = FLASH_REGS + 0x10;
const REG_OPTCR: u64 = FLASH_REGS + 0x14;

const KEY1: u32 = 0x4567_0123;
const KEY2: u32 = 0xCDEF_89AB;
const OPTKEY1: u32 = 0x0819_2A3B;
const OPTKEY2: u32 = 0x4C5D_6E7F;

const SR_BSY: u32 = 1 << 16;
const SR_FLAGS: u32 = 0xF3; // EOP, OPERR, WRPERR, PGAPERR, PGPERR, ERSERR (write 1 to clear)
const SR_ERRORS: u32 = 0xF2; // the same without EOP

const CR_MER: u32 = 1 << 2;
const CR_PSIZE_X32: u32 = 0b10 << 8;
const CR_MER1: u32 = 1 << 15;
const CR_STRT: u32 = 1 << 16;
const CR_LOCK: u32 = 1 << 31;

const OPTCR_OPTLOCK: u32 = 1 << 0;
const OPTCR_OPTSTRT: u32 = 1 << 1;
const OPTCR_NDBANK: u32 = 1 << 29; // 1 = Single Bank, 0 = Dual Bank
const OPTCR_RDP_MASK: u32 = 0xFF << 8;

fn mode_name(optcr: u32) -> &'static str {
    if optcr & OPTCR_NDBANK != 0 {
        "Single Bank"
    } else {
        "Dual Bank"
    }
}

fn read_optcr(core: &mut Core<'_>) -> AResult<u32> {
    core.read_word_32(REG_OPTCR).context("cannot read FLASH->OPTCR")
}

fn wait_not_busy(core: &mut Core<'_>, timeout: Duration) -> AResult<()> {
    let t0 = Instant::now();
    loop {
        let sr = core.read_word_32(REG_SR).context("cannot read FLASH->SR")?;
        if sr & SR_BSY == 0 {
            return Ok(());
        }
        if t0.elapsed() > timeout {
            bail!("flash controller is still busy after {:?} (FLASH->SR = 0x{:08X})", timeout, sr);
        }
        sleep(Duration::from_millis(20));
    }
}

fn open_session(args: &Args) -> AResult<Session> {
    let lister = Lister::new();
    let probes = lister.list_all();
    if probes.is_empty() {
        bail!(
            "no debug probe found. Connect the ST-LINK and close STM32CubeProgrammer or any \
             other program that uses it. (Linux: a udev rule may be needed; Windows: the ST-LINK USB driver.)"
        );
    }
    println!("Probe : {}", probes[0]);
    let mut probe = probes[0]
        .open()
        .map_err(|e| anyhow!("cannot open the probe (is another program using the ST-LINK?): {e}"))?;
    let khz = probe
        .set_speed(args.speed_khz)
        .map_err(|e| anyhow!("cannot set the SWD speed to {} kHz: {e}", args.speed_khz))?;
    println!("SWD   : {} kHz", khz);
    probe
        .attach(args.chip.as_str(), Permissions::default())
        .with_context(|| format!("cannot attach to chip '{}'", args.chip))
}

/// Single Bank -> Dual Bank. Returns OPTCR read after the reset.
fn switch_to_dual(core: &mut Core<'_>, before: u32) -> AResult<u32> {
    core.halt(Duration::from_millis(500)).context("cannot halt the core")?;
    wait_not_busy(core, Duration::from_secs(2))?;

    if before & OPTCR_OPTLOCK != 0 {
        core.write_word_32(REG_OPTKEYR, OPTKEY1).context("OPTKEY1")?;
        core.write_word_32(REG_OPTKEYR, OPTKEY2).context("OPTKEY2")?;
    }
    let unlocked = read_optcr(core)?;
    if unlocked & OPTCR_OPTLOCK != 0 {
        bail!("the option bytes did not unlock (keys not accepted). Power-cycle the board and run again. Nothing was changed.");
    }

    let target = before & !OPTCR_NDBANK & !OPTCR_OPTLOCK & !OPTCR_OPTSTRT;
    core.write_word_32(REG_OPTCR, target).context("cannot write OPTCR")?;
    core.write_word_32(REG_OPTCR, target | OPTCR_OPTSTRT)
        .context("cannot start the option bytes programming")?;
    wait_not_busy(core, Duration::from_secs(10))?;
    core.write_word_32(REG_OPTCR, target | OPTCR_OPTLOCK)
        .context("cannot lock the option bytes")?;

    println!("  option written, waiting for the chip to restart (up to {} s)", RESET_WAIT_S);
    if let Err(e) = core.reset() {
        println!("  reset reported: {e}");
    }
    let t0 = Instant::now();
    while t0.elapsed() < Duration::from_secs(RESET_WAIT_S) {
        sleep(Duration::from_millis(500));
        if let Ok(v) = core.read_word_32(REG_OPTCR) {
            return Ok(v);
        }
        println!("  waiting for the chip... {} s", t0.elapsed().as_secs());
    }
    bail!("the chip did not answer after the mode change. Power-cycle the board and run again.")
}

/// Mass erase of both banks (Dual Bank mode).
fn erase_all(core: &mut Core<'_>) -> AResult<()> {
    core.halt(Duration::from_millis(500)).context("cannot halt the core")?;
    wait_not_busy(core, Duration::from_secs(2))?;

    let cr = core.read_word_32(REG_CR).context("cannot read FLASH->CR")?;
    if cr & CR_LOCK != 0 {
        core.write_word_32(REG_KEYR, KEY1).context("KEY1")?;
        core.write_word_32(REG_KEYR, KEY2).context("KEY2")?;
    }
    let cr = core.read_word_32(REG_CR).context("cannot read FLASH->CR")?;
    if cr & CR_LOCK != 0 {
        bail!("FLASH_CR is still locked (keys not accepted). Power-cycle the board and run again.");
    }
    core.write_word_32(REG_SR, SR_FLAGS).context("cannot clear FLASH->SR flags")?;

    let erase_cr = CR_MER | CR_MER1 | CR_PSIZE_X32;
    core.write_word_32(REG_CR, erase_cr).context("cannot write FLASH->CR")?;
    core.write_word_32(REG_CR, erase_cr | CR_STRT)
        .context("cannot write FLASH->CR (STRT)")?;
    let res = wait_not_busy(core, Duration::from_secs(180));
    let sr = core.read_word_32(REG_SR).context("cannot read FLASH->SR")?;
    // lock the controller again whatever happened (this also clears MER/MER1)
    let _ = core.write_word_32(REG_CR, CR_LOCK);
    res?;
    if sr & SR_ERRORS != 0 {
        bail!("the flash controller reported an error flag (FLASH->SR = 0x{:08X})", sr);
    }
    Ok(())
}

fn read_range(core: &mut Core<'_>, start: u64, len: usize) -> AResult<Vec<u8>> {
    let words = (len + 3) / 4;
    let mut out: Vec<u8> = Vec::with_capacity(words * 4);
    let mut buf = vec![0u32; 1024];
    let mut done = 0usize;
    while done < words {
        let n = (words - done).min(buf.len());
        let addr = start + done as u64 * 4;
        core.read_32(addr, &mut buf[..n])
            .with_context(|| format!("cannot read flash at 0x{:08X}", addr))?;
        for w in &buf[..n] {
            out.extend_from_slice(&w.to_le_bytes());
        }
        done += n;
    }
    out.truncate(len);
    Ok(out)
}

/// Compares the flash with the file and prints the result. True if identical.
fn report_diff(expected: &[u8], actual: &[u8]) -> bool {
    let base = FLASH_BASE as u64;
    let mut bytes = 0u64;
    let mut ranges = 0u64;
    let mut first: Vec<(u64, u64)> = Vec::new();
    let mut cur: Option<(u64, u64)> = None; // (start, end exclusive)
    for (i, (e, a)) in expected.iter().zip(actual.iter()).enumerate() {
        if e == a {
            continue;
        }
        let addr = base + i as u64;
        bytes += 1;
        let extend = matches!(cur, Some((_, end)) if end == addr);
        if extend {
            cur.as_mut().unwrap().1 = addr + 1;
        } else {
            if let Some(r) = cur.take() {
                ranges += 1;
                if first.len() < 8 {
                    first.push(r);
                }
            }
            cur = Some((addr, addr + 1));
        }
    }
    if let Some(r) = cur.take() {
        ranges += 1;
        if first.len() < 8 {
            first.push(r);
        }
    }
    if bytes == 0 {
        println!("  flash content is IDENTICAL to the file ({} bytes)", expected.len());
        return true;
    }
    println!("  MISMATCH: {} differing bytes in {} range(s)", bytes, ranges);
    for (a, b) in &first {
        println!("      0x{:08X}..0x{:08X} ({} bytes)", a, b - 1, b - a);
    }
    if ranges > first.len() as u64 {
        println!("      ... and {} more range(s)", ranges - first.len() as u64);
    }
    false
}

/// Reset with the core halted (this also drops stale cached data), read the flash
/// back and compare. The core is NOT restarted here.
fn compare_with_flash(core: &mut Core<'_>, data: &[u8]) -> AResult<bool> {
    if let Err(e) = core.reset_and_halt(Duration::from_millis(500)) {
        println!("  reset_and_halt reported: {e}");
    }
    let t0 = Instant::now();
    let actual = read_range(core, FLASH_BASE as u64, data.len())?;
    println!("  read-back took {:.1} s", t0.elapsed().as_secs_f32());
    Ok(report_diff(data, &actual))
}

fn program_chip(args: &Args, image: &Path, l: &Layout) -> AResult<()> {
    let data = fs::read(image).with_context(|| format!("cannot read {}", image.display()))?;
    let mut session = open_session(args)?;

    println!("\n[1/5] Reading the flash mode (FLASH->OPTCR)");
    let optcr = {
        let mut core = session.core(0).context("cannot get core 0")?;
        read_optcr(&mut core)?
    };
    println!(
        "  OPTCR = 0x{:08X}, nDBANK = {} ({})",
        optcr,
        (optcr & OPTCR_NDBANK != 0) as u8,
        mode_name(optcr)
    );
    if optcr & OPTCR_RDP_MASK != 0xAA << 8 {
        bail!("RDP is not Level 0 (OPTCR = 0x{:08X}); refusing to touch the chip", optcr);
    }

    if optcr & OPTCR_NDBANK != 0 {
        println!("\n[2/5] Single Bank -> Dual Bank (nDBANK = 0)");
        let after = {
            let mut core = session.core(0).context("cannot get core 0")?;
            switch_to_dual(&mut core, optcr)?
        };
        if after & OPTCR_NDBANK != 0 {
            bail!(
                "nDBANK is still 1 (OPTCR = 0x{:08X}), the mode was not changed.\n\
                 Switch the board power off and on, then run the program again.",
                after
            );
        }
        println!("  Dual Bank is on (OPTCR = 0x{:08X})", after);
        println!("  the old flash content is garbage now, the erase below is mandatory");
    } else {
        println!("\n[2/5] Already Dual Bank, no mode change needed");
    }

    println!("\n[3/5] Full chip erase (both banks)");
    let t = Instant::now();
    {
        let mut core = session.core(0).context("cannot get core 0")?;
        erase_all(&mut core)?;
    }
    println!("  done in {:.1} s", t.elapsed().as_secs_f32());

    println!("\n[4/5] Programming {} ({} bytes)", l.rel(image), data.len());
    let t = Instant::now();
    let mut opts = DownloadOptions::default();
    opts.skip_erase = true; // the flash is already blank after the mass erase
    opts.verify = false; // we compare ourselves in the next step
    download_file_with_options(
        &mut session,
        image,
        BinLoader(BinOptions { base_address: Some(FLASH_BASE as u64), skip: 0 }),
        opts,
    )
    .context("programming failed")?;
    println!("  done in {:.1} s", t.elapsed().as_secs_f32());

    println!("\n[5/5] Resetting the chip and comparing the flash with the file");
    let mut core = session.core(0).context("cannot get core 0")?;
    let ok = compare_with_flash(&mut core, &data)?;
    if !ok {
        bail!(
            "verification failed. Switch the board power off and on and run:\n  make_first_flash --verify-only\n\
             If the flash is still different, run the program again."
        );
    }
    if let Err(e) = core.reset() {
        println!("  final reset reported: {e}");
    }
    println!("\nDONE. The terminal must show: [BOOT] Flash: Dual Bank (OK)");
    Ok(())
}

fn verify_only(args: &Args, image: &Path) -> AResult<()> {
    let data = fs::read(image).with_context(|| format!("cannot read {}", image.display()))?;
    let mut session = open_session(args)?;
    let mut core = session.core(0).context("cannot get core 0")?;
    println!("\nComparing the flash with the file:");
    let ok = compare_with_flash(&mut core, &data)?;
    if let Err(e) = core.reset() {
        println!("  final reset reported: {e}");
    }
    if ok {
        println!("\nOK.");
        Ok(())
    } else {
        bail!("the flash differs from the file")
    }
}

// ---- main ------------------------------------------------------------------
fn run(argv: Vec<String>) -> AResult<()> {
    let args = parse_args(argv).map_err(anyhow::Error::msg)?;
    let layout = Layout::new(detect_root(args.root.as_ref()));

    let out_path = build_image(&args, &layout).map_err(anyhow::Error::msg)?;
    if args.image_only {
        println!(
            "The chip was not touched (--image-only). The chip must be in Dual Bank \
             (nDBANK = 0) before this file is flashed at 0x{:08X}.",
            FLASH_BASE
        );
        return Ok(());
    }
    if args.verify_only {
        return verify_only(&args, &out_path);
    }
    program_chip(&args, &out_path, &layout)
}

fn main() {
    let argv: Vec<String> = env::args().skip(1).collect();
    // Started by a double click on Windows: keep the window open
    let double_click = cfg!(windows) && argv.is_empty();

    let code = match run(argv) {
        Ok(()) => 0,
        Err(e) => {
            let s = format!("{:#}", e);
            if s.starts_with("ERROR") {
                eprintln!("{}", s);
            } else {
                eprintln!("ERROR: {}", s);
            }
            1
        }
    };

    if double_click {
        print!("\nPress Enter to close...");
        let _ = io::stdout().flush();
        let mut s = String::new();
        let _ = io::stdin().read_line(&mut s);
    }
    exit(code);
}
