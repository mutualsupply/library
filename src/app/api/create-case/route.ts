import child from "child_process";
import { NextResponse } from "next/server";

const run = (cmd: string) => {
  return child.execSync(cmd, { stdio: "inherit" });
};

const createCaseStudy = (castStudy?: any) => {
  const branchName = `robot/mutual-supply-${Date.now()}`;
  const dirName = "new-study";
  run(`mkdir ${dirName}`);
  run(`git clone git@github.com:mutualsupply/site.git ${dirName}/site`);
  run(
    `echo "# MUTUAL SUPPLY\n ## MUTUAL SUPPLY\n ### MUTUAL SUPPLY" > ${dirName}/site/src/markdown/mutual-supply.mdx`
  );
  run(`cd ${dirName}/site && git status`);
  run(`cd ${dirName}/site && git branch ${branchName}`);
  run(`cd ${dirName}/site && git checkout ${branchName}`);
  run(`cd ${dirName}/site && git add .`);
  run(`cd ${dirName}/site && git commit -m 'add a test file'`);
  run(`cd ${dirName}/site && git push origin ${branchName}`);
  run(`rm -rf ${dirName}`);
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
