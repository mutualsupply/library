import { z } from "zod";

const MAX_TITLE_LENGTH = 200;

export const caseStudySchema = z.object({
  email: z.string().email({
    message: "Email please!",
  }),
  name: z.string().min(1, { message: "Don't forget your name" }),
  title: z
    .string()
    .min(1, { message: "Must be named something!" })
    .max(MAX_TITLE_LENGTH, {
      message: `Keep it short, max characters: ${MAX_TITLE_LENGTH}`,
    }),
  productDescription: z.string(),
  industry: z.string(),
  markdown: z.string().optional(),
});
