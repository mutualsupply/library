import { cn } from "utils"
import { Link } from "../Links"
import { GithubPullResponse, getPulls } from "../../lib/api"

interface DraftCaseStudyProps {
  pull: GithubPullResponse[number]
}

export default function DraftCaseStudy({ pull }: DraftCaseStudyProps) {
  return (
    <div className={cn("p-4", "border", "flex", "flex-col", "gap-2")}>
      <Link
        isExternal
        href={`${pull.html_url}/files`}
        className={cn(
          "text-black",
          "font-aspekta",
          "font-light",
          "inline-flex",
          "justify-between",
          "items-center",
        )}
      >
        <span>{pull.title}</span>
      </Link>
      <div className={cn("text-primary")}>{pull.user?.login}</div>
    </div>
  )
}
