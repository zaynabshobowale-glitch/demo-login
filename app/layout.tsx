import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Student Result Checker",
  description: "Check terminal academic records using Student ID and PIN",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-slate-50 text-slate-900">
        {children}
      </body>
    </html>
  );
}