"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { cn } from "utils";
import { getCaseLabelItems } from "../lib/client";
import { Case, CaseSource } from "../lib/interfaces";
import LabelFilter from "./LabelFilter";
import RemoteMDX from "./RemoteMDX";

interface CaseProps {
  cases: Array<Case>;
  caseStudy: CaseSource;
}

export default function CasePage({ cases, caseStudy }: CaseProps) {
  const [selectedLabel, setSelectedLabel] = useState<undefined | Array<string>>(
    caseStudy.labels
  );
  const firstLetterOfTitles = useMemo(() => {
    const selectedCases = cases.filter((caseStudy) => {
      if (!selectedLabel || selectedLabel.length === 0) {
        return true;
      }
      return caseStudy.labels.some((label) => selectedLabel.includes(label));
    });
    const firstLetters = selectedCases.map((c) => c.title[0].toUpperCase());
    const uniqueLetters = Array.from(new Set(firstLetters));
    return uniqueLetters.sort();
  }, [cases, selectedLabel]);
  const labelFilterItems = getCaseLabelItems(cases);
  return (
    <>
      <div className={cn("my-5")}>
        <LabelFilter
          items={labelFilterItems}
          selected={selectedLabel}
          onClick={(label) => {
            if (selectedLabel?.includes(label)) {
              setSelectedLabel(selectedLabel.filter((l) => l !== label));
            } else {
              setSelectedLabel((selectedLabel || []).concat(label));
            }
          }}
        />
      </div>
      <div className={cn("grid", "grid-cols-12", "grow")}>
        <div className={cn("col-span-2", "flex", "flex-col", "gap-2")}>
          {firstLetterOfTitles.map((letter) => (
            <div key={`letter-${letter}`}>
              <span
                className={cn(
                  "bg-tertiary",
                  "uppercase",
                  "px-3",
                  "py-2",
                  "text-xl",
                  "inline-block"
                )}
              >
                {letter}
              </span>
              <div className={cn("flex", "flex-col", "gap-4", "mt-2")}>
                {cases
                  .filter((c) => c.title[0].toUpperCase() === letter)
                  .map((c) => (
                    <div
                      key={`case-${c.slug}`}
                      className={cn({
                        [cn("bg-tertiary")]: c.slug === caseStudy.slug,
                      })}
                    >
                      <Link
                        href={`/case/${c.slug}`}
                        className={cn({
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
            "grid-cols-12"
          )}
        >
          <div className={cn("z-10", "relative", "p-8", "col-span-9")}>
            <RemoteMDX serialized={caseStudy.serialized} />
          </div>
          <div className={cn("col-span-3", "relative")}>
            <div
              className={cn(
                "border",
                "border-tertiary",
                "p-3",
                "relative",
                "left-[34px]",
                "flex",
                "flex-col",
                "gap-6"
              )}
            >
              <div className={cn("grid", "md:grid-cols-6", "grid-cols-1")}>
                <div className={cn("col-span-2")}>AUTHOR:</div>
                <div
                  className={cn(
                    "underline",
                    "col-span-4",
                    "font-aspekta",
                    "font-light"
                  )}
                >
                  NAME
                </div>
              </div>
              <div className={cn("grid", "grid-cols-6")}>
                <div className={cn("col-span-2")}>CREATED:</div>
                <div className={cn("col-span-4", "font-aspekta", "font-light")}>
                  {new Date().toDateString()}
                </div>
              </div>
              <div className={cn("flex", "items-center", "flex-wrap", "gap-4")}>
                {caseStudy.labels.map((label) => (
                  <div key={label} className={cn("relative")}>
                    <div
                      className={cn("relative", "z-10", "px-2", "rounded-sm")}
                    >
                      {label}
                    </div>
                    <div
                      className={cn(
                        "bg-g",
                        "absolute",
                        "inset-0",
                        "w-full",
                        "h-full",
                        "opacity-60",
                        "rounded-sm"
                      )}
                    />
                  </div>
                ))}
              </div>
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
              "to-transparent"
            )}
          />
        </div>
      </div>
    </>
  );
}
