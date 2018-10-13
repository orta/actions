import { danger } from "danger"
import { CheckSuite } from "github-webhook-event-types"
import { LabelLabel } from "github-webhook-event-types/source/Label"

export const webhook = async (webhook: CheckSuite) => {
  const api = danger.github.api
  const status = webhook.check_suite.status

  if (status !== "completed") {
    return console.log(
      `Not a successful check suite - got ${status}`
    )
  }

  // Check to see if all other statuses on the same commit are also green. E.g. is this the last green.
  const owner = webhook.repository.owner.login
  const repo = webhook.repository.name
  const sha = webhook.check_suite.head_sha
  const allGreen = await api.repos.getCombinedStatusForRef({ owner, repo, ref: sha })
  if (allGreen.data.state !== "success") {
    return console.log("Not all statuses are green")
  }

  // See https://github.com/maintainers/early-access-feedback/issues/114 for more context on getting a PR from a SHA
  const repoString = webhook.repository.full_name
  const searchResponse = await api.search.issues({ q: `${sha} type:pr is:open repo:${repoString}` })

  // https://developer.github.com/v3/search/#search-issues
  const prsWithCommit = searchResponse.data.items.map((i: any) => i.number) as number[]
  for (const number of prsWithCommit) {
    // Get the PR labels
    const issue = await api.issues.get({ owner, repo, number })

    // Get the PR combined status
    const mergeLabel = issue.data.labels.find((l: LabelLabel) => l.name === "Merge On Green")
    if (!mergeLabel) {
      return console.log("PR does not have Merge on Green")
    }

    // Merge the PR
    await api.pullRequests.merge({ owner, repo, number, commit_title: `Merge pull request #${number} by Peril` })
    console.log(`Merged Pull Request ${number}`)
  }
}

export default webhook
