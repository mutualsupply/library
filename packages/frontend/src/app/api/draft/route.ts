import { NextApiRequest } from "next";
import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import env, { isProd } from "../../../lib/env";
import { caseStudyBodySchema } from "../../../lib/schema";
import { UnauthenticatedError } from "../../../lib/server";

export async function POST(req: Request) {
	try {
		const session = await getServerSession();
		const token = await getToken({
			req: req as unknown as NextApiRequest,
		});

		if (!token || !session) {
			throw new UnauthenticatedError("Must be authenticated to create a draft");
		} else if (!session.user?.email) {
			throw new UnauthenticatedError(
				"User must have Github public email to create a draft",
			);
		}

		const caseStudy = caseStudyBodySchema.parse(await req.json());
		const res = await fetch(`${env.NEXT_PUBLIC_SERVER_BASE_URL}/draft`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				caseStudy,
				user: session.user,
				isProd: isProd(),
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

export async function GET(req: Request) {
	try {
		const session = await getServerSession();
		const token = await getToken({
			req: req as unknown as NextApiRequest,
		});

		if (!token || !session) {
			throw new UnauthenticatedError("Must be authenticated to get a drafts");
		} else if (!session.user?.email) {
			throw new UnauthenticatedError(
				"User must have Github public email to get drafts",
			);
		}

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
