import React from "react";
import styled from "styled-components";
import Incident from "./incident";
import Skeleton from "./skeleton";

const Container = styled.div`
  margin: 32px auto;
  max-width: 1040px;
`;

const Title = styled.div`
  padding: 0 16px;
  font-size: 20px;
  margin-bottom: 16px;
`;

export default ({ loading, incidents }) => {
  return (
    <Container>
      <Title>Incidents</Title>
      {!loading ? (
        incidents.map((incident) => (
          <Incident key={incident.id} incident={incident} />
        ))
      ) : (
        <>
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </>
      )}
    </Container>
  );
};
