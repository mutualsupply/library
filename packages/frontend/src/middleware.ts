export const config = {
	matcher: "/api/create-case",
};

// https://github.com/nextauthjs/next-auth/issues/7732
// getServerSession() will throw here so we use the default next-auth middleware
export { default } from "next-auth/middleware";
