import { NextApiRequest } from "next";
import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { recoverMessageAddress } from "viem";
import GithubClient from "../../../lib/githubClient";
import { CaseStudy } from "../../../lib/interfaces";
import { postCaseStudyBodySchema } from "../../../lib/schema";
import { UnauthenticatedError } from "../../../lib/server";
import ServerClient from "../../../lib/serverClient";

export async function POST(req: Request) {
	try {
		// @note This logic is shared in draft logic. Need to check if the token is still valid
		const session = await getServerSession();
		const token = await getToken({
			req: req as unknown as NextApiRequest,
		});

		if (!token || !session) {
			throw new UnauthenticatedError(
				"Must be authenticated to create a case study",
			);
		}

		if (!session.user?.email) {
			throw new UnauthenticatedError(
				"User must have Github public email to publish a case study",
			);
		}

		const json = (await req.json()) as {
			caseStudy: CaseStudy;
			signature?: string;
		};
		const caseStudy = postCaseStudyBodySchema.parse(json.caseStudy);

		let signerAddress = undefined;
		if (json.signature) {
			signerAddress = await recoverMessageAddress({
				message: JSON.stringify(json.caseStudy),
				signature: json.signature as `0x${string}`,
			});
		}

		console.log(
			`Creating case study: ${JSON.stringify(caseStudy)} ${
				signerAddress ? `from address: ${signerAddress}` : ""
			}`,
		);

		// Create case study
		const { branchName: head } = await ServerClient.createCase(
			caseStudy,
			session.user,
			signerAddress,
		);

		// Create PR
		const pr = GithubClient.createPr(
			token.accessToken as string,
			caseStudy,
			head,
		);

		return NextResponse.json({
			head,
			caseStudy,
			pr,
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
