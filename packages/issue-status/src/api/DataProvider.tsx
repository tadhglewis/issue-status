import config from "../config";
import { type ReactNode, useState, useEffect } from "react";
import type { Data } from "./types";
import { DataContext } from "./useData";

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
        components: await config.provider.getComponents(),
        incidents: await config.provider.getIncidents(),
        historicalIncidents: await config.provider.getHistoricalIncidents(),
      });
    })();
  }, []);

  return <DataContext.Provider value={state}>{children}</DataContext.Provider>;
};
