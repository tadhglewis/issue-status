# issue-status

A flexible, modern and blazingly fast ☄️ status page

![Issue Status](./demo-all.png)

## Features

💗 System health

📝 Incident history, scheduled maintenance and postmortems

⌨️ Pre-built templates

🌓 Dark mode (theming)

🛜 Hosted on GitHub Pages and more

✍️ Markdown support

🔴 Live updates

## Usage

```bash
# Scaffhold your status page repository
pnpm create issue-status

# Start development server
pnpm dev

# Build the static status page using the configuration provided
pnpm build
```

### Configuration

`pnpm create issue-status` will scaffhold a new status page repository and guide you through the configuration.

You can make further configurations with the below syntax:

```typescript
import { IssueStatusConfig } from "issue-status";
// Import your data provider
import { githubProvider, staticProvider } from "issue-status/providers";

export default {
  name: "My Status Page",
  description: "System status and incident updates",
  // provider: staticProvider({...}),
  // OR
  // provider: gitHubProvider({...}),
} satisfies IssueStatusConfig;
```

## Demo

[**View demo now!**](https://tadhglewis.github.io/issue-status)

This demo is hosted on GitHub Pages and using the GitHub [provider](#providers).

## Templates

Pre-built incident templates are included to quickly provide updates on an incident. These templates are available when creating a GitHub Issue.

You may [modify templates](./.github/ISSUE_TEMPLATE/) to suit your needs.

## Providers

The data fetching layer is separated into so called _Providers_. This allows you to swap out the underlying data source that powers the frontend.

Currently, only the following providers are supported:

- GitHub - uses the GitHub API and GitHub Issues as a source.
- Static - a testing provider with static data.

**Contributions:** If you have created a custom provider which may have value to others, please feel free to reach out to discuss including it in this project.

## Theming

Currently, there are two available themes which will automatically be applied based on the users system preferences:

- `light`
- `dark`

Theming tokens are available for editing in the [themes](./src/app/themes.ts) file.
