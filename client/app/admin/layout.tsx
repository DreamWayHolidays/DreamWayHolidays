"use client";

import { Package, Mail} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const sidebarItems = [
  { href: "/admin", icon: Package, label: "Packages" },
  { href: "/admin/queries", icon: Mail, label: "User Queries" },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen flex flex-col my-4 pt-20">
      <div className="flex flex-1">
        <aside className="w-64 bg-white border-r border-gray-200 p-4 shadow-lg">
          <h2 className="text-gray-800 text-lg text-center font-bold mb-4">Admin Panel</h2>
          <nav className="space-y-2">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-emerald-600 text-white"
                      : "text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <item.icon className="mr-3" size={18} />
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </aside>

        <div className="flex-1 p-6 bg-gray-50">{children}</div>
      </div>
    </div>
  )
}
