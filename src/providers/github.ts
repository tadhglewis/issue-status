import dayjs from "dayjs";
import { ComponentType, Provider } from "@/api/types";
import { Octokit } from "@octokit/rest";

const octokit = new Octokit();

const cached = async <T>(key: string, func: () => Promise<T>): Promise<T> => {
  const raw = localStorage.getItem(key);
  const cached = raw ? JSON.parse(raw) : null;

  if (cached && dayjs().isBefore(cached.expireAt)) {
    console.log("cache:hit");
    return cached.data;
  }

  console.log("cache:miss");

  const data = await func();

  localStorage.setItem(
    key,
    JSON.stringify({ data, expireAt: dayjs().add(1, "hour") })
  );

  return data;
};

export const github: Provider = {
  getComponents: async () => {
    const { data } = await cached(
      "components",
      async () =>
        await octokit.rest.issues.listForRepo({
          owner: "tadhglewis",
          repo: "issue-status",
          labels: "issue status,component",
        })
    );

    return data.map((issue) => {
      const statusMap = new Map<string, ComponentType["status"]>([
        ["operational", "operational"],
        ["performance issues", "performanceIssues"],
        ["partial outage", "partialOutage"],
        ["major outage", "majorOutage"],
        ["unknown", "unknown"],
      ]);

      return {
        id: issue.id.toString(),
        name: issue.title,
        // TODO: handle statuses
        status: "unknown",
      };
    });
  },
  getIncidents: async () => {
    const { data } = await cached(
      "incidents",
      async () =>
        await octokit.rest.issues.listForRepo({
          owner: "tadhglewis",
          repo: "issue-status",
          labels: "issue status,incident",
          state: "all",
        })
    );

    return data.map((issue) => ({
      id: issue.id.toString(),
      title: issue.title,
      description: issue.body ?? "",
      createdAt: issue.created_at,
      active: !issue.closed_at,
    }));
  },
};
