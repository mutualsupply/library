import fs from "fs";
import path from "path";
const marked = require("marked");

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
    labels: ["wow", "amazing"],
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
