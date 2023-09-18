import { cn } from "utils"
import { GithubPullResponse } from "../../lib/api"
import { Link } from "../Links"

interface GithubPrProps {
  pull: GithubPullResponse[number]
}

export default function GithubPr({ pull }: GithubPrProps) {
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
