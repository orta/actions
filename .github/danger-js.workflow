// This uses the root Dangerfile in the repo

workflow "Dangerfile JS Eval" {
  on = "pull_request"
  resolves = "Danger JS"
}

action "Danger JS" {
  // uses = "danger/danger-swift"
  uses = "./danger-js"
  env = {
    DEBUG = "*"
  }
  secrets = ["GITHUB_TOKEN"]
}
