import React from "react";
import styled from "styled-components";

const StatusBar = styled.div`
  background-color: #3da751;
  color: white;
  padding: 8px 16px;
  font-size: 20px;
  border-radius: 3px;
  margin: 32px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Reload = styled.button`
  background-color: transparent;
  color: white;
  text-decoration: underline;
  border: none;
  cursor: pointer;
`;

// TODO: change all systems status based on current status of all components
export default ({ refetch }) => {
  return (
    <StatusBar>
      All Systems Operational <Reload onClick={refetch}>Reload</Reload>
    </StatusBar>
  );
};
