import { NextApiRequest } from "next";
import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { UnauthenticatedError } from "../../../lib/server";

export async function POST(req: Request) {
	try {
		// @note This logic is shared in draft logic. Need to check if the token is still valid
		const session = await getServerSession();
		const token = await getToken({
			req: req as unknown as NextApiRequest,
		});

		console.log("TOKEN", token);
		console.log("SESSION", session);

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

		// const json = await req.json();
		// const { signature, id, ...rest } = json;
		// const caseStudy = postCaseStudyBodySchema.parse(rest);

		// let signerAddress = undefined;
		// if (json.signature) {
		// 	signerAddress = await recoverMessageAddress({
		// 		message: JSON.stringify(json.caseStudy),
		// 		signature: json.signature as `0x${string}`,
		// 	});
		// }

		// console.log(
		// 	`Creating case study: ${JSON.stringify(caseStudy)} ${
		// 		signerAddress ? `from address: ${signerAddress}` : ""
		// 	}`,
		// );

		// // Create case study
		// const { githubBranchName: head } = await ServerClient.createCase(
		// 	caseStudy,
		// 	session.user,
		// 	signerAddress,
		// 	id,
		// );

		// // Create PR
		// const pr = GithubClient.createPr(
		// 	token.accessToken as string,
		// 	caseStudy,
		// 	head,
		// );
		const head = "";
		const caseStudy = "";
		const pr = "";

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
