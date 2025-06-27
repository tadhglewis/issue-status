import dayjs from "dayjs";
import ky from "ky";
import type { ComponentType, Provider, IncidentType } from "../api/types";
import { cached } from "./shared";

type AtlassianComponent = {
  id: string;
  name: string;
  status:
    | "operational"
    | "degraded_performance"
    | "partial_outage"
    | "major_outage";
  group_id?: string;
  group?: boolean;
  components?: string[];
};

type AtlassianIncident = {
  id: string;
  name: string;
  status:
    | "investigating"
    | "identified"
    | "monitoring"
    | "resolved"
    | "postmortem";
  impact: "none" | "minor" | "major" | "critical";
  created_at: string;
  resolved_at?: string;
  scheduled_for?: string;
  incident_updates: Array<{
    body: string;
    created_at: string;
  }>;
};

type AtlassianComponentsResponse = {
  components: AtlassianComponent[];
};

type AtlassianIncidentsResponse = {
  incidents: AtlassianIncident[];
};

const mapStatus = (
  status: AtlassianComponent["status"]
): ComponentType["status"] => {
  const statusMap: Record<
    AtlassianComponent["status"],
    ComponentType["status"]
  > = {
    operational: "operational",
    degraded_performance: "degradedPerformance",
    partial_outage: "partialOutage",
    major_outage: "majorOutage",
  };
  return statusMap[status] || "unknown";
};

const buildComponentHierarchy = (
  components: AtlassianComponent[] = []
): ComponentType[] => {
  const componentMap = new Map(components.map((c) => [c.id, c]));

  return components.reduce<ComponentType[]>((result, component) => {
    if (component.group) {
      const childComponents = (component.components || [])
        .map((id) => componentMap.get(id))
        .filter(Boolean) as AtlassianComponent[];

      result.push({
        id: component.id,
        name: component.name,
        status:
          childComponents.length > 0
            ? childComponents.reduce<ComponentType["status"]>(
                (worst, child) => {
                  const childStatus = mapStatus(child.status);
                  const statusPriority = {
                    majorOutage: 4,
                    partialOutage: 3,
                    degradedPerformance: 2,
                    operational: 1,
                    unknown: 0,
                  };
                  return statusPriority[childStatus] > statusPriority[worst]
                    ? childStatus
                    : worst;
                },
                "operational"
              )
            : mapStatus(component.status),
        children: childComponents.map((child) => ({
          id: child.id,
          name: child.name,
          status: mapStatus(child.status),
        })),
      });
    } else if (!component.group_id) {
      result.push({
        id: component.id,
        name: component.name,
        status: mapStatus(component.status),
      });
    }

    return result;
  }, []);
};

const mapIncident = (incident: AtlassianIncident): IncidentType => ({
  id: incident.id,
  title: incident.name,
  description: incident.incident_updates[0]?.body || "",
  active: !incident.resolved_at,
  scheduled: Boolean(incident.scheduled_for),
  createdAt: incident.created_at,
});

/**
 * Atlassian Status Page provider which uses the Atlassian Status Page API as the data source.
 *
 * The provider caches responses in the browser for 5 minutes to avoid excessive API calls.
 */
export const atlassian = ({ baseUrl }: { baseUrl: string }): Provider => {
  const api = ky.create({
    prefixUrl: `${baseUrl}/api/v2`,
    timeout: 30000,
  });

  return {
    getComponents: async () => {
      const data = await cached(
        `atlassian:${baseUrl}:components`,
        async () =>
          api.get("components.json").json<AtlassianComponentsResponse>(),
        30
      );

      return buildComponentHierarchy(data.components);
    },

    getIncidents: async () => {
      const data = await cached(
        `atlassian:${baseUrl}:incidents:unresolved`,
        async () =>
          api
            .get("incidents/unresolved.json")
            .json<AtlassianIncidentsResponse>(),
        30
      );

      return data.incidents.map(mapIncident);
    },

    getHistoricalIncidents: async () => {
      const data = await cached(
        `atlassian:${baseUrl}:incidents:all`,
        async () =>
          api.get("incidents.json").json<AtlassianIncidentsResponse>(),
        30
      );

      const cutoffDate = dayjs().subtract(14, "days");
      return data.incidents
        .filter((incident) => dayjs(incident.created_at).isAfter(cutoffDate))
        .map(mapIncident);
    },
  };
};
