import type { Metadata } from "next";
import { Roboto, Roboto_Mono } from "next/font/google";
import "./globals.css";

import { headers } from 'next/headers'
import ContextProvider from '@/context'
import Header from '@/components/Header'

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});
const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tai Shang Micro AI",
  description: "Assign each an on-chain identity </>",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersObj = await headers()
  const cookies = headersObj.get('cookie')

  return (
    <html lang="en">
      <body className={`${roboto.variable} ${robotoMono.variable} antialiased`}>
        <ContextProvider cookies={cookies}>
          <Header />
          {children}
        </ContextProvider>
      </body>
    </html>
  );
}
