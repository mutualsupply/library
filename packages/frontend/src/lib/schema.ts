import { z } from "zod";

const MAX_TITLE_LENGTH = 200;

export enum BooleanStrings {
  True = "true",
  False = "false",
}
const BooleanEnum = z.nativeEnum(BooleanStrings);

export const caseStudyFormSchema = z.object({
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
  productDescription: z
    .string()
    .min(1, { message: "Please include a description of the product" }),
  industry: z.string().min(1, {
    message: "Please include which industry this product is a part of",
  }),
  doesUseChain: BooleanEnum,
  partOfTeam: BooleanEnum,
  url: z.union([z.string().url().optional(), z.literal("")]),
});

export const caseStudyBodySchema = caseStudyFormSchema.extend({
  partOfTeam: z.boolean(),
  doesUseChain: z.boolean(),
  markdown: z.string().optional(),
});
