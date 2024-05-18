// TODO remove
"use client";

import { Components } from "./components/components/Components";
import { HistoricalIncidents } from "./components/incidents/HistoricalIncidents";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Stack } from "./components/Stack";
import { Incidents } from "./components/incidents/Incidents";

export default function Home() {
  return (
    <Stack $space="large">
      <Header />
      <Incidents />
      <Components />
      <HistoricalIncidents />
      <Footer />
    </Stack>
  );
}
