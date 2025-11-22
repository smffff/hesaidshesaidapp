import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "He Said / She Said - Emotionally Intelligent Communication",
  description: "Transform conflict into clarity using nervous-system-safe rewrites, relationship context, and AI-powered translation. By Ikwe.ai",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
