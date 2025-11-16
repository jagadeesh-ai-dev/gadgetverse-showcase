import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App.tsx";
import "./index.css";
import { CurrencyProvider } from "./contexts/CurrencyContext";
import { ComparisonProvider } from "./contexts/ComparisonContext";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <CurrencyProvider>
          <ComparisonProvider>
            <App />
          </ComparisonProvider>
        </CurrencyProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
