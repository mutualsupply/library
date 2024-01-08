import { Endpoints } from "@octokit/types";
import {
	CreateNewCaseStudyResponse,
	DBCaseStudy,
	PostCaseStudyBody,
	UserResponse,
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
	body: Omit<PostCaseStudyBody, "signature">,
): Promise<DBCaseStudy> {
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

export async function updateDraft(
	body: Omit<PostCaseStudyBody, "signature"> & { id: number },
): Promise<DBCaseStudy> {
	const { id, ...rest } = body;
	const res = await fetch(`/api/draft/${id}`, {
		method: "POST",
		body: JSON.stringify(rest),
		credentials: "same-origin",
	});
	if (!res.ok) {
		console.error("Could not create save draft", await res.text());
		throw new Error("Could not save draft");
	}
	return res.json();
}

export async function getUser(): Promise<UserResponse> {
	const res = await fetch("/api/user", {
		method: "GET",
		credentials: "include",
	});
	if (!res.ok) {
		throw new Error("Failed to fetch drafts");
	}
	return res.json();
}
