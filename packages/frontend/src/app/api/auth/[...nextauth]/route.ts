import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import env from "../../../../lib/env";
import { GithubEmailsRepsonse } from "./../../../../../../server/src/interfaces";

const handler = NextAuth({
	session: {
		strategy: "jwt",
	},
	secret: process.env.SECRET,
	providers: [
		GitHubProvider({
			clientId: env.GITHUB_ID as string,
			clientSecret: env.GITHUB_SECRET as string,
		}),
	],
	callbacks: {
		async signIn({ account, profile }) {
			if (account?.provider === "github") {
				if (profile) {
					if (!profile.email) {
						const res = await fetch("https://api.github.com/user/emails", {
							headers: {
								Authorization: `token ${account.access_token}`,
							},
						});
						const emails = (await res.json()) as GithubEmailsRepsonse;
						if (emails?.length > 0) {
							profile.email = emails.find((email) => email.primary)?.email;
						}
					}
				}
			}
			return true;
		},
		async jwt(jwt) {
			if (jwt.account) {
				jwt.token.accessToken = jwt.account.access_token;
				jwt.token.expiresAt = jwt.account.expires_at;
				jwt.token.refreshToken = jwt.account.refresh_token;
				jwt.token.refreshExpiresIn = jwt.account.refresh_token_expires_in;
			}
			return jwt.token;
		},
		async session(sesh) {
			return sesh.session;
		},
	},
});

export { handler as GET, handler as POST };
