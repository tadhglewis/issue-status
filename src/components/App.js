import React from "react";
import "./App.css";
import styled from "styled-components";
import Status from "./status";
import useIssues from "./useIssues";
import Header from "./header";
import Components from "./components";
import Incidents from "./incidents";
import Maintenance from "./smaintenance";
import Footer from "./footer";

const Container = styled.div`
  max-width: 1008px;
  padding: 16px;
  margin: 16px auto;
`;

const ComponentsContainer = styled.div`
  box-shadow: 0px 0px 33px -32px rgba(0, 0, 0, 0.75);
  border-radius: 3px;
  background-color: white;
  padding: 50px;
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
  const [
    smaintenanceLoading,
    smaintenanceError,
    smaintenanceResults,
    smaintenanceRefetch,
  ] = useIssues("maintenance&direction=asc");

  return (
    <Container>
      <Header />
      <ComponentsContainer>
        <Status
          loading={componentsLoading || incidentsLoading || smaintenanceError}
          error={{
            hasError: componentsError || incidentsError || smaintenanceError,
            errors: { componentsError, incidentsError, smaintenanceError },
          }}
          components={componentsResults}
          refetch={() => {
            componentsRefetch();
            incidentsRefetch();
            smaintenanceRefetch();
          }}
        />
        <Components
          loading={componentsLoading}
          components={componentsResults}
        />
      </ComponentsContainer>
      <Maintenance loading={smaintenanceLoading} smaintenance={smaintenanceResults} />
      <Incidents loading={incidentsLoading} incidents={incidentsResults} />
      <Footer />
    </Container>
  );
};
