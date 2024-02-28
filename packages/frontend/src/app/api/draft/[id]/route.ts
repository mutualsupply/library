import { NextRequest, NextResponse } from "next/server";
import { postCaseStudyBodySchema } from "../../../../lib/schema";
import { UnauthenticatedError, getAuth } from "../../../../lib/server";
import ServerClient from "../../../../lib/serverClient";

export async function POST(
	req: NextRequest,
	route: { params: { id: string } },
) {
	const id = Number(route.params.id);
	try {
		const {
			session: { user },
		} = await getAuth(req);
		const caseStudy = postCaseStudyBodySchema.parse(await req.json());
		const draft = await ServerClient.updateDraft(user, caseStudy, id);
		return NextResponse.json(draft);
	} catch (e) {
		if (e instanceof UnauthenticatedError) {
			return NextResponse.json({ error: e.message }, { status: 401 });
		}
		console.error(e);
		return NextResponse.json(
			{ error: "Could not create draft" },
			{ status: 400 },
		);
	}
}
