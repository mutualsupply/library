export interface CaseStudy {
  email: string
  name: string
  title: string
  productDescription: string
  industry: string
  doesUseChain: boolean
  partOfTeam: boolean
  url?: string
  markdown?: string
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
}
