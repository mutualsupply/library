import { Endpoints } from "@octokit/types";
import { Case, CaseSource } from "./interfaces";

export async function getCaseSource(slug: string): Promise<CaseSource> {
  const res = await fetch("http://localhost:3000/api/case/" + slug);
  if (!res.ok) {
    throw new Error("Failed to fetch case");
  }
  return res.json();
}

export async function getCases(): Promise<Array<Case>> {
  const res = await fetch("http://localhost:3000/api/case");
  if (!res.ok) {
    throw new Error("Failed to fetch cases");
  }
  return res.json();
}

export type GithubPullResponse =
  Endpoints["GET /repos/{owner}/{repo}/pulls"]["response"]["data"];

export async function getPulls(): Promise<GithubPullResponse> {
  const res = await fetch("http://localhost:3000/api/pulls");
  if (!res.ok) {
    throw new Error("Failed to fetch pulls");
  }
  return res.json();
}
