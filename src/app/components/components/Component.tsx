// TODO remove
"use client";

import { ComponentType } from "@/api/types";
import styled from "styled-components";
import { Badge } from "./Badge";

const Box = styled.div`
  background-color: ${(props) => props.theme.colors.body};
  padding: 8px 16px;
  border-radius: 3px;
  justify-content: space-between;
  align-items: center;
  display: flex;
  color: ${(props) => props.theme.colors.text};
`;

export const Component = ({ name, status }: ComponentType) => (
  <Box>
    {name} <Badge status={status} />
  </Box>
);
