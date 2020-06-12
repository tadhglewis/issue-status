import React from "react";
import config from "../../config";
import styled from "styled-components";

const Title = styled.h1`
  text-align: center;
  margin-top: 0;
`;

const Logo = styled.img``;

const Header = styled.div`
  text-align: center;
  margin-bottom: 16px;
`;

export default () =>
  config.logo || config.name ? (
    <Header>
      {config.logo ? (
        <Logo src={config.logo} alt={config.name} />
      ) : (
        <Title>{config.name}</Title>
      )}
    </Header>
  ) : null;
