import { defineConfig } from "issue-status";
import { googlesheets } from "issue-status/providers";

export default defineConfig({
  name: "My Status Page",
  description: "Status page for my services",
  // provider: github({
  //   owner: "tadhglewis",
  //   repo: "issue-status",
  // }),
  provider: googlesheets({
    sheetUrl:
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vSdHI3IMwlGoyshZIdvccQcHVpBtZHTslp-7XCoY-XLRNt3FFM_DJbTJVt-rVWqb3MeXGK-cu556daK/pub?output=csv",
  }),
});
