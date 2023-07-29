import { NextApiRequest } from "next"
import { getServerSession } from "next-auth"
import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"
import { GITHUB_OWNER, GITHUB_REPO } from "../../../lib/api"
import env, { isProd } from "../../../lib/env"
import { caseStudyBodySchema } from "../../../lib/schema"
import { UnauthenticatedError } from "../../../lib/server"

export async function POST(req: Request) {
  try {
    const session = await getServerSession()
    const token = await getToken({
      req: req as any as NextApiRequest,
    })

    console.log({
      token,
      session,
    })

    if (!token || !session) {
      throw new UnauthenticatedError(
        "Must be authenticated to create a case study",
      )
    } else if (!session.user?.email) {
      throw new UnauthenticatedError(
        "User must have Github public email to publish a case study",
      )
    }
    const caseStudy = caseStudyBodySchema.parse(await req.json())
    const res = await fetch(`${env.SERVER_BASE_URL}/case-study`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        caseStudy,
        user: session.user,
        isProd: isProd(),
      }),
    })
    if (!res.ok) {
      throw new Error("Could not create case study")
    }
    const { branchName: head } = await res.json()
    const prRes = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/pulls`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${token.accessToken}`,
          "X-GitHub-Api-Version": "2022-11-28",
        },
        body: JSON.stringify({
          title: `New Case Study: ${caseStudy.title}`,
          body: `${caseStudy.title} by ${caseStudy.email}\n\n[Link](${caseStudy.url})`,
          base: isProd() ? "main" : "dev",
          head,
        }),
      },
    )
    if (!prRes.ok) {
      throw new Error("Could not create github pull request")
    }
    return NextResponse.json({
      head,
      caseStudy,
      pr: await prRes.json(),
    })
  } catch (e) {
    if (e instanceof UnauthenticatedError) {
      return NextResponse.json({ error: e.message }, { status: 401 })
    }
    console.error(e)
    return NextResponse.json(
      { error: "Could not create case study" },
      { status: 400 },
    )
  }
}
