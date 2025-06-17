import type { ComponentType, IncidentType, Provider } from "../api/types";

/**
 * Static provider factory function. If no data is provided, returns default mock data.
 */
export const staticProvider = (data: {
  components: ComponentType[];
  incidents: IncidentType[];
  historicalIncidents: IncidentType[];
}): Provider => ({
  getComponents: () => data.components,
  getIncidents: () => data.incidents,
  getHistoricalIncidents: () => data.historicalIncidents,
});
