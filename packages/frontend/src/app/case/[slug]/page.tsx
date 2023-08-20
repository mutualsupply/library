import { cn } from "utils"
import CasePage from "../../../components/CasePage"
import { BackLink } from "../../../components/Links"
import { getCaseFromSlug, getCases } from "../../../lib/server"

export default async function Page({ params }: { params: { slug: string } }) {
  const slug = params.slug
  const cases = getCases()
  const caseStudy = await getCaseFromSlug(slug)
  return (
    <div className={cn("grow", "flex", "flex-col")}>
      <CasePage caseStudy={caseStudy} cases={cases} />
    </div>
  )
}
