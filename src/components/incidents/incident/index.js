import React from "react";
import styled from "styled-components";

const Incident = styled.div`
  background-color: white;
  border-radius: 3px;
  padding: 16px;
  box-shadow: 0px 0px 33px -32px rgba(0, 0, 0, 0.75);

  :not(:last-child) {
    margin-bottom: 16px;
  }
`;

const Created = styled.div`
  margin: 0;
  font-weight: bold;
  margin-bottom: 16px;
`;

const Comment = styled.div`
  white-space: pre;
`;

export default ({ incident }) => {
  console.log(incident);
  return (
    <Incident>
      <Created>{new Date(incident.created_at).toUTCString()}</Created>
      <Comment>{incident.body}</Comment>
    </Incident>
  );
};
