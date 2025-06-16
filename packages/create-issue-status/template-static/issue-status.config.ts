import { defineConfig } from "issue-status";
import { staticProvider } from "issue-status/providers";

export default defineConfig({
  name: "My Status Page",
  description: "Status page for my services",
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
});
