"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { cn, startsWithFilter } from "utils";
import { CaseWithMetadata } from "../lib/interfaces";
import { categorySelectItems } from "./CreateCase";
import LabelFilter from "./LabelFilter";
import Search from "./icons/Search";
import { Input } from "./ui/input";

interface HomeProps {
	cases: Array<CaseWithMetadata>;
}

export function HomePage({ cases }: HomeProps) {
	const [search, setSearch] = useState<undefined | Array<string>>();
	const [selectedLabel, setSelectedLabel] = useState<Array<string>>([]);
	const onLabelFilterClick = (label: string) => {
		if (selectedLabel?.includes(label)) {
			setSelectedLabel(selectedLabel.filter((l) => l !== label));
		} else {
			setSelectedLabel((selectedLabel || []).concat(label));
		}
	};

	const hasCases = useMemo(() => cases.length > 0, [cases]);
	const featuredCases = useMemo(() => {
		return cases.filter((c) => c.featured);
	}, [cases]);
	const nonFeaturedCases = useMemo(() => {
		return cases.filter((c) => !c.featured);
	}, [cases]);

	const filteredData = useMemo(() => {
		const labelFilteredData = nonFeaturedCases.filter((d) => {
			if (selectedLabel.length > 0) {
				return selectedLabel.some((label) => d.category.includes(label));
			}
			return true;
		});
		return startsWithFilter(
			labelFilteredData,
			search ? search.join("") : "",
			"title",
		);
	}, [selectedLabel, search, nonFeaturedCases]);

	return (
		<>
			{hasCases && (
				<div
					className={cn(
						"mb-12",
						"mt-8",
						"md:flex",
						"items-center",
						"md:justify-end",
						"lg:justify-between",
						"gap-8",
					)}
				>
					<div className="hidden lg:block">
						<LabelFilter
							items={categorySelectItems}
							selected={selectedLabel}
							onClick={onLabelFilterClick}
							onClearClick={() => setSelectedLabel([])}
						/>
					</div>
					<Input
						value={search}
						onChange={(e) => setSearch(e.target.value.split(" "))}
						placeholder="Search"
						leftOfInput={<Search className="h-5 w-5" />}
						className="w-full md:w-96 text-sm"
					/>
				</div>
			)}
			<div className={cn("flex", "flex-col", "grow")}>
				{hasCases && (
					<>
						{featuredCases.map((caseStudy, index) => (
							<CaseStudyItem
								key={`featured-case-study-${index}`}
								index={index}
								caseStudy={caseStudy}
							/>
						))}
						{filteredData.map((caseStudy, index) => (
							<CaseStudyItem
								key={`featured-case-study-${index}`}
								index={index}
								caseStudy={caseStudy}
							/>
						))}
					</>
				)}
				{!hasCases && (
					<div className={cn("grow", "flex", "justify-center", "items-center")}>
						No thoughts found
					</div>
				)}
			</div>
		</>
	);
}

function CaseStudyItem({
	caseStudy,
	index,
}: { caseStudy: CaseWithMetadata; index: number }) {
	return (
		<Link
			key={caseStudy.slug}
			href={`/case/${caseStudy.slug}`}
			className={cn(
				"p-6",
				"relative",
				"group",
				"hover:text-white",
				"hover:bg-primary",
				"flex",
				"items-center",
				"justify-between",
				"group",
			)}
		>
			<div
				className={cn(
					"z-20",
					"inline-flex",
					"gap-4",
					"items-center",
					"relative",
				)}
			>
				{caseStudy.featured ? (
					<span className={cn("w-3 h-3 rounded-full bg-[#77F5B9]")} />
				) : (
					<span className={cn("text-sm font-spline")}>
						<span>{index < 10 && "0"}</span>
						{index + 1}
					</span>
				)}
				<span className={cn("text-2xl", "font-otBrut")}>{caseStudy.title}</span>
			</div>
			{(index + 1) % 2 === 0 && (
				<div className={cn("absolute", "inset-0", "bg-tertiary/25")} />
			)}
			<div className={cn("text-primary group-hover:text-white")}>
				{caseStudy.name}
			</div>
		</Link>
	);
}
