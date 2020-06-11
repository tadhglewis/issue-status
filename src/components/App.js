import React from "react";
import "./App.css";
import styled from "styled-components";
import Status from "./status";
import useIssues from "./useIssues";
import Incidents from "./incidents";
import Components from "./components";

const Container = styled.div`
  max-width: 1008px;
  margin: 16px auto;
  background-color: white;
  border-radius: 3px;
  padding: 16px;
  box-shadow: 0px 0px 33px -32px rgba(0, 0, 0, 0.75);
`;

export default () => {
  // loading, errors, results, refetch
  const [componentsLoading, , componentsResults, componentsRefetch] = useIssues(
    "component"
  );
  const [incidentsLoading, , incidentsResults, incidentsRefetch] = useIssues(
    "incident"
  );

  return (
    <>
      <Container>
        <Status
          refetch={() => {
            componentsRefetch();
            incidentsRefetch();
          }}
        />
        <Components
          loading={componentsLoading}
          components={componentsResults}
        />
      </Container>
      <Incidents loading={incidentsLoading} incidents={incidentsResults} />
    </>
  );
};
