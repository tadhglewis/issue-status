// TODO remove
"use client";

import { DataProvider } from "@/api/client";
import { StyledComponentsRegistry } from "@/lib/registry";
import type { Metadata } from "next";
import styled from "styled-components";
import { Roboto } from "next/font/google";

const inter = Roboto({ weight: ["400", "500"], subsets: ["latin"] });

// TODO ??
// export const metadata: Metadata = {
//   title: "Issue Status",
//   description: "",
// };

const Box = styled.div`
  max-width: 600px;
  padding: 16px;
  margin: 16px auto;
`;

const Body = styled.body`
  background-color: #f5f8fa;
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <StyledComponentsRegistry>
        <Body className={inter.className}>
          <DataProvider>
            <Box>{children}</Box>
          </DataProvider>
        </Body>
      </StyledComponentsRegistry>
    </html>
  );
}
