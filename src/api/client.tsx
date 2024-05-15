"use client";

import { staticProvider } from "@/providers/static";
import { ComponentType, Data, IncidentType, Provider } from "./types";
import { ReactNode, createContext, useContext } from "react";

const DataContext = createContext<Data | undefined>(undefined);

const createApiClient = () => staticProvider;

export const DataProvider: React.FC<{
  children: ReactNode | ReactNode[] | null;
}> = ({ children }) => {
  const api = createApiClient();

  const data: Data = {
    components: api.getComponents(),
    incidents: api.getIncidents(),
  };

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const data = useContext(DataContext);

  if (!data) {
    throw new Error("DataProvider was not provided");
  }

  return data;
};
