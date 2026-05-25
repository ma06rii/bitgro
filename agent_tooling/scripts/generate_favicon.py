"""Generate the Bitgro favicon package.

Produces:
  src/assets/favicon.png  - 512x512 master
  src/assets/favicon.ico  - multi-size ICO (16, 32, 48, 192)

Renders fresh at each target size (with 4x supersampling) rather than
downscaling a single large raster, so the rounded corner and the "B"
read crisply at 16 and 32 px.
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

YELLOW = (248, 231, 7, 255)        # matches the source image
DARK_GREEN = (12, 52, 44, 255)     # --color-foreground from treasury.css
FONT_PATH = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"

SS = 4  # supersampling factor

REPO = Path(__file__).resolve().parent.parent
OUT_DIR = REPO / "src" / "assets"


def render(size: int) -> Image.Image:
    """Render the favicon at exactly `size` x `size` pixels (RGBA)."""
    big = size * SS
    img = Image.new("RGBA", (big, big), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # Rounded square. Use the full canvas — no outer padding — so the
    # mark fills the favicon slot. Corner radius ~22% of the size,
    # clamped at small sizes so the corner stays visible.
    radius = max(int(big * 0.22), 3 * SS if size >= 16 else 2 * SS)
    draw.rounded_rectangle(
        (0, 0, big - 1, big - 1),
        radius=radius,
        fill=YELLOW,
    )

    # "B" glyph. Font size tuned so the cap height fills ~70% of the
    # canvas. stroke_width thickens DejaVu Bold towards the heavy
    # geometric weight of the source mark.
    font_px = int(big * 0.72)
    font = ImageFont.truetype(FONT_PATH, font_px)
    stroke = max(int(big * 0.02), 1)

    # Optical centering: use the glyph's tight bounding box, not the
    # font's ascent/descent line, so the "B" lands visually centered.
    bbox = font.getbbox("B", stroke_width=stroke)
    glyph_w = bbox[2] - bbox[0]
    glyph_h = bbox[3] - bbox[1]
    x = (big - glyph_w) // 2 - bbox[0]
    y = (big - glyph_h) // 2 - bbox[1]
    draw.text(
        (x, y),
        "B",
        font=font,
        fill=DARK_GREEN,
        stroke_width=stroke,
        stroke_fill=DARK_GREEN,
    )

    # Supersample down to the target size.
    return img.resize((size, size), Image.LANCZOS)


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)

    # 512x512 master PNG
    master = render(512)
    png_path = OUT_DIR / "favicon.png"
    master.save(png_path, format="PNG", optimize=True)
    print(f"wrote {png_path} ({master.size[0]}x{master.size[1]})")

    # Multi-size ICO. Build each frame natively so the small sizes get
    # their own supersampled render, not a downscale of the 512.
    # Pillow's ICO writer rejects sizes larger than the base image, so
    # pass the LARGEST frame as base and the rest via append_images.
    ico_sizes = [192, 48, 32, 16]
    frames = [render(n) for n in ico_sizes]
    ico_path = OUT_DIR / "favicon.ico"
    frames[0].save(
        ico_path,
        format="ICO",
        sizes=[(n, n) for n in ico_sizes],
        append_images=frames[1:],
    )
    print(f"wrote {ico_path} with sizes {sorted(ico_sizes)}")


if __name__ == "__main__":
    main()
