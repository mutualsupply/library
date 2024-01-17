import { Metadata } from "next";
import CasePage from "../../../components/CasePage";
import HeaderLayout from "../../../components/layout/HeaderLayout";
import { getCaseFromSlug, getLocalCases } from "../../../lib/server";

interface Params {
	params: { slug: string };
}

export default async function Page({ params }: Params) {
	const slug = params.slug;
	const cases = getLocalCases();
	const caseStudy = await getCaseFromSlug(slug);
	return (
		<HeaderLayout>
			<CasePage caseStudy={caseStudy} cases={cases} />
		</HeaderLayout>
	);
}

// or Dynamic metadata
export async function generateMetadata({ params }: Params): Promise<Metadata> {
	const slug = params.slug;
	const caseStudy = await getCaseFromSlug(slug);
	return {
		title: caseStudy.title,
		description: `by: ${caseStudy.name}`,
	};
}
