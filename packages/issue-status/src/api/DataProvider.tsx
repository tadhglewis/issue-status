import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { type ReactNode } from "react";
import config from "../config";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: config.provider.cacheTime,
      staleTime: config.provider.cacheTime,
    },
  },
});

const persister = createSyncStoragePersister({
  storage: window.localStorage,
});

export const DataProvider: React.FC<{
  children: ReactNode | ReactNode[] | null;
}> = ({ children }) => {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      {children}
    </PersistQueryClientProvider>
  );
};
