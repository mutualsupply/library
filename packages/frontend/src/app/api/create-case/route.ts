import { NextApiRequest } from "next";
import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { recoverMessageAddress } from "viem";
import { GITHUB_OWNER, GITHUB_REPO } from "../../../lib/api";
import env, { isProd } from "../../../lib/env";
import { CaseStudy } from "../../../lib/interfaces";
import { caseStudyBodySchema } from "../../../lib/schema";
import { UnauthenticatedError, createSlug } from "../../../lib/server";

export async function POST(req: Request) {
	try {
		const session = await getServerSession();
		const token = await getToken({
			req: req as unknown as NextApiRequest,
		});

		if (!token || !session) {
			throw new UnauthenticatedError(
				"Must be authenticated to create a case study",
			);
		} else if (!session.user?.email) {
			throw new UnauthenticatedError(
				"User must have Github public email to publish a case study",
			);
		}
		const json = (await req.json()) as {
			caseStudy: CaseStudy;
			signature?: string;
		};
		const caseStudy = caseStudyBodySchema.parse(json.caseStudy);

		let address = undefined;
		if (json.signature) {
			address = await recoverMessageAddress({
				message: JSON.stringify(json.caseStudy),
				signature: json.signature as `0x${string}`,
			});
		}

		console.log(
			`Creating case study: ${JSON.stringify(caseStudy)} ${
				address ? `from address: ${address}` : ""
			}`,
		);

		const res = await fetch(`${env.NEXT_PUBLIC_SERVER_BASE_URL}/case-study`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				caseStudy,
				address,
				user: session.user,
				isProd: isProd(),
				slug: createSlug(caseStudy.title),
			}),
		});
		if (!res.ok) {
			throw new Error("Could not create case study");
		}
		const { branchName: head } = await res.json();
		const prRes = await fetch(
			`https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/pulls`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/vnd.github+json",
					Authorization: `Bearer ${token.accessToken}`,
					"X-GitHub-Api-Version": "2022-11-28",
				},
				body: JSON.stringify({
					title: `Submission: ${caseStudy.title}`,
					body: `${caseStudy.title} by ${caseStudy.email}\n\n[Link](${caseStudy.url})`,
					base: isProd() ? "main" : "dev",
					head,
				}),
			},
		);
		if (!prRes.ok) {
			throw new Error("Could not create github pull request");
		}
		return NextResponse.json({
			head,
			caseStudy,
			pr: await prRes.json(),
		});
	} catch (e) {
		if (e instanceof UnauthenticatedError) {
			return NextResponse.json({ error: e.message }, { status: 401 });
		}
		console.error(e);
		return NextResponse.json(
			{ error: "Could not create case study" },
			{ status: 400 },
		);
	}
}
