import { GITHUB_OWNER, GITHUB_REPO } from "./api";
import { isProd } from "./env";
import { CaseStudy } from "./interfaces";

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
}

const GithubClient = new GithubClass();
export default GithubClient;
