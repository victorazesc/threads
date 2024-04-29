import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "../globals.css";
import LeftSidebar from "@/components/shared/LeftSidebar";
import Bottombar from "@/components/shared/Bottombar";
import RightSidebar from "@/components/shared/RightSidebar";
import Topbar from "@/components/shared/Topbar";
import Providers from "../../providers/Providers";
import { ThemeProvider } from "@/providers/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Threads",
  description: "A Next.js 13 Meta Threads application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <html lang='en'>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Topbar />


            <main className='flex flex-row'>
              <section className='main-container'>
                <div className='w-full max-w-[620px] pl-6'>{children}</div>
              </section>
            </main>

            <Bottombar />
          </ThemeProvider>
        </body>
      </html>
    </Providers>
  );
}