import type { IssueStatusConfig } from "./api/types";
import { loadCustomLocales } from "./i18n";

const config = await import(
  /* @vite-ignore */
  __CONFIG_PATH__
);

const issueStatusConfig = config.default as IssueStatusConfig;

// Load custom locales if provided
await loadCustomLocales(issueStatusConfig.customLocales);

export default issueStatusConfig;
