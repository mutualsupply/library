import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";

export async function GET() {
  try {
    const dir = path.join(process.cwd(), "src/markdown");
    const filenames = fs.readdirSync(dir);
    return NextResponse.json(filenames);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Could not get case studies" },
      { status: 400 }
    );
  }
}
