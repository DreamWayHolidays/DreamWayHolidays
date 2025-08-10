import type React from "react"
import "../globals.css";
import Header from "@/components/Header"


export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
         <Header isHomePage={false}/>
        <div className="min-h-screen">{children}</div>   
    </>
  )
}
