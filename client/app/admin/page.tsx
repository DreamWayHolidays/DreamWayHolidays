"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Plus, Search, Filter} from "lucide-react"
import PackageCard from "@/components/PackageCard"
import toast from "react-hot-toast"
import axios from "axios"


export default function PackagesPage() {

  interface Package {
    id: string;
    title: string;
    duration: string;
    price: number;
    type: string;
    rating: number;
    reviews: [];
    images: string[];
    description: string;
  }

  const [packages, setPackages] = useState<Package[]>([]);
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")

  const filteredPackages = packages.filter((pkg) => {
    const matchesSearch = pkg.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "all" || pkg.type === typeFilter
    return matchesSearch && matchesType
  })

  const getPackages = async (): Promise<void> => {
    try {
      const res = await fetch("/packages.json");
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const data: Package[] = await res.json();
      setPackages(data);
    } catch (error) {
      console.error("Failed to fetch packages:", error);
    }
  };

  useEffect(() => {
    getPackages();
  }, [])



  const handleDelete = async (id: string | number) => {
    try {
      const res = await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/packages/deletePackage/${id}`);
      if (res.data.success) {
        getPackages();
        toast.success("Package deleted successfully");
      }
    } catch (error) {
      toast.error("Failed to delete package");
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Packages</h1>
          <p className="text-gray-600 mt-2">Manage your travel packages and itineraries</p>
        </div>
        <Link
          href="/admin/packages/create"
          className="mt-4 sm:mt-0 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105 flex items-center"
        >
          <Plus className="mr-2" size={20} />
          Create Package
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative col-span-3">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search packages..."
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent focus:outline-none"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="Spiritual">Spiritual</option>
            <option value="Adventure">Adventure</option>
            <option value="Cultural">Cultural</option>
            <option value="Wildlife">Wildlife</option>
          </select>
        </div>
      </div>

      <div className="rounded-2xl p-4">

        <div className="flex flex-col gap-4">
          {filteredPackages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} onDelete={handleDelete}/>
          ))}
        </div>

        {filteredPackages.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No packages found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
            <Link
              href="/admin/packages/create"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105"
            >
              Create Your First Package
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}