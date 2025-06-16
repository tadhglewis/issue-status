#!/usr/bin/env node

import * as path from "node:path";
import { build, createServer, preview } from "vite";

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
    break;
  }
  case "preview": {
    const server = await preview({ configFile: viteConfigPath });

    server.printUrls();
    server.bindCLIShortcuts({ print: true });
    break;
  }
}
