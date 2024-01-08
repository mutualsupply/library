import CasePage from "../../../components/CasePage";
import HeaderLayout from "../../../components/layout/HeaderLayout";
import { getCaseFromSlug, getLocalCases } from "../../../lib/server";

export default async function Page({ params }: { params: { slug: string } }) {
	const slug = params.slug;
	const cases = getLocalCases();
	const caseStudy = await getCaseFromSlug(slug);
	return (
		<HeaderLayout>
			<CasePage caseStudy={caseStudy} cases={cases} />
		</HeaderLayout>
	);
}
