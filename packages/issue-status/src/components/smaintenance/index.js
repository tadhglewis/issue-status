import React from "react";
import styled from "styled-components";
import Maintenance from "./maintenance";
import Skeleton from "./skeleton";
import useDidMount from "../useDidMount";

const Container = styled.div`
  margin: 32px auto 0 auto;
  max-width: 1040px;
`;

const Title = styled.div`
  padding: 0 16px;
  font-size: 20px;
  margin-bottom: 16px;
`;

const NoFound = styled.div`
  margin: 0 8px;
`;

export default ({ loading, smaintenance }) => {
  const [hasMounted] = useDidMount();

  return (
    <Container>
      <Title>Scheduled Maintenance</Title>
      {!loading || hasMounted ? (
        smaintenance?.length > 0 ? (
          smaintenance?.map((maintenance) => (
            <Maintenance key={maintenance.id} maintenance={maintenance} />
          ))
        ) : (
          <NoFound>No Maintenance found.</NoFound>
        )
      ) : (
        <>
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </>
      )}
    </Container>
  );
};
