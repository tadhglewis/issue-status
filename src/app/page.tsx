// TODO remove
"use client";

import { Components } from "./components/components/Components";
import { Incidents } from "./components/incidents/Incidents";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Stack } from "./components/Stack";

export default function Home() {
  return (
    <Stack $space="large">
      <Header />
      <Components />
      <Incidents />
      <Footer />
    </Stack>
  );
}
