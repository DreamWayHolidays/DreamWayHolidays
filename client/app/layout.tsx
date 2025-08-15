import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Footer from "@/components/Footer"
import HeaderController from "@/components/HeaderController"
import {Toaster} from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Trek365 - Spiritual & Adventure Journeys Across India",
  description:
    "Discover amazing spiritual and adventure travel experiences across India with Trek365. Your journey, our care.",
}

export default function RootLayout({children,}: {children: React.ReactNode}) {


  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <HeaderController/>
        <Toaster position="top-center"/>
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
