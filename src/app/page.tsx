import fs from "fs";
import path from "path";
import { cn } from "utils";
import BackLink from "../components/BackLink";
import CreateCaseStudyButton from "../components/CreateCaseStudyButton";
import { HomePage } from "../components/HomePage";
import { Case } from "../lib/interfaces";
import { getCase } from "../lib/server";

export default function Page() {
  // const cases = use(getCases());
  const dir = path.join(process.cwd(), "src/markdown");
  const filenames = fs.readdirSync(dir);
  const cases: Array<Case> = filenames.map((filename) =>
    getCase(dir, filename)
  );
  return (
    <div>
      <div className={cn("flex", "justify-between", "items-center")}>
        <BackLink href={"https://mutual.supply"}>Resources</BackLink>
        <CreateCaseStudyButton />
      </div>
      <HomePage cases={cases} />
    </div>
  );
}
