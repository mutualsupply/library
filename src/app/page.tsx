"use client";

import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { cn } from "utils";
import CaseStudyButton from "../components/CaseStudyButton";
import { getCases } from "../services/api";

export default function Page() {
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["getCases"],
    queryFn: getCases,
  });
  return (
    <div>
      <div className={cn("flex", "justify-between", "items-center")}>
        <span className={cn("border-b", "border-black", "inline-block")}>
          <Link
            href={""}
            className={cn("flex", "items-center", "gap-1", "text-sm")}
          >
            <ArrowLeftIcon /> Library Resources
          </Link>
        </span>
        <Link href={"new-case-study"}>
          <CaseStudyButton />
        </Link>
      </div>
      <div className={cn("flex", "flex-col", "mt-6")}>
        {data?.map((caseFile, index) => (
          <Link
            key={caseFile.slug}
            href={`/case/${caseFile.slug}`}
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
