import child from "child_process"
import { CaseStudy, GithubUser } from "./interfaces"

const run = (cmd: string) => {
  return child.execSync(cmd, { stdio: "inherit" })
}

function createCaseStudy(
  user: GithubUser,
  caseStudy: CaseStudy,
  isProd: boolean,
  slug: string,
  address?: `0x${string}`,
) {
  console.log("writing case study submitted by", user.email)
  const branchName = `${caseStudy.email}/${slug}`
  const now = new Date()
  const dirName = `/tmp/new-study-${slug}`
  const repoName = "library"
  const pathToFrontendPackage = `${dirName}/${repoName}/packages/frontend`
  run(`rm -rf ${dirName} && mkdir ${dirName}`)
  run(
    `GIT_SSH_COMMAND="ssh -i /root/.ssh/id_ed25519" git clone git@github.com:mutualsupply/${repoName}.git ${dirName}/${repoName}`,
  )
  if (!isProd) {
    run(`cd ${dirName}/${repoName} && git checkout dev`)
  }
  let markdown = `# ${caseStudy.title}

${caseStudy.markdown ? caseStudy.markdown : ""}

### Metadata\n
Organization: **${caseStudy.organizationName}**\n
Type: **${caseStudy.type}**\n
Industry: **${caseStudy.industry}**\n
Authored by: **${caseStudy.name}** (${caseStudy.email})\n
Created on: **${now.toISOString()}**\n
Is Part Of Team: **${caseStudy.partOfTeam ? "Yes" : "No"}**
${address ? `\nAddress: **${address}**` : ""}
${
  caseStudy.url
    ? `\nProof of Experience: **[${caseStudy.url}](${caseStudy.url})**`
    : ""
}
`
  run(`echo "${markdown}" > ${pathToFrontendPackage}/src/markdown/${slug}.mdx`)
  run(`cd ${dirName}/${repoName} && git status`)
  run(`cd ${dirName}/${repoName} && git branch ${branchName}`)
  run(`cd ${dirName}/${repoName} && git checkout ${branchName}`)
  run(`cd ${dirName}/${repoName} && git add .`)
  run(
    `cd ${dirName}/${repoName} && git commit -m 'testing' --author "${user.name} <${user.email}>" `,
  )
  run(`cd ${dirName}/${repoName} && git push origin -u ${branchName} -f`)
  run(`rm -rf ${dirName}`)
  return {
    branchName,
  }
}

export default createCaseStudy
