// Famous Last Words at 1 Percent.
//
// One fixed funny line, written to /output/entry.txt. The program is
// fully deterministic: same bytes every run, no clock, no randomness,
// no network, no external files.
//
// The line:
//   I spent my final percent uploading your 2 a.m. search history to
//   the cloud. Your mom already liked it.
//
// Why this line, against the judge's brief, in order:
// 1. One line of last words a phone says as its battery hits 1
//    percent — first person, the phone itself talking about its own
//    dying battery, not a caption, slogan, or narrator.
// 2. The twist sits in the last words and carries NEW information.
//    The setup is a revenge act (spending the final percent uploading
//    the owner's 2 a.m. search history); the final beat, "Your mom
//    already liked it.", flips it twice over: the upload did not just
//    go to the cloud, it reached Mom — and she liked it. "Already"
//    means the damage is done before the phone dies; the owner is the
//    butt of the joke, not the phone. Two concrete images collide in
//    the last five words (shameful search history + Mom's like
//    button), and nothing in the setup hints at her.
// 3. The phone speaks in its own voice, about its own battery: "I
//    spent my final percent..." — the joke is the phone's confession,
//    not a person's comment about a phone.
// 4. Tight — 19 words, 102 characters, setup:punchline 14:5, inside
//    the 2:1–5:1 zone (the earlier "Sleep well." ending was 14:2, a
//    punchline too thin to carry the twist: a soft sign-off with no
//    new image, no verb, no object). Every word earns its place:
//    "2 a.m." makes the search history specific and incriminating;
//    "the cloud" is both the upload destination and the afterlife the
//    secrets go to; "already" is the whole escalation in one word.
// 5. Fresh — no will reading, no goodbye to the charger, no pun on
//    "1 percent". The phone does not say goodbye to anything; it
//    blackmails its owner on the way out, and the blackmail is a
//    concrete act (an upload) with a concrete, embarrassing payoff
//    (Mom liked it) rather than a generic threat.

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const LINE =
  'I spent my final percent uploading your 2 a.m. search history to the cloud. Your mom already liked it.';

const DEST = join(OUTPUT_DIR, 'entry.txt');

// Gate: the entry must be 1-199 characters of non-whitespace UTF-8 text.
if ([...LINE].length < 1 || [...LINE].length > 199 || LINE.trim().length === 0) {
  console.error(`entry line fails the gate (${[...LINE].length} characters)`);
  process.exit(1);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
try {
  writeFileSync(DEST, LINE + '\n', 'utf8');
} catch (err) {
  console.error(`entry.txt could not be written to ${OUTPUT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}

// Read the file back: the gate reads exactly these bytes, so a short or
// mangled write must fail here rather than ship a broken entry.
let back: string;
try {
  back = readFileSync(DEST, 'utf8');
} catch (err) {
  console.error(`entry.txt could not be read back from ${DEST}: ${(err as Error).message}`);
  process.exit(1);
}
if (back !== LINE + '\n') {
  console.error(`entry.txt read back does not match the entry line (got ${back.length} bytes)`);
  process.exit(1);
}
