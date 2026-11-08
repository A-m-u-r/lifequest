import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app/app";
import { AppProvider } from "./app/providers/app-provider";
import "@repo/ui/tokens.css";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </StrictMode>,
);
