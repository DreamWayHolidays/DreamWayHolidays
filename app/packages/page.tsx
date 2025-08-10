"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, Star } from "lucide-react"


export default function Packages() {

  interface Package {
    id: number;
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

  const [searchTerm, setSearchTerm] = useState("")
  const [durationFilter, setDurationFilter] = useState("")
  const [typeFilters, setTypeFilters] = useState("")
  const [priceFilter, setPriceFilter] = useState("")

  const filteredPackages = packages.filter((pkg) => {
    const matchesSearch = pkg.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDuration = !durationFilter || pkg.duration.includes(durationFilter);

    let matchesPrice = true;
    if (priceFilter) {
      if (priceFilter === "low") matchesPrice = pkg.price < 20000;
      if (priceFilter === "mid") matchesPrice = pkg.price >= 20000 && pkg.price <= 40000;
      if (priceFilter === "high") matchesPrice = pkg.price > 40000;
    }

    const matchesType = !typeFilters || pkg.type === typeFilters;

    return matchesSearch && matchesDuration && matchesPrice && matchesType;
  });

  const resetFilters = (): void => {
    setSearchTerm("");
    setDurationFilter("");
    setPriceFilter("");
    setTypeFilters("");
  };


  return (
    <div className="pt-20">

      <section className="relative h-96 flex items-center justify-center text-white">
        <div className="absolute inset-0 z-0">
          <Image src="/himalayan-trekking-adventure.png" alt="Travel packages" fill className="object-cover" />
          <div className="hero-overlay"></div>
        </div>
        <div className="relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-black mb-4">
            Discover Your Next
            <br />
            <span className="text-emerald-400">Adventure</span>
          </h1>
          <p className="text-xl font-light">Handcrafted experiences across incredible India</p>
        </div>
      </section>

      <div className="py-6 px-2 md:py-10 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col mb-12 gap-6 filter-bar">
            <div className="relative">
              <Search className="absolute left-4 top-4 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search your dream destination..."
                className="w-full pl-12 pr-4 py-4 border-0 rounded-xl bg-gray-100 focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

              <select
                className="px-4 py-4 border-0 rounded-xl bg-gray-50 focus:outline-none"
                value={durationFilter}
                onChange={(e) => setDurationFilter(e.target.value)}
              >
                <option value="">All Durations</option>
                <option value="4">4 days</option>
                <option value="5">5 days</option>
                <option value="6">6 days</option>
                <option value="7">7 days</option>
                <option value="10">10+ days</option>
              </select>


              <select
                className="px-4 py-4 border-0 rounded-xl bg-gray-50 focus:outline-none"
                value={typeFilters}
                onChange={(e) => setTypeFilters(e.target.value)}
              >
                <option value="">All Types</option>
                <option value="Spiritual">Spiritual</option>
                <option value="Adventure">Adventure</option>
                <option value="Wildlife">Wildlife</option>
                <option value="Cultural">Cultural</option>
              </select>


              <select
                className="px-4 py-4 rounded-xl bg-gray-50 focus:outline-none"
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
              >
                <option value="">All Prices</option>
                <option value="low">Below ₹20,000</option>
                <option value="mid">₹20,000 - ₹40,000</option>
                <option value="high">Above ₹40,000</option>
              </select>

              <div className="flex justify-center items-center pl-4">
                <button className="px-8 py-2 bg-emerald-600 text-white font-medium rounded-full cursor-pointer" onClick={resetFilters}>Clear</button>
              </div>

            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPackages.map((pkg) => (
              <div key={pkg.id} className="package-card group">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={pkg.images[0] || "/placeholder.svg"}
                    alt={pkg.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {pkg.type}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                    <div className="flex items-center">
                      <Star className="text-yellow-500 fill-current" size={16} />
                      <span className="ml-1 text-sm font-semibold">{pkg.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-emerald-600 transition-colors">
                    {pkg.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{pkg.description}</p>

                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-500">{pkg.duration}</span>
                    <span className="text-sm text-gray-500">{pkg.reviews.length} reviews</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-3xl font-black text-emerald-600">₹{pkg.price.toLocaleString()}</span>
                    <Link
                      href={`/packages/${pkg.id}`}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-full font-semibold transition-all hover:scale-105"
                    >
                      Explore
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredPackages.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">No packages found</h3>
              <p className="text-gray-600">Try adjusting your filters to find more options.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
