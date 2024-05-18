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

export type ScheduledMaintenanceType = IncidentType;

export type Data =
  | {
      loading: true;
      components: undefined;
      scheduledMaintenance: undefined;
      incidents: undefined;
    }
  | {
      components: ComponentType[];
      scheduledMaintenance: ScheduledMaintenanceType[];
      incidents: IncidentType[];
      loading: false;
    };

export type Provider = {
  getComponents: () => Promise<ComponentType[]> | ComponentType[];
  getScheduledMaintenance: () =>
    | Promise<ScheduledMaintenanceType[]>
    | ScheduledMaintenanceType[];
  getIncidents: () => Promise<IncidentType[]> | IncidentType[];
};
