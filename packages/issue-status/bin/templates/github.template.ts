import type { IssueStatusConfig } from "issue-status";
import { github } from "issue-status/providers";

export default {
  name: "{{name}}",
  description: "{{description}}",
  provider: github({
    owner: "{{owner}}",
    repo: "{{repo}}",
  }),
} satisfies IssueStatusConfig;
