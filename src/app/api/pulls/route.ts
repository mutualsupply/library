import { NextResponse } from "next/server";
import { Octokit } from "octokit";

const OWNER = "mutualsupply";
const REPO = "site";

const octokit = new Octokit({
  auth: process.env.NEXT_PUBLIC_GITHUB_TOKEN,
});

export async function GET() {
  try {
    const { data } = await octokit.rest.pulls.list({
      owner: OWNER,
      repo: REPO,
    });
    return NextResponse.json(data);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ success: false });
  }
  // const res = await fetch("https://data.mongodb-api.com/...", {
  //   headers: {
  //     "Content-Type": "application/json",
  //     "API-Key": process.env.DATA_API_KEY,
  //   },
  // });
  // const data = await res.json();

  // return NextResponse.json({ data });
}
