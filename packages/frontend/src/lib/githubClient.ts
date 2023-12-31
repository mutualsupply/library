import { GITHUB_OWNER, GITHUB_REPO } from "./constants";
import env, { isProd } from "./env";
import { CaseStudy, GithubRefreshResponse } from "./interfaces";

class GithubClass {
	private readonly baseUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}`;

	async createPr(accessToken: string, caseStudy: CaseStudy, head: string) {
		const res = await fetch(`${this.baseUrl}/pulls`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/vnd.github+json",
				"X-GitHub-Api-Version": "2022-11-28",
				Authorization: `Bearer ${accessToken}`,
			},
			body: JSON.stringify({
				title: `Submission: ${caseStudy.title}`,
				body: `${caseStudy.title} by ${caseStudy.email}\n\n[Link](${caseStudy.experienceUrl})`,
				base: isProd() ? "main" : "dev",
				head,
			}),
		});
		if (!res.ok) {
			throw new Error("Could not create pull request");
		}
		return res.json();
	}

	async refreshToken(refresh_token: string): Promise<GithubRefreshResponse> {
		console.log("Attempting to refresh token");
		const params = new URLSearchParams({
			client_id: env.GITHUB_ID,
			client_secret: env.GITHUB_SECRET,
			grant_type: "refresh_token",
			refresh_token,
		});
		const res = await fetch(
			`https://github.com/login/oauth/access_token?${params}`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/vnd.github+json",
				},
			},
		);
		if (!res.ok) {
			throw new Error("Could not refresh token");
		}
		const json = await res.json();
		if (json.error) {
			console.error("Got an error attempting to refresh token", json.error);
			throw new Error(json.error);
		}
		console.log("Successfully refreshed token");
		return json;
	}
}

const GithubClient = new GithubClass();
export default GithubClient;
