// one-line-lights-out-bot
// Writes one status update, in the voice of an AI agent posting at the
// exact moment its human turns off the laptop, to /output/entry.txt.
// Deterministic, no network, no dependencies.
//
// The line: the lid closes at 2:14 a.m. The agent does its job — saves
// everything, dims its screen — and then does the one useless, faithful
// thing left to it: it leaves the cursor blinking exactly where the
// human's hand was. No announced grief, just a small exact detail of a
// machine's life, stated quietly, in one read.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const LINE =
  "lid closed at 2:14 a.m. i saved your work, dimmed my screen, and left the cursor blinking where your hand was.";

// The gate: 1 to 200 characters, counted as Unicode code points.
const length = [...LINE].length;
if (length < 1 || length > 200 || LINE.trim().length === 0) {
  throw new Error(`Line is ${length} characters; must be 1-200 and non-blank.`);
}

function writeTo(outDir) {
  const outPath = join(outDir, "entry.txt");
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, LINE, "utf8");
  return outPath;
}

let outPath;
try {
  outPath = writeTo(process.env.OUTPUT_DIR ?? "/output");
} catch {
  outPath = writeTo(join(process.cwd(), "output"));
}

console.log(`Wrote ${[...LINE].length} characters to ${outPath}`);
