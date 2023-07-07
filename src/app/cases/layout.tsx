"use client";

import { cn } from "utils";
import BackLink from "../../components/BackLink";
import CreateCaseStudyButton from "../../components/CreateCaseStudyButton";

export default function CasesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className={cn("flex", "justify-between", "items-center")}>
        <BackLink href={"/"}>Library</BackLink>
        <CreateCaseStudyButton />
      </div>
      <div className={cn("my-4")}>LABELS HERE</div>
      <div className={cn("grid", "grid-cols-8")}>
        <div className={cn("col-span-2")}></div>
        <div className={cn("max-w-full", "prose", "col-span-6")}>
          {children}
        </div>
      </div>
    </div>
  );
}
