import { IssueStatusConfig } from "issue-status";
import { staticProvider } from "issue-status/providers";

export default {
  name: "Test Status Page",
  description: "Testing the new configuration system",
  provider: staticProvider({
    components: [
      {
        id: "1",
        name: "Test API",
        status: "operational",
      },
      {
        id: "2",
        name: "Test Database",
        status: "degradedPerformance",
      },
    ],
    incidents: [
      {
        id: "1",
        title: "Test Incident",
        description: "This is a test incident to verify configuration works",
        createdAt: new Date().toISOString(),
        active: true,
        scheduled: false,
      },
    ],
    historicalIncidents: [],
  }),
  footer: {
    text: "Powered by Test Status",
    link: "https://example.com",
  },
} satisfies IssueStatusConfig;
