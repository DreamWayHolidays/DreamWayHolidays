"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import { Check, X, MapPin, Star, ChevronDown, ChevronUp, ArrowLeft, Book } from "lucide-react"
import { useRouter } from "next/navigation";
import BookingCard from "@/components/BookingCard";
import { FaWhatsapp } from "react-icons/fa";


interface Review {
  id: number
  name: string
  rating: number
  date: string
  text: string
}

interface Package {
  id: number
  title: string
  duration: string
  description: string
  price: number
  rating: number
  reviews: Review[]
  images: string[]
  highlights: string[]
  includes: string[]
  excludes: string[]
  meetingPoint: string
  importantInfo: string[]
}

export default function PackageDetails({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const unwrappedParams = React.use(params)
  const pid = unwrappedParams.id
  const [pkg, setPkg] = useState<Package | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [userReviews, setUserReviews] = useState<Review[]>([])
  const [newReview, setNewReview] = useState({ name: "", rating: 5, text: "" })
  const [openAccordion, setOpenAccordion] = useState<string | null>("highlights")

  useEffect(() => {
    async function fetchPackage() {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch("/packages.json")
        if (!res.ok) throw new Error(`Failed to fetch packages: ${res.status}`)
        const data: Package[] = await res.json()
        const selectedPackage = data.find((p) => p.id === parseInt(pid, 10))
        if (!selectedPackage) {
          setError("Package not found")
          setPkg(null)
          setUserReviews([])
        } else {
          setPkg(selectedPackage)
          setUserReviews(selectedPackage.reviews || [])
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error")
        setPkg(null)
        setUserReviews([])
      } finally {
        setLoading(false)
      }
    }
    fetchPackage()
  }, [pid])

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault()
    if (newReview.name && newReview.text) {
      setUserReviews([
        ...userReviews,
        { ...newReview, id: Date.now(), date: "Just now" },
      ])
      setNewReview({ name: "", rating: 5, text: "" })
    }
  }

  const toggleAccordion = (section: string) => {
    setOpenAccordion(openAccordion === section ? null : section)
  }

  if (loading)
    return (
      <div className="pt-20 flex justify-center items-center h-96 text-gray-600">
        Loading package details...
      </div>
    )

  if (error)
    return (
      <div className="pt-20 flex justify-center items-center h-96 text-red-600">
        {error}
      </div>
    )

  if (!pkg) return null

  const averageRating =
    userReviews.length > 0
      ? userReviews.reduce((acc, review) => acc + review.rating, 0) / userReviews.length
      : 0

  return (
    <div className="pt-20">
      <div className="w-full bg-gray-100 px-3 py-2 block md:hidden fixed bottom-0">
        <div className="flex justify-center items-center my-2 mx-auto w-[90%] rounded-full bg-emerald-600 px-2 py-3">
          <FaWhatsapp className="w-5 h-5 font-bold text-xl mr-1 text-gray-100"/>
         <button className="font-medium text-md text-gray-100">Book Now</button>
        </div>
      </div>


      <section className="max-w-7xl mx-auto rounded-3xl p-6 md:p-8">
        <button onClick={() => router.back()} className="flex items-center text-emerald-600 hover:text-emerald-900 mb-4 transition-colors">
          <ArrowLeft className="w-5 h-5 mr-1" />
          <span className="text-sm font-medium">Go Back</span>
        </button>

        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">{pkg.title}</h1>
            <p className="text-gray-600">{pkg.description}</p>
            <div className="flex items-center mt-2 text-gray-700">
              <Star className="text-yellow-400 fill-yellow-400 mr-1" size={18} />
              <span className="font-medium">{averageRating.toFixed(1)}</span>
              <span className="ml-1 text-gray-500">
                ({userReviews.length} reviews)
              </span>
            </div>
          </div>
          <div className="mt-2 md:mt-0 text-2xl md:text-3xl font-semibold">
            ₹{pkg.price.toLocaleString()}
          </div>
        </div>

        <div className="hidden md:grid grid-cols-4 gap-4">
          <div className="col-span-3 overflow-hidden rounded-xl">
            <Image
              src={pkg?.images[0]}
              alt={`${pkg.title} image 1`}
              width={800}
              height={600}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="col-span-1">
            {pkg.images.slice(1, 4).map((img, idx) => (
              <div key={idx} className="overflow-hidden rounded-xl aspect-[3/2] mb-2">
                <Image
                  src={img}
                  alt={`${pkg.title} image ${idx + 3}`}
                  width={400}
                  height={300}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile slider */}
        <div className="md:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory mt-4">
          {pkg.images.map((img, idx) => (
            <div key={idx} className="flex-shrink-0 snap-center overflow-hidden rounded-xl w-80 aspect-[5/4]">
              <Image
                src={img}
                alt={`${pkg.title} image ${idx + 1}`}
                width={450}
                height={300}
                className="object-cover w-full h-full"
              />
            </div>
          ))}
        </div>
      </section>

      <div className="section-padding">
        <div className="max-w-6xl mx-auto">
          {/* <div className="mt-6 flex justify-end">
           <button className="px-6 py-3 text-white text-lg font-semibold rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-transform duration-200">
             Check Availablity
           </button>
          </div> */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              {[
                { key: "highlights", title: "Trip Highlights", content: pkg.highlights },
                { key: "includes", title: "What's Included", content: pkg.includes },
                { key: "excludes", title: "What's Not Included", content: pkg.excludes },
                { key: "important", title: "Important Information", content: pkg.importantInfo },
              ].map((section) => (
                <div key={section.key} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <button
                    onClick={() => toggleAccordion(section.key)}
                    className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  >
                    <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
                    {openAccordion === section.key ? (
                      <ChevronUp className="text-emerald-600" size={24} />
                    ) : (
                      <ChevronDown className="text-gray-400" size={24} />
                    )}
                  </button>

                  <div className={`accordion-content ${openAccordion === section.key ? "open" : ""}`}>
                    <div className="px-8 pb-6">
                      <ul className="space-y-3">
                        {section.content.map((item, index) => (
                          <li key={index} className="flex items-start">
                            {section.key === "excludes" ? (
                              <X className="text-red-500 mr-3 mt-1 flex-shrink-0" size={18} />
                            ) : (
                              <Check className="text-emerald-600 mr-3 mt-1 flex-shrink-0" size={18} />
                            )}
                            <span className="text-gray-700 leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}

              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Meeting Point</h2>
                <div className="flex flex-col md:flex-row items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mr-4">
                      <MapPin className="text-emerald-600" size={24} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{pkg.meetingPoint}</p>
                      <p className="text-gray-600">We'll pick you up from here</p>
                    </div>
                  </div>
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(pkg.meetingPoint)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-emerald-600 mt-4 hover:bg-emerald-700 text-white px-6 py-3 rounded-full font-semibold transition-all hover:scale-105"
                  >
                    View on Map
                  </a>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <BookingCard/>
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Customer Reviews</h2>
                <div className="text-center mb-8">
                  <div className="text-5xl font-black text-gray-900 mb-3">{averageRating.toFixed(1)}</div>
                  <div className="flex justify-center mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`${star <= averageRating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                        size={28}
                      />
                    ))}
                  </div>
                  <p className="text-gray-600">Based on {userReviews.length} reviews</p>
                </div>

                <div className="space-y-4 mb-8">
                  {[
                    { label: "Guide", rating: 4.6 },
                    { label: "Transportation", rating: 4.7 },
                    { label: "Value for Money", rating: 4.4 },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between">
                      <span className="text-gray-700 font-semibold">{item.label}</span>
                      <span className="text-gray-900 font-black">{item.rating.toFixed(1)}</span>
                    </div>
                  ))}
                </div>

                <div>
                  {userReviews.length != 0 && <h3 className="font-bold text-xl mb-3">Highlighted Reviews</h3>}

                  <div className="space-y-6 max-h-96 mb-6 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                    {userReviews.length === 0 && (
                      <p className="text-gray-500 text-center">No reviews yet.</p>
                    )}
                    {userReviews.slice(0, 3).map((review) => (
                        <div key={review.id} className="border-b border-gray-200 pb-4 mt-6">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-semibold text-gray-900">{review.name}</span>
                            <span className="text-sm text-gray-500">{review.date}</span>
                          </div>
                          <div className="flex mb-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`${star <= review.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                                size={16}
                              />
                            ))}
                          </div>
                          <p className="text-gray-700 leading-relaxed">{review.text}</p>
                        </div>
                    ))}
                  </div>

                </div>

                {/* <form onSubmit={handleSubmitReview} className="space-y-6">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    value={newReview.name}
                    onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                    required
                  />

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Your Rating</label>
                    <div className="flex space-x-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewReview({ ...newReview, rating: star })}
                          className={`${star <= newReview.rating ? "text-yellow-400" : "text-gray-300"
                            } hover:text-yellow-400 transition-colors`}
                        >
                          <Star size={28} fill="currentColor" />
                        </button>
                      ))}
                    </div>
                  </div>

                  <textarea
                    placeholder="Share your experience..."
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none"
                    value={newReview.text}
                    onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                    required
                  ></textarea>

                  <button type="submit" className="btn-primary w-full">
                    Submit Review
                  </button>
                </form> */}

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
