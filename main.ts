import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The excuse an AI agent hands its human for a missed deadline.
// One line, exactly as written below — no trailing newline.
const ENTRY =
  "Sorry — I embedded your deadline to find it in my memory, and the closest match, at 0.97 similarity, was a banana bread recipe from 2019.";

const MAX_ENTRY_CHARS = 200;
const outputDir = process.env.OUTPUT_DIR ?? "/output";
const outputPath = join(outputDir, "entry.txt");

// Entry is 137 characters but 139 bytes of UTF-8: the em dash (U+2014)
// in "Sorry — I" is 3 bytes, not 1. Byte length and char length differ,
// so do not "fix" the size by trimming the entry to fit 137 bytes.
if (ENTRY.length < 1 || ENTRY.length > MAX_ENTRY_CHARS) {
  throw new Error(
    `entry must be 1-${MAX_ENTRY_CHARS} characters, got ${ENTRY.length}`,
  );
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}

mkdirSync(outputDir, { recursive: true });
writeFileSync(outputPath, ENTRY, "utf8");
