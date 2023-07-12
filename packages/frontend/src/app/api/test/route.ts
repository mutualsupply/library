import child from "child_process";
import { NextResponse } from "next/server";

const run = (cmd: string) => {
  return child.execSync(cmd, { stdio: "inherit" });
};

const createCaseStudy = (castStudy?: any) => {
  run("mkdir study");
  run("git clone git@github.com:mutualsupply/site.git study/site");
  run(
    "echo '# Something amazing\n ## really amazing' > study/site/src/markdown/something-amazing.mdx"
  );
  run("cd study/site && git status");
  run("cd study/site && git branch robot/test");
  run("cd study/site && git checkout robot/test");
  run("cd study/site && git add .");
  run("cd study/site && git commit -m 'add a test file'");
  run("cd study/site && git push origin robot/test");
  run("rm -rf study");
};

export async function GET() {
  try {
    createCaseStudy();
    return NextResponse.json({ message: "study created" });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "could not do it" }, { status: 400 });
  }
}
