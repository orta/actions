// workflow "Set Up Merge On Green" {
//   on = "issue_comment"
//   resolves = "listen for merge on green"
// }

// action "listen for merge on green" {
//   // uses = "danger/danger-js"
//   uses = "./danger-js"
//   args = "--dangerfile artsy/peril-settings@org/markAsMergeOnGreen.ts"
//   // args = "--dangerfile artsy/peril-settings@org/markAsMergeOnGreen.ts"
// }

// workflow "Set Up Merge On Green" {
//   on = "status"
//   resolves = "Merge when green"
// }

// action "listen for merge on green" {
//   // uses = "danger/danger-js"
//   uses = "./danger-js"
//   args = "--dangerfile artsy/peril-settings@org/markAsMergeOnGreen.ts"
//   // args = "--dangerfile artsy/peril-settings@org/markAsMergeOnGreen.ts"
// }

workflow "Dangerfile Eval" {
  on = "pull_request"
  resolves = "Echo"
}

action "Echo" {
  // uses = "danger/danger-js"
  uses = "./danger-js"
  args = "--dangerfile periltest/settings/logStuff.ts"
  secrets = ["GITHUB_TOKEN"]
  env = {
    DEBUG = "*"
  }

  // workflow "Set Up Merge On Green" {
  //   on = "issue_comment"
  //   resolves = "listen for merge on green"
  // }

  // action "listen for merge on green" {
  //   // uses = "danger/danger-js"
  //   uses = "./danger-js"
  //   args = "--dangerfile artsy/peril-settings@org/markAsMergeOnGreen.ts"
  //   // args = "--dangerfile artsy/peril-settings@org/markAsMergeOnGreen.ts"
  // }

  // workflow "Set Up Merge On Green" {
  //   on = "status"
  //   resolves = "Merge when green"
  // }

  // action "listen for merge on green" {
  //   // uses = "danger/danger-js"
  //   uses = "./danger-js"
  //   args = "--dangerfile artsy/peril-settings@org/markAsMergeOnGreen.ts"
  //   // args = "--dangerfile artsy/peril-settings@org/markAsMergeOnGreen.ts"
  // }

  // args = "--dangerfile artsy/peril-settings@org/markAsMergeOnGreen.ts"
}
