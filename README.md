# Issue Status

## Simple GitHub Issues based status page

### Demo

You can view the Issue Status demo [here](https://tadhglewis.github.io/issue-status).

### Info

- A `Component` each display a current status. To create a Component add tags `issue status`, `component` and a tag for the current status: `operational`, `performance issues`, `partial outage` and `major outage` (if an issue only has `issue status` it will be listed as `Unknown`) to a GitHub Issue.
- An `Incident` will show in the Incidents section as either `Active` or `Closed` depending whether the GitHub Issue is Open or Closed. To create an Incident add tags `issue status` and `incident` to a GitHub Issue.

Each components is a GitHub Issue with tag `issue status` and the a tag for the current status: `operational`, `performance issues`, `partial outage` and `major outage` (if an issue only has `issue status` it will be listed as `Unknown`). You can view all Component issues [here](https://github.com/tadhglewis/issue-status/issues?q=is%3Aissue+is%3Aopen+label%3A%22issue+status%22)

### Setup

Coming Soon

### Limitations

- The GitHub API has a rate limit of 60 requests per hour. Issue Status will fetch 15 times per hour, sending 2 requests per fetch / 30 requests per hour (excluding reload button).
