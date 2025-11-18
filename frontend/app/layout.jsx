'use client'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { WalletKitProvider } from "@mysten/wallet-kit";
import { AppProvider } from "@/components/context/appcontext"
const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });


export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased dark">

        <WalletKitProvider>
          <AppProvider>
            {children}
          </AppProvider>
        </WalletKitProvider>

        <Analytics />

      </body>
    </html>
  );
}
