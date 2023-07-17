import { z } from "zod";

export const caseStudySchema = z.object({
  email: z.string().email({
    message: "Email please!",
  }),
  name: z.string({
    required_error: "Don't forget your name",
  }),
  title: z.string({
    required_error: "Give your study a title",
  }),
  productDescription: z.string(),
  industry: z.string(),
  markdown: z.string().optional(),
});
