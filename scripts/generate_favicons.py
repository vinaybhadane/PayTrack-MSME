import os
from PIL import Image, ImageDraw, ImageFont

def create_favicon(size):
    # Create image with transparent background
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # Padding and geometry
    pad = int(size * 0.06)
    r = int(size * 0.24)
    w = size - 2 * pad
    h = size - 2 * pad

    # Draw rounded rectangle background (Obsidian #15121B)
    # Using rounded_rectangle
    draw.rounded_rectangle(
        [(pad, pad), (pad + w, pad + h)],
        radius=r,
        fill=(21, 18, 27, 255),
        outline=(255, 215, 88, 255),
        width=max(1, int(size * 0.04))
    )

    # Inner subtle glow circle
    cx, cy = size // 2, size // 2
    glow_r = int(size * 0.35)
    draw.ellipse(
        [(cx - glow_r, cy - glow_r), (cx + glow_r, cy + glow_r)],
        fill=(255, 215, 88, 30)
    )

    # Draw stylized "P" letter
    # Standard proportions:
    # Stem: left x ~ 0.32, top ~ 0.24, bottom ~ 0.76, width ~ 0.14
    # Bowl: outer radius ~ 0.22, top ~ 0.24, bottom ~ 0.55
    stem_x0 = int(size * 0.31)
    stem_x1 = int(size * 0.44)
    stem_y0 = int(size * 0.22)
    stem_y1 = int(size * 0.78)

    # Draw bowl outer
    bowl_x0 = int(size * 0.31)
    bowl_x1 = int(size * 0.73)
    bowl_y0 = int(size * 0.22)
    bowl_y1 = int(size * 0.56)
    bowl_r = (bowl_y1 - bowl_y0) // 2

    # Draw outer bowl rounded rect
    draw.rounded_rectangle(
        [(bowl_x0, bowl_y0), (bowl_x1, bowl_y1)],
        radius=bowl_r,
        fill=(255, 215, 88, 255)
    )

    # Draw stem
    draw.rectangle(
        [(stem_x0, stem_y0), (stem_x1, stem_y1)],
        fill=(255, 215, 88, 255)
    )

    # Draw inner bowl hole (Obsidian #15121B)
    hole_x0 = stem_x1
    hole_x1 = int(size * 0.61)
    hole_y0 = int(size * 0.32)
    hole_y1 = int(size * 0.46)
    hole_r = max(2, (hole_y1 - hole_y0) // 2)

    draw.rounded_rectangle(
        [(hole_x0, hole_y0), (hole_x1, hole_y1)],
        radius=hole_r,
        fill=(21, 18, 27, 255)
    )

    # Small emerald checkmark / accent badge in lower right corner
    if size >= 32:
        badge_r = int(size * 0.12)
        badge_cx = int(size * 0.72)
        badge_cy = int(size * 0.72)
        draw.ellipse(
            [(badge_cx - badge_r, badge_cy - badge_r), (badge_cx + badge_r, badge_cy + badge_r)],
            fill=(16, 185, 129, 255),
            outline=(21, 18, 27, 255),
            width=max(1, int(size * 0.025))
        )
        # Checkmark line
        p1 = (badge_cx - int(badge_r * 0.45), badge_cy)
        p2 = (badge_cx - int(badge_r * 0.08), badge_cy + int(badge_r * 0.4))
        p3 = (badge_cx + int(badge_r * 0.45), badge_cy - int(badge_r * 0.35))
        draw.line([p1, p2, p3], fill=(255, 255, 255, 255), width=max(1, int(size * 0.04)))

    return img

def main():
    root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    public_dir = os.path.join(root_dir, "public")
    app_dir = os.path.join(root_dir, "src", "app")

    os.makedirs(public_dir, exist_ok=True)
    os.makedirs(app_dir, exist_ok=True)

    # Create master 512x512
    img512 = create_favicon(512)
    img256 = create_favicon(256)
    img192 = create_favicon(192)
    img128 = create_favicon(128)
    img64 = create_favicon(64)
    img48 = create_favicon(48)
    img32 = create_favicon(32)
    img16 = create_favicon(16)

    # Save PNGs
    img512.save(os.path.join(public_dir, "favicon-512x512.png"), "PNG")
    img192.save(os.path.join(public_dir, "favicon-192x192.png"), "PNG")
    img192.save(os.path.join(public_dir, "apple-touch-icon.png"), "PNG")
    img48.save(os.path.join(public_dir, "favicon-48x48.png"), "PNG")
    img32.save(os.path.join(public_dir, "favicon-32x32.png"), "PNG")
    img16.save(os.path.join(public_dir, "favicon-16x16.png"), "PNG")
    img32.save(os.path.join(public_dir, "favicon.png"), "PNG")

    # In src/app for Next.js metadata convention
    img192.save(os.path.join(app_dir, "apple-icon.png"), "PNG")
    img32.save(os.path.join(app_dir, "icon.png"), "PNG")

    # Save multi-resolution .ico containing 16x16, 32x32, 48x48, 64x64, 128x128, 256x256
    ico_path_public = os.path.join(public_dir, "favicon.ico")
    img256.save(
        ico_path_public,
        format="ICO",
        sizes=[(16, 16), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)]
    )

    ico_path_app = os.path.join(app_dir, "favicon.ico")
    img256.save(
        ico_path_app,
        format="ICO",
        sizes=[(16, 16), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)]
    )

    print("Successfully generated all favicon formats (.ico, .png, multi-sizes) in public/ and src/app/!")

if __name__ == "__main__":
    main()
