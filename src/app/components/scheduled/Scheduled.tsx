// TODO remove
"use client";

import { useData } from "@/api/client";
import { Stack } from "../Stack";
import { Incident } from "../incidents/Incident";

export const Scheduled = () => {
  const { scheduledMaintenance, loading } = useData();

  return (
    <Stack>
      {loading
        ? null
        : scheduledMaintenance.map((scheduled) => (
            <Incident key={scheduled.id} {...scheduled} />
          ))}
    </Stack>
  );
};
