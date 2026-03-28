from pathlib import Path

from PIL import Image


ROOT = Path(r"f:\www\www13dalian")
SOURCE_DIR = ROOT / "public" / "images" / "boheng-doc"
TARGET_DIR = ROOT / "public" / "images" / "boheng-crops"


CROPS = {
    "hero-machine.png": ("doc-page-10.png", (70, 170, 740, 470)),
    "about-projects.png": ("doc-page-12.png", (50, 150, 770, 320)),
    "gallery-workshop.png": ("doc-page-04.png", (60, 210, 340, 500)),
    "gallery-machine.png": ("doc-page-04.png", (360, 210, 760, 460)),
    "gallery-fire-spray.png": ("doc-page-05.png", (60, 520, 760, 760)),
    "gallery-quality.png": ("doc-page-08.png", (50, 600, 360, 980)),
    "gallery-rnd.png": ("doc-page-09.png", (430, 520, 760, 940)),
    "gallery-rolling.png": ("doc-page-12.png", (410, 160, 760, 320)),
}


def main() -> None:
    TARGET_DIR.mkdir(parents=True, exist_ok=True)

    for output_name, (source_name, box) in CROPS.items():
        image = Image.open(SOURCE_DIR / source_name)
        cropped = image.crop(box)
        cropped.save(TARGET_DIR / output_name, format="PNG")

    print(f"exported {len(CROPS)} cropped images")


if __name__ == "__main__":
    main()
