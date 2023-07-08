import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";
import { Case } from "../../../lib/interfaces";
import { getCase } from "../../../lib/server";

export async function GET() {
  try {
    const dir = path.join(process.cwd(), "src/markdown");
    const filenames = fs.readdirSync(dir);
    const cases: Array<Case> = filenames.map((filename) =>
      getCase(dir, filename)
    );
    return NextResponse.json(cases);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Could not get case studies" },
      { status: 400 }
    );
  }
}
