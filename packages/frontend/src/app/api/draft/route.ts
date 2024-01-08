import { NextRequest, NextResponse } from "next/server";
import { postCaseStudyBodySchema } from "../../../lib/schema";
import { UnauthenticatedError, getAuth } from "../../../lib/server";
import ServerClient from "../../../lib/serverClient";

export async function POST(req: NextRequest) {
	try {
		const {
			session: { user },
		} = await getAuth(req);
		const caseStudy = postCaseStudyBodySchema.parse(await req.json());
		const draft = await ServerClient.saveDraft(caseStudy, user);
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

export async function GET(req: NextRequest) {
	try {
		const {
			session: { user: { email } },
		} = await getAuth(req);
		const drafts = await ServerClient.getDrafts(email);
		return NextResponse.json(drafts);
	} catch (e) {
		if (e instanceof UnauthenticatedError) {
			return NextResponse.json({ error: e.message }, { status: 401 });
		}
		console.error(e);
		return NextResponse.json(
			{ error: "Could not get drafts" },
			{ status: 400 },
		);
	}
}
