"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import Image from "next/image"

interface HeaderProps {
  isHomePage: boolean;
}

export default function Header({ isHomePage }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/packages", label: "Packages" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/admin", label: "Admin" },
  ]

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${ isHomePage ? isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-transparent" : "bg-white/95 backdrop-blur-md shadow-md"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className={`text-3xl font-black transition-colors ${isHomePage ? isScrolled ? "text-gray-900" : "text-white" : "text-gray-900"}`}>
           {isHomePage ? isScrolled ? <Image src={"/web-app-manifest-192x192.png"} width={80} height={50} alt="trek365 logo" /> : 
            <Image src={"/web-app-manifest-light-192x192.png"} width={80} height={50} alt="trek365 logo" /> :
            <Image src={"/web-app-manifest-192x192.png"} width={80} height={50} alt="trek365 logo" />
           }
          </Link>
          
          <nav className="hidden md:flex space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-medium transition-all duration-300 hover:text-emerald-600 hover:scale-110 ${isHomePage ? isScrolled ? "text-gray-700" : "text-white" : "text-gray-700"}`}>
                {link.label}
              </Link>
            ))}
          </nav>

          <button className={`md:hidden transition-colors ${isHomePage ? isScrolled ? "text-gray-900" : "text-white" : "text-gray-900"}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden py-6 bg-white/95 backdrop-blur-md rounded-2xl mt-2 shadow-xl">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-3 px-6 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-all duration-300 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  )
}
