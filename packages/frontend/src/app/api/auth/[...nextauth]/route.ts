import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import env from "../../../../lib/env";
import GithubClient from "../../../../lib/githubClient";
import { GithubEmailsRepsonse } from "./../../../../../../server/src/interfaces";

function isExpired(epochSeconds: number) {
	return Date.now() / 1000 > epochSeconds;
}

async function refreshAccessToken(refreshToken: string) {
	try {
		return GithubClient.refreshToken(refreshToken);
	} catch (e) {
		console.error(e);
	}
}

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
			// Email may be null but we need it, so we query here in case
			// https://github.com/nextauthjs/next-auth/issues/374
			if (account?.provider === "github") {
				if (profile && !profile.email) {
					const res = await fetch("https://api.github.com/user/emails", {
						headers: {
							Authorization: `token ${account.access_token}`,
						},
					});
					if (!res.ok) {
						console.error("Could not fetch emails for account", profile.name);
						throw new Error("Could not fetch emails");
					}
					const emails = (await res.json()) as GithubEmailsRepsonse;
					if (emails?.length > 0) {
						profile.email = emails.find((email) => email.primary)?.email;
					}
				}
			}
			return true;
		},
		async jwt(jwt) {
			if (jwt.token) {
				// If the refresh token is expired, we need to re-authenticate
				if (
					jwt.token.refreshExpiresIn &&
					isExpired(Date.now() / 1000 + (jwt.token.refreshExpiresIn as number))
				) {
					throw new Error("Access token and refresh token expired");
				}

				// Refresh the access token if it's expired
				if (jwt.token.expiresAt && isExpired(jwt.token.expiresAt as number)) {
					try {
						const refreshedToken = await GithubClient.refreshToken(
							jwt.token.refreshToken as string,
						);
						jwt.token.accessToken = refreshedToken.access_token;
						jwt.token.expiresAt = refreshedToken.expires_in + Date.now() / 1000;
						jwt.token.refreshToken = refreshedToken.refresh_token;
						jwt.token.refreshExpiresIn =
							refreshedToken.refresh_token_expires_in;
					} catch (e) {
						console.error("Got an error attempting to refresh token", e);
						throw new Error("Could not refresh token");
					}
				}
			}
			// https://next-auth.js.org/configuration/callbacks
			// We attach necessary JWT fields here so they are persisted in the session
			if (jwt.account) {
				jwt.token.accessToken = jwt.account.access_token;
				jwt.token.expiresAt = jwt.account.expires_at;
				jwt.token.refreshToken = jwt.account.refresh_token;
				jwt.token.refreshExpiresIn = jwt.account.refresh_token_expires_in;
			}
			return jwt.token;
		},
		async session(sesh) {
			// Catch all, if our access token is expired, we need to re-authenticate
			if (
				sesh.token.expiresAt === null ||
				(sesh.token.expiresAt && isExpired(sesh.token.expiresAt as number))
			) {
				throw new Error("Token expired");
			}
			return sesh.session;
		},
	},
});

export { handler as GET, handler as POST };
