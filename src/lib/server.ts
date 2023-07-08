import fs from "fs";
import path from "path";
import { randomInclusive } from "utils";
const marked = require("marked");

const TEST_CASES = [
  "User Interaction",
  "Buttons",
  "How not to do it",
  "Just cool",
];

export function getCase(pathToMarkdownDir: string, filename: string) {
  const source = fs
    .readFileSync(path.join(pathToMarkdownDir, filename))
    .toString("utf-8");
  const slug = filename.replace(".mdx", "");
  const parsed = parseMarkdown(source);
  return {
    filename,
    slug,
    source,
    title: parsed.title,
    labels: [
      TEST_CASES[randomInclusive(TEST_CASES.length - 1)],
      TEST_CASES[randomInclusive(TEST_CASES.length - 1)],
      TEST_CASES[randomInclusive(TEST_CASES.length - 1)],
    ],
  };
}

export default function parseMarkdown(source: string) {
  const tokens = marked.lexer(source);
  const heading = tokens.find(
    (token: any) => token.type === "heading" && token.depth === 1
  );
  return {
    title: heading?.text,
  };
}
