import { NextRequest, NextResponse } from "next/server";
import { recoverMessageAddress } from "viem";
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
		const { githubBranchName: head } = await ServerClient.createCase(
			caseStudy,
			session.user,
			signerAddress,
			id,
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
