import { MDXRemoteSerializeResult } from "next-mdx-remote";

type DateTime = string;

export interface CaseStudy {
	title: string;
	name: string;
	email: string;
	category: string;
	experienceUrl: string;
	organization?: string;
	markdown?: string;
}

export interface UserResponse {
	user: User;
	cases: Array<DBCaseStudy>;
}

export interface DBCaseStudy {
	id: number;
	content: CaseStudy;
	slug?: string;
	signerAddress?: string;
	githubBranchName?: string;

	submitted: boolean;
	approved: boolean | null;
	featured: boolean;

	createdAt: DateTime;
	updatedAt: DateTime;
	deletedAt?: DateTime;
	approvedAt?: DateTime;

	userId: number;
}

export interface CaseMetadata
	extends Pick<
		CaseStudy,
		"title" | "name" | "category" | "experienceUrl" | "organization"
	> {
	createdAt: DateTime;
	address?: `0x${string}`;
}

export interface CaseWithMetadata extends CaseMetadata {
	filename: string;
	slug: string;
	source: string;
	featured?: boolean;
}

export interface CaseSource extends CaseWithMetadata {
	serialized: MDXRemoteSerializeResult;
}

export interface CreateNewCaseStudyResponse {
	caseStudy: DBCaseStudy;
	pr: GithubPR;
}
export interface PostCaseStudyBody extends CaseStudy {
	signature?: string;
	id?: number;
}

export interface GithubPR {
	url: string;
	id: number;
	node_id: string;
	html_url: string;
	diff_url: string;
	patch_url: string;
	issue_url: string;
	number: number;
	state: string;
	locked: boolean;
	title: string;
	user: User;
	body: string;
	created_at: Date;
	updated_at: Date;
	closed_at: null;
	merged_at: null;
	merge_commit_sha: null;
	assignee: null;
	assignees: unknown[];
	requested_reviewers: unknown[];
	requested_teams: unknown[];
	labels: unknown[];
	milestone: null;
	draft: boolean;
	commits_url: string;
	review_comments_url: string;
	review_comment_url: string;
	comments_url: string;
	statuses_url: string;
	head: Base;
	base: Base;
	_links: Links;
	author_association: string;
	auto_merge: null;
	active_lock_reason: null;
	merged: boolean;
	mergeable: null;
	rebaseable: null;
	mergeable_state: string;
	merged_by: null;
	comments: number;
	review_comments: number;
	maintainer_can_modify: boolean;
	commits: number;
	additions: number;
	deletions: number;
	changed_files: number;
}

export interface Links {
	self: Comments;
	html: Comments;
	issue: Comments;
	comments: Comments;
	review_comments: Comments;
	review_comment: Comments;
	commits: Comments;
	statuses: Comments;
}

export interface Comments {
	href: string;
}

export interface Base {
	label: string;
	ref: string;
	sha: string;
	user: User;
	repo: Repo;
}

export interface Repo {
	id: number;
	node_id: string;
	name: string;
	full_name: string;
	private: boolean;
	owner: User;
	html_url: string;
	description: string;
	fork: boolean;
	url: string;
	forks_url: string;
	keys_url: string;
	collaborators_url: string;
	teams_url: string;
	hooks_url: string;
	issue_events_url: string;
	events_url: string;
	assignees_url: string;
	branches_url: string;
	tags_url: string;
	blobs_url: string;
	git_tags_url: string;
	git_refs_url: string;
	trees_url: string;
	statuses_url: string;
	languages_url: string;
	stargazers_url: string;
	contributors_url: string;
	subscribers_url: string;
	subscription_url: string;
	commits_url: string;
	git_commits_url: string;
	comments_url: string;
	issue_comment_url: string;
	contents_url: string;
	compare_url: string;
	merges_url: string;
	archive_url: string;
	downloads_url: string;
	issues_url: string;
	pulls_url: string;
	milestones_url: string;
	notifications_url: string;
	labels_url: string;
	releases_url: string;
	deployments_url: string;
	created_at: Date;
	updated_at: Date;
	pushed_at: Date;
	git_url: string;
	ssh_url: string;
	clone_url: string;
	svn_url: string;
	homepage: string;
	size: number;
	stargazers_count: number;
	watchers_count: number;
	language: string;
	has_issues: boolean;
	has_projects: boolean;
	has_downloads: boolean;
	has_wiki: boolean;
	has_pages: boolean;
	has_discussions: boolean;
	forks_count: number;
	mirror_url: null;
	archived: boolean;
	disabled: boolean;
	open_issues_count: number;
	license: null;
	allow_forking: boolean;
	is_template: boolean;
	web_commit_signoff_required: boolean;
	topics: unknown[];
	visibility: string;
	forks: number;
	open_issues: number;
	watchers: number;
	default_branch: string;
}

export interface User {
	login: string;
	id: number;
	node_id: string;
	avatar_url: string;
	gravatar_id: string;
	url: string;
	html_url: string;
	followers_url: string;
	following_url: string;
	gists_url: string;
	starred_url: string;
	subscriptions_url: string;
	organizations_url: string;
	repos_url: string;
	events_url: string;
	received_events_url: string;
	type: string;
	site_admin: boolean;
}

export interface GithubRefreshResponse {
	access_token: string;
	expires_in: number;
	refresh_token: string;
	refresh_token_expires_in: number;
	scope: string;
	token_type: string;
}

export interface GithubEmail {
	email: string;
	verified: boolean;
	primary: boolean;
	visibility: string;
}

export type GithubEmailsRepsonse = Array<GithubEmail>;
