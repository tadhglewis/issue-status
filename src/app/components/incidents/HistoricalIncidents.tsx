// TODO remove
"use client";

import { useData } from "@/api/client";
import styled from "styled-components";
import { Incident } from "./Incident";
import { Stack } from "../Stack";
import { Skeleton } from "./Skeleton";

const Heading = styled.div`
  padding: 0 16px;
  font-size: 20px;
  color: ${(props) => props.theme.colors.text};
`;

export const HistoricalIncidents = () => {
  const { historicalIncidents, loading } = useData();

  return (
    <Stack $space="medium">
      <Heading>Past Incidents</Heading>
      <Stack>
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
      </Stack>
    </Stack>
  );
};
