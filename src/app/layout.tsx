import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fitness Dashboard",
  description: "Fitness tracking and monitoring app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl" className="h-full">
      <body className="h-full">
        {children}
      </body>
    </html>
  );
}
