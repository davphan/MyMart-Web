import type { Metadata } from "next";
import "./globals.css";
import { montserrat } from "@/libs/util/fonts";
import Navbar from "@/libs/components/Navbar";
import { auth } from "@/libs/auth/auth";

export const metadata: Metadata = {
  title: "MyMart - Web",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en" suppressHydrationWarning className="overflow-x-hidden">
      <body className={`pt-14 h-screen ${montserrat.className}`}>
        <Navbar user={session?.user}/>
        {children}
      </body>
    </html>
  );
}
