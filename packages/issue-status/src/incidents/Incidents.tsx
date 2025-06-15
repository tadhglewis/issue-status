// TODO remove
"use client";

import { useData } from "../api/client";
import { Incident } from "./Incident";

export const Incidents = () => {
  const { incidents, loading } = useData();

  return (
    <div className="flex flex-col justify-between gap-2">
      {loading
        ? null
        : incidents.map((incident) => (
            <Incident key={incident.id} {...incident} />
          ))}
    </div>
  );
};
