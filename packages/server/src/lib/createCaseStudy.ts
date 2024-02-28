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
	run(`echo "${env.ED25519_PRIV}" > /root/.ssh/id_ed25519`);
	run("chmod 400 /root/.ssh/id_ed25519");

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

	let markdown = `# ${caseStudy.title}

${caseStudy.markdown ? caseStudy.markdown : ""}

### Metadata
Title: **${caseStudy.title}**
Author: **${caseStudy.name}** (${caseStudy.email})
Category: **${caseStudy.category}**
Context: **[${caseStudy.contextUrl}](${caseStudy.contextUrl})**`;

	if (caseStudy.details) {
		markdown += `\nDetails: **${caseStudy.details}**`;
	}

	if (address) {
		markdown += `\nSigned by: **${address}**`;
	}

	markdown += `\nCreated: **${now.toISOString()}**`;

	run(`mkdir -p ${pathToFrontendPackage}/src/markdown`);
	run(`echo "${markdown}" > ${pathToFrontendPackage}/src/markdown/${slug}.mdx`);
	run(`cd ${dirName}/${repoName} && git checkout -b ${branchName}`);
	run(
		`cd ${dirName}/${repoName} && git add ${pathToFrontendPackage}/src/markdown/${slug}.mdx`,
	);
	run(
		`cd ${dirName}/${repoName} && git commit -m 'New Case Study: ${caseStudy.title}' --author="${user.name} <${user.email}>" `,
	);
	run(`cd ${dirName}/${repoName} && git push origin -u ${branchName} -f`);
	run(`rm -rf ${dirName}`);

	run("rm -rf /root/.ssh/id_ed25519");
	return {
		branchName,
	};
}

export default createCaseStudy;
