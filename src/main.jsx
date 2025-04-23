import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { queryClient } from "@configs/queryClientConfig.js";
import { SkeletonTheme } from "react-loading-skeleton";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <SkeletonTheme baseColor="#f6f6f6" highlightColor="#e7e7e7">
        <App />
      </SkeletonTheme>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>
);
