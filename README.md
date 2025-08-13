![Issue Status](./demo-all.png)

<p align="center">
  <a href="https://tadhglewis.github.io/issue-status"><img src="https://img.shields.io/badge/view-demo-brightgreen" alt="view demo"></a>
  <a href="https://npmjs.com/package/issue-status"><img src="https://img.shields.io/npm/v/issue-status.svg" alt="npm package"></a>
  <a href="https://github.com/tadhglewis/issue-status/actions/workflows/ci.yml"><img src="https://github.com/tadhglewis/issue-status/actions/workflows/ci.yml/badge.svg?branch=master" alt="build status"></a>
</p>

# issue-status

A flexible, modern and blazingly fast ☄️ status page.

- 💗 System health
- 📝 Incident history, scheduled maintenance and postmortems
- ⌨️ Pre-built templates
- 🛜 Hosted on Cloudflare, GitHub Pages and more
- ✍️ Markdown support

Special thanks to my sponsors for their contributions

- [Tailscale](https://tailscale.com)

## Usage

```bash
# Scaffhold your status page repository
pnpm create issue-status

# Start development server
pnpm dev

# Build the static status page using the configuration provided with output `dist`
pnpm build
```

This status page can be deployed to any static hosting provider such as GitHub Pages, GitLab Pages, Cloudflare, Netlify, Vercel, Surge, Azure Static Web Apps, Render, Flightcontrol, Kinsta, xmit and more.

For deployment options and guides, see the [Vite static deployment documentation](https://vite.dev/guide/static-deploy).

### Configuration

`pnpm create issue-status` will scaffhold a new status page repository and guide you through the configuration.

You can make further configurations to the `issue-status.config.ts` file with the below syntax:

```typescript
import { defineConfig } from "issue-status";
import { github, static } from "issue-status/providers";

export default defineConfig({
  name: "My Status Page",
  description: "Status page for my services",

  provider: yourProvider({...})
});
```

## Providers

The data fetching is separated into so called _providers_. This allows you to swap out the underlying data source that powers the frontend.

- [GitHub](#github-provider) - powered by GitHub Issues
- [GitLab](#gitlab-provider) - powered by GitLab Issues
- [Static](#static-provider)

> [!NOTE]  
> Contributions: reach out if you've created a custom provider which may have value to others :)

### GitHub Provider

This provider utilises GitHub Issues with specific labels as the data source for the status page

```typescript
import { github } from "issue-status/providers";

export default defineConfig({
  ...
  provider: github({
    owner: "your-github-username",
    repo: "your-repo-name",
  }),
});
```

#### Components

Labels: `issue status`, `component` and one of `operational`, `degraded performance`, `partial outage` or `major outage`

You can create subcomponents by naming issues with the following syntax:

- `CDN`
- `CDN > Oceania`
- `CDN > Southeast Asia`

#### Incidents

Labels: `issue status`, `incident` and optionally `maintenance` which will mark the incident as "Scheduled" instead of "Active"

#### Limitations

- The provider respects GitHub's unauthenticated requests API rate limit and therefore responses are cached in the browser for 10 minutes.

### GitLab Provider

This provider utilises GitLab Issues with specific labels as the data source for the status page

```typescript
import { gitlab } from "issue-status/providers";

export default defineConfig({
  ...
  provider: gitlab({
    projectId: "your-project-id",
    host: "https://gitlab.com", // optional, defaults to gitlab.com
  }),
});
```

#### Components

Labels: `issue status`, `component` and one of `operational`, `degraded performance`, `partial outage` or `major outage`

You can create subcomponents by naming issues with the following syntax:

- `CDN`
- `CDN > Oceania`
- `CDN > Southeast Asia`

#### Incidents

Labels: `issue status`, `incident` and optionally `maintenance` which will mark the incident as "Scheduled" instead of "Active"

#### Limitations

- The provider respects GitLab's API rate limits and therefore responses are cached in the browser for 30 seconds.

### Static Provider

A provider that uses static data, primarily useful for testing and development.

```typescript
import { staticProvider } from "issue-status/providers";

export default defineConfig({
  provider: staticProvider({
    components: [
      {
        id: "api",
        name: "API",
        status: "operational",
        children: [
          {
            id: "auth",
            name: "Authentication",
            status: "operational",
          },
        ],
      },
      {
        id: "database",
        name: "Database",
        status: "degradedPerformance",
      },
    ],
    incidents: [
      {
        id: "1",
        title: "API Response Times",
        description:
          "We are investigating slower than normal API response times.",
        createdAt: "2023-01-01T00:00:00Z",
        scheduled: false,
        active: true,
      },
    ],
    historicalIncidents: [
      {
        id: "2",
        title: "Database Maintenance",
        description: "Scheduled database maintenance completed successfully.",
        createdAt: "2023-01-01T00:00:00Z",
        scheduled: true,
        active: false,
      },
    ],
  }),
});
```

## Templates

Pre-built incident templates are included to quickly provide updates on an incident. These templates are available when creating a GitHub Issue.

You may [modify templates](./.github/ISSUE_TEMPLATE/) to suit your needs.

## Demo

[**View demo now!**](https://tadhglewis.github.io/issue-status)

This demo is hosted on GitHub Pages and using the GitHub [provider](#github-provider).
