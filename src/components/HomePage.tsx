"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { cn, fuzzyFilter } from "utils";
import { getCaseLabelItems } from "../lib/client";
import { Case } from "../lib/interfaces";
import AlphaToggle from "./AlphaToggle";
import LabelFilter from "./LabelFilter";

interface HomeProps {
  cases: Array<Case>;
}

export function HomePage({ cases }: HomeProps) {
  const [selectedChar, setSelectedChar] = useState<undefined | Array<string>>();
  const [selectedLabel, setSelectedLabel] = useState<
    undefined | Array<string>
  >();
  const onAlphaToggleClick = (char: string) => {
    if (selectedChar?.includes(char)) {
      setSelectedChar(selectedChar.filter((c) => c !== char));
    } else {
      setSelectedChar((selectedChar || []).concat(char));
    }
  };
  const onLabelFilterClick = (label: string) => {
    if (selectedLabel?.includes(label)) {
      setSelectedLabel(selectedLabel.filter((l) => l !== label));
    } else {
      setSelectedLabel((selectedLabel || []).concat(label));
    }
  };

  const filteredData = useMemo(() => {
    const labelFilteredData = cases.filter((d) => {
      if (selectedLabel) {
        return selectedLabel.every((label) => d.labels.includes(label));
      }
      return true;
    });
    return fuzzyFilter(
      labelFilteredData,
      selectedChar ? selectedChar.join("") : "",
      "title"
    );
  }, [selectedLabel, selectedChar, cases]);

  return (
    <>
      <div className={cn("mt-5")}>
        <LabelFilter
          items={getCaseLabelItems(cases)}
          selected={selectedLabel}
          onClick={onLabelFilterClick}
        />
      </div>
      <div className={cn("my-10")}>
        <AlphaToggle selected={selectedChar} onClick={onAlphaToggleClick} />
      </div>
      <div className={cn("flex", "flex-col")}>
        {filteredData.map((caseFile, index) => (
          <Link
            key={caseFile.slug}
            href={`/case/${caseFile.slug}`}
            className={cn("p-6", "relative", "group", "hover:text-primary")}
          >
            <div
              className={cn(
                "z-20",
                "inline-flex",
                "gap-4",
                "items-center",
                "relative",
                "group-hover:text-primary"
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
          </Link>
        ))}
      </div>
    </>
  );
}
