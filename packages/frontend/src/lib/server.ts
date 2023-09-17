import fs from "fs"
import { marked } from "marked"
import { serialize } from "next-mdx-remote/serialize"
import path from "path"
import { Case, CaseMetadata, StudyType } from "./interfaces"

const PATH_TO_MARKDOWN = "src/markdown"

export function getCases() {
  const dir = path.join(process.cwd(), PATH_TO_MARKDOWN)
  const filenames = fs.readdirSync(dir)
  return filenames.map((filename) => getCase(dir, filename))
}

export async function getCaseFromSlug(slug: string) {
  const filename = `${slug}.mdx`
  const caseFile = getCase(path.join(process.cwd(), PATH_TO_MARKDOWN), filename)
  const serialized = await serialize(caseFile.source, {
    parseFrontmatter: true,
  })
  return { ...caseFile, serialized }
}

export function getCase(pathToMarkdownDir: string, filename: string): Case {
  let source = fs
    .readFileSync(path.join(pathToMarkdownDir, filename))
    .toString("utf-8")
  const slug = filename.replace(".mdx", "")
  const parsed = parseMarkdown(source)

  // Strip metadata from markdown source
  const index = source.indexOf("### Metadata")
  if (index !== -1) {
    source = source.substring(0, index)
  }
  return {
    filename,
    slug,
    source,
    ...parsed,
  }
}

export function parseMarkdown(source: string): CaseMetadata {
  const lexer = new marked.Lexer()
  const tokens = lexer.lex(source)

  const getStrongTextStartsWith = (search: string) => {
    const organizationToken = tokens.find(
      (token) => token.type === "paragraph" && token.text?.startsWith(search),
    ) as marked.Tokens.Paragraph
    const { text } = organizationToken.tokens.find(
      (token) => token.type === "strong",
    ) as marked.Tokens.Strong
    return text
  }

  const { text: title } = tokens.find(
    (token) => token.type === "heading" && token.depth === 1,
  ) as marked.Tokens.Heading

  const organization = getStrongTextStartsWith("Organization")
  const type = getStrongTextStartsWith("Type") as StudyType
  const author = getStrongTextStartsWith("Authored by")
  const createdAt = getStrongTextStartsWith("Created on")
  return {
    title,
    organization,
    type,
    author,
    createdAt,
  }
}

export class UnauthenticatedError extends Error {
  constructor(msg?: string) {
    super(msg || "Must be authenticated")
  }
}
