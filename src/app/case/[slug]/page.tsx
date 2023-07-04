"use client";

import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { useQuery } from "@tanstack/react-query";
import { MDXRemote } from "next-mdx-remote";
import Link from "next/link";
import { cn } from "utils";
import CaseStudyButton from "../../../components/CaseStudyButton";
import { getMDXSource } from "../../../services/api";

export default function Page({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const { data, isLoading } = useQuery({
    queryKey: ["getMDXSource"],
    queryFn: () => getMDXSource(slug as string),
  });
  return (
    <div>
      <div className={cn("flex", "items-center", "justify-between")}>
        <span className={cn("border-b", "border-black", "inline-block")}>
          <Link
            href={"/"}
            className={cn(
              "flex",
              "items-center",
              "gap-1",
              "text-sm",
              "no-underline"
            )}
          >
            <ArrowLeftIcon /> Library
          </Link>
        </span>
        <CaseStudyButton />
      </div>
      <div className={cn("mt-4")}>
        {!isLoading && data?.source && <MDXRemote {...(data.source as any)} />}
        {isLoading && <div>Loading...</div>}
      </div>
    </div>
  );
}
