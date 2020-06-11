import React from "react";
import styled from "styled-components";

const Incident = styled.div`
  background-color: red;
`;

export default ({ incident }) => {
  return <Incident>{incident.title}</Incident>;
};
