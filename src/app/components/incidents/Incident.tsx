import React from "react";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import { IncidentType } from "@/api/types";
import { BaseBadge } from "../components/Badge";
import dayjs from "dayjs";

const Card = styled.div<{ $active: boolean }>`
  transition: 0.3s;
  border-left: 16px solid
    ${(props) =>
      props.$active ? "rgba(73, 144, 226, 0.2)" : "rgba(177, 177, 177,0.2)"};
  background-color: ${(props) => props.theme.colors.content};
  border-radius: 3px;
  padding: 16px;
  box-shadow: 0px 0px 33px -32px rgba(0, 0, 0, 0.75);
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
  color: ${(props) => props.theme.colors.text};
`;

const Description = styled.div`
  color: ${(props) => props.theme.colors.text};
`;

const Status = styled(BaseBadge)<{ $active: boolean }>`
  color: ${(props) =>
    props.$active
      ? props.theme.colors.status.active.text
      : props.theme.colors.status.closed.text};
  background-color: ${(props) =>
    props.$active
      ? props.theme.colors.status.active.background
      : props.theme.colors.status.closed.background};
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
      <Created>{dayjs(createdAt).format("MMMM D, YYYY h:mm A")}</Created>
      <Status $active={active}>{active ? "Active" : "Closed"}</Status>
    </Details>
    <Title>{title}</Title>
    <Description>
      <ReactMarkdown>{description}</ReactMarkdown>
    </Description>
  </Card>
);
