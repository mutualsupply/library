"use client";

import { cn } from "utils";
import BackLink from "../../../components/BackLink";
import CreateCaseStudyButton from "../../../components/CreateCaseStudyButton";

export default function RemoteCaseLayout({
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
      <div className={cn("grid", "grid-cols-12", "grow")}>
        <div className={cn("col-span-2")}>
          <div>wow</div>
          <div>wow</div>
          <div>wow</div>
          <div>wow</div>
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
            {children}
          </div>
          <div className={cn("col-span-3", "relative")}>
            <div
              className={cn(
                "border",
                "border-tertiary",
                "p-3",
                "relative",
                "left-[34px]"
              )}
            >
              <div className={cn("grid", "grid-cols-6")}>
                <div className={cn("col-span-2")}>AUTHOR:</div>
                <div className={cn("underline", "col-span-4")}>NAME</div>
              </div>
              <div className={cn("grid", "grid-cols-6")}>
                <div className={cn("col-span-2")}>CREATED:</div>
                <div className={cn("col-span-4")}>
                  {new Date().toDateString()}
                </div>
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
    </div>
  );
}
