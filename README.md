# Issue Status

## Simple status page built using React and GitHub Issues

![Banner](/banner.gif?raw=true)

### Demo

You can view the Issue Status demo [here](https://tadhglewis.github.io/issue-status). This demo is hosted on GitHub Pages

### Info

You are able to automate Components and Incidents using the [GitHub API](https://developer.github.com). This may be useful for changing a Component to `major outage` when you detect your services aren't running or `performance issues` when the response time goes over a set point

- The main status bar logic is as follows: < 70% Components `operational` = "Some systems are experiencing issues", more than 0 Components `major outage` = "Some systems are experiencing a major outage". Otherwise "All Systems Operational"
- A `Component` each display a current status. To create a Component add tags `issue status`, `component` and a tag for the current status: `operational`, `performance issues`, `partial outage` or `major outage` (if an issue only has `issue status` and `component` it will be listed as `Unknown`) to a GitHub Issue. You can view all the demo Components [here](https://github.com/tadhglewis/issue-status/issues?q=is%3Aissue+label%3A%22issue+status%22+label%3A%22component%22)
- A `Incident` will show in the Incidents section as either `Active` or `Closed` depending whether the GitHub Issue is Open or Closed. To create an Incident add tags `issue status` and `incident` to a GitHub Issue. You can view all the demo Incidents [here](https://github.com/tadhglewis/issue-status/issues?q=is%3Aissue+label%3A%22issue+status%22+label%3A%22incident%22)

### Setup

#### Using GitHub Pages

- Clone / Fork this repository to your GitHub account
- Edit the `package.json` file and update `homepage`. You should enter the URL you are using for the status page
- Edit the `config.js` file found in `src/config.js` and enter your GitHub username in the `user` field. Other configuration options are available
- Run `npm run deploy` this will build the React project and deploy it to the `gh-pages` branch
- Finally make sure GitHub Pages option in your GitHub repository settings is set to use the `gh-pages` branch

#### Using other hosting

- Documentation coming soon...

### Configuration

#### package.json

- The `homepage` field will determine the root URL in the built HTML file. You should enter the URL you are using for the status page

#### config.js (src/config.js)

- The `logo` field accepts a image URL and is used in the status page header. Ensure the image size is correct
- The `name` field is used when no `logo` is provided and is used in the status page header. This will be used in the img alt attribute if a logo is provided

### Update

[This guide](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/syncing-a-fork) should bring you through the steps of syncing your forked version of this repository. Ensure you have made a backup of your configurations as these may be overridden

### Limitations

- Issue Status uses the [GitHub API v3](https://developer.github.com/v3) which has a rate limit of 60 requests per hour for unauthenticated requests (Issue Status is client side and will use unauthenticated requests). Issue Status will fetch 15 times per hour, sending 2 requests per fetch / 30 requests per hour (excluding reload button)

If you have any issues or questions feel free to contact me

### Version

1
