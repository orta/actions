import {danger} from "danger"
import {Push} from "github-webhook-event-types"

// Still undecided on how args like "core repos" should work
// probably env vars

export default async (push:Push) => {
  // Bail early on non-master merges
  if (push.ref !== "refs/heads/master") {
    return 
  }
  
  const thisRepo = push.repository.full_name
  const coreRepos = ["orta/actions2"]

  const workflowPath = ".github/main.workflow"
  const currentWorkflowContent =  await danger.github.utils.fileContents(workflowPath, thisRepo, "master")
  for (const fullRepo of coreRepos) {
    const owner = fullRepo.split("/")[0]
    const repo = fullRepo.split("/")[1]
    
    // Grab the repo's workflow
    const repoWorkflowContent =  await danger.github.utils.fileContents(workflowPath, fullRepo)
    if (currentWorkflowContent === repoWorkflowContent) {
      continue
    }

    // // Make set of FS changes as an object
    // const newFileMap: any = {}
    // newFileMap[workflowPath] = currentWorkflowContent

    // // Creates a new branch called `update_workflow`, from `master`. Creates a commit with
    // // the changes above and the message "Sets up ...". Then sends a PR to `orta/actions`
    // // with the title "Update to the GitHub ..." and the body "The main workflow file ...".
    // await danger.github.utils.createOrUpdatePR(
    //   {
    //     title: "Update to the GitHub Workflow file",
    //     body: `The main workflow file in ${thisRepo} was updated, this auto-generated PR moves the changes over.`,
    //     owner,
    //     repo,
    //     baseBranch: "master",
    //     newBranchName: "update_workflow",
    //     commitMessage: `Migrates the changes from ${thisRepo}`,
    //   },
    //   newFileMap
    // )

    // Make set of FS changes as an object
    const newFileMap: any = {}
    newFileMap[".github/thingy"] = "{}"

    // Creates a new branch called `update_workflow`, from `master`. Creates a commit with
    // the changes above and the message "Sets up ...". Then sends a PR to `orta/actions`
    // with the title "Update to the GitHub ..." and the body "The main workflow file ...".
    await danger.github.utils.createOrUpdatePR(
      {
        title: "Update to the [x] file",
        body: `The file in ${thisRepo} was updated, this auto-generated PR moves the changes over.`,
        owner: "orta",
        repo: "actions",
        baseBranch: "master",
        newBranchName: "update_file",
        commitMessage: `Migrates the changes from ${thisRepo}`,
      },
      newFileMap
    )
  }
}
