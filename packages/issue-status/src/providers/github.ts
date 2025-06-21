import dayjs from "dayjs";
import type { ComponentType, Provider } from "../api/types";
import { Octokit } from "@octokit/rest";
import type { RestEndpointMethodTypes } from "@octokit/rest";
import { cached } from "./shared";

type GitHubIssue =
  RestEndpointMethodTypes["issues"]["listForRepo"]["response"]["data"][0];

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
 * The provider respects GitLab's API rate limits and therefore responses are cached in the browser for 10 minutes.
 *
 * `The primary rate limit for unauthenticated requests is 60 requests per hour`
 *
 * https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api?apiVersion=2022-11-28
 */
export const github = ({
  owner,
  repo,
}: {
  owner: string;
  repo: string;
}): Provider => {
  const octokit = new Octokit();

  const getIncidents = async (state: "open" | "closed") => {
    const { data } = await cached(
      `${owner}/${repo}:${state}Incidents`,
      async () =>
        await octokit.rest.issues.listForRepo({
          owner,
          repo,
          labels: "issue status,incident",
          state,
          since:
            state === "open"
              ? undefined
              : dayjs().subtract(14, "days").toISOString(),
        }),
      10
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

  return {
    getComponents: async () => {
      const { data } = await cached(
        `${owner}/${repo}:components`,
        async () =>
          await octokit.rest.issues.listForRepo({
            owner,
            repo,
            labels: "issue status,component",
          }),
        10
      );

      return buildComponentHierarchy(data);
    },
    getIncidents: async () => await getIncidents("open"),
    getHistoricalIncidents: async () => await getIncidents("closed"),
  };
};
