"use client"

import { useMemo, useState } from "react"
import { cn, objectKeys } from "utils"
import { CaseSource, CaseWithMetadata } from "../lib/interfaces"
import { categorySelectItems } from "./CreateCase"
import LabelFilter from "./LabelFilter"
import { BackLink, Link } from "./Links"
import RemoteMDX from "./RemoteMDX"
import Website from "./icons/Website"

interface CaseProps {
  cases: Array<CaseWithMetadata>
  caseStudy: CaseSource
}

export default function CasePage({ cases, caseStudy }: CaseProps) {
  const [selectedCategory, setSelectedCategory] = useState<Array<string>>([
    caseStudy.category,
  ])

  const filteredCasesByType = useMemo(() => {
    if (selectedCategory.length === 0) {
      return cases
    }
    return cases.filter((c) => selectedCategory.includes(c.category))
  }, [cases, selectedCategory])

  const casesByFirstLetter = filteredCasesByType.reduce(
    (acc, currCase) => {
      const firstLetter = currCase.title[0].toUpperCase()
      if (!acc[firstLetter]) {
        acc[firstLetter] = []
      }
      acc[firstLetter].push(currCase)
      return acc
    },
    {} as Record<string, CaseWithMetadata[]>,
  )

  const onLabelFilterClick = (label: string) => {
    if (selectedCategory?.includes(label)) {
      setSelectedCategory(selectedCategory.filter((l) => l !== label))
    } else {
      setSelectedCategory((selectedCategory || []).concat(label))
    }
  }
  return (
    <>
      <div className={cn("mb-5", "flex", "items-center", "gap-8")}>
        <BackLink href={"/"}>Back to Index</BackLink>
        <LabelFilter
          items={categorySelectItems}
          selected={selectedCategory}
          onClick={onLabelFilterClick}
          onClearClick={() => setSelectedCategory([])}
        />
      </div>
      <div className={cn("grid", "grid-cols-12", "grow", "gap-10")}>
        <div className={cn("col-span-2", "flex", "flex-col", "gap-2")}>
          {objectKeys(casesByFirstLetter).map((firstLetter, index) => (
            <div key={`letter-${firstLetter}-${index}`}>
              <span
                className={cn(
                  "bg-tertiary",
                  "uppercase",
                  "px-3",
                  "py-2",
                  "text-xl",
                  "inline-block",
                  "font-otBrut",
                )}
              >
                {firstLetter.toUpperCase()}
              </span>
              <div className={cn("flex", "flex-col", "gap-4", "mt-2")}>
                {casesByFirstLetter[firstLetter].map((c, index) => (
                  <div
                    key={`case-${c.slug}-${index}`}
                    className={cn({
                      [cn("bg-tertiary")]: c.slug === caseStudy.slug,
                    })}
                  >
                    <Link
                      href={`/case/${c.slug}`}
                      className={cn("text-black no-underline", {
                        "hover:text-primary": c.slug !== caseStudy.slug,
                      })}
                    >
                      {c.title}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div
          className={cn(
            "max-w-full",
            "prose",
            "col-span-10",
            "relative",
            "grow",
            "grid",
            "grid-cols-12",
          )}
        >
          <div
            className={cn("z-10", "relative", "p-8", "col-span-9")}
            id="remote-markdown"
          >
            <RemoteMDX serialized={caseStudy.serialized} />
            <div
              className={cn(
                "absolute top-[110px] border border-dashed border-black w-full rounded-xl p-2 inline-flex items-center justify-between bg-background",
              )}
            >
              <span>
                Written by {caseStudy.name}{" "}
                {caseStudy.organization
                  ? `about ${caseStudy.organization} `
                  : ""}
                on{" "}
                {new Date(caseStudy.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span>
                <Link href={caseStudy.experienceUrl}>
                  <Website className={cn("text-primary w-6")} />
                </Link>
              </span>
            </div>
          </div>
          <div
            className={cn(
              "absolute",
              "inset-0",
              "w-[calc(100%+32px)]",
              "h-[calc(100%+32px)]",
              "bg-gradient-to-t",
              "from-tertiary/50",
              "to-transparent",
            )}
          />
        </div>
      </div>
    </>
  )
}
