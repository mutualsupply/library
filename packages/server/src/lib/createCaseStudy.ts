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
	console.log("writing priv key", env.ED25519_PRIV);
	// Write ssh key
	const sshKey = env.ED25519_PRIV;
	run(`echo "${sshKey}" > /root/.ssh/id_ed25519`);
	run("chmod 400 /root/.ssh/id_ed25519");
	console.log("logging");
	run("cd /root/.ssh/ && ls -la");

	// Write case study
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
Proof of Experience: **[${caseStudy.experienceUrl}](${
		caseStudy.experienceUrl
	})**`;

	if (caseStudy.organization) {
		markdown += `\nOrganization: **${caseStudy.organization}**`;
	}

	if (address) {
		markdown += `\nSigned by: **${address}**`;
	}

	markdown += `\nCreated: **${now.toISOString()}**`;

	// Write markdown file
	run(`echo "${markdown}" > ${pathToFrontendPackage}/src/markdown/${slug}.mdx`);
	// Create new branch
	run(`cd ${dirName}/${repoName} && git checkout -b ${branchName}`);
	// Commit markdown
	run(
		`cd ${dirName}/${repoName} && git add ${pathToFrontendPackage}/src/markdown/${slug}.mdx`,
	);
	run(
		`cd ${dirName}/${repoName} && git commit -m 'New Case Study: ${caseStudy.title}' --author="${user.name} <${user.email}>" `,
	);
	run(`cd ${dirName}/${repoName} && git push origin -u ${branchName} -f`);
	run(`rm -rf ${dirName}`);

	// Remove ssh key
	run("rm -rf /root/.ssh/id_ed25519");
	return {
		branchName,
	};
}

export default createCaseStudy;
