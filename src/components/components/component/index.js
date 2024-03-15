import React from "react";
import styled from "styled-components";
import Status from "./status";

const Container = styled.div`
  background-color: #f7f8f9;
  padding: 8px 16px;
  border-radius: 3px;
  justify-content: space-between;
  align-items: center;
  display: flex;

  :not(:last-child) {
    margin-bottom: 8px;
  }
`;

const Component = ({ component }) => {
  return (
    <Container>
      {component.title} <Status labels={component.labels} />
    </Container>
  );
};

export default Component;
