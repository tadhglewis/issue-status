import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import fs from "fs";

export default defineConfig(async () => {
  const packageRoot = path.dirname(new URL(import.meta.url).pathname);

  const configPath = path.resolve(process.cwd(), "issue-status.config.ts");

  if (!fs.existsSync(configPath)) {
    throw new Error("issue-status.config.ts not found.");
  }

  return {
    root: packageRoot,
    plugins: [react(), tailwindcss()],
    define: {
      __CONFIG_PATH__: JSON.stringify(configPath),
    },
    build: {
      outDir: path.resolve(process.cwd(), "dist"),
      emptyOutDir: true,
      target: "esnext",
    },
  };
});
