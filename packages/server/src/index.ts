import Koa from "koa";
import json from "koa-json";
import logger from "koa-logger";
import Router from "koa-router";
import env from "./env";

const app = new Koa();
const router = new Router();

router.get("/", async (ctx, next) => {
  ctx.body = { message: "hello world" };
  await next();
});

app.use(json());
app.use(logger());
app.use(router.routes()).use(router.allowedMethods());

app.listen(env.PORT, () => {
  console.log(`server is running at ${env.PORT}`);
});
