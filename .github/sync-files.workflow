workflow "Sync Workflows" {
  on = "push"
  resolves = ["Sync workflows across many repos"]
}

action "Sync workflows across many repos" {
  // uses = "orta/actions/danger-js"
  uses = "./danger-js"
  args = "--dangerfile orta/actions/dangerfiles/shared/syncWorkflows.ts"
  secrets = ["GITHUB_TOKEN"]
  env = {
    DEBUG = "*"
    FILEPATH = "hello.md"
    REPOS = "orta/electronvolt"
    MERGE_BRANCH = "master"
  }
}
