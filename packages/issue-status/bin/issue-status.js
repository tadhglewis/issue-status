#!/usr/bin/env tsx

import { spawn } from "node:child_process";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const command = process.argv[2];

const viteConfigPath = path.resolve(__dirname, "../vite.config.ts");

const viteBinPath = path.resolve(__dirname, "../node_modules/.bin/vite");

switch (command) {
  case "dev":
    spawn(viteBinPath, ["--config", viteConfigPath], {
      stdio: "inherit",
      cwd: process.cwd(),
    });
    break;

  case "build":
    spawn(viteBinPath, ["build", "--config", viteConfigPath], {
      stdio: "inherit",
      cwd: process.cwd(),
    });
    break;

  case "preview":
    spawn(viteBinPath, ["preview", "--config", viteConfigPath], {
      stdio: "inherit",
      cwd: process.cwd(),
    });
    break;

  default:
    console.log("Usage: issue-status <dev|build|preview>");
    process.exit(1);
}
