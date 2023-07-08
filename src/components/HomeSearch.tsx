"use client";
import Link from "next/link";
import { useState } from "react";
import { cn, fuzzyFilter } from "utils";
import AlphaToggle from "./AlphaToggle";

interface HomeSearchProps {
  data: Array<{ filename: string; slug: string }>;
}

export function HomeSearch({ data }: HomeSearchProps) {
  const [selectedChar, setSelectedChar] = useState<undefined | Array<string>>();
  return (
    <>
      <div className={cn("mt-4")}>
        <AlphaToggle
          selected={selectedChar}
          onClick={(char) => {
            if (selectedChar?.includes(char)) {
              setSelectedChar(selectedChar.filter((c) => c !== char));
            } else {
              setSelectedChar((selectedChar || []).concat(char));
            }
          }}
        />
      </div>
      <div className={cn("flex", "flex-col", "mt-6")}>
        {data &&
          fuzzyFilter(
            selectedChar ? selectedChar.join("") : "",
            data,
            "filename"
          ).map((caseFile, index) => (
            <Link
              key={caseFile.slug}
              // href={`/cases/${caseFile.slug}`}
              href={`/remote-case/${caseFile.slug}`}
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
                <span className={cn("text-3xl")}>{caseFile.slug}</span>
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
