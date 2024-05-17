import styled from "styled-components";

export const Skeleton = styled.div`
  width: 100%;
  height: 44px;
  border-radius: 3px;
  background-color: ${(props) => props.theme.colors.body};
`;
