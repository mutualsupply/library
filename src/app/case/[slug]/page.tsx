"use client";

import { useQuery } from "@tanstack/react-query";
import { MDXRemote } from "next-mdx-remote";
import React from "react";
import { getMDXSource } from "../../../services/api";

export default function Page({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const { data, isLoading } = useQuery({
    queryKey: ["getMDXSource"],
    queryFn: () => getMDXSource(slug as string),
  });
  return (
    <React.Fragment>
      {!isLoading && data?.source && <MDXRemote {...(data.source as any)} />}
      {isLoading && <div>Loading...</div>}
    </React.Fragment>
  );
}
