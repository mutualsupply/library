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
				<Link
					href={`https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}/pull/${draft.githubBranchName}`}
				>
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

		if (status === Status.Approved) {
			return <Link href={`/case/${draft.slug}`}>Edit</Link>;
		}

		if (status === Status.Rejected) {
			return <span>😓</span>;
		}
	}, []);

	return (
		<div
			className={cn(
				"grid grid-cols-1 space-y-2 xs:grid-cols-2 xs:space-x-1 xs:space-y-0",
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
