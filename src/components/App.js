import React from "react";
import "./App.css";
import styled from "styled-components";
import Status from "./status";
import useIssues from "./useIssues";
import Component from "./Component";

const Container = styled.div`
  max-width: 1008px;
  margin: 16px auto;
  background-color: white;
  border-radius: 3px;
  padding: 16px;
  box-shadow: 0px 0px 33px -32px rgba(0, 0, 0, 0.75);
`;

export default () => {
  // TODO: handle loading
  const [results, refetch] = useIssues();

  return (
    <Container>
      <Status refetch={refetch} />
      {results?.map((issue) => (
        <Component key={issue.id} issue={issue} />
      ))}
    </Container>
  );
};
