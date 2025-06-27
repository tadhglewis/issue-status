import { defineConfig } from "issue-status";
import { github, gitlab } from "issue-status/providers";

export default defineConfig({
  name: "My Status Page",
  description: "Status page for my services",
  // provider: github({
  //   owner: "tadhglewis",
  //   repo: "issue-status",
  // }),
  provider: gitlab({
    projectId: "70936298",
  }),
});
