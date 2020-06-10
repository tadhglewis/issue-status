import React from "react";
import styled from "styled-components";
import Status from "./status";

const Component = styled.div`
  background-color: #f7f8f9;
  padding: 16px;
  border-radius: 3px;
  justify-content: space-between;
  display: flex;
`;

export default ({ issue }) => {
  return (
    <Component>
      {issue.title} <Status labels={issue.labels} />
    </Component>
  );
};
