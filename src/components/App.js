import React from "react";
import "./App.css";
import styled from "styled-components";
import Status from "./status";
import useIssues from "./useIssues";
import Incidents from "./incidents";
import Components from "./components";
import Header from "./header";

const Container = styled.div`
  max-width: 1008px;
  padding: 16px;
  margin: 16px auto;
`;

const ComponentsContainer = styled.div`
  box-shadow: 0px 0px 33px -32px rgba(0, 0, 0, 0.75);
  border-radius: 3px;
  background-color: white;
  padding: 16px;
`;

export default () => {
  // loading, errors, results, refetch
  const [
    componentsLoading,
    componentsError,
    componentsResults,
    componentsRefetch,
  ] = useIssues("component");
  const [
    incidentsLoading,
    incidentsError,
    incidentsResults,
    incidentsRefetch,
  ] = useIssues("incident");

  return (
    <Container>
      <Header />
      <ComponentsContainer>
        <Status
          loading={componentsLoading || incidentsLoading}
          error={{
            hasError: componentsError || incidentsError,
            errors: { componentsError, incidentsError },
          }}
          components={componentsResults}
          refetch={() => {
            componentsRefetch();
            incidentsRefetch();
          }}
        />
        <Components
          loading={componentsLoading}
          components={componentsResults}
        />
      </ComponentsContainer>
      <Incidents loading={incidentsLoading} incidents={incidentsResults} />
    </Container>
  );
};
