workflow "Dangerfile Swift Eval" {
  on = "pull_request"
  resolves = "Danger Swift"
}

action "Danger Swift" {
  // uses = "danger/danger-js"
  uses = "./danger-swift"
  env = {
    DEBUG = "*"
  }
}

workflow "Dangerfile Eval" {
  on = "pull_request"
  resolves = "Danger JS"
}

action "Danger JS" {
  // uses = "danger/danger-js"
  uses = "./danger-js"
  args = "--dangerfile periltest/settings/logStuff.ts"
  env = {
    DEBUG = "*"
  }
}

workflow "Merge on Green" {
  on = "issue_comment"
  resolves = ["Detect a Merge on Green"]   
}

action "Detect a Merge on Green" {
  args = "--dangerfile periltest/org/markAsMergeOnGreen.ts"
  uses = "./danger-js"
  secrets = ["GITHUB_TOKEN"]
  env = {
    DEBUG = "*"
  }
}
