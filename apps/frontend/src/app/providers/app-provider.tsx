import type { ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/shared/query-client";
import { AppLoader } from "./app-loader";

export function AppProvider({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AppLoader>{children}</AppLoader>
    </QueryClientProvider>
  );
}
