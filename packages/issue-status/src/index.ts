import type { IssueStatusConfig, Provider } from "./api/types";

export type { Provider };

export const defineConfig = (config: IssueStatusConfig): IssueStatusConfig =>
  config;
