import "@/app/globals.css";
import NavbarUser from "@/components/NavbarUser";
import globals from "@/styles/globals.module.scss";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Turnex",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <NavbarUser />
      <main>{children}</main>
    </>
  );
}
