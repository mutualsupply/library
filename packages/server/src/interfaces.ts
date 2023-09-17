export interface CaseStudy {
  type: StudyType
  name: string
  email: string
  title: string
  organizationName: string
  url?: string
  industry: string
  partOfTeam: boolean
  markdown?: string
}

enum StudyType {
  Signal = "Signal",
  Observation = "Observation",
  Exploration = "Exploration",
}

export interface GithubUser {
  name: string
  email: string
  image?: string
}

export interface GithubEmail {
  email: string
  verified: boolean
  primary: boolean
  visibility: string
}

export type GithubEmailsRepsonse = Array<GithubEmail>

export interface PostCaseStudyRequestBody {
  caseStudy: CaseStudy
  user: GithubUser
  isProd: boolean
  slug: string
  address?: `0x${string}`
}
