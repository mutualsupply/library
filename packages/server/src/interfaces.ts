export interface CaseStudy {
  email: string;
  name: string;
  title: string;
  productDescription: string;
  industry: string;
  doesUseChain: boolean;
  partOfTeam: boolean;
  url?: string;
  markdown?: string;
}

export interface GithubUser {
  name: string;
  email: string;
  image?: string;
}

export interface PostCaseStudyRequestBody {
  caseStudy: CaseStudy;
  user: GithubUser;
}
