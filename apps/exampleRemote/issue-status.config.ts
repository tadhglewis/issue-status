import type { IssueStatusConfig } from "issue-status";
import { github } from "issue-status/providers";

export default {
  name: "exampleRemote",
  description: "This showcases the status page using github and the published npm package",
  provider: github({
    owner: "tadhglewis",
    repo: "issue-status",
  }),
} satisfies IssueStatusConfig;
