import child from "child_process"
import { CaseStudy, GithubUser } from "./interfaces"

const run = (cmd: string) => {
  return child.execSync(cmd, { stdio: "inherit" })
}

function createCaseStudy(
  user: GithubUser,
  caseStudy: CaseStudy,
  isProd: boolean,
) {
  console.log("writing case study submitted by", user.email)
  let branchName = `${caseStudy.email}/mutual-supply-${Date.now()}`
  if (!isProd) {
    branchName += "-dev"
  }
  const now = Date.now()
  const dirName = `/tmp/new-study-${Date.now()}`
  const repoName = "library"
  const pathToFrontendPackage = `${dirName}/${repoName}/packages/frontend`
  run(`mkdir ${dirName}`)
  run(`echo 'testing this out ${now}' > /tmp/test-${now}.txt`)
  run(
    `GIT_SSH_COMMAND="ssh -i /root/.ssh/id_ed25519" git clone git@github.com:mutualsupply/${repoName}.git ${dirName}/${repoName}`,
  )
  if (!isProd) {
    run(`cd ${dirName}/${repoName} && git checkout dev`)
  }
  let markdown = `
# ${caseStudy.title}
### by ${caseStudy.name} (${caseStudy.email})
### organization: ${caseStudy.organizationName}

${caseStudy.productDescription}
${caseStudy.industry}
Uses a blockchain: ${caseStudy.doesUseChain ? "Yes" : "No"}
Author is part of the team: ${caseStudy.partOfTeam ? "Yes" : "No"}
  `
  if (caseStudy.url) {
    markdown += `\n[${caseStudy.url}](${caseStudy.url})`
  }
  if (caseStudy.markdown) {
    markdown += `\n${caseStudy.markdown}`
  }

  run(
    `echo "${markdown}" > ${pathToFrontendPackage}/src/markdown/mutual-supply.mdx`,
  )
  run(`cd ${dirName}/${repoName} && git status`)
  run(`cd ${dirName}/${repoName} && git branch ${branchName}`)
  run(`cd ${dirName}/${repoName} && git checkout ${branchName}`)
  run(`cd ${dirName}/${repoName} && git add .`)
  run(
    `cd ${dirName}/${repoName} && git commit -m 'testing' --author "${user.name} <${user.email}>" `,
  )
  run(`cd ${dirName}/${repoName} && git push origin -u ${branchName}`)
  run(`rm -rf ${dirName}`)
  return {
    branchName,
  }
}

export default createCaseStudy
