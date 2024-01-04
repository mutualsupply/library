import CasePage from "../../../components/CasePage";
import HeaderLayout from "../../../components/layout/HeaderLayout";
import { getCaseFromSlug, getCases } from "../../../lib/server";

export default async function Page({ params }: { params: { slug: string } }) {
	const slug = params.slug;
	const cases = getCases();
	const caseStudy = await getCaseFromSlug(slug);
	return (
		<HeaderLayout>
			<CasePage caseStudy={caseStudy} cases={cases} />
		</HeaderLayout>
	);
}
