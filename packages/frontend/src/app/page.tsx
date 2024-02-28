import { Metadata } from "next";
import { HomePage } from "../components/HomePage";
import HeaderLayout from "../components/layout/HeaderLayout";
import { CaseWithMetadata } from "../lib/interfaces";
import { getLocalCases } from "../lib/server";
import ServerClient from "../lib/serverClient";

export const metadata: Metadata = {
	title: "LIBRARY",
	description: "Mutual Supply",
};

export default async function Page() {
	let localCases: Array<CaseWithMetadata> = [];
	try {
		localCases = getLocalCases();
	} catch (_) {}
	const remoteCases = await ServerClient.getCases();
	const featuredSlugs = remoteCases
		.filter((c) => c.featured)
		.map((c) => c.slug);
	for (const caseStudy of localCases) {
		if (featuredSlugs.includes(caseStudy.slug)) {
			caseStudy.featured = true;
		}
	}
	localCases.sort((a, b) => {
		if (a.featured && !b.featured) {
			return -1;
		}
		if (!a.featured && b.featured) {
			return 1;
		}
		return 0;
	});
	return (
		<HeaderLayout>
			<HomePage cases={localCases} />
		</HeaderLayout>
	);
}

export const dynamic = "force-dynamic";
