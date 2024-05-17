// TODO remove
"use client";

import { ComponentType } from "@/api/types";
import styled from "styled-components";
import { Badge } from "./Badge";

const Box = styled.div`
  background-color: #f7f8f9;
  padding: 8px 16px;
  border-radius: 3px;
  justify-content: space-between;
  align-items: center;
  display: flex;
`;

export const Component = ({ name, status }: ComponentType) => (
  <Box>
    {name} <Badge status={status} />
  </Box>
);
