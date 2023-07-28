import { NextApiRequest } from "next";
import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import env from "../../../lib/env";
import { caseStudyBodySchema } from "../../../lib/schema";
import { UnauthenticatedError } from "../../../lib/server";

export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    const token = await getToken({
      req: req as any as NextApiRequest,
    });
    console.log("tokne::", token);
    if (!session) {
      throw new UnauthenticatedError(
        "Must be authenticated to create a case study"
      );
    }
    console.log("SESSION", session.user);
    if (!session.user?.email) {
      throw new UnauthenticatedError(
        "User must have Github public email to publish a case study"
      );
    }
    const body = await req.json();
    console.log("body::", body);
    const parsedBody = caseStudyBodySchema.parse(body);
    const res = await fetch(`${env.SERVER_BASE_URL}/case-study`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        caseStudy: parsedBody,
        user: session.user,
      }),
    });
    if (!res.ok) {
      throw new Error("Could not create case study");
    }
    const responseJson = await res.json();
    const { branchName } = responseJson;
    console.log("branch name::", branchName);
    // @next -- create pr using the authed user's ghub token
    // https://docs.github.com/en/rest/pulls/pulls?apiVersion=2022-11-28#create-a-pull-request
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
