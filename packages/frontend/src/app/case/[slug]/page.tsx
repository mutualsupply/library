import { use } from "react";
import { cn } from "utils";
import CasePage from "../../../components/CasePage";
import CreateCaseStudyButton from "../../../components/CreateCaseStudyButton";
import { BackLink } from "../../../components/Links";
import { getCaseFromSlug, getCases } from "../../../lib/server";

export default function Page({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const cases = getCases();
  const caseStudy = use(getCaseFromSlug(slug));
  return (
    <div className={cn("grow", "flex", "flex-col")}>
      <div className={cn("flex", "justify-between", "items-center")}>
        <BackLink href={"/"}>Library</BackLink>
        <CreateCaseStudyButton />
      </div>
      <CasePage caseStudy={caseStudy} cases={cases} />
    </div>
  );
}
