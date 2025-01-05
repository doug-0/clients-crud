import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from './_provider';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: "CRUD Clients",
  description: "App to manage customers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          {children}
        </QueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
