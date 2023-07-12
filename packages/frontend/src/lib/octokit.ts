import { Octokit } from "octokit";
import env from "./env";

export const GITHUB_OWNER = "mutualsupply";
export const GITHUB_REPO = "site";

const octokit = new Octokit({
  auth: env.GITHUB_TOKEN,
});

export default octokit;
