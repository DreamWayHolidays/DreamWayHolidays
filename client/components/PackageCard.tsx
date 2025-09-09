"use client"

import { FC } from "react"
import Image from "next/image"
import { Eye, Edit, Trash2, Star } from "lucide-react"
import Link from "next/link"

interface PackageCardProps {
  pkg: {
    _id: string 
    title: string
    description: string
    duration: string
    price: number
    type: string
    rating: number
    images: string[]
  }
  onDelete?: (_id: string) => void
}

const PackageCard: FC<PackageCardProps> = ({ pkg, onDelete }) => {
  return (
    <div className="flex flex-col md:flex-row bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-shadow mb-2">
      <div className="relative w-full h-40 md:w-48 md:h-48 flex-shrink-0">
        <Image
          src={pkg.images[0] || "/placeholder.svg"}
          alt={pkg.title}
          fill
          className="object-cover"
        />
        <span className="absolute top-3 left-3 bg-emerald-600 text-white text-xs px-3 py-1 rounded-full">
          {pkg.type}
        </span>
      </div>

      <div className="flex flex-col justify-between flex-grow p-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900">{pkg.title}</h3>
          <p className="text-gray-600 text-sm mt-1">{pkg.description.slice(0, 230)}...</p>

          <div className="flex items-center text-sm text-gray-500 mt-3">
            <span>{pkg.duration}</span>
            <span className="mx-2">•</span>
            <div className="flex items-center">
              <Star className="text-yellow-500 fill-current" size={14} />
              <span className="ml-1 font-semibold">{pkg.rating}</span>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mt-4">
          <span className="text-xl font-bold text-emerald-600">
            ₹{pkg.price.toLocaleString()}
          </span>

          <div className="flex gap-2">
            <Link
              href={`/packages/${pkg._id}`}
              className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200 transition"
              title="View Package"
            >
              <Eye className="text-blue-600" size={18} />
            </Link>
            <Link
              href={`/admin/packages/edit/${pkg._id}`}
              className="p-2 rounded-lg bg-yellow-100 hover:bg-yellow-200 transition"
              title="Edit Package"
            >
              <Edit className="text-yellow-600" size={18} />
            </Link>
            <button
              onClick={() => onDelete?.(pkg._id)}
              className="p-2 rounded-lg bg-red-100 hover:bg-red-200 transition"
              title="Delete Package"
            >
              <Trash2 className="text-red-600" size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PackageCard
