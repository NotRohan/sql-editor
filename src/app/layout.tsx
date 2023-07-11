import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Atlan",
  description: "Run SQL queries on web",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "bg-white text-slate-900 min-h-screen antialiased",
          inter.className
        )}
      >
        <main>{children}</main>
      </body>
    </html>
  );
}
