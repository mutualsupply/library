"use client";

import { ArrowLeftIcon, PlusIcon } from "@radix-ui/react-icons";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { cn } from "utils";
import { Button } from "../components/ui/button";
import { getPulls } from "../services/api";

export default function Page() {
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["getPulls"],
    queryFn: getPulls,
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
            <PlusIcon /> new case study
          </Button>
        </Link>
      </div>
    </div>
  );
}
