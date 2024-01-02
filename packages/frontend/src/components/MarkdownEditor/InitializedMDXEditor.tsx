"use client";
import {
	BoldItalicUnderlineToggles,
	DiffSourceToggleWrapper,
	InsertImage,
	ListsToggle,
	MDXEditor,
	UndoRedo,
	diffSourcePlugin,
	headingsPlugin,
	imagePlugin,
	linkDialogPlugin,
	linkPlugin,
	listsPlugin,
	markdownShortcutPlugin,
	quotePlugin,
	thematicBreakPlugin,
	toolbarPlugin,
	type MDXEditorMethods,
	type MDXEditorProps,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import { FontBoldIcon, FontItalicIcon } from "@radix-ui/react-icons";
import type { ForwardedRef } from "react";
import { BiListOl, BiListUl } from "react-icons/bi";
import { BsFileEarmarkRichtext, BsMarkdownFill } from "react-icons/bs";
import { FaRegImage } from "react-icons/fa";
import { FaListCheck } from "react-icons/fa6";
import { GoFileDiff } from "react-icons/go";
import { GrRedo, GrUndo } from "react-icons/gr";
import { IoSettingsSharp } from "react-icons/io5";
import { MdEdit, MdFormatUnderlined } from "react-icons/md";
import { cn } from "utils";
import env from "../../lib/env";

export interface InitializedMDXEditorProps extends MDXEditorProps {
	diffMarkdown?: string;
}

export default function InitializedMDXEditor({
	editorRef,
	diffMarkdown,
	className,
	...props
}: {
	editorRef: ForwardedRef<MDXEditorMethods> | null;
} & InitializedMDXEditorProps) {
	return (
		<MDXEditor
			plugins={[
				headingsPlugin(),
				listsPlugin(),
				quotePlugin(),
				thematicBreakPlugin(),
				markdownShortcutPlugin(),
				linkPlugin(),
				linkDialogPlugin(),
				imagePlugin({ imageUploadHandler }),
				diffSourcePlugin({
					diffMarkdown,
					viewMode: "rich-text",
				}),
				toolbarPlugin({
					toolbarContents: () => (
						<>
							<BoldItalicUnderlineToggles />
							<InsertImage />
							<ListsToggle />
							<DiffSourceToggleWrapper>
								<UndoRedo />
							</DiffSourceToggleWrapper>
						</>
					),
				}),
			]}
			{...props}
			ref={editorRef}
			className={cn("border w-full max-w-full flex flex-col", className)}
			contentEditableClassName="prose max-w-full"
			iconComponentFor={(icon) => {
				switch (icon) {
					case "undo":
						return <GrUndo />;
					case "redo":
						return <GrRedo />;
					case "format_bold":
						return <FontBoldIcon />;
					case "format_italic":
						return <FontItalicIcon />;
					case "format_list_numbered":
						return <BiListOl />;
					case "format_list_bulleted":
						return <BiListUl />;
					case "format_underlined":
						return <MdFormatUnderlined />;
					case "add_photo":
						return <FaRegImage />;
					case "format_list_checked":
						return <FaListCheck />;
					case "difference":
						return <GoFileDiff />;
					case "markdown":
						return <BsMarkdownFill />;
					case "rich_text":
						return <BsFileEarmarkRichtext />;
					case "edit":
						return <MdEdit />;
					case "settings":
						return <IoSettingsSharp />;

					default:
						return <>none</>;
				}
			}}
		/>
	);
}

async function imageUploadHandler(image: File) {
	const formData = new FormData();
	formData.append("files", image);
	const res = await fetch(`${env.NEXT_PUBLIC_SERVER_BASE_URL}/media`, {
		method: "POST",
		body: formData,
	});
	if (!res.ok) {
		throw new Error("Failed to upload image");
	}
	const json = await res.json();
	return json[0];
}
