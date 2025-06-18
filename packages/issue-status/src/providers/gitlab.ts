import dayjs from "dayjs";
import type { ComponentType, Provider } from "../api/types";
import { Gitlab, type IssueSchemaWithBasicLabels } from "@gitbeaker/rest";
/**
 * We must cache the current components and incidents due to GitLab API rate limiting.
 *
 * Cache responses for 10 minutes.
 *
 * GitLab.com API rate limits: 2,000 requests per minute for authenticated requests
 * https://docs.gitlab.com/ee/user/gitlab_com/index.html#gitlabcom-specific-rate-limits
 */
const cached = async <T>(key: string, func: () => Promise<T>): Promise<T> => {
  const raw = localStorage.getItem(key);
  const cached = raw ? JSON.parse(raw) : null;

  if (cached && dayjs().isBefore(cached.expireAt)) {
    return cached.data;
  }

  const data = await func();

  localStorage.setItem(
    key,
    JSON.stringify({ data, expireAt: dayjs().add(10, "minutes") })
  );

  return data;
};

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
 * Note: data is cached for 10 minutes.
 */
export const gitlab = (config: {
  projectId: string;
  host?: string;
}): Provider => {
  const gitlab = new Gitlab({
    host: config.host ?? "https://gitlab.com",
  });

  const getIncidents = async (
    state: "opened" | "closed",
    projectId: string
  ) => {
    const data = await cached(
      `gitlab:${projectId}:${state}Incidents`,
      async () => {
        const issues = await gitlab.Issues.all({
          projectId: "projectId",
          labels: "issue status,incident",
          state,
        });

        return issues;
      }
    );

    const fourteenDaysAgo = dayjs().subtract(14, "days");

    return data
      .filter((issue) =>
        dayjs(issue.created_at.toString()).isAfter(fourteenDaysAgo)
      )
      .map((issue) => {
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
        `gitlab:${config.projectId}:components`,
        async () => {
          const issues = await gitlab.Issues.all({
            labels: "issue status,component",
            projectId: config.projectId,
          });

          return issues;
        }
      );

      return buildComponentHierarchy(data);
    },
    getIncidents: async () => await getIncidents("opened", config.projectId),
    getHistoricalIncidents: async () =>
      await getIncidents("closed", config.projectId),
  };
};
