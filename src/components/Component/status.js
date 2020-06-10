import React from "react";
import styled from "styled-components";
import useStatus from "./useStatus";

const Status = styled.div`
  color: ${(props) => props.color};
`;

export default ({ labels }) => {
  const [status] = useStatus(labels);

  return <Status color={status?.colour}>{status?.name}</Status>;
};
