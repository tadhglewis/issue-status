#!/usr/bin/env node

import { spawn } from "node:child_process";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const command = process.argv[2];

const viteConfigPath = path.resolve(__dirname, "../vite.config.ts");

const viteExecutable = path.resolve(
  __dirname,
  "../node_modules",
  "vite",
  "bin",
  "vite.js"
);

switch (command) {
  case "dev":
    spawn(viteExecutable, {
      stdio: "inherit",
      cwd: process.cwd(),
    });
    break;

  case "build":
    spawn(viteExecutable, [, "build", "--config", viteConfigPath], {
      stdio: "inherit",
      cwd: process.cwd(),
    });
    break;

  case "preview":
    spawn(viteExecutable, ["preview", "--config", viteConfigPath], {
      stdio: "inherit",
      cwd: process.cwd(),
    });
    break;
}
