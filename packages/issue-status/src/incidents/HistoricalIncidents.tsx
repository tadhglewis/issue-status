import { useData } from "../api/useData";
import { useTranslation } from "react-i18next";

import { Incident } from "./Incident";

import { Skeleton } from "./Skeleton";

export const HistoricalIncidents = () => {
  const { historicalIncidents, loading } = useData();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col justify-between gap-4">
      <div className="px-4 text-xl text-gray-800 dark:text-gray-200">
        {t("history")}
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
