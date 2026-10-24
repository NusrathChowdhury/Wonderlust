
import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import "./globals.css";import "./globals.css";

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wanderlust | Explore the World",
  description:
    "Discover beautiful destinations, explore new places, and plan your next adventure with Wanderlust.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${josefinSans.className}  h-full antialiased`}>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
