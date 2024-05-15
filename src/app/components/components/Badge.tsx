import { ComponentType } from "@/api/types";
import styled from "styled-components";

export const BaseBadge = styled.div`
  padding: 5px 12px;
  border-radius: 16px;
  font-size: 13px;
  transition: 0.3s;
`;

const OperationalBadge = styled(BaseBadge)`
  color: #247234;
  background-color: rgba(61, 167, 81, 0.1);
`;

const PerformanceIssuesBadge = styled(BaseBadge)`
  color: #2f5888;
  background-color: rgba(73, 144, 226, 0.1);
`;

const PartialOutageBadge = styled(BaseBadge)`
  color: #74582a;
  background-color: rgba(255, 198, 103, 0.1);
`;

const MajorOutageBadge = styled(BaseBadge)`
  color: #8e3b31;
  background-color: rgba(217, 68, 48, 0.1);
`;

const UnknownBadge = styled(BaseBadge)`
  color: #6e6b6b;
  background-color: rgba(177, 177, 177, 0.1);
`;

export const Badge = ({ status }: { status: ComponentType["status"] }) => {
  const badges: Record<ComponentType["status"], any> = {
    operational: <OperationalBadge>Operational</OperationalBadge>,
    performanceIssues: (
      <PerformanceIssuesBadge>Performance Issues</PerformanceIssuesBadge>
    ),
    partialOutage: <PartialOutageBadge>Partial Outage</PartialOutageBadge>,
    majorOutage: <MajorOutageBadge>Major Outage</MajorOutageBadge>,
    unknown: <UnknownBadge>Unknown</UnknownBadge>,
  };

  return badges[status];
};
