import config from "../config";
import type { Data } from "./types";
import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

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
        components: await config.provider.getComponents(),
        incidents: await config.provider.getIncidents(),
        historicalIncidents: await config.provider.getHistoricalIncidents(),
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
