// pages/api/auth/[...nextauth].js
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import env from "../../../../lib/env";

const handler = NextAuth({
  secret: process.env.SECRET,
  providers: [
    GitHubProvider({
      clientId: env.GITHUB_ID as string,
      clientSecret: env.GITHUB_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account?.provider === "github") {
        const res = await fetch("https://api.github.com/user/emails", {
          headers: {
            Authorization: `token ${account.accessToken}`,
          },
        });
        const emails = await res.json();
        if (emails?.length > 0) {
          profile!.email = emails.sort(
            (a: any, b: any) => b.primary - a.primary
          )[0].email;
        }
      }
      console.log("signIn", { user, account, profile, email, credentials });
      return true;
    },
  },
});

export { handler as GET, handler as POST };
