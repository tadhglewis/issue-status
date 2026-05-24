import { describe, expect, test } from "vitest";
import { staticProvider } from "./static";
import type { ComponentType, IncidentType } from "../api/types";

describe("static", () => {
  test("return expected", async () => {
    const components: ComponentType[] = [
      { id: "1", name: "API", status: "operational" },
      { id: "2", name: "Website", status: "degradedPerformance" },
      { id: "3", name: "App", status: "partialOutage" },
      { id: "4", name: "Payments", status: "majorOutage" },
      { id: "5", name: "Support", status: "unknown" },
    ];

    const incidents: IncidentType[] = [
      {
        active: true,
        createdAt: "2024-05-13T08:55:04.355Z",
        description: "_This is a major service outage_",
        id: "1",
        scheduled: false,
        title: "Major service outage",
      },
      {
        active: false,
        createdAt: "2024-05-13T08:55:04.355Z",
        description: "This is a partial payments outage",
        id: "2",
        scheduled: false,
        title: "Partial payments outage",
      },
    ];

    const provider = staticProvider({
      components,
      incidents,
      historicalIncidents: [],
    });

    const result = await Promise.all([
      provider.getComponents(),
      provider.getHistoricalIncidents(),
      provider.getIncidents(),
    ]);

    expect(result).toMatchInlineSnapshot(`
      [
        [
          {
            "id": "1",
            "name": "API",
            "status": "operational",
          },
          {
            "id": "2",
            "name": "Website",
            "status": "degradedPerformance",
          },
          {
            "id": "3",
            "name": "App",
            "status": "partialOutage",
          },
          {
            "id": "4",
            "name": "Payments",
            "status": "majorOutage",
          },
          {
            "id": "5",
            "name": "Support",
            "status": "unknown",
          },
        ],
        [],
        [
          {
            "active": true,
            "createdAt": "2024-05-13T08:55:04.355Z",
            "description": "_This is a major service outage_",
            "id": "1",
            "scheduled": false,
            "title": "Major service outage",
          },
          {
            "active": false,
            "createdAt": "2024-05-13T08:55:04.355Z",
            "description": "This is a partial payments outage",
            "id": "2",
            "scheduled": false,
            "title": "Partial payments outage",
          },
        ],
      ]
    `);
  });
});
