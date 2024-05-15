// TODO remove
"use client";

import { useData } from "@/api/client";
import styled from "styled-components";
import { Incident } from "./Incident";

const Heading = styled.div`
  padding: 0 16px;
  font-size: 20px;
  margin-bottom: 16px;
`;

export const Incidents = () => {
  const { incidents } = useData();

  return (
    <div>
      <Heading>Incidents</Heading>
      {incidents.map((incident) => (
        <Incident key={incident.id} {...incident} />
      ))}
    </div>
  );
};
