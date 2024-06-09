"use client";

import "@knocklabs/react/dist/index.css";
import { KnockProvider, KnockFeedProvider } from "@knocklabs/react";

import { ReactNode } from "react";
import { useAuth } from "@clerk/nextjs";

export function AppKnockProviders({ children }: { children: ReactNode }) {
  const { userId } = useAuth();

  const apiKey = process.env.NEXT_PUBLIC_KNOCK_API_KEY || '';
  const feedId = process.env.NEXT_PUBLIC_KNOCK_FEED_ID || '';

  return (
    <KnockProvider
      apiKey={apiKey}
      userId={userId || ""}
    >
      <KnockFeedProvider feedId={feedId}>
        {children}
      </KnockFeedProvider>
    </KnockProvider>
  );
}