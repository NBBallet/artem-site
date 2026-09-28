/* Printed French CV, recto verso — assembled on every build (28.09.2026).
 *
 * recto: public/cv/Artem-Hordieiev-CV-FR.pdf — the one-pager, whatever version
 *        is in the repo at build time;
 * verso: design/cv/verso-FR.pdf — the QR code to /fr/cv. It points at an
 *        address, not at the content, so it only changes if that address or
 *        its design does (CHORÉGRAPHE/_інструменти/канва/cv_зворот.py).
 *
 * So replacing the one-pager is all it takes: the next deploy prints the new
 * CV with the same verso. The output is generated, not committed (.gitignore).
 * Runs as predev and prebuild; see src/lib/cv-files.ts → CV_PRINT. */
import { readFile, writeFile } from "node:fs/promises";
import { PDFDocument } from "pdf-lib";

const RECTO = "public/cv/Artem-Hordieiev-CV-FR.pdf";
const VERSO = "design/cv/verso-FR.pdf";
const OUT = "public/cv/Artem-Hordieiev-CV-FR-recto-verso.pdf";

const out = await PDFDocument.create();
for (const file of [RECTO, VERSO]) {
  const src = await PDFDocument.load(await readFile(file));
  if (src.getPageCount() !== 1) throw new Error(`${file}: expected one page, got ${src.getPageCount()}`);
  const [page] = await out.copyPages(src, [0]);
  out.addPage(page);
}
out.setTitle("Artem Hordieiev — CV (recto verso)");
await writeFile(OUT, await out.save());
console.log(`cv-recto-verso: ${OUT}`);
