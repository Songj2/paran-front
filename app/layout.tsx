import type { Metadata } from "next";
import { ThemeModeScript } from "flowbite-react";
import "./globals.css";
import Header from "./components/Header";
import Link from "next/link";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "paranmanzang",
  description: "Generated by create paran front",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Paranmanzang</title>
        <ThemeModeScript />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
