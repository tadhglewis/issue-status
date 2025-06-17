import type { IssueStatusConfig } from "./api/types";

const config = await import(
  /* @vite-ignore */
  __CONFIG_PATH__
);

export default config.default as IssueStatusConfig;
