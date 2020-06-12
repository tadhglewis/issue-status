import React from "react";
import styled from "styled-components";

const StatusBar = styled.div`
  background-color: #3da751;
  color: white;
  padding: 16px;
  font-size: 20px;
  border-radius: 3px;
  margin-bottom: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Reload = styled.button`
  background-color: transparent;
  color: white;
  text-decoration: underline;
  border: none;
  cursor: pointer;
`;

const Code = styled.code`
  white-space: pre-wrap;
`;

// TODO: change all systems status based on current status of all components
export default ({ refetch, error }) => {
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
        All Systems Operational <Reload onClick={refetch}>Reload</Reload>
      </StatusBar>
    </>
  );
};
