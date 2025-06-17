import type { Data } from "./types";
import { createContext, useContext } from "react";

export const DataContext = createContext<Data | undefined>(undefined);

export const useData = () => {
  const data = useContext(DataContext);

  if (!data) {
    throw new Error("DataProvider was not provided");
  }

  return data;
};
