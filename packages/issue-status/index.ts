#!/usr/bin/env node

import * as path from "node:path";
import * as fs from "node:fs";
import { build, createServer, preview } from "vite";
import { tsImport } from "tsx/esm/api";
import type { IssueStatusConfig } from "./src/api/types";

const command = process.argv[2];

const viteConfigPath = path.resolve(import.meta.dirname, "../vite.config.ts");

switch (command) {
  case "dev": {
    const server = await createServer({ configFile: viteConfigPath });
    await server.listen();

    server.printUrls();
    server.bindCLIShortcuts({ print: true });
    break;
  }
  case "build": {
    await build({ configFile: viteConfigPath });

    // Copy custom files to build directory
    const configPath = path.resolve(process.cwd(), "issue-status.config.ts");
    if (fs.existsSync(configPath)) {
      const config = (await tsImport(configPath, import.meta.dirname))
        .default as IssueStatusConfig;

      const outDir = path.resolve(process.cwd(), "dist");

      if (config.customCss && fs.existsSync(config.customCss)) {
        const destCss = path.join(outDir, path.basename(config.customCss));
        fs.copyFileSync(config.customCss, destCss);
      }

      if (config.customTemplate && fs.existsSync(config.customTemplate)) {
        const destTemplate = path.join(outDir, path.basename(config.customTemplate));
        fs.copyFileSync(config.customTemplate, destTemplate);
      }
    }
    break;
  }
  case "preview": {
    const server = await preview({ configFile: viteConfigPath });

    server.printUrls();
    server.bindCLIShortcuts({ print: true });
    break;
  }
}
