import fs from "fs";
import { serialize } from "next-mdx-remote/serialize";
import { NextResponse } from "next/server";
import path from "path";
import { TEST_LABELS } from "../../case/route";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: { slug: string };
  }
) {
  try {
    const { slug } = params;
    const dir = path.join(process.cwd(), "src/remote-markdown", `${slug}.mdx`);
    const caseFile = fs.readFileSync(dir);
    const source = await serialize(caseFile, { parseFrontmatter: true });
    return NextResponse.json({ source, slug, labels: TEST_LABELS });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Could not get case studies" },
      { status: 400 }
    );
  }
}
