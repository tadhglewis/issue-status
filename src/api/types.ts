export type ComponentType = {
  id: string;
  name: string;
  status:
    | "operational"
    | "performanceIssues"
    | "partialOutage"
    | "majorOutage"
    | "unknown";
};

export type IncidentType = {
  id: string;
  title: string;
  description: string;
  active: boolean;
  createdAt: string;
};

export type Data = {
  components: ComponentType[];
  incidents: IncidentType[];
};

export type Provider = {
  getComponents: () => ComponentType[];
  getIncidents: () => IncidentType[];
};
