import { defineConfig } from "issue-status";
import { github } from "issue-status/providers";

export default defineConfig({
  name: "My Status Page",
  description: "Status page for my services",
  provider: github({
    owner: "your-github-username",
    repo: "your-repo-name",
  }),
});
