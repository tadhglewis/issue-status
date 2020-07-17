# Issue Status

Simple, modern and flexible status page

![Banner](/banner.gif?raw=true)

Issue Status is the static client-side status page built on React using GitHub Issues for Component and Incident reporting with live updating using the GitHub API, there is no need to rebuild and redeploy for every update. All hosted on GitHub Pages

## Demo

You can view the Issue Status demo [here](https://tadhglewis.github.io/issue-status). This demo is hosted on GitHub Pages

## Features

- Easy setup
- Show status of your services using Components
- Report Incidents
- Component and Incident templates
- Easy integration with services and monitoring
- Live updating status page
- Hosting on GitHub Pages or other hosting providers
- Use Zapier Triggers to update the status page

## Setup

- Clone / Fork this repository to your GitHub account (forking only required for GitHub Pages)
- Run `git checkout tags/VERSION` to checkout to the [latest version](#configuration). It is not recommended to setup using the master branch
- Edit the `.env` file found in the root directory and enter your [configuration options](#configuration)

### GitHub Pages

- Run `npm run deploy` this will build the React project and deploy it to the `gh-pages` branch
- Finally make sure GitHub Pages option in your GitHub repository settings is set to use the `gh-pages` branch

### Other hosting providers

- Run `npm run build` this will create a build directory containing the built app
- For deploying [click here](https://create-react-app.dev/docs/deployment)

You may also want to [configure issue templates for your repository](https://help.github.com/en/github/building-a-strong-community/configuring-issue-templates-for-your-repository) which will act as Component and Incident templates. **Including the `issue status` label in an issue template will allow unauthorised GitHub users to update the status page, this should be added when creating the issue**

## Update

Updating is important to get the latest features and patches

- [This guide](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/syncing-a-fork) should bring you through the steps of syncing your forked version of this repository. Ensure you have backed up your `.env` configuration file as this may be overwritten, you will need to make sure you include the env variables from the latest version
- Run `git checkout tags/VERSION` to checkout to the [latest version](#configuration). It is not recommended to setup using the master branch

### GitHub Pages

- Run `npm run deploy` to deploy the latest version to GitHub Pages

### Other hosting providers

- Run `npm run build` to create a new build directory
- For deploying [click here](https://create-react-app.dev/docs/deployment)

## Advanced

Integrate and automate Components and Incidents, this may be useful for changing a Component to `major outage` when you detect your services aren't running or `performance issues` when the response time goes over a set point.

- Issue Status API (GitHub API wrapper) - [In the future](https://github.com/tadhglewis/issue-status/issues/18), there will be a GitHub API wrapper which can be hosted on a server. This will expose simplified endpoints for integrating with monitoring services, IFTTT and any other services
- [IFTTT](https://ifttt.com) - This is currently not possible due to a couple issues. 1. GitHub service does not include labels in the create Issue action. 2. The GitHub service does not have an update Issue action. It is also not possible to call the GitHub API directly as IFTTT does not include a User-Agent header in the Webhooks service and [all requests with no User-Agent header will be rejected by the GitHub API](https://developer.github.com/v3/#user-agent-required). This is possible using the Issue Status API
- [Zapier](https://zapier.com) - You can create Zaps which have a trigger and an action, use the GitHub Integrations action to update/created Components and Incidents with any of the Zapier Triggers
- [GitHub API](https://developer.github.com) - You can use the GitHub API directly, you can use this for more advanced options

## Configuration

Customise your status page - ensure all required options are entered and any unused optional options are set blank, ie `REACT_APP_MANIFEST=`

- `REACT_APP_MANIFEST` (optional) - Determines the manifest url in the built HTML file
- `REACT_APP_TITLE` (required) - Determines the `<title>` tag in the built HTML file with suffix `Status`
- `REACT_APP_DESCRIPTION` (optional) - Determines the description `<meta>` tag in the built HTML file
- `REACT_APP_LOGO` (optional) - Accepts an image URL and is used in the status page header
- `REACT_APP_NAME` (optional) - Used in the status page header when no `REACT_APP_LOGO` is provided. This will be used in the img alt attribute if a logo is provided
- `REACT_APP_REPOSITORY` (required) - GitHub `username/repository` that Components and Incidents will be fetched from, ie `tadhglewis/issue-status`

## Details

In depth overview of the functionality

- The main status bar logic is as follows: < 70% Components `operational` = "Some systems are experiencing issues", more than 0 Components `major outage` = "Some systems are experiencing a major outage". Otherwise, "All Systems Operational"
- A `Component` each display a current status. To create a Component add tags `issue status`, `component` and a tag for the current status: `operational`, `performance issues`, `partial outage` or `major outage` (if an issue only has `issue status` and `component` it will be listed as `Unknown`) to a GitHub Issue. You can view all the demo Components [here](https://github.com/tadhglewis/issue-status/issues?q=is%3Aissue+label%3A%22issue+status%22+label%3A%22component%22)
- A `Incident` will show in the Incidents section as either `Active` or `Closed` depending whether on the GitHub Issue is Open or Closed. To create an Incident add tags `issue status` and `incident` to a GitHub Issue. You can view all the demo Incidents [here](https://github.com/tadhglewis/issue-status/issues?q=is%3Aissue+label%3A%22issue+status%22+label%3A%22incident%22)
- Issue Status uses the [GitHub API v3](https://developer.github.com/v3) which has a rate limit of 60 requests per hour for unauthenticated requests (Issue Status is client side and will use unauthenticated requests). Issue Status will fetch 15 times per hour, sending 2 requests per fetch / 30 requests per hour (excluding reload button)

If you have any issues or questions feel free to contact me

## Version

1
