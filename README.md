# actions

Currently:

- PRs get a Danger JS run
- Get danger-swift working (kinda blocked on danger-js work, but the whole swift/process stuff works)
- Issue comments can trigger adding the label "merge on green" - [src](https://github.com/artsy/peril-settings/blob/master/org/markAsMergeOnGreen.ts)
- Syncing workflows across many repos by sending PRs

TODO:

- On a green status, merge if the label applies - [src](https://github.com/artsy/peril-settings/blob/master/org/mergeOnGreen.ts)
