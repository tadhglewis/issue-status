import dayjs from "dayjs";
import type { ComponentType, Provider } from "../api/types";
import { Octokit } from "@octokit/rest";
import type { RestEndpointMethodTypes } from "@octokit/rest";

type GitHubIssue =
  RestEndpointMethodTypes["issues"]["listForRepo"]["response"]["data"][0];

/**
 * We must cache the current components and incidents due to GitHub API rate limiting.
 *
 * Cache responses for 10 minutes.
 *
 * `The primary rate limit for unauthenticated requests is 60 requests per hour`
 *
 * https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api?apiVersion=2022-11-28
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

const getIncidents = async (
  state: "open" | "closed",
  owner: string,
  repo: string,
  octokit: Octokit
) => {
  const { data } = await cached(
    `${owner}/${repo}:${state}Incidents`,
    async () =>
      await octokit.rest.issues.listForRepo({
        owner,
        repo,
        labels: "issue status,incident",
        state,
      })
  );

  return data.map(({ id, title, body, created_at, closed_at, labels }) => {
    const isScheduled = Boolean(
      labels.find(
        (label) =>
          (typeof label === "string" ? label : label.name) === "maintenance"
      )
    );

    return {
      id: id.toString(),
      title: title,
      description: body ?? "",
      createdAt: created_at,
      scheduled: isScheduled,
      active: !closed_at,
    };
  });
};

const extractStatusFromLabels = (
  labels: GitHubIssue["labels"]
): ComponentType["status"] => {
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

    const label = typeof current === "string" ? current : current.name;
    acc = label ? statusMap.get(label) ?? "unknown" : "unknown";

    return acc;
  }, "unknown");
};

const buildComponentHierarchy = (issues: GitHubIssue[]): ComponentType[] => {
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
 * GitHub provider which uses GitHub Issues with specific labels as the data source.
 *
 * Note: data is cached for 10 minutes.
 */
export const github = (config: { owner: string; repo: string }): Provider => {
  const octokit = new Octokit();

  return {
    getComponents: async () => {
      const { data } = await cached(
        `${config.owner}/${config.repo}:components`,
        async () =>
          await octokit.rest.issues.listForRepo({
            owner: config.owner,
            repo: config.repo,
            labels: "issue status,component",
          })
      );

      return buildComponentHierarchy(data);
    },
    getIncidents: async () =>
      await getIncidents("open", config.owner, config.repo, octokit),
    getHistoricalIncidents: async () =>
      await getIncidents("closed", config.owner, config.repo, octokit),
  };
};
