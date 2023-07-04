import { Endpoints } from "@octokit/types";
import axios from "axios";

const http = axios.create({
  baseURL: "/api",
});

export const getPulls = () =>
  http
    .get<Endpoints["GET /repos/{owner}/{repo}/pulls"]["response"]["data"]>(
      "/pulls"
    )
    .then((res) => res.data);

export const getCases = () =>
  http.get<Array<string>>("/cases").then((res) => res.data);
