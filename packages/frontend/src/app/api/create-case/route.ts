import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import env from "../../../lib/env";
import { caseStudySchema } from "../../../lib/schema";
import { UnauthenticatedError } from "../../../lib/server";

export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    if (!session) {
      throw new UnauthenticatedError(
        "Must be authenticated to create a case study"
      );
    }
    const body = await req.json();
    const parsedBody = caseStudySchema.parse(body);
    const res = await fetch(`${env.SERVER_BASE_URL}/case-study`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parsedBody),
    });
    if (!res.ok) {
      throw new Error("Could not create case study");
    }
    const responseJson = await res.json();
    return NextResponse.json(responseJson);
  } catch (e) {
    if (e instanceof UnauthenticatedError) {
      return NextResponse.json({ error: e.message }, { status: 401 });
    }
    console.error(e);
    return NextResponse.json(
      { error: "Could not create case study" },
      { status: 400 }
    );
  }
}
