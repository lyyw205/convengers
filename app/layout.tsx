import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Convengers",
  description: "Partner network for high-trust product teams and public references.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
