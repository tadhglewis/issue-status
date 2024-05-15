// TODO remove
"use client";

import { useData } from "@/api/client";
import { Component } from "./Component";
import styled from "styled-components";

const Card = styled.div`
  box-shadow: 0px 0px 33px -32px rgba(0, 0, 0, 0.75);
  border-radius: 3px;
  background-color: white;
  padding: 16px;
`;

export const Components = () => {
  const { components } = useData();

  return (
    <Card>
      {components.map((component) => (
        <Component key={component.id} {...component} />
      ))}
    </Card>
  );
};
