import child from "child_process";
import env from "./env";
import { CaseStudy, GithubUser } from "./interfaces";

const run = (cmd: string) => {
	return child.execSync(cmd, { stdio: "inherit" });
};

function createCaseStudy(
	user: GithubUser,
	caseStudy: CaseStudy,
	slug: string,
	address?: `0x${string}`,
) {
	console.log("writing case study submitted by", user.email);
	const branchName = `${caseStudy.email}/${slug}`;
	const now = new Date();
	const dirName = `/tmp/new-study-${slug}`;
	const repoName = "library";
	const pathToFrontendPackage = `${dirName}/${repoName}/packages/frontend`;
	run(`rm -rf ${dirName} && mkdir ${dirName}`);
	run(
		`GIT_SSH_COMMAND="ssh -i /root/.ssh/id_ed25519" git clone git@github.com:mutualsupply/${repoName}.git ${dirName}/${repoName}`,
	);
	run(`cd ${dirName}/${repoName} && git checkout ${env.GITHUB_BRANCH}`);

	const markdown = `# ${caseStudy.title}

${caseStudy.markdown ? caseStudy.markdown : ""}

### Metadata\n
Title: **${caseStudy.title}**\n
Author: **${caseStudy.name}** (${caseStudy.email})\n
Category: **${caseStudy.category}**\n
Proof of Experience: **[${caseStudy.experienceUrl}](${caseStudy.experienceUrl})**
${caseStudy.organization ? `\nOrganization: **${caseStudy.organization}**` : ""}
${address ? `\nSigned by: **${address}**` : ""}
\nCreated: **${now.toISOString()}**
`;
	run(`echo "${markdown}" > ${pathToFrontendPackage}/src/markdown/${slug}.mdx`);
	run(`cd ${dirName}/${repoName} && git status`);
	run(`cd ${dirName}/${repoName} && git branch ${branchName}`);
	run(`cd ${dirName}/${repoName} && git checkout ${branchName}`);
	run(`cd ${dirName}/${repoName} && git add .`);
	run(
		`cd ${dirName}/${repoName} && git commit -m 'New case study: ${caseStudy.title}' --author "${user.name} <${user.email}>" `,
	);
	run(`cd ${dirName}/${repoName} && git push origin -u ${branchName} -f`);
	run(`rm -rf ${dirName}`);
	return {
		branchName,
	};
}

export default createCaseStudy;
