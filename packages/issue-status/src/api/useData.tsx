import { useQuery } from "@tanstack/react-query";
import config from "../config";

export const useComponents = () => {
  return useQuery({
    queryKey: ["components"],
    queryFn: () => config.provider.getComponents(),
  });
};

export const useIncidents = () => {
  return useQuery({
    queryKey: ["incidents"],
    queryFn: () => config.provider.getIncidents(),
  });
};

export const useHistoricalIncidents = () => {
  return useQuery({
    queryKey: ["historicalIncidents"],
    queryFn: () => config.provider.getHistoricalIncidents(),
  });
};

export const useData = () => {
  const components = useComponents();
  const incidents = useIncidents();
  const historicalIncidents = useHistoricalIncidents();

  const loading =
    components.isLoading ||
    incidents.isLoading ||
    historicalIncidents.isLoading;

  if (loading) {
    return {
      loading: true as const,
      components: undefined,
      incidents: undefined,
      historicalIncidents: undefined,
    };
  }

  return {
    loading: false as const,
    components: components.data || [],
    incidents: incidents.data || [],
    historicalIncidents: historicalIncidents.data || [],
  };
};
