import type { Metadata } from "next";
import "./globals.css";
import { ray } from "@/next-persian-fonts/ray";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={ray.className}>{children}</body>
    </html>
  );
}
