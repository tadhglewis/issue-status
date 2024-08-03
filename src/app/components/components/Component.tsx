// TODO remove
"use client";

import { ComponentType } from "@/api/types";
import styled from "styled-components";
import { Badge } from "./Badge";
import { useState } from "react";

const Box = styled.div<{ $clickable?: boolean; child?: boolean }>`
  background-color: ${(props) => props.theme.colors.body};
  padding: 8px 16px;
  border-radius: 3px;
  justify-content: space-between;
  align-items: center;
  display: flex;
  color: ${(props) => props.theme.colors.text};
  cursor: ${(props) => (props.$clickable ? "pointer" : "unset")};
`;

export const Component = ({ name, status, children }: ComponentType) => {
  const [showChildren, setShowChildren] = useState(false);

  const chevron = showChildren ? "▾" : "▸";

  return (
    <>
      <Box
        onClick={() => setShowChildren(!showChildren)}
        $clickable={Boolean(children?.length)}
      >
        {children ? chevron : null} {name} <Badge status={status} />
      </Box>
      {showChildren
        ? children?.map((child) => (
            <Box key={child.id}>
              {child.name} <Badge status={child.status} />
            </Box>
          ))
        : null}
    </>
  );
};
