import { cn } from "utils"
import CasePage from "../../../components/CasePage"
import { createSlug, getCaseFromSlug, getCases } from "../../../lib/server"

export default async function Page({ params }: { params: { slug: string } }) {
  const slug = params.slug
  const cases = getCases()
  const caseStudy = await getCaseFromSlug(slug)
  const test = createSlug("mutual-supply")
  return (
    <div className={cn("grow", "flex", "flex-col")}>
      <CasePage caseStudy={caseStudy} cases={cases} />
    </div>
  )
}
