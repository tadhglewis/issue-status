import React from "react";
import styled from "styled-components";
import useRefetch from "./useRefetch";

const StatusBar = styled.div`
  background-color: #3da751;
  color: white;
  padding: 16px;
  border-radius: 3px;
  margin-bottom: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

const Status = styled.h2`
  font-size: 20px;
  margin: 0;
  font-weight: normal;
`;

const Reload = styled.button`
  background-color: transparent;
  color: white;
  text-decoration: underline;
  border: none;
  cursor: pointer;
  text-align: right;
  padding: 0;
`;

const Code = styled.code`
  white-space: pre-wrap;
  display: block;
`;

// TODO: change all systems status based on current status of all components
export default ({ loading, error, refetch }) => {
  const [timeAgo] = useRefetch(refetch, [loading]);

  return (
    <>
      {error.hasError && (
        <Code>
          <div>An error occured</div>
          <div>
            You may have exceeded the rate limit. Try again in 1 hour to fetch
            the latest data.
          </div>
          {JSON.stringify(error.errors, null, 3)}
        </Code>
      )}
      <StatusBar>
        <Status>All Systems Operational</Status>
        <Reload onClick={refetch}>{loading ? "reloading" : timeAgo}</Reload>
      </StatusBar>
    </>
  );
};
