import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import fs from "fs";
import { tsImport } from "tsx/esm/api";
import type { IssueStatusConfig } from "./src/api/types";

export default defineConfig(async () => {
  const packageRoot = import.meta.dirname;

  const configPath = path.resolve(process.cwd(), "issue-status.config.ts");

  const config = (await tsImport(configPath, import.meta.dirname))
    .default as IssueStatusConfig;

  if (!fs.existsSync(configPath)) {
    throw new Error("issue-status.config.ts not found.");
  }

  return {
    root: packageRoot,
    base: "./",
    plugins: [
      react(),
      tailwindcss(),
      {
        name: "html-transform",
        transformIndexHtml(html: string) {
          return html.replace(
            /<title>Vite \+ React \+ TS<\/title>/,
            `<title>${config.name}</title>`
          );
        },
      },
    ],
    define: {
      __CONFIG_PATH__: JSON.stringify(configPath),
      __CWD__: JSON.stringify(process.cwd()),
    },
    server: { fs: { allow: [packageRoot, process.cwd()] } },
    build: {
      outDir: path.resolve(process.cwd(), "dist"),
      emptyOutDir: true,
      target: "esnext",
    },
  };
});
