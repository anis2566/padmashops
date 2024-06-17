import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NextTopLoader from 'nextjs-toploader';
import { ClerkProvider } from '@clerk/nextjs';

import { Toaster } from "@/components/ui/sonner";

import "./globals.css";
import { QueryProvider } from "@/providers/query-provider";
import { ModalProvider } from "@/providers/modal-provider";
import { ConfettiProvider } from "@/providers/confitti-provider";
import { AppKnockProviders } from "@/providers/knock-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E-Shop | Next Generation Ecomerce Website", 
  description: "Popular e-commerce website in bangladesh",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <AppKnockProviders>
        <html lang="en">
          <body className={inter.className}>
            <QueryProvider>
              {children}
              <Toaster />
              <NextTopLoader showSpinner={false} color="#F97316" />
              <ModalProvider />
              <ConfettiProvider />
            </QueryProvider>
          </body>
        </html>
      </AppKnockProviders>
    </ClerkProvider>
  );
}
