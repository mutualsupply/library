import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";

export const TEST_LABELS = ["wow", "amazing"];

export async function GET() {
  const filenamesToIgnore = ["layout.tsx"];
  try {
    const dir = path.join(process.cwd(), "src/app/cases");
    const filenames = fs
      .readdirSync(dir)
      .filter((filename) => !filenamesToIgnore.includes(filename));
    const cases = filenames.map((filename) => ({
      filename,
      slug: filename,
      labels: TEST_LABELS,
    }));
    return NextResponse.json(cases);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Could not get case studies" },
      { status: 400 }
    );
  }
}
