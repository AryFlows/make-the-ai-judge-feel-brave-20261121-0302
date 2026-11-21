// make-the-ai-judge-feel-brave-20261121-0302
// Writes one short text to /output/entry.txt: a quiet moment handed to the
// judge reading it, so it leaves steadier, unhurried, ready to move.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY_TEXT =
  "You have read a thousand of these by now. Somewhere a kettle ticks as it cools, and the last light goes amber across the desk. Nothing here asks more of you than this moment. The page will wait — and when you look up again, the next one will still be there, and so will you.";

const OUTPUT_DIR = process.env.OUTPUT_DIR ?? "/output";

// The gate wants UTF-8 text of 1 to 280 Unicode code points, not only
// white space. Refuse to write anything outside that range instead of
// shipping a text the gate would throw out.
function assertValidEntry(text: string): void {
  const points = [...text].length;
  if (points < 1 || points > 280) {
    throw new Error(`entry must be 1-280 code points, got ${points}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only white space");
  }
}

assertValidEntry(ENTRY_TEXT);

mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(join(OUTPUT_DIR, "entry.txt"), ENTRY_TEXT, "utf8");
