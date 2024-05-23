import styled from "styled-components";

const Background = styled.div`
  background-color: rgb(61, 167, 81); //#b1b1b1;
  color: white;
  padding: 16px;
  border-radius: 3px;
  margin-bottom: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  transition: 0.3s;
`;

const Title = styled.h2`
  font-size: 20px;
  margin: 0;
  font-weight: normal;
`;

export const Status = () => (
  <Background>
    <Title>All Systems Operational</Title>
  </Background>
);
