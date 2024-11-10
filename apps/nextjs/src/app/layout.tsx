import "@/styles/globals.css";

import type { Metadata } from "next";
import { auth } from "@trigger.dev/sdk/v3";
import { GeistSans } from "geist/font/sans";

import { TRPCReactProvider } from "../trpc/react";
import { TriggerProvider } from "./_components/trigger-provider";

export const metadata: Metadata = {
  title: "DevLab",
  description: "DevLab",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const publicToken = await auth.createPublicToken({
    scopes: {
      read: {
        tags: ["devlab"],
      },
    },
  });
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <TriggerProvider accessToken={publicToken}>
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </TriggerProvider>
      </body>
    </html>
  );
}
