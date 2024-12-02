import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { AppProvider } from "@/core/providers/app.provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pet Management",
  description: "Système de gestion d'animaux de compagnie",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased`}
      >
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
