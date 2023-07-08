import { serialize } from "next-mdx-remote/serialize";
import { NextResponse } from "next/server";
import path from "path";
import { getCase } from "../../../../lib/server";

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
    const filename = `${slug}.mdx`;
    const caseFile = getCase(
      path.join(process.cwd(), "src/markdown"),
      filename
    );
    const serialized = await serialize(caseFile.source, {
      parseFrontmatter: true,
    });
    return NextResponse.json({ ...caseFile, serialized });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Could not get case studies" },
      { status: 400 }
    );
  }
}
