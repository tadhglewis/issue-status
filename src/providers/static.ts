import { Provider } from "@/api/types";

export const staticProvider: Provider = {
  getComponents: () => [
    {
      id: "1",
      name: "API",
      status: "operational",
    },
    {
      id: "2",
      name: "Website",
      status: "performanceIssues",
    },
    {
      id: "3",
      name: "App",
      status: "partialOutage",
    },
    {
      id: "4",
      name: "Payments",
      status: "majorOutage",
    },
    {
      id: "5",
      name: "Support",
      status: "unknown",
    },
  ],
  getIncidents: () => [
    {
      id: "1",
      title: "Major service outage",
      description: "_This is a major service outage_",
      createdAt: "2024-05-13T08:55:04.355Z",
      active: true,
    },
    {
      id: "2",
      title: "Partial payments outage",
      description: "This is a partial payments outage",
      createdAt: "2024-05-13T08:55:04.355Z",
      active: false,
    },
  ],
};
