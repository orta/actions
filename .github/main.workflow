workflow "Merge on Green" {
  on = "issue_comment"
  resolves = ["Detect a Merge on Green"]
}

action "Detect a Merge on Green" {
  args = "--dangerfile artsy/peril-settings/org/markAsMergeOnGreen.ts"
  uses = "./danger-js"
  secrets = ["GITHUB_TOKEN"]
}

workflow "Merge on Status Green" {
  on = "status"
  resolves = ["Merge when Green"]
}

action "Merge when Green" {
  args = "--dangerfile artsy/peril-settings/org/mergeOnGreen.ts"
  uses = "./danger-js"
  secrets = ["GITHUB_TOKEN"]
}
