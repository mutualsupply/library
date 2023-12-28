export interface CaseStudy {
	title: string;
	name: string;
	email: string;
	category: string;
	experienceUrl: string;
	markdown?: string;
}

export interface PostCaseStudyRequestBody {
	caseStudy: CaseStudy;
	user: GithubUser;
	slug: string;
	signerAddress?: `0x${string}`;
}

export interface GithubUser {
	name: string;
	email: string;
	image?: string;
}

export interface GithubEmail {
	email: string;
	verified: boolean;
	primary: boolean;
	visibility: string;
}

export type GithubEmailsRepsonse = Array<GithubEmail>;
