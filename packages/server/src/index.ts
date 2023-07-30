import multer from "@koa/multer"
import Koa, { Context } from "koa"
import bodyParser from "koa-bodyparser"
import json from "koa-json"
import logger from "koa-logger"
import Router from "koa-router"
import createCaseStudy from "./createCaseStudy"
import env from "./env"
import { PostCaseStudyRequestBody } from "./interfaces"

const app = new Koa()
const router = new Router()
const upload = multer({ dest: "uploads/" })

router.get("/", async (ctx, next) => {
  ctx.body = { message: "🍎" }
  await next()
})

router.get("/status", async (ctx, next) => {
  ctx.body = { status: "ok", time: new Date() }
  await next()
})

router.post("/case-study", async (ctx: Context, next) => {
  const { caseStudy, user, isProd } = ctx.request
    .body as PostCaseStudyRequestBody
  if (!user.email) {
    ctx.status = 401
    ctx.body = "User must have an email to publish a case study"
    ctx.app.emit(
      "error",
      new Error("User must have an email to publish a case study"),
      ctx,
    )
  } else {
    const { branchName } = createCaseStudy(user, caseStudy, isProd)
    ctx.body = { branchName }
    await next()
  }
})

router.post(
  "/media",
  multer.fields([{ name: "files", maxCount: 10 }]),
  async (ctx: Context, next) => {
    const origin = ctx.request.get("origin")
    console.log("origin", origin)
    //@ts-ignore
    console.log("ctx.request.files", ctx.request.files)
    // const res = await uploadMedia()
    ctx.body = { message: "got it" }
    await next()
  },
)

app.use(json())
app.use(bodyParser())
app.use(logger())
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(env.PORT, () => {
  console.log(`server is running at ${env.PORT}`)
})
