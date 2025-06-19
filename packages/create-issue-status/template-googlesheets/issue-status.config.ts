import { defineConfig } from "issue-status";
import { googlesheets } from "issue-status/providers";

export default defineConfig({
  name: "My Status Page",
  description: "Status page for my services",
  provider: googlesheets({
    sheetUrl: "your-sheet-url",
  }),
});