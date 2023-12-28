"use client";

import { MDXEditorMethods } from "@mdxeditor/editor";
import dynamic from "next/dynamic";
import { forwardRef } from "react";
import { InitializedMDXEditorProps } from "./InitializedMDXEditor";

// ForwardRefEditor.tsx

// This is the only place InitializedMDXEditor is imported directly.
const Editor = dynamic(() => import("./InitializedMDXEditor"), {
	// Make sure we turn SSR off
	ssr: false,
});

// This is what is imported by other components. Pre-initialized with plugins, and ready
// to accept other props, including a ref.
export const MarkdownEditor = forwardRef<
	MDXEditorMethods,
	InitializedMDXEditorProps
>((props, ref) => <Editor {...props} editorRef={ref} />);

// TS complains without the following line
MarkdownEditor.displayName = "MarkdownEditor";
