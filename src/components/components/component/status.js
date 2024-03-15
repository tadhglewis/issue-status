import React from "react";
import styled from "styled-components";
import useStatus from "./useStatus";

const Container = styled.div`
  color: ${(props) => props.colour};
  background-color: ${(props) => props.backgroundColour};
  padding: 5px 12px;
  border-radius: 16px;
  font-size: 13px;
  transition: 0.3s;
`;

const Status = ({ labels }) => {
  const [status] = useStatus(labels);

  return (
    <Container
      colour={status?.colour}
      backgroundColour={status?.backgroundColour}
    >
      {status?.name}
    </Container>
  );
};

export default Status;
