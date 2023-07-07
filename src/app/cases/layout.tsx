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
    <div className={cn("grow", "flex", "flex-col")}>
      <div className={cn("flex", "justify-between", "items-center")}>
        <BackLink href={"/"}>Library</BackLink>
        <CreateCaseStudyButton />
      </div>
      <div className={cn("my-4")}>LABELS HERE</div>
      <div className={cn("grid", "grid-cols-10", "grow")}>
        <div className={cn("col-span-3")}>
          <div>wow</div>
          <div>wow</div>
          <div>wow</div>
          <div>wow</div>
        </div>
        <div
          className={cn(
            "max-w-full",
            "prose",
            "col-span-7",
            "relative",
            "grow"
          )}
        >
          <div className={cn("z-10", "relative", "p-8")}>{children}</div>
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
    </div>
  );
}
