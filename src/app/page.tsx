"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { cn } from "utils";
import BackLink from "../components/backLink";
import CreateCaseStudyButton from "../components/createCaseStudyButton";
import { getCases } from "../services/api";

export default function Page() {
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["getCases"],
    queryFn: getCases,
  });
  return (
    <div>
      <div className={cn("flex", "justify-between", "items-center")}>
        <BackLink href={"https://mutual.supply"}>Resources</BackLink>
        <CreateCaseStudyButton />
      </div>
      <div className={cn("flex", "flex-col", "mt-6")}>
        {isLoading && (
          <div className={cn("flex", "flex-col", "gap-0", "opacity-50")}>
            {new Array(6).fill(0).map((_, index) => (
              <div
                key={`loader-${index}`}
                className={cn(
                  "bg-[#f5f5f4]",
                  "animate-pulse",
                  "h-[84px]",
                  "w-full",
                  { "bg-[#D1E9FA]": (index + 1) % 2 === 0 }
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
              className={cn("p-6", "relative", "hover:underline", "group")}
            >
              <div
                className={cn(
                  "z-20",
                  "inline-flex",
                  "gap-4",
                  "items-center",
                  "relative",
                  "group-hover:underline"
                )}
              >
                <span className={cn("text-sm")}>{index + 1}</span>
                <span className={cn("text-3xl")}>{caseFile.slug}</span>
              </div>
              {(index + 1) % 2 === 0 && (
                <div
                  className={cn(
                    "absolute",
                    "inset-0",
                    "bg-[#D1E9FA]",
                    "opacity-40"
                  )}
                />
              )}
            </Link>
          ))}
      </div>
    </div>
  );
}
