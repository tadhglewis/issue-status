import React from "react";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import { IncidentType } from "@/api/types";
import { BaseBadge } from "../components/Badge";

const Card = styled.div<{ $active: boolean }>`
  transition: 0.3s;
  border-left: 16px solid
    ${(props) =>
      props.$active ? "rgba(73, 144, 226, 0.2)" : "rgba(177, 177, 177,0.2)"};
  background-color: white;
  border-radius: 3px;
  padding: 16px;
  box-shadow: 0px 0px 33px -32px rgba(0, 0, 0, 0.75);
  margin-top: 8px;

  &:not(:last-child) {
    margin-bottom: 16px;
  }
`;

const Details = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3px;
`;

const Title = styled.div`
  margin-right: 16px;
  font-weight: bold;
  color: #1e1e1e;
`;

const Description = styled.div`
  white-space: break-spaces;
  color: #1e1e1e;
`;

const Status = styled(BaseBadge)<{ $active: boolean }>`
  color: ${(props) => (props.$active ? "#2f5888" : "#6e6b6b")};
  background-color: ${(props) =>
    props.$active ? "rgba(73, 144, 226, 0.1)" : "rgba(177, 177, 177, 0.1)"};
`;

const Created = styled.div`
  font-size: 13px;
  color: #6e6b6b;
  font-weight: bold;
`;

export const Incident = ({
  title,
  active,
  description,
  createdAt,
}: IncidentType) => (
  <Card $active={active}>
    <Details>
      <Created>{createdAt}</Created>
      <Status $active={active}>{active ? "Active" : "Closed"}</Status>
    </Details>
    <Title>{title}</Title>
    <Description>
      <ReactMarkdown>{description}</ReactMarkdown>
    </Description>
  </Card>
);
