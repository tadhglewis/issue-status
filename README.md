# issue-status

A flexible, modern and blazingly fast ☄️ status page

![Issue Status](./demo-all.png)

## Quick Start

### As a Package

```bash
npm install -g issue-status
issue-status init my-status-page
cd my-status-page
npm install
issue-status dev
```

### Manual Setup

1. Clone or use this repository as a template
2. Create an `issue-status.config.ts` file:

```typescript
import { IssueStatusConfig } from "./src/api/types";
import { github, staticProvider } from "./src/providers";

export default {
  name: "My Status Page",
  description: "System status for My Company",
  provider: github({
    owner: "your-username",
    repo: "your-status-repo",
    token: process.env.GITHUB_TOKEN, // Optional
  }),
  footer: {
    text: "Powered by My Status",
    link: "https://mystatus.com",
  },
} satisfies IssueStatusConfig;
```

3. Run `npm run dev` to start the development server

## Features

💗 System health

📝 Incident history, scheduled maintenance and postmortems

⌨️ Pre-built templates

🌓 Dark mode (theming)

🛜 Hosted on GitHub Pages and more

✍️ Markdown support

🔴 Live updates

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

## Configuration

The `issue-status.config.ts` file supports the following options:

```typescript
interface IssueStatusConfig {
  name: string;                    // Display name for your status page
  description?: string;            // Description (currently unused)
  favicon?: string;               // Custom favicon URL (currently unused)
  logo?: string;                  // Custom logo URL (currently unused)
  provider: Provider;             // Data provider (see Providers section)
  theme?: {                       // Custom theme colors
    colors?: Partial<ThemeColors>;
  };
  footer?: {                      // Footer customization
    text?: string;                // Footer text
    link?: string;                // Footer link URL
  };
}
```

### Provider Configuration

#### GitHub Provider

```typescript
import { github } from "./src/providers";

github({
  owner: "your-username",         // Repository owner
  repo: "status-repo",           // Repository name
  token: "your-token",           // Optional: GitHub token for higher rate limits
})
```

#### Static Provider

```typescript
import { staticProvider } from "./src/providers";

staticProvider({
  components: [                   // Optional: custom components
    {
      id: "1",
      name: "API",
      status: "operational"
    }
  ],
  incidents: [],                 // Optional: custom incidents
  historicalIncidents: []        // Optional: custom historical incidents
})
```
