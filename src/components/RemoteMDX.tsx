"use client";

import { MDXRemote } from "next-mdx-remote";
import { cn } from "utils";

export default function RemoteMDX({ serialized }: any) {
  return (
    <MDXRemote
      components={{
        h1: ({ children }) => (
          <h1 className={cn("text-primary")}>{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className={cn("text-black", "font-aspekta", "font-light")}>
            {children}
          </h2>
        ),
      }}
      {...(serialized as any)}
    />
  );
}
