import React from "react";
import styled from "styled-components";

const Title = styled.h1`
  text-align: center;
  margin-top: 0;
  margin-bottom: 0;
`;

const Logo = styled.img``;

const Container = styled.div`
  text-align: center;
  margin-bottom: 16px;
`;

const Header = () =>
  process.env.REACT_APP_LOGO || process.env.REACT_APP_NAME ? (
    <Container>
      {process.env.REACT_APP_LOGO ? (
        <Logo
          src={process.env.REACT_APP_LOGO}
          alt={process.env.REACT_APP_NAME}
        />
      ) : (
        <Title>{process.env.REACT_APP_NAME}</Title>
      )}
    </Container>
  ) : null;

export default Header;
