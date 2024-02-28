export interface CaseStudy {
	title: string;
	name: string;
	email: string;
	category: string;
	contextUrl: string;
	details?: string;
	markdown?: string;
}

export interface PostCaseStudyRequestBody {
	caseStudy: CaseStudy;
	user: GithubUser;
	slug: string;
	signerAddress?: `0x${string}`;
	// optional ID to connect to a draft
	id?: number;
}

export interface GithubUser {
	name: string;
	email: string;
	image?: string;
}
