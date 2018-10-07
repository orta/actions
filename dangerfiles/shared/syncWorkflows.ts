import {danger} from "danger"
import {Push} from "github-webhook-event-types"

// Still undecided on how args like "core repos" should work
// probably env vars

export default async (push:Push) => {
  console.log(JSON.stringify(push, null, 2))

  // Bail early on non-master merges
  if (push.ref !== "refs/heads/master") {
    return 
  }
  
  const thisRepo = push.repository.full_name
  const coreRepos = ["orta/actions2"]

  const workflowPath = ".github/main.workflow"
  const currentWorkflowContent =  await danger.github.utils.fileContents(workflowPath, thisRepo, push.ref)

  console.log(`For ${thisRepo}: \n${currentWorkflowContent}`)
  for (const fullRepo of coreRepos) {
    const owner = fullRepo.split("/")[0]
    const repo = fullRepo.split("/")[1]

    // Grab the repo's workflow
    const repoWorkflowContent =  await danger.github.utils.fileContents(workflowPath, fullRepo)
    console.log(`For ${fullRepo}: \n${repoWorkflowContent}`)

    if (currentWorkflowContent === repoWorkflowContent) {
      continue
    }

    // Make set of FS changes as an object
    const newFileMap: any = {}
    newFileMap[workflowPath] = currentWorkflowContent

    // Creates a new branch called `update_workflow`, from `master`. Creates a commit with
    // the changes above and the message "Sets up ...". Then sends a PR to `orta/actions`
    // with the title "Update to the GitHub ..." and the body "The main workflow file ...".
    await danger.github.utils.createOrUpdatePR(
      {
        title: "Update to the GitHub Workflow frile",
        body: `The main workflow file in ${thisRepo} was updated, this auot-generated PR moves the changes over.`,
        owner,
        repo,
        baseBranch: "master",
        newBranchName: "update_workflow",
        commitMessage: `Migrates the changes from ${thisRepo}`,
      },
      newFileMap
    )
  }
}
