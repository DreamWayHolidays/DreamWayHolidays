"use client"

import { useEffect, useState } from "react"
import { Search, Trash2} from "lucide-react"
import Link from "next/link"
import axios from "axios"
import toast from "react-hot-toast"
import { ClipLoader } from "react-spinners"

export default function QueriesPage() {
  
  interface Query {
    _id: string;
    name: string;
    email: string;
    message: string;
  }

  const [searchTerm, setSearchTerm] = useState("")
  const [queries, setQueries] = useState<Query[]>([]);
  const [loading, setLoading] = useState(true);

  const getQueries = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/query/getQuery`);
      if (res.data.success) {
        setQueries(res.data.Queries);
      }
    } catch (error) {
      toast.error("Failed to fetch queries");
    }finally{
      setLoading(false);
    }
  } 


  useEffect(() => {
    getQueries();
  },[])

  const filteredQueries = queries.filter((query) => {
    const matchesSearch = query.name.toLowerCase().includes(searchTerm.toLowerCase()) || query.email.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch;
  })

    const handleDelete = async (id: string | number) => {
      try {
        const res = await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/query/deleteQuery/${id}`);
        if (res.data.success) {
          getQueries();
          toast.success("Query deleted successfully");
        }
      } catch (error) {
        toast.error("Failed to delete query");
      }
    }

  if(loading){
    return <div className="flex w-full h-screen justify-center items-center">
        <ClipLoader color="#36d7b7" size={50} />
    </div>
  }


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
                <div key={query._id} className={`bg-white rounded-2xl shadow-lg p-6 hover:scale-101 cursor-pointer transition duration-200 ease-in-out my-4}`} >
                   <div className="flex-1">
                     <div className="mb-2">
                       <h3 className="font-semibold text-sky-950 truncate">{query.name}</h3>
                     </div>
                        <p className="text-sm text-gray-600 mb-2">{query.email}</p>
                        <p className="text-md text-sky-950 line-clamp-2">{query.message}</p>
                    </div>
                    <div className="flex justify-between items-center mt-3" >
                    <Link href={`https://mail.google.com/mail/?view=cm&fs=1&to=${query?.email}`} target="_blank" className="w-20  bg-emerald-600 px-4 py-1 rounded-lg text-white text-sm cursor-pointer">Reply</Link>
                    <button className="flex justify-center items-center cursor-pointer" onClick={() => handleDelete(query?._id)}><Trash2 className=" w-20 group-hover:block text-red-500"/></button>
                    </div>
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