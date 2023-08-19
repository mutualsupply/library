import { HomePage } from "../components/HomePage"
import { getCases } from "../lib/server"

export default function Page() {
  const cases = getCases()
  return <HomePage cases={cases} />
}
