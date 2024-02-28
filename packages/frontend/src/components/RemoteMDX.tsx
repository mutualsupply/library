"use client";

import { MDXRemote, MDXRemoteProps } from "next-mdx-remote";
import { ReactNode } from "react";
import { cn } from "utils";
import { CaseSource } from "../lib/interfaces";
import { Link } from "./Links";
import Website from "./icons/Website";

export default function RemoteMDX({
	serialized,
	banner,
}: { serialized: MDXRemoteProps; banner?: ReactNode }) {
	return (
		<MDXRemote
			components={{
				h1: ({ children }) => (
					<h1
						className={cn(
							"text-primary",
							"font-otBrut",
							"text-5xl",
							"font-normal",
						)}
					>
						{children}
					</h1>
				),
				h2: ({ children }) => (
					<h2 className={cn("text-black", "font-aspekta", "font-light")}>
						{children}
					</h2>
				),
				Banner: () => banner,
			}}
			{...serialized}
		/>
	);
}

interface BannerProps {
	caseStudy: CaseSource;
}

export function Banner({ caseStudy }: BannerProps) {
	const createdAtFormatted = new Date(caseStudy.createdAt).toLocaleDateString(
		"en-US",
		{
			year: "numeric",
			month: "long",
			day: "numeric",
		},
	);
	let content = `Written by ${caseStudy.name}`;
	if (caseStudy.details) {
		content += ` about ${caseStudy.details}`;
	}
	content += ` on ${createdAtFormatted}`;
	return (
		<div
			className={cn(
				"w-full border border-dashed border-black rounded-xl p-2 inline-flex items-center justify-between bg-background mb-4",
			)}
		>
			<span>{content}</span>
			<span>
				<Link href={caseStudy.contextUrl} isExternal>
					<Website className={cn("text-primary w-6")} />
				</Link>
			</span>
		</div>
	);
}
