"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Search, Filter } from "lucide-react";
import PackageCard from "@/components/PackageCard";
import toast from "react-hot-toast";
import axios from "axios";
import { ClipLoader } from "react-spinners";

interface Review {
  _id: string;
  name: string;
  rating: number;
  date: string;
  text: string;
}

interface ImageObject{
  public_id : string
  imageUrl :  string
}

interface Package {
  _id: string;
  title: string;
  duration: string;
  price: number;
  type: string;
  rating: number;
  reviews: Review[];
  images: ImageObject[];
  description: string;
}


interface category {
  _id: string;
  name: string;
}


export default function PackagesPage() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<category[]>([]);

  const filteredPackages = packages.filter((pkg) => {
    const matchesSearch = pkg.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || pkg.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const getCategories = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/packages/getCategories`
      );
      if (res.data.success) {
        setCategories(res.data.allCategories);
      }
    } catch (error) {
      toast.error("unable to fetch categories");
    } finally {
      setLoading(false);
    }
  };
  const getPackages = async (): Promise<void> => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/packages/getPackages`
      );
      if (res.data.success) {
        const data: Package[] = res.data.Packages;
        console.log(data);
        setPackages(data);
      }
    } catch (error) {
      console.error("Failed to fetch packages:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPackages();
    getCategories();
  }, []);

  const handleDelete = async (id: string | number) => {
    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/packages/deletePackage/${id}`
      );
      if (res.data.success) {
        getPackages();
        toast.success("Package deleted successfully");
      }
    } catch (error) {
      toast.error("Failed to delete package");
    }
  };

  if (loading) {
    return (
      <div className="flex w-full h-screen justify-center items-center">
        <ClipLoader color="#36d7b7" size={50} />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Packages</h1>
          <p className="text-gray-600 mt-2">
            Manage your travel packages and itineraries
          </p>
        </div>
        <div className="flex gap-2 flex-col md:gap-4 md:flex-row">
          <Link
            href="/admin/packages/create"
            className="mt-4 sm:mt-0 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105 flex items-center"
          >
            <Plus className="mr-2" size={20} />
            Create Package
          </Link>
          <Link
            href="/admin/packages/category"
            className="mt-4 sm:mt-0 bg-white border border-black/20 text-emerald-700 px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105 flex items-center"
          >
            <Plus className="mr-2" size={20} />
            New Category
          </Link>
        </div>
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
            {categories?.map((cat) => (
              <option key={cat?._id} value={cat?.name}>
                {cat?.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="rounded-2xl p-4">
        <div className="flex flex-col gap-4">
          {filteredPackages.map((pkg) => (
            <PackageCard key={pkg?._id} pkg={pkg} onDelete={handleDelete} />
          ))}
        </div>

        {filteredPackages.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No packages found
            </h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search or filters
            </p>
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
  );
}
