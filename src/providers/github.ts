import { Provider } from "@/api/types";

export const github: Provider = {
  getComponents: () => [
    {
      id: "1",
      name: "API",
    },
    {
      id: "2",
      name: "Website",
    },
    {
      id: "3",
      name: "App",
    },
    {
      id: "4",
      name: "Payments",
    },
  ],
  getIncidents: () => [
    {
      title: "Major service outage",
      description: "This is a major service outage",
      createdAt: "2024-05-13T08:55:04.355Z",
      status: "open",
    },
  ],
};
