import type { MDXComponents } from "mdx/types";
import { cn } from "utils";

// @note remove if we decide on remote MDX

// This file is required to use MDX in `app` directory.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    h1: ({ children }) => <h1 className={cn("text-primary")}>{children}</h1>,
    ...components,
  };
}
