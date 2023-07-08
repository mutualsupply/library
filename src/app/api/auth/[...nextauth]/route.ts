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
});

export { handler as GET, handler as POST };
