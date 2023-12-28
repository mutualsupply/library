import { DefaultSession } from "next-auth";
import { Hex } from "viem";
import env from "./env";
import { CaseStudy, DBCaseStudy } from "./interfaces";
import { createSlug } from "./server";

class ServerClientClass {
	private readonly baseUrl = env.NEXT_PUBLIC_SERVER_BASE_URL;

	async createCase(
		caseStudy: CaseStudy,
		user: DefaultSession["user"],
		signerAddress?: string | Hex,
	) {
		const res = await fetch(`${env.NEXT_PUBLIC_SERVER_BASE_URL}/case-study`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				slug: createSlug(caseStudy.title),
				caseStudy,
				signerAddress,
				user,
			}),
		});
		if (!res.ok) {
			throw new Error("Could not create case study");
		}
		const json = await res.json();
		return json;
	}

	async getDrafts(email: string): Promise<Array<DBCaseStudy>> {
		const res = await fetch(
			`${env.NEXT_PUBLIC_SERVER_BASE_URL}/draft/${encodeURIComponent(email)}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			},
		);

		if (!res.ok) {
			throw new Error("Could not create case study");
		}
		return res.json();
	}

	async getDraft(email: string, id: number) {
		const drafts = await this.getDrafts(email);
		return drafts.find((d) => d.id === id);
	}
}

const ServerClient = new ServerClientClass();
export default ServerClient;
