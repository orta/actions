// Adds the 
workflow "Detect 'Merge on Green' messages" {
  on = "issue_comment"
  resolves = ["Detect a Merge on Green"]
}

action "Detect a Merge on Green" {
  args = "--dangerfile artsy/peril-settings/org/markAsMergeOnGreen.ts"
  uses = "./danger-js"
  secrets = ["GITHUB_TOKEN"]
}

// This works with CI providers 

workflow "Merge on Green" {
  on = "status"
  resolves = ["Look for Green Statuses"]
}

action "Look for Green Statuses" {
  args = "--dangerfile artsy/peril-settings/org/mergeOnGreen.ts"
  uses = "./danger-js"
  secrets = ["GITHUB_TOKEN"]
}


// This works with checks only 

workflow "Merge on Green" {
  on = "check_suite"
  resolves = ["Look for Green Check Runs"]
}

action "Look for Green Check Runs" {
  args = "--dangerfile dangerfiles/shared/mergeAfterCheckSuite.ts"
  uses = "./danger-js"
  secrets = ["GITHUB_TOKEN"]
}


// Adds Danger JS so that something can be green

workflow "Dangerfile JS Eval" {
  on = "pull_request"
  resolves = "Danger JS"
}

action "Danger JS" {
  // uses = "danger/danger-swift"
  uses = "./danger-js"
  secrets = ["GITHUB_TOKEN"]
}
