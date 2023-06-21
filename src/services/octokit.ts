import { App, Octokit } from "octokit";
import env, { isDev } from "./env";

let octokit: Octokit;

export const GITHUB_OWNER = "mutualsupply";
export const GITHUB_REPO = "site";

if (isDev()) {
  // personal client for local development
  octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });
} else {
  // app client for production
  const app = new App({
    appId: env.GITHUB_APP_ID,
    privateKey: env.GITHUB_PRIVATE_KEY,
    oauth: {
      clientId: env.GITHUB_APP_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    },
  });
  octokit = app.octokit;
}

export default octokit;
