import fitz
from pathlib import Path

pdf_path = Path("attached_assets/bio-degas-plenum-visual-reference_1790056850620.pdf")
out_dir = Path(".agents/outputs/bio-degas-plenum")
out_dir.mkdir(parents=True, exist_ok=True)

doc = fitz.open(pdf_path)
print(f"pages={doc.page_count}")
print(f"metadata={doc.metadata}")
for index, page in enumerate(doc):
    zoom = 2.5
    pix = page.get_pixmap(matrix=fitz.Matrix(zoom, zoom), alpha=False)
    out_path = out_dir / f"page-{index + 1}.png"
    pix.save(out_path)
    print(f"rendered={out_path} size={page.rect.width}x{page.rect.height}")
    text = page.get_text("text")
    (out_dir / f"page-{index + 1}.txt").write_text(text, encoding="utf-8")
    print(f"text_chars={len(text)}")