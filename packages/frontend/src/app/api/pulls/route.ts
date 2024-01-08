import { NextResponse } from "next/server";
import GithubClient from "../../../lib/githubClient";

export async function GET() {
	try {
		const pulls = await GithubClient.getPulls();
		return NextResponse.json(pulls);
	} catch (e) {
		console.error(e);
		return NextResponse.json(
			{ error: "Could not get pull requests" },
			{ status: 400 },
		);
	}
}
