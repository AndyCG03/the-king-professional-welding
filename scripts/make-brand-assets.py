"""Generate favicons and the social/WhatsApp share image for The King of Professional Welding.

Run from the `web` folder:  python scripts/make-brand-assets.py
Sources: brand/logos (approved kit) and real project photos. Output goes to public/.
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter

WEB = Path(__file__).resolve().parents[1]
BRAND = WEB.parent / "brand" / "logos"
PUBLIC = WEB / "public"
FONTS = Path("C:/Windows/Fonts")

ORANGE = (255, 100, 40)
INK = (20, 22, 21)
WHITE = (246, 244, 239)
MUTED = (185, 188, 184)


def font(size, variation="Bold Condensed"):
    f = ImageFont.truetype(str(FONTS / "bahnschrift.ttf"), size)
    try:
        f.set_variation_by_name(variation)
    except Exception:
        pass
    return f


def icons():
    avatar = Image.open(BRAND / "avatar-grafito-1080.png").convert("RGBA")
    for size, name in [(512, "icon-512.png"), (192, "icon-192.png"), (180, "apple-touch-icon.png")]:
        avatar.resize((size, size), Image.LANCZOS).convert("RGB").save(PUBLIC / name, optimize=True)
    # Small sizes: emblem only, cropped tight so it stays legible in a browser tab.
    emblem = Image.open(BRAND / "emblema-color-transparente-1024.png").convert("RGBA")
    emblem = emblem.crop(emblem.getbbox())
    side = max(emblem.size)
    square = Image.new("RGBA", (side, side), (0, 0, 0, 0))
    square.paste(emblem, ((side - emblem.width) // 2, (side - emblem.height) // 2), emblem)
    square.save(PUBLIC / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])
    square.resize((32, 32), Image.LANCZOS).save(PUBLIC / "favicon-32.png", optimize=True)


def share_image():
    W, H = 1200, 630
    canvas = Image.new("RGB", (W, H), INK)
    photo = Image.open(WEB / "public/images/work/trailer-welded-supports.jpg").convert("RGB")
    # Real project photo on the right, faded into the dark panel.
    ph = photo.resize((int(photo.width * H / photo.height), H), Image.LANCZOS)
    ph = ph.crop((ph.width - 640, 0, ph.width, H))
    canvas.paste(ph, (W - 640, 0))
    fade = Image.new("L", (640, H))
    fd = ImageDraw.Draw(fade)
    for x in range(640):
        fd.line([(x, 0), (x, H)], fill=int(255 * max(0, 1 - x / 360)))
    canvas.paste(Image.new("RGB", (640, H), INK), (W - 640, 0), fade)

    d = ImageDraw.Draw(canvas)
    logo = Image.open(BRAND / "emblema-color-transparente-512.png").convert("RGBA")
    logo = logo.crop(logo.getbbox())
    logo.thumbnail((150, 150), Image.LANCZOS)
    canvas.paste(logo, (64, 52), logo)

    d.text((64, 230), "THE KING OF", font=font(40), fill=WHITE)
    d.text((64, 270), "PROFESSIONAL", font=font(84), fill=WHITE)
    d.text((64, 350), "WELDING", font=font(84), fill=ORANGE)
    d.text((64, 455), "TRAILER REPAIRS · MIG & TIG · FENCES & GATES", font=font(27, "SemiBold Condensed"), fill=MUTED)
    d.text((64, 490), "KATY, TEXAS", font=font(27, "SemiBold Condensed"), fill=MUTED)
    # Phone call-to-action band.
    d.rectangle([(64, 548), (420, 600)], fill=ORANGE)
    d.text((84, 553), "CALL 832-732-7616", font=font(38), fill=INK)
    d.rectangle([(0, 0), (W, 6)], fill=ORANGE)

    out = PUBLIC / "og-image.jpg"
    for quality in (86, 80, 74, 68):
        canvas.save(out, "JPEG", quality=quality, optimize=True, progressive=True)
        if out.stat().st_size < 290_000:
            break
    print(f"og-image.jpg {out.stat().st_size // 1024} KB")


if __name__ == "__main__":
    PUBLIC.mkdir(parents=True, exist_ok=True)
    icons()
    share_image()
