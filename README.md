# Overhaul in progress! [You can still use version 1.1.2](https://github.com/tadhglewis/issue-status/tree/d8bc206c84f59be3feaca09a04467119895939de) or alternatively [view all previously tagged releases](https://github.com/tadhglewis/issue-status/releases)

## Providers

The data fetching layer is separated into so called _Providers_. This allows you to swap out the underlying data source that powers the frontend.

Currently, only the following providers are supported

- GitHub - uses the GitHub API and GitHub Issues as a source.
- Static - a testing provider with static data.

**Contributions:** If you have created a custom provider which may have value to others, please feel free to reach out to discuss including it in this project.
