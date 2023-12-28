import { DefaultSession } from "next-auth";
import { Hex } from "viem";
import env from "./env";
import { CaseStudy } from "./interfaces";
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
}

const ServerClient = new ServerClientClass();
export default ServerClient;
