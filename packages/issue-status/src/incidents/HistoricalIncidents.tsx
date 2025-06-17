import { useData } from "../api/useData";

import { Incident } from "./Incident";

import { Skeleton } from "./Skeleton";

export const HistoricalIncidents = () => {
  const { historicalIncidents, loading } = useData();

  return (
    <div className="flex flex-col justify-between gap-4">
      <div className="px-4 text-xl text-gray-800 dark:text-gray-200">
        Past Incidents
      </div>
      <div className="flex flex-col justify-between gap-2">
        {loading ? (
          <>
            <Skeleton />
            <Skeleton />
          </>
        ) : (
          historicalIncidents.map((incident) => (
            <Incident key={incident.id} {...incident} />
          ))
        )}
      </div>
    </div>
  );
};
