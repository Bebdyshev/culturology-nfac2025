import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Raleway } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import { AnimationProvider } from "@/components/animation-provider"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
})

export const metadata: Metadata = {
  title: "Culturology | Discover Indigenous Cultures",
  description: "Explore the rich heritage of lesser-known indigenous peoples around the world.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${playfair.variable} ${raleway.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <AnimationProvider>
            <Navbar />
            <main>{children}</main>
          </AnimationProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
