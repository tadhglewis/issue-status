import styled from "styled-components";

export const Skeleton = styled.div`
  width: 100%;
  height: 84px;
  border-radius: 3px;
  background-color: ${(props) => props.theme.colors.content};
  box-shadow: 0px 0px 33px -32px rgba(0, 0, 0, 0.75);
`;
