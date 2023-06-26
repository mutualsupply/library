import { Octokit } from "octokit";

export const GITHUB_OWNER = "mutualsupply";
export const GITHUB_REPO = "site";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export default octokit;
