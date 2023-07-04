"use client";

import Link from "next/link";
import { AiOutlinePlus } from "react-icons/ai";
import { TfiArrowLeft } from "react-icons/tfi";
import { cn } from "utils";
import { Button } from "../components/ui/button";

export default function Page() {
  return (
    <div>
      <div className={cn("flex", "justify-between", "items-center", "mt-2")}>
        <span className={cn("border-b", "border-black")}>
          <Link
            href={""}
            className={cn("flex", "items-center", "gap-1", "text-sm")}
          >
            <TfiArrowLeft size={14} /> Resources
          </Link>
        </span>
        <Button
          variant={"outline"}
          className={cn(
            "text-sm",
            "flex",
            "items-center",
            "gap-1",
            "uppercase"
          )}
        >
          <AiOutlinePlus size={14} /> new case study
        </Button>
      </div>
    </div>
  );
}
