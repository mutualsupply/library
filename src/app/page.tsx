import { use } from "react";
import { cn } from "utils";
import BackLink from "../components/BackLink";
import CreateCaseStudyButton from "../components/CreateCaseStudyButton";
import { HomeSearch } from "../components/HomeSearch";
import { getCases } from "../lib/api";

export default function Page() {
  const data = use(getCases());
  return (
    <div>
      <div className={cn("flex", "justify-between", "items-center")}>
        <BackLink href={"https://mutual.supply"}>Resources</BackLink>
        <CreateCaseStudyButton />
      </div>
      <HomeSearch cases={data} />
    </div>
  );
}
