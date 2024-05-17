import styled from "styled-components";

type Space = "small" | "medium" | "large";

const spaceMap: Record<Space, number> = {
  large: 32,
  medium: 16,
  small: 8,
};

export const Stack = styled.div<{ $space?: Space }>`
  display: flex;
  flex-direction: column;
  row-gap: ${(props) => spaceMap[props.$space ?? "small"]}px;
  justify-content: space-between;
`;
