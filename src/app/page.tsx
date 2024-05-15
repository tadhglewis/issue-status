// TODO remove
"use client";

import styled from "styled-components";
import { Components } from "./components/components/Components";
import { Incidents } from "./components/incidents/Incidents";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

const Stack = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 32px;
  justify-content: space-between;
`;

export default function Home() {
  return (
    <Stack>
      <Header />
      <Components />
      <Incidents />
      <Footer />
    </Stack>
  );
}
