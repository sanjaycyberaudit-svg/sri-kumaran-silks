"""Remove dark background-removal fringe from Murugan emblem PNG (same canvas size)."""
from __future__ import annotations

import sys
from pathlib import Path

import numpy as np
from PIL import Image


def clean_emblem(src: Path, dest: Path) -> None:
    img = Image.open(src).convert("RGBA")
    arr = np.array(img, dtype=np.uint8)
    h, w = arr.shape[:2]

    r = arr[..., 0].astype(np.int16)
    g = arr[..., 1].astype(np.int16)
    b = arr[..., 2].astype(np.int16)
    a = arr[..., 3].astype(np.int16)

    mx = np.maximum(np.maximum(r, g), b)
    mn = np.minimum(np.minimum(r, g), b)
    sat = mx - mn

    transparent = a == 0
    # Dark neutral specks left from cutout (not gold/red/blue garment colors)
    dark_neutral = (mx < 78) & (sat < 42) & (a > 0)

    # Transparent within 1px (8-neighbor)
    t_pad = np.zeros_like(transparent)
    for dy in (-1, 0, 1):
        for dx in (-1, 0, 1):
            if dy == 0 and dx == 0:
                continue
            shifted = np.roll(np.roll(transparent, dy, axis=0), dx, axis=1)
            if dy == -1:
                shifted[0, :] = False
            if dy == 1:
                shifted[-1, :] = False
            if dx == -1:
                shifted[:, 0] = False
            if dx == 1:
                shifted[:, -1] = False
            t_pad |= shifted

    y_idx = np.arange(h)[:, None]
    bottom_band = y_idx >= int(h * 0.78)
    side_margin = (np.arange(w)[None, :] < int(w * 0.22)) | (
        np.arange(w)[None, :] > int(w * 0.72)
    )

    remove = dark_neutral & (t_pad | (bottom_band & side_margin))

    # Semi-transparent dark halos on edges
    halo = (a > 0) & (a < 220) & (mx < 95) & (sat < 50) & t_pad
    remove |= halo

    removed = int(remove.sum())
    arr[remove, 3] = 0

    # One more pass: tiny isolated dark dots touching transparency
    transparent = arr[..., 3] == 0
    t_pad = np.zeros_like(transparent)
    for dy in (-1, 0, 1):
        for dx in (-1, 0, 1):
            if dy == 0 and dx == 0:
                continue
            shifted = np.roll(np.roll(transparent, dy, axis=0), dx, axis=1)
            if dy == -1:
                shifted[0, :] = False
            if dy == 1:
                shifted[-1, :] = False
            if dx == -1:
                shifted[:, 0] = False
            if dx == 1:
                shifted[:, -1] = False
            t_pad |= shifted

    mx = np.maximum(np.maximum(arr[..., 0], arr[..., 1]), arr[..., 2])
    sat = mx - np.minimum(
        np.minimum(arr[..., 0], arr[..., 1]), arr[..., 2]
    )
    dark_neutral = (mx < 70) & (sat < 38) & (arr[..., 3] > 0)
    remove2 = dark_neutral & t_pad
    removed += int(remove2.sum())
    arr[remove2, 3] = 0

    # Bottom corner protrusions: cutout floor remnants wider than the pedestal base
    ref_y = 430
    ref_row = arr[ref_y, :, 3] > 0
    ref_xs = np.where(ref_row)[0]
    if ref_xs.size:
        ref_left = int(ref_xs.min())
        ref_right = int(ref_xs.max())
        for y in range(ref_y + 1, h):
            depth = y - ref_y
            if depth < 18:
                continue
            shrink = int((depth - 18) * 0.55)
            left = ref_left + shrink
            right = ref_right - shrink
            row = arr[y]
            outside = ((np.arange(w) < left) | (np.arange(w) > right)) & (row[:, 3] > 0)
            removed += int(outside.sum())
            row[outside, 3] = 0

    dest.parent.mkdir(parents=True, exist_ok=True)
    Image.fromarray(arr).save(dest, format="PNG", optimize=True)
    print(f"Cleaned {src.name}: removed {removed} fringe pixels, kept {w}x{h}")


def main() -> None:
    src = Path(sys.argv[1])
    dest = Path(sys.argv[2]) if len(sys.argv) > 2 else src
    clean_emblem(src, dest)


if __name__ == "__main__":
    main()
