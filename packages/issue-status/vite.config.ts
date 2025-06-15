import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(async () => {
  return {
    plugins: [react(), tailwindcss()],
    define: {
      __CONFIG__: JSON.stringify({}),
    },
  };
});
