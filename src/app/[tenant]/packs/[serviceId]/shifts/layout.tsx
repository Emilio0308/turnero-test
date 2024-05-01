import "@/app/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Turnex",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <section>{children}</section>;
}