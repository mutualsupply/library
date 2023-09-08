import { z } from "zod"
import { StudyType } from "./interfaces"

const MAX_TITLE_LENGTH = 200

export enum BooleanStrings {
  True = "true",
  False = "false",
}
const BooleanEnum = z.nativeEnum(BooleanStrings)

export const caseStudyFormSchema = z.object({
  type: z.enum([
    StudyType.Signal,
    StudyType.Observation,
    StudyType.Exploration,
  ]),
  name: z.string().min(1, { message: "Don't forget your name" }),
  email: z.string().email({
    message: "Email please!",
  }),
  title: z
    .string()
    .min(1, { message: "Must be named something!" })
    .max(MAX_TITLE_LENGTH, {
      message: `Keep it short, max characters: ${MAX_TITLE_LENGTH}`,
    }),
  organizationName: z
    .string()
    .min(1, { message: "Please include the name of the organization" }),
  url: z.union([z.string().url().optional(), z.literal("")]),
  industry: z.string().min(1, {
    message: "Please include which industry this product is a part of",
  }),
  partOfTeam: z.string(),
})

export const caseStudyBodySchema = caseStudyFormSchema.extend({
  markdown: z.string().optional(),
})
