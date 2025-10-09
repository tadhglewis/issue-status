import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./i18n";
import App from "./App.tsx";
// Import custom CSS if provided
if (__CUSTOM_CSS__) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = __CUSTOM_CSS__;
  document.head.appendChild(link);
}
import { DataProvider } from "./api/DataProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DataProvider>
      <App />
    </DataProvider>
  </StrictMode>
);
