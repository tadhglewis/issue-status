# Issue Status

## Simple GitHub issues based status page

### Demo

You can view the Issue Status demo here. Each components is a GitHub Issue with tag `issue status` and the a tag for the current status: `operational`, `performance issues`, `partial outage` and `major outage` (if an issue only has `issue status` it will be listed as `Unknown`). You can view all Component issues [here](https://github.com/tadhglewis/issue-status/issues?q=is%3Aissue+is%3Aopen+label%3A%22issue+status%22)

### Setup

Coming Soon

### Limitations

- The GitHub API has a rate limit of 60 requests per hour. Issue Status will send 1 request per hour and cache it using localStorage
