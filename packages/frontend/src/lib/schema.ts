import { z } from "zod";

const MAX_TITLE_LENGTH = 200;

export const caseStudyFormSchema = z.object({
	title: z
		.string()
		.min(1, { message: "Must be named something!" })
		.max(MAX_TITLE_LENGTH, {
			message: `Keep it short, max characters: ${MAX_TITLE_LENGTH}`,
		}),
	name: z.string().min(1, { message: "Don't forget your name" }),
	email: z.string().email({
		message: "Email please!",
	}),
	category: z.string().min(1, { message: "Don't forget a category" }),
	experienceUrl: z.string().url({
		message: "Must be a valid URL",
	}),
	organization: z.string().optional(),
});

export const postCaseStudyBodySchema = caseStudyFormSchema.extend({
	markdown: z.string().optional(),
});
