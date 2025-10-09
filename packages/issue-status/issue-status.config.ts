import { defineConfig } from "./src/index.ts";
import { github } from "./src/providers/github";

export default defineConfig({
  name: "Test",
  description: "Test",
  provider: github({
    owner: "test",
    repo: "test",
  }),
});