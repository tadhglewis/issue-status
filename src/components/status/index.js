import React from "react";
import styled from "styled-components";

const StatusBar = styled.div`
  background-color: #3da751;
  color: white;
  padding: 8px 16px;
  font-size: 20px;
  border-radius: 3px;
  margin: 32px 0;
`;

export default () => {
  return <StatusBar>All Systems Operational</StatusBar>;
};
