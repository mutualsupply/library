"use client"
import Link from "next/link"
import { useMemo, useState } from "react"
import { cn, startsWithFilter } from "utils"
import { caseTypeFilterItems } from "../lib/client"
import { Case, StudyType } from "../lib/interfaces"
import AlphaToggle from "./AlphaToggle"
import LabelFilter from "./LabelFilter"

interface HomeProps {
  cases: Array<Case>
}

export function HomePage({ cases }: HomeProps) {
  const [selectedChar, setSelectedChar] = useState<undefined | Array<string>>()
  const [selectedLabel, setSelectedLabel] = useState<Array<StudyType>>([])
  const onAlphaToggleClick = (char: string) => {
    if (selectedChar?.includes(char)) {
      setSelectedChar(selectedChar.filter((c) => c !== char))
    } else {
      setSelectedChar((selectedChar || []).concat(char))
    }
  }
  const onLabelFilterClick = (label: StudyType) => {
    if (selectedLabel?.includes(label)) {
      setSelectedLabel(selectedLabel.filter((l) => l !== label))
    } else {
      setSelectedLabel((selectedLabel || []).concat(label))
    }
  }

  const filteredData = useMemo(() => {
    const labelFilteredData = cases.filter((d) => {
      if (selectedLabel.length > 0) {
        return selectedLabel.some((label) => d.type.includes(label))
      }
      return true
    })
    return startsWithFilter(
      labelFilteredData,
      selectedChar ? selectedChar.join("") : "",
      "title",
    )
  }, [selectedLabel, selectedChar, cases])

  return (
    <>
      <div className={cn("mb-12", "mt-8", "flex", "items-center", "gap-8")}>
        <LabelFilter
          items={caseTypeFilterItems}
          selected={selectedLabel}
          onClick={onLabelFilterClick}
          onClearClick={() => setSelectedLabel([])}
        />
      </div>
      <div className={cn("mb-10", "mt-5")}>
        <AlphaToggle selected={selectedChar} onClick={onAlphaToggleClick} />
      </div>
      <div className={cn("flex", "flex-col")}>
        {filteredData.map((caseFile, index) => (
          <Link
            key={caseFile.slug}
            href={`/case/${caseFile.slug}`}
            className={cn(
              "p-6",
              "relative",
              "group",
              "hover:text-primary",
              "flex",
              "items-center",
              "justify-between",
              "group",
            )}
          >
            <div
              className={cn(
                "z-20",
                "inline-flex",
                "gap-4",
                "items-center",
                "relative",
                "group-hover:text-primary",
              )}
            >
              <span className={cn("text-sm")}>{index + 1}</span>
              <span className={cn("text-4xl", "font-otBrut")}>
                {caseFile.title}
              </span>
            </div>
            {(index + 1) % 2 === 0 && (
              <div className={cn("absolute", "inset-0", "bg-tertiary/25")} />
            )}
            <div className={cn("hidden", "group-hover:block")}>
              {caseFile.organization}
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}
