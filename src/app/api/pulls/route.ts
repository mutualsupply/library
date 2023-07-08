import { NextResponse } from "next/server";
import octokit, { GITHUB_OWNER, GITHUB_REPO } from "../../../lib/octokit";

export async function GET() {
  try {
    const { data } = await octokit.rest.pulls.list({
      owner: GITHUB_OWNER,
      repo: GITHUB_REPO,
    });
    return NextResponse.json(data);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Could not get pull requests" },
      { status: 400 }
    );
  }
}
