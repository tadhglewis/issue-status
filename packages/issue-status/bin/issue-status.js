#!/usr/bin/env node

import { spawn } from "node:child_process";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import { findUp } from "find-up";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const command = process.argv[2];

const viteConfigPath = path.resolve(__dirname, "../vite.config.ts");

const detectPackageManager = async (startDir) => {
  const pnpmLock = await findUp("pnpm-lock.yaml", { cwd: startDir });
  if (pnpmLock) {
    return "pnpm";
  }

  const npmLock = await findUp("package-lock.json", { cwd: startDir });
  if (npmLock) {
    return "npm";
  }

  return "pnpm";
};

const packageManager = await detectPackageManager(process.cwd());

switch (command) {
  case "dev":
    spawn(packageManager, ["exec", "vite", "--config", viteConfigPath], {
      stdio: "inherit",
      cwd: process.cwd(),
    });
    break;

  case "build":
    spawn(
      packageManager,
      ["exec", "vite", "build", "--config", viteConfigPath],
      {
        stdio: "inherit",
        cwd: process.cwd(),
      }
    );
    break;

  case "preview":
    spawn(
      packageManager,
      ["exec", "vite", "preview", "--config", viteConfigPath],
      {
        stdio: "inherit",
        cwd: process.cwd(),
      }
    );
    break;
}
