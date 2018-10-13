// This uses the root Dangerfile in the repo

workflow "Dangerfile JS Eval" {
  on = "pull_request"
  resolves = "Danger JS"
}

action "Danger Swift" {
  // uses = "danger/danger-swift"
  uses = "./danger-swift"
  env = {
    DEBUG = "*"
  }
  secrets = ["GITHUB_TOKEN"]
}
