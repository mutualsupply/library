import { NextRequest, NextResponse } from "next/server";
import env from "../../../lib/env";
import { postCaseStudyBodySchema } from "../../../lib/schema";
import { UnauthenticatedError, getAuth } from "../../../lib/server";

export async function POST(req: NextRequest) {
	try {
		const { session } = await getAuth(req);
		const caseStudy = postCaseStudyBodySchema.parse(await req.json());
		const res = await fetch(`${env.NEXT_PUBLIC_SERVER_BASE_URL}/draft`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				caseStudy,
				user: session.user,
			}),
		});
		if (!res.ok) {
			throw new Error("Could not create case study");
		}

		const json = await res.json();
		return NextResponse.json(json);
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
		const { session } = await getAuth(req);
		const res = await fetch(
			`${env.NEXT_PUBLIC_SERVER_BASE_URL}/draft/${encodeURIComponent(
				session.user.email,
			)}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			},
		);
		if (!res.ok) {
			throw new Error("Could not create case study");
		}
		const drafts = await res.json();
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
