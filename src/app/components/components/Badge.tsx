import { ComponentType } from "@/api/types";
import styled from "styled-components";

export const BaseBadge = styled.div`
  padding: 5px 12px;
  border-radius: 16px;
  font-size: 13px;
  transition: 0.3s;
`;

const OperationalBadge = styled(BaseBadge)`
  color: ${(props) => props.theme.colors.operational.text};
  background-color: ${(props) => props.theme.colors.operational.background};
`;

const DegradedPerformanceBadge = styled(BaseBadge)`
  color: ${(props) => props.theme.colors.degradedPerformance.text};
  background-color: ${(props) =>
    props.theme.colors.degradedPerformance.background};
`;

const PartialOutageBadge = styled(BaseBadge)`
  color: ${(props) => props.theme.colors.partialOutage.text};
  background-color: ${(props) => props.theme.colors.partialOutage.background};
`;

const MajorOutageBadge = styled(BaseBadge)`
  color: ${(props) => props.theme.colors.majorOutage.text};
  background-color: ${(props) => props.theme.colors.majorOutage.background};
`;

const UnknownBadge = styled(BaseBadge)`
  color: ${(props) => props.theme.colors.unknown.text};
  background-color: ${(props) => props.theme.colors.unknown.background};
`;

export const Badge = ({ status }: { status: ComponentType["status"] }) => {
  const badges: Record<ComponentType["status"], any> = {
    operational: <OperationalBadge>Operational</OperationalBadge>,
    degradedPerformance: (
      <DegradedPerformanceBadge>Degraded Performance</DegradedPerformanceBadge>
    ),
    partialOutage: <PartialOutageBadge>Partial Outage</PartialOutageBadge>,
    majorOutage: <MajorOutageBadge>Major Outage</MajorOutageBadge>,
    unknown: <UnknownBadge>Unknown</UnknownBadge>,
  };

  return badges[status];
};
