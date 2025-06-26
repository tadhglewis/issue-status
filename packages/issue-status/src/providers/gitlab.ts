import dayjs from "dayjs";
import type { ComponentType, Provider } from "../api/types";
import { Gitlab, type IssueSchemaWithBasicLabels } from "@gitbeaker/rest";
import { cached } from "./shared";

const extractStatusFromLabels = (labels: string[]): ComponentType["status"] => {
  const statusMap = new Map<string, ComponentType["status"]>([
    ["operational", "operational"],
    ["degraded performance", "degradedPerformance"],
    ["partial outage", "partialOutage"],
    ["major outage", "majorOutage"],
    ["unknown", "unknown"],
  ]);

  return labels.reduce<ComponentType["status"]>((acc, current) => {
    if (acc !== "unknown") {
      return acc;
    }

    acc = statusMap.get(current) ?? "unknown";
    return acc;
  }, "unknown");
};

const buildComponentHierarchy = (
  issues: IssueSchemaWithBasicLabels[]
): ComponentType[] => {
  // parents need to be pushed in the reduce before the child
  const sortedIssues = [...issues].sort((a, b) =>
    a.title.localeCompare(b.title)
  );

  return sortedIssues.reduce<ComponentType[]>(
    (components, { title, id, labels }) => {
      const status = extractStatusFromLabels(labels);
      const separator = " > ";

      if (!title.includes(separator)) {
        components.push({
          id: id.toString(),
          name: title,
          status,
        });
        return components;
      }

      const [parentName, childName] = title.split(separator);
      const parent = components.find((c) => c.name === parentName.trim());

      if (parent) {
        parent.children = parent.children || [];

        parent.children.push({
          id: id.toString(),
          name: childName.trim(),
          status,
        });
      }

      return components;
    },
    []
  );
};

/**
 * GitLab provider which uses GitLab Issues with specific labels as the data source.
 *
 * The provider respects GitLab's API rate limits and therefore responses are cached in the browser for 30 seconds.
 * With 3 requests per page load, 30s caching = 6 requests/minute (1.2% of limit)
 *
 * `Unauthenticated traffic from an IP address | 500 requests each minute`
 *
 * https://docs.gitlab.com/ee/user/gitlab_com/index.html#gitlabcom-specific-rate-limits
 */
export const gitlab = ({
  projectId,
  host,
}: {
  projectId: string;
  host?: string;
}): Provider => {
  const gitlab = new Gitlab({
    host: host ?? "https://gitlab.com",
  });

  const getIncidents = async (state: "opened" | "closed") => {
    const data = await cached(
      `gitlab:${projectId}:${state}Incidents`,
      async () => {
        const issues = await gitlab.Issues.all({
          projectId,
          labels: "issue status,incident",
          state,
          updatedAfter:
            state === "opened"
              ? undefined
              : dayjs().subtract(14, "days").toISOString(),
        });

        return issues;
      },
      30
    );

    return data.map((issue) => {
      const isScheduled = issue.labels.includes("maintenance");

      return {
        id: issue.id.toString(),
        title: issue.title,
        description: issue.description,
        createdAt: issue.created_at,
        scheduled: isScheduled,
        active: !issue.closed_at,
      };
    });
  };

  return {
    getComponents: async () => {
      const data = await cached(
        `gitlab:${projectId}:components`,
        async () => {
          const issues = await gitlab.Issues.all({
            labels: "issue status,component",
            projectId: projectId,
          });

          return issues;
        },
        30
      );

      return buildComponentHierarchy(data);
    },
    getIncidents: async () => await getIncidents("opened"),
    getHistoricalIncidents: async () => await getIncidents("closed"),
  };
};
