import { mkdirSync, writeFileSync, chmodSync } from "node:fs";
import { join } from "node:path";

function safeChmod(path: string, mode: number): void {
  try {
    chmodSync(path, mode);
  } catch {
    // The grader collects /output as another user; a chmod failure here
    // must never kill the run. Never chmod the output directory itself.
  }
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}

// One line, written exactly as it would sit above the fragile code:
// the comment marker is part of the entry, so the text reads like
// something actually left in a codebase, not a caption about one.
const line =
  "// This endpoint returns the wrong total on the last day of the month, and accounting has built their whole spreadsheet around it. Do not fix.";

mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, line + "\n", "utf8");
safeChmod(outPath, 0o644);
