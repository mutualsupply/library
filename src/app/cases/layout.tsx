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
      <div className={cn("max-w-full", "prose", "mt-6")}>{children}</div>
    </div>
  );
}
