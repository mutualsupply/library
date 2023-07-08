import { Endpoints } from "@octokit/types";

export type GithubPullResponse =
  Endpoints["GET /repos/{owner}/{repo}/pulls"]["response"]["data"];

export async function getPulls(): Promise<GithubPullResponse> {
  const res = await fetch("http://localhost:3000/api/pulls");
  if (!res.ok) {
    throw new Error("Failed to fetch pulls");
  }
  return res.json();
}
