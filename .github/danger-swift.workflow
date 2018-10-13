workflow "Dangerfile Swift Eval" {
  on = "pull_request"
  resolves = "Danger Swift"
}

action "Danger Swift" {
  // uses = "danger/danger-swift"
  uses = "./danger-swift"
  env = {
    DEBUG = "*"
  }
  secrets = ["GITHUB_TOKEN"]
}
