import { Endpoints } from "@octokit/types";
import axios from "axios";

const instance = axios.create({
  baseURL: "/api",
});

export const getPulls = () =>
  instance
    .get<Endpoints["GET /repos/{owner}/{repo}/pulls"]["response"]["data"]>(
      "/pulls"
    )
    .then((res) => res.data);
