import child from "child_process";
import Koa, { Context } from "koa";
import bodyParser from "koa-bodyparser";
import json from "koa-json";
import logger from "koa-logger";
import Router from "koa-router";
import env from "./env";
import { CaseStudy, GithubUser, PostCaseStudyRequestBody } from "./interfaces";

const app = new Koa();
const router = new Router();

const run = (cmd: string) => {
  return child.execSync(cmd, { stdio: "inherit" });
};

const createCaseStudy = (user: GithubUser, caseStudy: CaseStudy) => {
  console.log("writing case study submitted by", user.email);
  const branchName = `robot/mutual-supply-${Date.now()}`;
  const dirName = `/tmp/new-study-${Date.now()}`;
  const pathToFrontendPackage = `${dirName}/site/packages/frontend`;
  run(`mkdir ${dirName}`);
  run(`git clone git@github.com:mutualsupply/site.git ${dirName}/site`);
  let markdown = `
# ${caseStudy.title}
### by ${caseStudy.name} (${caseStudy.email})

${caseStudy.productDescription}
${caseStudy.industry}
Uses a blockchain: ${caseStudy.doesUseChain ? "Yes" : "No"}
Author is part of the team: ${caseStudy.partOfTeam ? "Yes" : "No"}
  `;
  if (caseStudy.url) {
    markdown += `\n[${caseStudy.url}](${caseStudy.url})`;
  }
  if (caseStudy.markdown) {
    markdown += `\n${caseStudy.markdown}`;
  }

  run(
    `echo "${markdown}" > ${pathToFrontendPackage}/src/markdown/mutual-supply.mdx`
  );
  run(`cd ${dirName}/site && git status`);
  run(`cd ${dirName}/site && git branch ${branchName}`);
  run(`cd ${dirName}/site && git checkout ${branchName}`);
  run(`cd ${dirName}/site && git add .`);
  run(
    `cd ${dirName}/site && git commit -m 'testing' --author "${user.name} <${user.email}>" `
  );
  run(`cd ${dirName}/site && git push origin -u ${branchName}`);
  run(`rm -rf ${dirName}`);
  return {
    branchName,
  };
};

router.get("/status", async (ctx, next) => {
  ctx.body = { message: "🍎" };
  await next();
});

router.post("/case-study", async (ctx: Context, next) => {
  const { caseStudy, user } = ctx.request.body as PostCaseStudyRequestBody;
  if (!user.email) {
    ctx.status = 401;
    ctx.body = "User must have an email to publish a case study";
    ctx.app.emit(
      "error",
      new Error("User must have an email to publish a case study"),
      ctx
    );
  } else {
    const { branchName } = createCaseStudy(user, caseStudy);
    ctx.body = { branchName };
    await next();
  }
});

app.use(json());
app.use(bodyParser());
app.use(logger());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(env.PORT, () => {
  console.log(`server is running at ${env.PORT}`);
});
