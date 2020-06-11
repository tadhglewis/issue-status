import React from "react";
import styled from "styled-components";
import Incident from "./incident";

const Container = styled.div`
  margin: 32px auto 0 auto;
  max-width: 1040px;
`;

const Title = styled.h3`
  padding: 0 16px;
`;

export default ({ loading, incidents }) => {
  return (
    <Container>
      <Title>Incidents</Title>
      {!loading
        ? incidents.map((incident) => (
            <Incident key={incident.id} incident={incident} />
          ))
        : null}
    </Container>
  );
};
