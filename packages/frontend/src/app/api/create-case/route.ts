import { NextRequest, NextResponse } from "next/server";
import { isExpired } from "utils";
import { Hex, recoverMessageAddress } from "viem";
import GithubClient from "../../../lib/githubClient";
import { postCaseStudyBodySchema } from "../../../lib/schema";
import { UnauthenticatedError, getAuth } from "../../../lib/server";
import ServerClient from "../../../lib/serverClient";

export async function POST(req: NextRequest) {
	try {
		const { session, token } = await getAuth(req);

		const json = await req.json();
		const { signature, id, ...rest } = json;
		const caseStudy = postCaseStudyBodySchema.parse(rest);
		let signerAddress = undefined;
		if (json.signature) {
			signerAddress = await recoverMessageAddress({
				message: JSON.stringify(caseStudy),
				signature: json.signature as Hex,
			});
		}

		console.log(
			`Creating case study: ${JSON.stringify(caseStudy)} ${
				signerAddress ? `from address: ${signerAddress}` : ""
			}`,
		);

		const dbCaseStudy = await ServerClient.createCase(
			caseStudy,
			session.user,
			signerAddress,
			id,
		);

		if (token.expiresAt && isExpired(token.expiresAt as number)) {
			return NextResponse.json(
				{
					error: "Token expired",
				},
				{ status: 401 },
			);
		}

		const pr = await GithubClient.createPr(
			token.accessToken as string,
			caseStudy,
			dbCaseStudy.githubBranchName as string,
		);

		return NextResponse.json({
			caseStudy: dbCaseStudy,
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
