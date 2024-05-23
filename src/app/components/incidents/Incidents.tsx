// TODO remove
"use client";

import { useData } from "@/api/client";
import { Incident } from "./Incident";
import { Stack } from "../Stack";

export const Incidents = () => {
  const { incidents, loading } = useData();

  return (
    <Stack>
      {loading
        ? null
        : incidents.map((incident) => (
            <Incident key={incident.id} {...incident} />
          ))}
    </Stack>
  );
};
