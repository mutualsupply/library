import NextAuth from "next-auth"
import GitHubProvider from "next-auth/providers/github"
import env from "../../../../lib/env"

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
    async signIn({ user, account, profile, email, credentials }) {
      console.log("--- SIGNIN ---")
      console.log({ user, account, profile, email, credentials })
      console.log("--- END SIGNIN ---")
      if (account?.provider === "github") {
        if (!profile?.email) {
          const res = await fetch("https://api.github.com/user/emails", {
            headers: {
              Authorization: `token ${account.access_token}`,
            },
          })
          const emails = await res.json()
          if (emails?.length > 0) {
            profile!.email = emails.sort(
              (a: any, b: any) => b.primary - a.primary,
            )[0].email
          }
        }
      }
      return true
    },
    async jwt(jwt) {
      console.log("--- JWT ---")
      console.log(jwt)
      console.log("--- END JWT ---")
      if (jwt.account) {
        jwt.token.accessToken = jwt.account.access_token
        jwt.token.expiresAt = jwt.account.expires_at
        jwt.token.refreshToken = jwt.account.refresh_token
        jwt.token.refreshExpiresIn = jwt.account.refresh_token_expires_in
      }
      return jwt.token
    },
    async session(sesh) {
      console.log("--- SESSION ---")
      console.log(sesh)
      console.log("--- END SESSION ---")
      return sesh.session
    },
  },
})

export { handler as GET, handler as POST }
