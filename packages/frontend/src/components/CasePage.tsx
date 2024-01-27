"use client";

import { useMemo, useState } from "react";
import { cn, objectKeys } from "utils";
import { CaseSource, CaseWithMetadata } from "../lib/interfaces";
import { categorySelectItems } from "./CreateCase";
import LabelFilter from "./LabelFilter";
import { BackLink, Link } from "./Links";
import RemoteMDX, { Banner } from "./RemoteMDX";

interface CaseProps {
	cases: Array<CaseWithMetadata>;
	caseStudy: CaseSource;
}

export default function CasePage({ cases, caseStudy }: CaseProps) {
	const [selectedCategory, setSelectedCategory] = useState<Array<string>>([
		caseStudy.category,
	]);

	const filteredCasesByType = useMemo(() => {
		if (selectedCategory.length === 0) {
			return cases;
		}
		return cases.filter((c) => selectedCategory.includes(c.category));
	}, [cases, selectedCategory]);

	const casesByFirstLetter = filteredCasesByType.reduce(
		(acc, currCase) => {
			const firstLetter = currCase.title[0].toUpperCase();
			if (!acc[firstLetter]) {
				acc[firstLetter] = [];
			}
			acc[firstLetter].push(currCase);
			return acc;
		},
		{} as Record<string, CaseWithMetadata[]>,
	);

	const onLabelFilterClick = (label: string) => {
		if (selectedCategory?.includes(label)) {
			setSelectedCategory(selectedCategory.filter((l) => l !== label));
		} else {
			setSelectedCategory((selectedCategory || []).concat(label));
		}
	};
	return (
		<>
			<div className={cn("mb-5", "flex", "items-center", "gap-8")}>
				<BackLink href={"/"}>Back to Index</BackLink>
				<div className={cn("hidden", "lg:block")}>
					<LabelFilter
						items={categorySelectItems}
						selected={selectedCategory}
						onClick={onLabelFilterClick}
						onClearClick={() => setSelectedCategory([])}
					/>
				</div>
			</div>
			<div className={cn("flex", "grow", "gap-10", "mt-12")}>
				<div
					className={cn(
						"max-w-[320px]",
						"w-full",
						"flex-col",
						"gap-2",
						"hidden lg:flex",
						"pr-6",
						"pl-4",
					)}
				>
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
											className={cn("text-black no-underline", {
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
						"lg:col-span-10",
						"col-span-12",
						"relative",
						"grow",
						"flex",
						"flex-col",
						"min-h-0",
					)}
				>
					<div
						className={cn(
							"absolute",
							"-right-[14px]",
							// Note: these values correspond to layout padding
							"w-[calc(100%+32px)]",
							"h-[calc(100%+16px)]",
							"bg-gradient-to-t",
							"from-tertiary/50",
							"to-transparent",
							"hidden",
							"lg:block",
						)}
					/>
					<div
						className={cn(
							"z-10",
							"relative",
							"overflow-y-scroll",
							"h-0",
							"grow",
							"pr-4",
							"max-w-[780px]",
						)}
					>
						<RemoteMDX
							serialized={caseStudy.serialized}
							banner={<Banner caseStudy={caseStudy} />}
						/>
					</div>
				</div>
			</div>
		</>
	);
}
