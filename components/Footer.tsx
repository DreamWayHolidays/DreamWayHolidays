import Link from "next/link"
import { Mail, Phone, MapPin, Heart } from "lucide-react"
import { FiFacebook } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa";
import { CiTwitter } from "react-icons/ci";

export default function Footer() {
  return (
    <footer className="bg-emerald-600 text-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <Link href="/" className="text-3xl font-black text-white">
              Trek365
            </Link>
            <p className="mt-4 text-lg text-gray-100 max-w-md leading-relaxed">
              Crafting transformative travel experiences across incredible India. Your journey to spiritual awakening
              and adventure begins here.
            </p>
            <div className="flex space-x-6 mt-8">
              <a
                href="#"
                className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg hover:scale-110 transition-all"
              >
                <FiFacebook className="text-emerald-600" size={20} />
              </a>
              <a
                href="#"
                className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg hover:scale-110 transition-all"
              >
                <FaInstagram className="text-emerald-600" size={20} />
              </a>
              <a
                href="#"
                className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg hover:scale-110 transition-all"
              >
                <CiTwitter className="text-emerald-600" size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6 text-gray-100">Quick Links</h3>
            <ul className="space-y-4">
              {[
                { href: "/", label: "Home" },
                { href: "/packages", label: "Packages" },
                { href: "/about", label: "About Us" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="font-medium">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6 text-gray-100">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <Mail size={18} className="mr-3 text-gray-100" />
                <span className="font-medium">info@trek365.com</span>
              </div>
              <div className="flex items-center">
                <Phone size={18} className="mr-3 text-gray-100" />
                <span className="font-medium">+91 98765 43210</span>
              </div>
              <div className="flex items-center">
                <MapPin size={18} className="mr-3 text-gray-100" />
                <span className="font-medium">Uttarakhand, India</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8">
          <div>
            <p className="text-gray-100 mb-4 md:mb-0 text-center">&copy; {new Date().getFullYear()} Trek365. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
