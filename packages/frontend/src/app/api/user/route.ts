import { NextRequest, NextResponse } from "next/server";
import { UnauthenticatedError, getAuth } from "../../../lib/server";
import ServerClient from "../../../lib/serverClient";

export async function GET(req: NextRequest) {
	try {
		const {
			session: {
				user: { email },
			},
		} = await getAuth(req);
		const drafts = await ServerClient.getUser(email);
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
