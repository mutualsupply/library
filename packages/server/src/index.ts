import cors from "@koa/cors";
import multer from "@koa/multer";
import { Prisma } from "@prisma/client";
import Koa, { Context } from "koa";
import bodyParser from "koa-bodyparser";
import json from "koa-json";
import logger from "koa-logger";
import Router from "koa-router";
import createCaseStudy from "./createCaseStudy";
import env from "./env";
import { PostCaseStudyRequestBody } from "./interfaces";
import Media from "./media";
import prisma from "./prismaClient";

const app = new Koa();
const router = new Router();
const upload = multer({ dest: "uploads/" });

app.use(json());
app.use(bodyParser());
app.use(logger());
app.use(cors());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(env.PORT, () => {
	console.log(`[app] running at port: ${env.PORT}`);
});

router.get("/", async (ctx, next) => {
	ctx.body = { message: "👓" };
	await next();
});

router.get("/user/:email", async (ctx, next) => {
	const { email } = ctx.params;
	const user = await prisma.user.findUnique({ where: { email } });
	ctx.body = user;
	await next();
});

router.get("/draft/:email", async (ctx, next) => {
	const { email } = ctx.params;
	const user = await prisma.user.upsert({
		where: { email },
		create: { email },
		update: {},
	});
	const drafts = await prisma.caseStudy.findMany({
		where: { userId: user.id },
		orderBy: { createdAt: "desc" },
	});

	ctx.body = drafts;
	await next();
});

router.post("/draft", async (ctx, next) => {
	const { caseStudy, user } = ctx.request.body as PostCaseStudyRequestBody;
	const { email } = user;
	if (!email) {
		ctx.status = 401;
		ctx.body = "User must have an email to publish a case study";
		ctx.app.emit(
			"error",
			new Error("User must have an email to publish a case study"),
			ctx,
		);
		return await next();
	}

	const dbUser = await prisma.user.upsert({
		where: { email },
		update: {},
		create: { email },
	});
	const drafts = await prisma.caseStudy.create({
		data: {
			userId: dbUser.id,
			content: caseStudy as unknown as Prisma.InputJsonValue,
		},
	});
	ctx.body = drafts;
	await next();
});

router.get("/status", async (ctx, next) => {
	ctx.body = { status: "ok", time: new Date() };
	await next();
});

router.post("/case-study", async (ctx, next) => {
	const { caseStudy, user, slug, signerAddress } = ctx.request
		.body as PostCaseStudyRequestBody;
	if (!user.email) {
		ctx.status = 401;
		ctx.body = "User must have an email to publish a case study";
		ctx.app.emit(
			"error",
			new Error("User must have an email to publish a case study"),
			ctx,
		);
		return await next();
	}

	const dbUser = await prisma.user.upsert({
		where: { email: user.email },
		update: {
			name: user.name,
			email: user.email,
		},
		create: {
			name: user.name,
			email: user.email,
		},
	});

	const { branchName } = createCaseStudy(user, caseStudy, slug, signerAddress);

	const dbCaseStudy = await prisma.caseStudy.create({
		data: {
			userId: dbUser.id,
			content: JSON.stringify(caseStudy),
			githubBranchName: branchName,
			signerAddress,
			slug,
		},
	});

	ctx.body = { branchName };
	await next();
});

router.post(
	"/media",
	upload.fields([{ name: "files", maxCount: 10 }]),
	async (ctx: Context, next) => {
		const validOrigins = [
			"http://localhost:3000",
			"https://dev.research.mutual.supply",
			"https://research.mutual.supply",
		];
		const origin = ctx.request.get("origin");
		if (!validOrigins.includes(origin)) {
			throw new Error("Invalid origin");
		}
		//@ts-ignore
		const files = ctx.request.files?.files;
		if (!files || !Array.isArray(files)) {
			throw new Error("No files");
		}
		const promises = files.map((file) => Media.upload(file));
		const res = await Promise.all(promises);
		console.log("res", res);
		ctx.body = res;
		await next();
	},
);

// @next: find the case study by slug & update its accepted @ time && status
router.post("/github/webhook", async (ctx, next) => {
	const body = ctx.request.body;
	console.log("github hook", body);

	// get slug from posted body on merged PR
	// update the accepted at datetime && status
	// mint an NFT of the case study to the submitter if
	// there is an address associated

	ctx.body = { status: "ok" };
	await next();
});
