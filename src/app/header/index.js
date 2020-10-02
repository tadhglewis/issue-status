import React from "react";
import styled from "styled-components";

const Title = styled.h1`
  text-align: center;
  margin-top: 0;
  margin-bottom: 0;
`;

const Logo = styled.img``;

const Header = styled.div`
  text-align: center;
  margin-bottom: 16px;
`;

export default () =>
  process.env.REACT_APP_LOGO || process.env.REACT_APP_NAME ? (
    <Header>
      {process.env.REACT_APP_LOGO ? (
        <Logo
          src={process.env.REACT_APP_LOGO}
          alt={process.env.REACT_APP_NAME}
        />
      ) : (
        <Title>{process.env.REACT_APP_NAME}</Title>
      )}
    </Header>
  ) : null;
