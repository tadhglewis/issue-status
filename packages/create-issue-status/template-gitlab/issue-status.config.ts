import { defineConfig } from "issue-status";
import { gitlab } from "issue-status/providers";

export default defineConfig({
  name: "My Status Page",
  description: "Status page for my services",
  provider: gitlab({
    projectId: "your-project-id",
  }),
});