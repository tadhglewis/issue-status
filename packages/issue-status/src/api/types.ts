type BaseComponentType = {
  id: string;
  name: string;
  status:
    | "operational"
    | "degradedPerformance"
    | "partialOutage"
    | "majorOutage"
    | "unknown";
};

export type ComponentType = BaseComponentType & {
  children?: BaseComponentType[];
};

export type IncidentType = {
  id: string;
  title: string;
  description: string;
  active: boolean;
  scheduled: boolean;
  createdAt: string;
};

export type Data =
  | {
      loading: true;
      components: undefined;
      incidents: undefined;
      historicalIncidents: undefined;
    }
  | {
      components: ComponentType[];
      incidents: IncidentType[];
      historicalIncidents: IncidentType[];
      loading: false;
    };

export type Provider = {
  getComponents: () => Promise<ComponentType[]> | ComponentType[];
  getIncidents: () => Promise<IncidentType[]> | IncidentType[];
  getHistoricalIncidents: () => Promise<IncidentType[]> | IncidentType[];
};

export interface IssueStatusConfig {
  name: string;
  description?: string;
  favicon?: string;
  logo?: string;
  provider: Provider;
}
