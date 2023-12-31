import fs from "fs";
import { marked } from "marked";
import { serialize } from "next-mdx-remote/serialize";
import path from "path";
import { Hex } from "viem";
import { CaseMetadata, CaseWithMetadata } from "./interfaces";

const PATH_TO_MARKDOWN = "src/markdown";

function getAllCaseFileNames() {
	const dir = getAbsolutePathToMarkdown();
	const filenames = fs.readdirSync(dir);
	return filenames;
}

function getAbsolutePathToMarkdown() {
	return path.join(process.cwd(), PATH_TO_MARKDOWN);
}

export function getCases() {
	const filenames = getAllCaseFileNames();
	return filenames.map((filename) =>
		getCase(getAbsolutePathToMarkdown(), filename),
	);
}

export async function getCaseFromSlug(slug: string) {
	const filename = `${slug}.mdx`;
	const caseFile = getCase(
		path.join(process.cwd(), PATH_TO_MARKDOWN),
		filename,
	);
	const serialized = await serialize(caseFile.source, {
		parseFrontmatter: true,
	});
	return { ...caseFile, serialized };
}

export function getCase(
	pathToMarkdownDir: string,
	filename: string,
): CaseWithMetadata {
	let source = fs
		.readFileSync(path.join(pathToMarkdownDir, filename))
		.toString("utf-8");
	const slug = filename.replace(".mdx", "");
	const parsed = parseMarkdown(source);

	// Strip metadata from markdown source
	const index = source.indexOf("### Metadata");
	if (index !== -1) {
		source = source.substring(0, index);
	}
	return {
		filename,
		slug,
		source,
		...parsed,
	};
}

function getAllSlugs() {
	const filenames = getAllCaseFileNames();
	return filenames.map((file) => file.split(".mdx")[0]);
}

export function createSlug(title: string) {
	const allSlugs = getAllSlugs();
	let slug = title
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-|-$/g, "");
	const originalSlug = slug;

	let count = 1;
	while (allSlugs.includes(slug)) {
		slug = `${originalSlug}-${count}`;
		count++;
	}
	return slug;
}

export function parseMarkdown(source: string): CaseMetadata {
	const lexer = new marked.Lexer();
	const tokens = lexer.lex(source);

	const getStrongTextStartsWith = (search: string) => {
		const token = tokens.find(
			(token) => token.type === "paragraph" && token.text?.startsWith(search),
		) as marked.Tokens.Paragraph;

		if (!token) {
			return undefined;
		}
		const { text } = token.tokens.find(
			(token) => token.type === "strong",
		) as marked.Tokens.Strong;
		return text;
	};

	const title = getStrongTextStartsWith("Title") as string;
	const name = getStrongTextStartsWith("Author") as string;
	const category = getStrongTextStartsWith("Category") as string;
	const experienceUrl = getStrongTextStartsWith(
		"Proof of Experience",
	) as string;
	const createdAt = getStrongTextStartsWith("Created") as string;
	const address = getStrongTextStartsWith("Signed by") as Hex | undefined;
	return {
		title,
		name,
		category,
		experienceUrl,
		createdAt,
		address,
	};
}

export class UnauthenticatedError extends Error {
	constructor(msg?: string) {
		super(msg || "Must be authenticated");
	}
}
