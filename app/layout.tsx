import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/context/auth-context"
import Script from "next/script"


const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "RHYTHMIX - Web3 Music Platform",
  description: "A decentralized music platform and marketplace for artists and fans",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
      <Script
          src="https://cdn.botpress.cloud/webchat/v2.2/inject.js"
          strategy="beforeInteractive"
        />
        <Script
          src="https://files.bpcontent.cloud/2025/03/20/09/20250320094107-7WLTM8YV.js"
          strategy="lazyOnload"
        />

      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'