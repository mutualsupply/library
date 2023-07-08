import fs from "fs";
import { serialize } from "next-mdx-remote/serialize";
import path from "path";
import { cn } from "utils";
import BackLink from "../../../components/BackLink";
import CasePage from "../../../components/CasePage";
import CreateCaseStudyButton from "../../../components/CreateCaseStudyButton";
import { Case } from "../../../lib/interfaces";
import { getCase } from "../../../lib/server";

export default async function Page({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  // const cases = use(getCases());
  const dir = path.join(process.cwd(), "src/markdown");
  const filenames = fs.readdirSync(dir);
  const cases: Array<Case> = filenames.map((filename) =>
    getCase(dir, filename)
  );
  const filename = `${slug}.mdx`;
  const caseFile = getCase(path.join(process.cwd(), "src/markdown"), filename);
  const serialized = await serialize(caseFile.source, {
    parseFrontmatter: true,
  });
  // const caseStudy = use(getCaseSource(slug));
  return (
    <div className={cn("grow", "flex", "flex-col")}>
      <div className={cn("flex", "justify-between", "items-center")}>
        <BackLink href={"/"}>Library</BackLink>
        <CreateCaseStudyButton />
      </div>
      <CasePage caseStudy={{ ...caseFile, serialized }} cases={cases} />
    </div>
  );
}
