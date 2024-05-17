"use client";

import { Data, IncidentType, ComponentType } from "./types";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { github } from "@/providers/github";

const DataContext = createContext<Data | undefined>(undefined);

const createApiClient = () => github;

export const DataProvider: React.FC<{
  children: ReactNode | ReactNode[] | null;
}> = ({ children }) => {
  const api = createApiClient();

  const [loading, setLoading] = useState(true);
  const [components, setComponents] = useState<ComponentType[]>();
  const [incidents, setIncidents] = useState<IncidentType[]>();

  useEffect(() => {
    (async () => {
      setComponents(await api.getComponents());
      setIncidents(await api.getIncidents());
      setLoading(false);
    })();
  }, [api]);

  return (
    <DataContext.Provider
      value={{
        // TOOD: handle loading state
        components: components ?? [],
        incidents: incidents ?? [],
        loading,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const data = useContext(DataContext);

  if (!data) {
    throw new Error("DataProvider was not provided");
  }

  return data;
};
