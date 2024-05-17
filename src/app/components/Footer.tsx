import styled from "styled-components";

const Box = styled.div`
  display: flex;
  flex-direction: column;
`;

const Link = styled.a`
  color: #6e6b6b;
  font-size: 13px;
  text-decoration: none;
  transition: 0.3s;
  display: block;
  align-self: end;

  &:hover {
    opacity: 0.9;
  }
`;

export const Footer = () => (
  <Box>
    <Link
      rel="noopener"
      target="_blank"
      href="https://github.com/tadhglewis/issue-status"
    >
      Powered by Issue Status
    </Link>
  </Box>
);
