import type { ComponentType, IncidentType, Provider } from "../api/types";

export interface StaticData {
  components: ComponentType[];
  incidents: IncidentType[];
  historicalIncidents: IncidentType[];
}

/**
 * Static provider factory function. If no data is provided, returns default mock data.
 */
export const staticProvider = (data: StaticData): Provider => ({
  getComponents: () => data.components,
  getIncidents: () => data.incidents,
  getHistoricalIncidents: () => data.historicalIncidents,
});
