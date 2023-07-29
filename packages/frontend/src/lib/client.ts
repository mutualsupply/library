import { Case } from "./interfaces"

export function getCaseLabelItems(cases: Array<Case>) {
  const uniqueLabels = new Set<string>(cases.flatMap((d) => d.labels))
  return Array.from(uniqueLabels).map((label) => ({
    key: label,
    title: label,
  }))
}
