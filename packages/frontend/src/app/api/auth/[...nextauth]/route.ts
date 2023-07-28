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
      console.log("--- SIGNIN ---");
      console.log({ user, account, profile, email, credentials });
      console.log("------");
      if (account?.provider === "github") {
        if (!profile?.email) {
          const res = await fetch("https://api.github.com/user/emails", {
            headers: {
              Authorization: `token ${account.access_token}`,
            },
          });
          const emails = await res.json();
          if (emails?.length > 0) {
            profile!.email = emails.sort(
              (a: any, b: any) => b.primary - a.primary
            )[0].email;
          }
        }
      }
      return true;
    },
    async jwt(jwt) {
      console.log("--- JWT ---");
      console.log(jwt);
      console.log("------");
      return jwt.token;
    },
    async session(sesh) {
      console.log("--- SESSION ---");
      console.log(sesh);
      console.log("------");
      return sesh.session;
    },
  },
});

export { handler as GET, handler as POST };
