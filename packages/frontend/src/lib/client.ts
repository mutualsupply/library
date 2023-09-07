import { Case, StudyType } from "./interfaces"

export const caseTypeFilterItems = Object.values(StudyType).map((title) => ({
  title,
  key: title,
}))
