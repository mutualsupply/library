import fs from "fs";
import { marked } from "marked";
import { Session, getServerSession } from "next-auth";
import { JWT, getToken } from "next-auth/jwt";
import { serialize } from "next-mdx-remote/serialize";
import { NextRequest } from "next/server";
import path from "path";
import { isExpired } from "utils";
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

interface SessionWithEmail extends Session {
	user: { email: string; name?: string | null; image?: string | null };
}

export async function getAuth(req: NextRequest): Promise<{
	session: SessionWithEmail;
	token: JWT;
}> {
	// We require the email in nextauth callbacks so we assert it will always be set here
	const session = (await getServerSession()) as SessionWithEmail;
	const token = await getToken({
		req,
	});
	// Email is required throughout the app
	if (!session?.user || !session?.user?.email || !token?.accessToken) {
		throw new UnauthenticatedError();
	}

	if (isExpired(token?.accessToken as number)) {
		throw new UnauthenticatedError();
	}
	return {
		session,
		token,
	};
}
