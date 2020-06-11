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

const Header = styled.div`
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  align-items: end;
`;

const Title = styled.div`
  margin-right: 16px;
  font-weight: bold;
`;

const Created = styled.div`
  font-size: 13px;
`;

const Comment = styled.div`
  white-space: break-spaces;
`;

const Status = styled.div`
  color: ${(props) => (props.active ? "#6e6b6b" : "#2f5888")};
  background-color: ${(props) =>
    props.active ? "rgba(177, 177, 177, 0.1)" : "rgba(73, 144, 226, 0.1)"};
  padding: 5px 12px;
  border-radius: 16px;
  font-size: 13px;
`;

export default ({ incident }) => (
  <Incident>
    <Header>
      <div>
        <Title>{incident.title}</Title>
        <Created>{new Date(incident.created_at).toLocaleString()}</Created>
      </div>
      <Status active={incident.closed_at}>
        {incident.closed_at ? "Closed" : "Active"}
      </Status>
    </Header>
    <Comment>{incident.body}</Comment>
  </Incident>
);
