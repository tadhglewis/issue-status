import React from "react";
import styled from "styled-components";
import Incident from "./incident";

const Container = styled.div`
  margin: 32px auto 0 auto;
  max-width: 1009px;
  padding: 16px;
`;

export default ({ loading, incidents }) => {
  return (
    <Container>
      {!loading
        ? incidents.map((incident) => (
            <Incident key={incident.id} incident={incident} />
          ))
        : null}
    </Container>
  );
};
