import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";
import { AppAuthProvider } from "./features/auth/AppAuthProvider.tsx";
import { BrowserRouter } from "react-router-dom";
import "./../custom.scss";
import "bootstrap";
import { getQueryClient } from "./utils/queryClient.ts";
import { QueryClientProvider } from "@tanstack/react-query";

const queryClient = getQueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AppAuthProvider>
          <App />
        </AppAuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
