"use client";

import { MDXRemote } from "next-mdx-remote";
import React from "react";

async function getPage(slug: string) {
  const res = await fetch("http://localhost:3000/api/remote-case/" + slug);
  if (!res.ok) {
    throw new Error("Failed to fetch case");
  }
  return res.json();
}

export default async function Page({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const { source } = await getPage(slug);
  return (
    <React.Fragment>
      <MDXRemote {...(source as any)} />
    </React.Fragment>
  );
}
