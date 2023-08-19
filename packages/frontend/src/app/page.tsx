import { cn } from "utils"
import CreateCaseStudyButton from "../components/CreateCaseStudyButton"
import { HomePage } from "../components/HomePage"
import { BackLink } from "../components/Links"
import { getCases } from "../lib/server"

export default function Page() {
  const cases = getCases()
  return (
    <HomePage cases={cases} />
  )
}
