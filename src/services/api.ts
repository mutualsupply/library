import { Endpoints } from "@octokit/types";
import axios from "axios";

const http = axios.create({
  baseURL: "/api",
});

export type GithubPullResponse =
  Endpoints["GET /repos/{owner}/{repo}/pulls"]["response"]["data"];

export const getPulls = () =>
  http.get<GithubPullResponse>("/pulls").then((res) => res.data);

export const getCases = () =>
  http
    .get<Array<{ filename: string; slug: string }>>("/case")
    .then((res) => res.data);

export const getMDXSource = (slug: string) =>
  http
    .get<{ source: string }>(`/case/markdown/${slug}`)
    .then((res) => res.data);
