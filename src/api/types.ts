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
  loading: boolean;
};

export type Provider = {
  getComponents: () => Promise<ComponentType[]> | ComponentType[];
  getIncidents: () => Promise<IncidentType[]> | IncidentType[];
};
