"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { cn, objectKeys } from "utils";
import { caseTypeFilterItems } from "../lib/client";
import { Case, CaseSource, StudyType } from "../lib/interfaces";
import LabelFilter from "./LabelFilter";
import { BackLink } from "./Links";
import RemoteMDX from "./RemoteMDX";

interface CaseProps {
	cases: Array<Case>;
	caseStudy: CaseSource;
}

export default function CasePage({ cases, caseStudy }: CaseProps) {
	const [selectedType, setSelectedType] = useState<Array<StudyType>>([
		caseStudy.type,
	]);

	const filteredCasesByType = useMemo(() => {
		if (selectedType.length === 0) {
			return cases;
		}
		return cases.filter((c) => selectedType.includes(c.type));
	}, [cases, selectedType]);

	const casesByFirstLetter = filteredCasesByType.reduce(
		(acc, currCase) => {
			const firstLetter = currCase.title[0].toUpperCase();
			if (!acc[firstLetter]) {
				acc[firstLetter] = [];
			}
			acc[firstLetter].push(currCase);
			return acc;
		},
		{} as Record<string, Case[]>,
	);

	const onLabelFilterClick = (label: StudyType) => {
		if (selectedType?.includes(label)) {
			setSelectedType(selectedType.filter((l) => l !== label));
		} else {
			setSelectedType((selectedType || []).concat(label));
		}
	};
	return (
		<>
			<div className={cn("my-5", "flex", "items-center", "gap-8")}>
				<BackLink href={"/"}>Index</BackLink>
				<LabelFilter
					items={caseTypeFilterItems}
					selected={selectedType}
					onClick={onLabelFilterClick}
					onClearClick={() => setSelectedType([])}
				/>
			</div>
			<div className={cn("grid", "grid-cols-12", "grow")}>
				<div className={cn("col-span-2", "flex", "flex-col", "gap-2")}>
					{objectKeys(casesByFirstLetter).map((firstLetter, index) => (
						<div key={`letter-${firstLetter}-${index}`}>
							<span
								className={cn(
									"bg-tertiary",
									"uppercase",
									"px-3",
									"py-2",
									"text-xl",
									"inline-block",
									"font-otBrut",
								)}
							>
								{firstLetter.toUpperCase()}
							</span>
							<div className={cn("flex", "flex-col", "gap-4", "mt-2")}>
								{casesByFirstLetter[firstLetter].map((c, index) => (
									<div
										key={`case-${c.slug}-${index}`}
										className={cn({
											[cn("bg-tertiary")]: c.slug === caseStudy.slug,
										})}
									>
										<Link
											href={`/case/${c.slug}`}
											className={cn({
												"hover:text-primary": c.slug !== caseStudy.slug,
											})}
										>
											{c.title}
										</Link>
									</div>
								))}
							</div>
						</div>
					))}
				</div>
				<div
					className={cn(
						"max-w-full",
						"prose",
						"col-span-10",
						"relative",
						"grow",
						"grid",
						"grid-cols-12",
					)}
				>
					<div className={cn("z-10", "relative", "p-8", "col-span-9")}>
						<RemoteMDX serialized={caseStudy.serialized} />
					</div>
					<div className={cn("col-span-3", "relative")}>
						<div
							className={cn(
								"border",
								"border-black",
								"border-dashed",
								"p-8",
								"relative",
								"left-[34px]",
								"flex",
								"flex-col",
								"gap-6",
							)}
						>
							<Label title="Author" underline>
								{caseStudy.author}
							</Label>
							<Label title="Organization" underline>
								{caseStudy.organization}
							</Label>
							{caseStudy.address && (
								<Label title="Address">{caseStudy.address}</Label>
							)}
							<Label title="Submitted">
								{new Date(caseStudy.submittedOn).toLocaleString("en-US", {
									month: "short",
									day: "numeric",
									year: "numeric",
								})}
							</Label>
						</div>
					</div>
					<div
						className={cn(
							"absolute",
							"inset-0",
							"w-[calc(100%+32px)]",
							"h-[calc(100%+32px)]",
							"bg-gradient-to-t",
							"from-tertiary/50",
							"to-transparent",
						)}
					/>
				</div>
			</div>
		</>
	);
}

const Label = ({
	title,
	children,
	underline = false,
}: { title?: string; children: string; underline?: boolean }) => {
	return (
		<div className={cn("flex", "items-center", "gap-1")}>
			<div>{title}:</div>
			<div className={cn({ underline: underline })}>{children}</div>
		</div>
	);
};
