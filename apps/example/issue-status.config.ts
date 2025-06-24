import { defineConfig } from "issue-status";
import { github, gitlab } from "issue-status/providers";

export default defineConfig({
  name: "My Status Page",
  description: "Status page for my services",
  // Optional: Custom favicon (defaults to /vite.svg)
  favicon: "https://www.seek.com.au/favicon.ico",
  // Optional: Logo to display in header
  logo: "https://www.seek.com.au/apple-touch-icon.png",
  provider: github({
    owner: "tadhglewis",
    repo: "issue-status",
  }),
  // provider: gitlab({
  //   projectId: "70936298",
  // }),
});
