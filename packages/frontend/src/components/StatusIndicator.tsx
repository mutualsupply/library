"use client";
import Link from "next/link";
import { useCallback } from "react";
import { cn } from "utils";
import {
	GITHUB_OWNER,
	GITHUB_REPO,
	NEW_CASE_PAGE_NAME,
} from "../lib/constants";
import { DBCaseStudy } from "../lib/interfaces";
import { Button } from "./ui/button";

export enum Status {
	Draft = "draft",
	Submitted = "submitted",
	Approved = "approved",
	Rejected = "rejected",
}
export const StatusMap = {
	[Status.Draft]: {
		color: "#171712",
		text: "Draft",
	},
	[Status.Submitted]: {
		color: "#F79009",
		text: "In review",
	},
	[Status.Approved]: {
		color: "#00A181",
		text: "Accepted",
	},
	[Status.Rejected]: {
		color: "#EF4444",
		text: "Rejected",
	},
};

export interface StatusIndicatorProps {
	caseStudy: DBCaseStudy;
	showButton?: boolean;
}

export function StatusIndicator({
	caseStudy,
	showButton = true,
}: StatusIndicatorProps) {
	const { submitted, approved } = caseStudy;
	let status = Status.Approved;

	if (!submitted) {
		status = Status.Draft;
	} else if (approved === null) {
		status = Status.Submitted;
	} else if (approved === true) {
		status = Status.Approved;
	} else {
		status = Status.Rejected;
	}

	const text = StatusMap[status].text;
	const background = StatusMap[status].color;

	const renderButton = useCallback((status: Status, draft: DBCaseStudy) => {
		if (status === Status.Draft) {
			return (
				<Link href={`/${NEW_CASE_PAGE_NAME}/${draft.id}`}>
					<Button
						size="pill"
						className={cn(
							"bg-primary text-white font-aspekta text-xs w-16 py-1",
						)}
					>
						Edit
					</Button>
				</Link>
			);
		}

		if (status === Status.Submitted) {
			return (
				<ViewLink
					href={`https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}/pull/${draft.githubBranchName}`}
				/>
			);
		}

		if (status === Status.Approved) {
			return <ViewLink href={`/case/${draft.slug}`} />;
		}

		if (status === Status.Rejected) {
			return <ViewLink href={`/${NEW_CASE_PAGE_NAME}/${draft.id}`} />;
		}
	}, []);

	return (
		<div
			className={cn(
				"xs:max-w-[150px] w-full flex justify-between items-center",
			)}
		>
			<span className={cn("text-xs flex items-center")}>
				<div className={cn("inline-flex items-center gap-1")}>
					<span
						className={cn("w-2 h-2 rounded-full inline-block")}
						style={{ background }}
					/>
					<span className={cn("text-xs font-aspekta")}>{text}</span>
				</div>
			</span>
			{showButton && (
				<span className={cn("flex items-center")}>
					{renderButton(status, caseStudy)}
				</span>
			)}
		</div>
	);
}

interface ViewLinkProps {
	href: string;
}

function ViewLink({ href }: ViewLinkProps) {
	return (
		<Link href={href}>
			<Button
				size="pill"
				className={cn(
					"bg-background text-black border-black border-dashed font-aspekta text-xs w-16 py-1",
				)}
			>
				View
			</Button>
		</Link>
	);
}
