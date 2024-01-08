import { DefaultSession } from "next-auth";
import { Hex } from "viem";
import env from "./env";
import { CaseStudy, DBCaseStudy, UserResponse } from "./interfaces";

class ServerClientClass {
	private readonly baseUrl = env.NEXT_PUBLIC_SERVER_BASE_URL;

	async createCase(
		caseStudy: CaseStudy,
		user: DefaultSession["user"],
		signerAddress?: string | Hex,
		id?: number,
	): Promise<DBCaseStudy> {
		const res = await fetch(`${this.baseUrl}/case-study`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${env.API_KEY}`,
			},
			body: JSON.stringify({
				caseStudy,
				signerAddress,
				user,
				id,
			}),
		});
		if (!res.ok) {
			throw new Error("Could not create case study");
		}
		const json = await res.json();
		return json;
	}

	async getDrafts(email: string): Promise<Array<DBCaseStudy>> {
		const user = await this.getUser(email);
		return user.cases.filter((c) => !c.submitted);
	}

	async getDraft(email: string, id: number) {
		const drafts = await this.getDrafts(email);
		return drafts.find((d) => d.id === id);
	}

	async saveDraft(
		caseStudy: CaseStudy,
		user: DefaultSession["user"],
	): Promise<DBCaseStudy> {
		const res = await fetch(`${this.baseUrl}/draft`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${env.API_KEY}`,
			},
			body: JSON.stringify({
				caseStudy,
				user,
			}),
		});
		if (!res.ok) {
			throw new Error("Could not save draft");
		}
		return res.json();
	}

	async updateDraft(
		user: DefaultSession["user"],
		caseStudy: CaseStudy,
		id: number,
	) {
		const res = await fetch(`${this.baseUrl}/draft/update/${id}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${env.API_KEY}`,
			},
			body: JSON.stringify({
				user,
				caseStudy,
			}),
		});
		if (!res.ok) {
			throw new Error("Could not update draft");
		}
	}

	async getCases(): Promise<Array<DBCaseStudy>> {
		const res = await fetch(`${this.baseUrl}/cases`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${env.API_KEY}`,
			},
		});

		if (!res.ok) {
			throw new Error("Could not get case studies");
		}
		return res.json();
	}

	async getUser(email: string): Promise<UserResponse> {
		const res = await fetch(`${this.baseUrl}/user/${email}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${env.API_KEY}`,
			},
		});

		if (!res.ok) {
			throw new Error("Could not get user");
		}
		return res.json();
	}
}

const ServerClient = new ServerClientClass();
export default ServerClient;
