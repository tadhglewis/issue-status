# create-issue-status

## Scaffolding your first issue status page

With NPM:

```bash
$ npm create issue-status@latest
```

With Yarn:

```bash
$ yarn create issue-status
```

With PNPM:

```bash
$ pnpm create issue-status
```

With Bun:

```bash
$ bun create issue-status
```

Then follow the prompts!

You can also directly specify the project name and the template you want to use via additional command line options. For example, to scaffold an Issue Status project, run:

```bash
# npm 7+, extra double-dash is needed:
npm create issue-status@latest my-status-page -- --template static

# yarn
yarn create issue-status my-status-page --template static

# pnpm
pnpm create issue-status my-status-page --template static

# bun
bun create issue-status my-status-page --template static
```

Currently supported template presets include:

- `static` - Simple static data (good for getting started)
- `github` - Use GitHub Issues as data source
- `custom` - Implement your own provider

## Generated Project Structure

```
my-status-page/
├── issue-status.config.ts  # Your configuration
├── package.json           # Dependencies and scripts
└── node_modules/          # Installed dependencies
```

## Available Scripts

In the generated project:

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Provider Types

### Static Provider

Perfect for getting started. Uses static data defined in your config file.

### GitHub Provider

Uses GitHub Issues as your data source. Requires:

- Issues labeled with `issue status` + `component` for components
- Issues labeled with `issue status` + `incident` for incidents
- Status labels: `operational`, `degraded performance`, `partial outage`, `major outage`

### Custom Provider

Implement your own data source by completing the provider interface in the generated config file.
