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
    appId: env.githubAppId,
    privateKey: env.githubPrivateKey,
    oauth: {
      clientId: env.githubAppId,
      clientSecret: env.githubClientSecret,
    },
  });
  octokit = app.octokit;
}

export default octokit;
