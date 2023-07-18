import child from "child_process";
import Koa, { Context } from "koa";
import bodyParser from "koa-bodyparser";
import json from "koa-json";
import logger from "koa-logger";
import Router from "koa-router";
import env from "./env";
import { PostCaseStudyRequestBody } from "./interfaces";

const app = new Koa();
const router = new Router();

const run = (cmd: string) => {
  return child.execSync(cmd, { stdio: "inherit" });
};

const createCaseStudy = (castStudy?: any) => {
  const branchName = `robot/mutual-supply-${Date.now()}`;
  const dirName = `/tmp/new-study-${Date.now()}`;
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

router.get("/status", async (ctx, next) => {
  ctx.body = { message: "mutual" };
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
    ctx.body = { caseStudy, user };
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
