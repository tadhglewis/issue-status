"use client";

import type { Data } from "./types";
import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { issueStatusConfig } from "../config/loader";

const DataContext = createContext<Data | undefined>(undefined);

export const DataProvider: React.FC<{
  children: ReactNode | ReactNode[] | null;
}> = ({ children }) => {
  const [state, setState] = useState<Data>({
    loading: true,
    components: undefined,
    incidents: undefined,
    historicalIncidents: undefined,
  });

  useEffect(() => {
    (async () => {
      setState({
        loading: false,
        components: await issueStatusConfig.provider.getComponents(),
        incidents: await issueStatusConfig.provider.getIncidents(),
        historicalIncidents:
          await issueStatusConfig.provider.getHistoricalIncidents(),
      });
    })();
  }, []);

  return <DataContext.Provider value={state}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const data = useContext(DataContext);

  if (!data) {
    throw new Error("DataProvider was not provided");
  }

  return data;
};
