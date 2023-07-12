import { MDXRemoteSerializeResult } from "next-mdx-remote";

export interface Case {
  filename: string;
  slug: string;
  labels: Array<string>;
  title: string;
  source: string;
}

export interface CaseSource extends Case {
  serialized: MDXRemoteSerializeResult;
}