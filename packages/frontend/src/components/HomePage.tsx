"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { cn, startsWithFilter } from "utils";
import { Case } from "../lib/interfaces";
import { categorySelectItems } from "./CreateCase";
import LabelFilter from "./LabelFilter";
import Search from "./icons/Search";
import { Input } from "./ui/input";

interface HomeProps {
	cases: Array<Case>;
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

	const filteredData = useMemo(() => {
		const labelFilteredData = cases.filter((d) => {
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
	}, [selectedLabel, search, cases]);

	return (
		<>
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
			<div className={cn("flex", "flex-col")}>
				{filteredData.map((caseFile, index) => (
					<Link
						key={caseFile.slug}
						href={`/case/${caseFile.slug}`}
						className={cn(
							"p-6",
							"relative",
							"group",
							"hover:text-primary",
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
								"group-hover:text-primary",
							)}
						>
							<span className={cn("text-sm font-spline")}>
								<span>{index < 10 && "0"}</span>
								{index + 1}
							</span>
							<span className={cn("text-2xl", "font-otBrut")}>
								{caseFile.title}
							</span>
						</div>
						{(index + 1) % 2 === 0 && (
							<div className={cn("absolute", "inset-0", "bg-tertiary/25")} />
						)}
						<div className={cn("text-primary")}>{caseFile.author}</div>
					</Link>
				))}
			</div>
		</>
	);
}
