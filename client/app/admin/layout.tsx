"use client";

import { Package, Mail, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/contexts/authContext";

const sidebarItems = [
  { href: "/admin", icon: Package, label: "Packages" },
  { href: "/admin/queries", icon: Mail, label: "User Queries" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { setUserInfo } = useAuth();
  const router = useRouter();

  const handleLogOut = () => {
    setUserInfo({ user: null, token: null });
    localStorage.removeItem("dreamWayHolidays");
    router.push("/login");
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col pt-20">
        <div className="flex flex-1 flex-col md:flex-row">
          <aside className="w-full md:w-64 bg-white border-b md:border-r border-gray-200 p-4 shadow-lg">
            <h2 className="text-gray-800 text-lg text-center font-bold mb-4">Admin Panel</h2>
            <nav className="space-y-2">
              {sidebarItems.map((item) => {
                const isActive = pathname === item.href;
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
                );
              })}
              <button
                onClick={handleLogOut}
                className="w-full flex items-center gap-2 px-4 py-3 text-red-500 hover:bg-gray-100 rounded-lg mt-4"
              >
                <LogOut size={18} />
                Log out
              </button>
            </nav>
          </aside>

          <main className="flex-1 p-6 bg-gray-50">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
