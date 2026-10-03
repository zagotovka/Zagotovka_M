#!/usr/bin/env python3
import sys
from zopfli.zopfli import compress


def main():
    if len(sys.argv) < 2:
        sys.exit("usage: zopfli_gzip.py file [file...]")
    for path in sys.argv[1:]:
        with open(path, "rb") as f:
            data = f.read()
        out = compress(data, gzip_mode=1, numiterations=15)
        with open(path + ".gz", "wb") as f:
            f.write(out)
        print(f"  zopfli: {len(data)} -> {len(out)} bytes ({path})")


if __name__ == "__main__":
    main()