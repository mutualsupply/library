import slugify from "slugify";
import { CaseStudy, GithubUser } from "./interfaces";
import prisma from "./prismaClient";

export async function createSlug(caseStudy: CaseStudy) {
	const existingSlugs = (
		await prisma.caseStudy.findMany({
			select: { slug: true },
		})
	).map((c) => c.slug);
	const tmpSlug = slugify(caseStudy.title, { lower: true, strict: true });
	let slug = tmpSlug;
	let counter = 1;

	// Ensure the slug is unique
	while (existingSlugs.includes(slug)) {
		slug = `${tmpSlug}-${counter}`;
		counter++;
	}
	return slug;
}

export function upsertUser(user: GithubUser) {
	return prisma.user.upsert({
		where: { email: user.email },
		update: {
			name: user.name,
			email: user.email,
		},
		create: {
			name: user.name,
			email: user.email,
		},
	});
}
