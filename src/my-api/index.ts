import { Endpoints } from "@octokit/types";

export const getPulls = (): Promise<
  Endpoints["GET /repos/{owner}/{repo}/pulls"]["response"]["data"]
> => fetch("/api/pulls").then((res) => res.json());
