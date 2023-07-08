import { cn } from "utils";
import BackLink from "../components/BackLink";
import CreateCaseStudyButton from "../components/CreateCaseStudyButton";
import { HomeSearch } from "../components/HomeSearch";

async function getCases(): Promise<Array<{ filename: string; slug: string }>> {
  const res = await fetch("http://localhost:3000/api/case");
  if (!res.ok) {
    throw new Error("Failed to fetch cases");
  }
  return res.json();
}

export default async function Page() {
  const data = await getCases();
  return (
    <div>
      <div className={cn("flex", "justify-between", "items-center")}>
        <BackLink href={"https://mutual.supply"}>Resources</BackLink>
        <CreateCaseStudyButton />
      </div>
      <HomeSearch data={data} />
    </div>
  );
}
