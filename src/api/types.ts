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

export type Data =
  | { loading: true; components: undefined; incidents: undefined }
  | {
      components: ComponentType[];
      incidents: IncidentType[];
      loading: false;
    };

export type Provider = {
  getComponents: () => Promise<ComponentType[]> | ComponentType[];
  getIncidents: () => Promise<IncidentType[]> | IncidentType[];
};
