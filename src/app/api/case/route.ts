import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";

export async function GET() {
  try {
    const dir = path.join(process.cwd(), "src/markdown");
    const filenames = fs.readdirSync(dir);
    const data = filenames.map((filename) => ({
      filename,
      slug: filename.replace(".mdx", ""),
    }));
    return NextResponse.json(data);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Could not get case studies" },
      { status: 400 }
    );
  }
}
