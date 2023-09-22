import { Session } from "next-auth"
import { isProd, isStaging } from "../../lib/env"
import { StudyType } from "../../lib/interfaces"
import { BooleanStrings } from "../../lib/schema"

export function getDefaultValues(session: Session | null) {
  if (isProd() || isStaging()) {
    return {
      email: session?.user?.email || "",
      name: session?.user?.name || "",
      organizationName: "",
      title: "",
      industry: "",
      partOfTeam: "",
      url: "",
      type: StudyType.Signal,
    }
  }
  return {
    email: session?.user?.email || "",
    name: session?.user?.name || "",
    title: "How to make a Case Study",
    organizationName: "MUTUAL",
    industry: "Knowledge",
    partOfTeam: BooleanStrings.True,
    url: "https://dev.mutual.supply",
    type: StudyType.Signal,
  }
}
