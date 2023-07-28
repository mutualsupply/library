import { NextResponse } from "next/server";
import { GITHUB_OWNER, GITHUB_REPO } from "../../../lib/api";
import env from "../../../lib/env";

export async function GET() {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/pulls`,
      {
        method: "GET",
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${env.GITHUB_TOKEN}`,
          "X-GitHub-Api-Version": "2022-11-28",
        },
        next: { revalidate: 60 },
      }
    );
    if (!res.ok) {
      console.error("hit error!");
      console.error(await res.text());
      throw new Error("Could not get pull requests");
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Could not get pull requests" },
      { status: 400 }
    );
  }
}
