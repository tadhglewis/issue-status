import type { IssueStatusConfig } from "issue-status";
import { github } from "issue-status/providers";

export default {
  name: "My Status Page",
  description: "Status page for my services",
  provider: github({
    owner: "tadhglewis",
    repo: "issue-status",
  }),
} satisfies IssueStatusConfig;
