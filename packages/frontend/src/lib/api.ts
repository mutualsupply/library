import { Endpoints } from "@octokit/types";
import {
	CaseStudy,
	CreateNewCaseStudyResponse,
	ServerCaseStudy,
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

export async function getDrafts(): Promise<Array<ServerCaseStudy>> {
	const res = await fetch("/api/draft", {
		method: "GET",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (!res.ok) {
		throw new Error("Failed to fetch pulls");
	}
	return res.json();
}

export async function submitCaseStudy({
	caseStudy,
	signature,
}: {
	caseStudy: CaseStudy;
	signature?: string;
}): Promise<CreateNewCaseStudyResponse> {
	const res = await fetch("/api/create-case", {
		method: "POST",
		body: JSON.stringify({ caseStudy, signature }),
		credentials: "same-origin",
	});
	if (!res.ok) {
		console.error("Could not create case study", await res.text());
		throw new Error("Could not create case study");
	} else {
		return res.json();
	}
}

export async function saveDraft(
	caseStudy: Partial<CaseStudy>,
): Promise<Partial<CaseStudy>> {
	const res = await fetch("/api/draft", {
		method: "POST",
		body: JSON.stringify(caseStudy),
		credentials: "same-origin",
	});
	if (!res.ok) {
		console.error("Could not create save draft", await res.text());
		throw new Error("Could not save drafe");
	} else {
		return res.json();
	}
}

export const GITHUB_OWNER = "mutualsupply";
export const GITHUB_REPO = "library";
