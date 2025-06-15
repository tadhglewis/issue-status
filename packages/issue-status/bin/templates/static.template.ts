import type { IssueStatusConfig } from "issue-status";
import { staticProvider } from "issue-status/providers";

export default {
  name: "{{name}}",
  description: "{{description}}",
  provider: staticProvider({
    components: [
      {
        id: "api",
        name: "API",
        status: "operational",
      },
      {
        id: "database",
        name: "Database",
        status: "operational",
      },
      {
        id: "cdn",
        name: "CDN",
        status: "operational",
      },
    ],
    incidents: [],
    historicalIncidents: [],
  }),
} satisfies IssueStatusConfig;
