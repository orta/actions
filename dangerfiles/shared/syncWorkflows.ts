import {danger} from "danger"
import {Push} from "github-webhook-event-types"
import {basename, extname} from "path"

//  What file do we want 
const file = process.env.FILEPATH || ".github/main.workflow"
// The main branch to care about 
const mergeBranch = process.env.MERGE_BRANCH || "master"
// What repos do we want to copy it to
const coreRepos = process.env.REPOS && process.env.REPOS.split(",") || ["orta/actions2"]

export default async (push:Push) => {
  // Bail early on non-master merges
  if (push.ref !== `refs/heads/${mergeBranch}`) {
    return 
  }
  
  const thisRepo = push.repository.full_name
  const currentWorkflowContent =  await danger.github.utils.fileContents(file, thisRepo, mergeBranch)
  for (const fullRepo of coreRepos) {
    const owner = fullRepo.split("/")[0]
    const repo = fullRepo.split("/")[1]
    
    // Grab the repo's workflow
    const repoWorkflowContent =  await danger.github.utils.fileContents(file, fullRepo)
    if (currentWorkflowContent === repoWorkflowContent) {
      continue
    }

    // Make set of FS changes as an object
    const newFileMap: any = {}
    newFileMap[file] = currentWorkflowContent

    // Some links
    const linkToFileMD = "[`" + file + "`](" + push.repository.html_url + "/blob/" + file + ")"
    const linkToRepoMD = "[`" + thisRepo + "`](" + push.repository.html_url + ")"

    // Creates a new branch called `update_workflow`, from `master`. Creates a commit with
    // the changes above and the message "Sets up ...". Then sends a PR to `orta/actions`
    // with the title "Update to the GitHub ..." and the body "The main workflow file ...".
    await danger.github.utils.createOrUpdatePR(
      {
        title: `Syncing update to ${basename(file)}`,
        body: `${linkToFileMD} was updated on ${linkToRepoMD}, this auto-generated PR moves the change over.`,
        owner,
        repo,
        baseBranch: "master",
        newBranchName: `update_${basename(file, extname(file))}`,
        commitMessage: `Migrates the changes to ${basename(file)} from ${thisRepo}`,
      },
      newFileMap
    )
  }
}
