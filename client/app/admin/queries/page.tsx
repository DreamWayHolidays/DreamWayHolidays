"use client"

import { useState } from "react"
import { Search} from "lucide-react"
import Link from "next/link"

const queries = [
  {
    id: 1,
    name: "Priya Sharma",
    email: "priya.sharma@example.com",
    subject: "Inquiry about Rishikesh Spiritual Retreat",
    message:
      "Hi, I'm interested in the 7-day Rishikesh retreat. Could you please provide more details about the accommodation and daily schedule? Also, is it suitable for beginners in yoga?",
    timestamp: "2024-01-20T10:30:00Z",
    status: "unread",
    priority: "normal",
    category: "package-inquiry",
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    email: "rajesh.k@example.com",
    subject: "Group booking for Himalayan Trek",
    message:
      "Hello, I want to book the Himalayan Adventure Trek for a group of 8 people. What would be the group discount and what are the payment terms? We're planning for March 2024.",
    timestamp: "2024-01-20T08:15:00Z",
    status: "read",
    priority: "high",
    category: "booking",
  },
  {
    id: 3,
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    subject: "Cancellation policy question",
    message:
      "I had booked the Kerala Wildlife Safari but due to some personal emergency, I need to cancel. What is your cancellation policy and refund process?",
    timestamp: "2024-01-19T16:45:00Z",
    status: "replied",
    priority: "high",
    category: "support",
  },
  {
    id: 4,
    name: "Amit Patel",
    email: "amit.patel@example.com",
    subject: "Dietary requirements for Golden Triangle tour",
    message:
      "I'm vegetarian and have some food allergies. Can you accommodate special dietary requirements during the Golden Triangle Cultural Tour? What kind of meals are typically provided?",
    timestamp: "2024-01-19T14:20:00Z",
    status: "unread",
    priority: "normal",
    category: "package-inquiry",
  },
]

export default function QueriesPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredQueries = queries.filter((query) => {
    const matchesSearch =
      query.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      query.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      query.subject.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch;
  })



  return (
    <div className="space-y-8 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-black text-gray-900">User Queries</h1>
          <p className="text-gray-600 mt-2">Manage customer inquiries and support requests</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search queries..."
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
      </div>

          <div>
            <div className="flex flex-col gap-4">
              {filteredQueries.map((query) => (
                <div key={query.id} className={`group bg-white rounded-2xl shadow-lg p-6 hover:scale-101 cursor-pointer transition duration-200 ease-in-out my-4}`} >
                   <div className="flex-1">
                     <div className="mb-2">
                       <h3 className="font-semibold text-sky-950 truncate">{query.name}</h3>
                     </div>
                        <p className="text-sm text-gray-600 mb-2">{query.email}</p>
                        <p className="text-md text-sky-950 line-clamp-2">{query.message}</p>
                    </div>
                    <Link href={`https://mail.google.com/mail/?view=cm&fs=1&to=${query?.email}`} target="_blank" className="hidden w-20 group-hover:block bg-emerald-600 px-4 py-1 rounded-lg text-white mt-3 text-sm cursor-pointer">Reply</Link>
                </div>
              ))}
            </div>

            {filteredQueries.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📧</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No queries found</h3>
              </div>
            )}
          </div>
    </div>
  )
}
