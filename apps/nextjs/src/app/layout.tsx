import "@/styles/globals.css";

import type { Metadata } from "next";
import { cn } from "@devlab/ui";
import { ThemeProvider, ThemeToggle } from "@devlab/ui/theme";
import { Toaster } from "@devlab/ui/toaster";
import { auth } from "@trigger.dev/sdk/v3";
import { GeistMono } from "geist/font/mono";
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
      <body className={cn("font-sans", GeistSans.variable, GeistMono.variable)}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TriggerProvider accessToken={publicToken}>
            <TRPCReactProvider>{children}</TRPCReactProvider>
            <div className="absolute bottom-0 left-0 z-50">
              <ThemeToggle />
            </div>
            <Toaster />
          </TriggerProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
