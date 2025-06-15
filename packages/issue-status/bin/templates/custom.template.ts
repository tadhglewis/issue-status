import type { IssueStatusConfig, Provider } from "issue-status";

// TODO: Implement your custom provider
const customProvider: Provider = {
  getComponents: async () => {
    // TODO: Return your components here
    return [
      {
        id: "example",
        name: "Example Component",
        status: "operational",
      },
    ];
  },
  getIncidents: async () => {
    // TODO: Return current incidents here
    return [];
  },
  getHistoricalIncidents: async () => {
    // TODO: Return historical incidents here
    return [];
  },
};

export default {
  name: "{{name}}",
  description: "{{description}}",
  provider: customProvider,
} satisfies IssueStatusConfig;
