"""Strip checkerboard/flat backgrounds and crop to gold text only."""
from __future__ import annotations

import sys
from pathlib import Path

import numpy as np
from PIL import Image


def process(src: Path, dest: Path, pad: int = 8) -> tuple[int, int]:
    img = Image.open(src).convert("RGBA")
    arr = np.array(img)
    r = arr[..., 0].astype(np.int16)
    g = arr[..., 1].astype(np.int16)
    b = arr[..., 2].astype(np.int16)
    mx = np.maximum(np.maximum(r, g), b)
    mn = np.minimum(np.minimum(r, g), b)
    sat = mx - mn

    neutral = (np.abs(r - g) < 20) & (np.abs(g - b) < 20)
    # Checkerboard greys (light + dark squares)
    checker = neutral & (sat < 55) & (mx > 90) & (mx < 255)
    arr[checker, 3] = 0

    # Gold / warm lettering + attached shadows
    gold = (r > 90) & (g > 45) & ((r - b) > 12) & (sat > 15)
    shadow = (mx < 110) & (mx > 15) & (sat < 45) & ~checker
    core = gold | (shadow & (sat > 5))

    ys, xs = np.where(core)
    if len(xs) == 0:
        raise RuntimeError("No visible pixels found after background removal")

    left = max(0, int(xs.min()) - pad)
    top = max(0, int(ys.min()) - pad)
    right = min(arr.shape[1], int(xs.max()) + pad + 1)
    bottom = min(arr.shape[0], int(ys.max()) + pad + 1)

    cropped = Image.fromarray(arr).crop((left, top, right, bottom))
    dest.parent.mkdir(parents=True, exist_ok=True)
    cropped.save(dest, format="PNG", optimize=True)
    return cropped.size


def main() -> None:
    src = Path(sys.argv[1])
    dest = Path(sys.argv[2])
    size = process(src, dest)
    print(f"Saved {dest} ({size[0]}x{size[1]})")


if __name__ == "__main__":
    main()
