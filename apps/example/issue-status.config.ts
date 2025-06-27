import { defineConfig } from "issue-status";
import { atlassian, github, gitlab } from "issue-status/providers";

export default defineConfig({
  name: "My Status Page",
  description: "Status page for my services",
  provider: atlassian({ baseUrl: "https://status.seek.com" }),
  // provider: github({
  //   owner: "tadhglewis",
  //   repo: "issue-status",
  // }),
  // provider: gitlab({
  //   projectId: "70936298",
  // }),
});
