import { Endpoints } from "@octokit/types";
import {
	CaseStudy,
	CreateNewCaseStudyResponse,
	DBCaseStudy,
	PostCaseStudyBody,
} from "./interfaces";

export type GithubPullResponse =
	Endpoints["GET /repos/{owner}/{repo}/pulls"]["response"]["data"];

export async function getPulls(): Promise<GithubPullResponse> {
	const res = await fetch("/api/pulls");
	if (!res.ok) {
		throw new Error("Failed to fetch pulls");
	}
	return res.json();
}

export async function getDrafts(): Promise<Array<DBCaseStudy>> {
	const res = await fetch("/api/draft", {
		method: "GET",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (!res.ok) {
		throw new Error("Failed to fetch drafts");
	}
	return res.json();
}

export async function getDraft(id: number): Promise<DBCaseStudy | undefined> {
	return getDrafts().then((drafts) => drafts.find((d) => d.id === id));
}

export async function submitCaseStudy(
	body: PostCaseStudyBody,
): Promise<CreateNewCaseStudyResponse> {
	const res = await fetch("/api/create-case", {
		method: "POST",
		body: JSON.stringify(body),
		credentials: "same-origin",
	});
	if (!res.ok) {
		console.error("Could not create case study", await res.text());
		throw new Error("Could not create case study");
	}
	return res.json();
}

export async function saveDraft(
	body: Omit<Partial<PostCaseStudyBody>, "signature">,
): Promise<Partial<CaseStudy>> {
	const res = await fetch("/api/draft", {
		method: "POST",
		body: JSON.stringify(body),
		credentials: "same-origin",
	});
	if (!res.ok) {
		console.error("Could not create save draft", await res.text());
		throw new Error("Could not save draft");
	}
	return res.json();
}

export const GITHUB_OWNER = "mutualsupply";
export const GITHUB_REPO = "library";
