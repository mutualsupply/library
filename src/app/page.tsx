"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import { cn } from "utils";
import AlphaToggle from "../components/AlphaToggle";
import BackLink from "../components/BackLink";
import CreateCaseStudyButton from "../components/CreateCaseStudyButton";
import { getCases } from "../services/api";

export default function Page() {
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["getCases"],
    queryFn: getCases,
  });
  const [selectedChar, setSelectedChar] = useState<undefined | Array<string>>();
  return (
    <div>
      <div className={cn("flex", "justify-between", "items-center")}>
        <BackLink href={"https://mutual.supply"}>Resources</BackLink>
        <CreateCaseStudyButton />
      </div>
      <div className={cn("mt-4")}>
        <AlphaToggle
          selected={selectedChar}
          onClick={(char) => {
            if (selectedChar?.includes(char)) {
              setSelectedChar(selectedChar.filter((c) => c !== char));
            } else {
              setSelectedChar([...(selectedChar ?? []), char]);
            }
          }}
        />
      </div>
      <div className={cn("flex", "flex-col", "mt-6")}>
        {isLoading && (
          <div className={cn("flex", "flex-col", "gap-0", "opacity-50")}>
            {new Array(6).fill(0).map((_, index) => (
              <div
                key={`loader-${index}`}
                className={cn(
                  "bg-[hsl(60,5%,96%)]",
                  "animate-pulse",
                  "h-[84px]",
                  "w-full",
                  { "bg-tertiary": (index + 1) % 2 === 0 }
                )}
              />
            ))}
          </div>
        )}
        {!isLoading &&
          data?.map((caseFile, index) => (
            <Link
              key={caseFile.slug}
              href={`/cases/${caseFile.slug}`}
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
    </div>
  );
}
