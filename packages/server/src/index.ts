import cors from "@koa/cors";
import multer from "@koa/multer";
import {
	PullRequestClosedEvent,
	PullRequestOpenedEvent,
	PushEvent,
} from "@octokit/webhooks-types";
import { Prisma } from "@prisma/client";
import Koa, { Context } from "koa";
import bodyParser from "koa-bodyparser";
import json from "koa-json";
import logger from "koa-logger";
import Router from "koa-router";
import { createSlug, upsertUser } from "./lib/caseStudy";
import createCaseStudy from "./lib/createCaseStudy";
import env from "./lib/env";
import { PostCaseStudyRequestBody } from "./lib/interfaces";
import Media from "./lib/media";
import prisma from "./lib/prismaClient";

const app = new Koa();
const router = new Router();
const upload = multer({ dest: "uploads/" });

const allowedOrigins = [
	"http://localhost:3000",
	"https://dev.research.mutual.supply",
	"https://research.mutual.supply",
];

function isAuthed(ctx: Context) {
	const { authorization } = ctx.request.header;
	if (authorization && !Array.isArray(authorization)) {
		const bearer = authorization.split(" ")[1];
		return bearer === env.API_KEY;
	}
	return false;
}

function authMiddleware(ctx: Context, next: () => Promise<unknown>) {
	if (!isAuthed(ctx)) {
		ctx.status = 401;
		ctx.body = "Unauthorized";
		ctx.app.emit("error", new Error("Unauthorized"), ctx);
		return;
	}
	return next();
}

app.use(json());
app.use(bodyParser());
app.use(logger());
app.use(
	cors({
		origin: (ctx) => {
			if (
				ctx.request.header.origin &&
				allowedOrigins.includes(ctx.request.header.origin)
			) {
				return ctx.request.header.origin;
			}
			return "";
		},
	}),
);
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(env.PORT, () => {
	console.log(`[app] running at port: ${env.PORT}`);
});

// PUBLIC ENDPOINTS
router.get("/", async (ctx, next) => {
	ctx.body = { message: "👓" };
	await next();
});

router.get("/status", async (ctx, next) => {
	ctx.body = { status: "ok", time: new Date() };
	await next();
});

router.get("/cases", async (ctx, next) => {
	const cases = await prisma.caseStudy.findMany({
		where: { submitted: true, approved: true },
		orderBy: { createdAt: "desc" },
	});

	ctx.body = cases;
	await next();
});

router.post(
	"/media",
	upload.fields([{ name: "files", maxCount: 10 }]),
	async (ctx: Context, next) => {
		// @ts-expect-error
		const files = ctx.request.files?.files;
		if (!files || !Array.isArray(files)) {
			throw new Error("No files");
		}
		const promises = files.map((file) => Media.upload(file));
		const res = await Promise.all(promises);
		ctx.body = res;
		await next();
	},
);

// @next: find the case study by slug & update its accepted @ time && status
router.post("/github/webhook", async (ctx, next) => {
	const body = ctx.request.body as
		| PullRequestOpenedEvent
		| PullRequestClosedEvent
		| PushEvent;

	console.log("github hook");
	console.log(body);

	// Update the status of the case study
	if ("action" in body) {
		if (body.action === "closed") {
			const approved = body.pull_request.merged;
			const branchName = body.pull_request.head.ref;
			const slug = branchName.split("/")[1];

			const caseStudy = await prisma.caseStudy.update({
				where: { slug },
				data: {
					approved,
					approvedAt: approved ? new Date() : null,
				},
			});

			if (approved && caseStudy.signerAddress) {
				// Mint an NFT if there is address associated with the case study
				console.log(
					`TODO: mint NFT to ${caseStudy.signerAddress} for case study id: ${caseStudy.id}`,
				);
			}
		}
	}

	ctx.body = { status: "ok" };
	await next();
});

// PRIVATE ENDPOINTS
router.post("/draft", authMiddleware, async (ctx, next) => {
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

	const dbUser = await upsertUser(user);
	const draft = await prisma.caseStudy.create({
		data: {
			userId: dbUser.id,
			content: caseStudy as unknown as Prisma.InputJsonValue,
			submitted: false,
		},
	});
	ctx.body = draft;
	await next();
});

router.get("/user/:email", authMiddleware, async (ctx, next) => {
	const { email } = ctx.params;
	const user = await prisma.user.findUnique({ where: { email } });
	if (!user) {
		ctx.status = 404;
		ctx.body = "User not found";
		ctx.app.emit("error", new Error("User not found"), ctx);
		return await next();
	}
	const cases = await prisma.caseStudy.findMany({
		where: { userId: user.id },
		orderBy: { createdAt: "desc" },
	});
	ctx.body = {
		user,
		cases,
	};
	await next();
});

router.get("/cases/:email", authMiddleware, async (ctx, next) => {
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

router.post("/draft/update/:id", authMiddleware, async (ctx, next) => {
	const { id } = ctx.params;
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

	const draft = await prisma.caseStudy.findFirst({
		where: { id: Number(id), user: { email } },
	});

	if (!draft) {
		ctx.status = 404;
		ctx.body = "Draft not found";
		ctx.app.emit("error", new Error("Draft not found"), ctx);
		return await next();
	}

	const updatedDraft = await prisma.caseStudy.update({
		where: { id: Number(id) },
		data: {
			content: caseStudy as unknown as Prisma.InputJsonValue,
		},
	});

	ctx.body = updatedDraft;
	await next();
});

router.post("/case-study", authMiddleware, async (ctx, next) => {
	const { caseStudy, user, signerAddress, id } = ctx.request
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

	const dbUser = await upsertUser(user);

	if (id) {
		const draft = await prisma.caseStudy.findFirst({
			where: { id: Number(id), user: { id: dbUser.id } },
		});
		if (!draft) {
			ctx.status = 404;
			ctx.body = "Draft not found";
			ctx.app.emit("error", new Error("Draft not found"), ctx);
			return await next();
		}
	}

	const slug = await createSlug(caseStudy);
	let githubBranchName: string;
	try {
		const { branchName } = createCaseStudy(
			user,
			caseStudy,
			slug,
			signerAddress,
		);
		githubBranchName = branchName;
	} catch (e) {
		ctx.status = 500;
		ctx.body = "Could not create case study";
		ctx.app.emit("error", new Error("Could not create case study"), ctx);
		return await next();
	}

	let dbCaseStudy;
	if (id) {
		dbCaseStudy = await prisma.caseStudy.update({
			where: { id: Number(id) },
			data: {
				content: caseStudy as unknown as Prisma.InputJsonValue,
				submitted: true,
				githubBranchName,
				signerAddress,
				slug,
			},
		});
	} else {
		dbCaseStudy = await prisma.caseStudy.create({
			data: {
				userId: dbUser.id,
				content: caseStudy as unknown as Prisma.InputJsonValue,
				submitted: true,
				githubBranchName,
				signerAddress,
				slug,
			},
		});
	}

	ctx.body = dbCaseStudy;
	await next();
});
