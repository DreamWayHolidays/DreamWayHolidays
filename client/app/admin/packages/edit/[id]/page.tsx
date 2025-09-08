"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { ArrowLeft, Upload, X, Plus } from "lucide-react"
import Link from "next/link"
import toast from "react-hot-toast"
import axios from "axios"
import { ClipLoader } from "react-spinners"
import ItineraryForm from "@/components/ItineraryForm"


export default function EditPackage() {
    const router = useRouter()
    const params = useParams()
    const packageId = params?.id as string;
    const [saveStatus, setSaveStatus] = useState("Update")
    const [loading, setLoading] = useState(true)
    
    interface category{
        _id : string
        name : string
    } 


    interface ItineraryItem{
        day : number
        title : string
        description : string
    }

    const [categories, setCategories] = useState<category[]>([]);
    const [itinerary, setItinerary] = useState<ItineraryItem[]>([]);

    interface FormData {
        title: string
        description: string
        duration: string
        price: string
        type: string
        images: string[]
        highlights: string[]
        includes: string[]
        excludes: string[]
        importantInfo: string[]
        meetingPoint: string
    }


    const [formData, setFormData] = useState<FormData>({
        title: "",
        description: "",
        duration: "",
        price: "",
        type: "Spiritual",
        images: [],
        highlights: [""],
        includes: [""],
        excludes: [""],
        importantInfo: [""],
        meetingPoint: "",
    })

    useEffect(() => {
        if (!packageId) return

        const fetchCategory = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/packages/getCategories`);
                if(res.data.success){
                    setCategories(res.data.allCategories);
                }
            } catch (error) {
                toast.error("Unable to fetch categories");
            }
        }

        const fetchPackage = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/packages/getPackage/${packageId}`)
                if (res.data.success) {
                    const pkg = res.data.pkg[0];
                    setFormData({
                        title: pkg.title || "",
                        description: pkg.description || "",
                        duration: pkg.duration || "",
                        price: pkg.price?.toString() || "",
                        type: pkg.type || "Spiritual",
                        meetingPoint: pkg.meetingPoint || "",
                        images: pkg.images || [],
                        highlights: pkg.highlights?.length ? pkg.highlights : [""],
                        includes: pkg.includes?.length ? pkg.includes : [""],
                        excludes: pkg.excludes?.length ? pkg.excludes : [""],
                        importantInfo: pkg.importantInfo?.length ? pkg.importantInfo : [""],
                    })
                    setItinerary(pkg?.packageItinerary);
                }
            } catch (err) {
                toast.error("Failed to load package data")
            } finally {
                setLoading(false)
            }
        }
        
        fetchCategory()
        fetchPackage()
    }, [packageId])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            setSaveStatus("Updating...")

            const formDataToSend = new FormData()
            formDataToSend.append("title", formData.title)
            formDataToSend.append("description", formData.description)
            formDataToSend.append("duration", formData.duration)
            formDataToSend.append("price", formData.price)
            formDataToSend.append("type", formData.type)
            formDataToSend.append("meetingPoint", formData.meetingPoint)
            formDataToSend.append("highlights", JSON.stringify(formData.highlights))
            formDataToSend.append("includes", JSON.stringify(formData.includes))
            formDataToSend.append("excludes", JSON.stringify(formData.excludes))
            formDataToSend.append("importantInfo", JSON.stringify(formData.importantInfo))
            formDataToSend.append("images", JSON.stringify(formData.images) )
            formDataToSend.append("packageItinerary", JSON.stringify(itinerary));


            const res = await axios.put(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/packages/updatePackage/${packageId}`, formDataToSend)

            if (res.data.success) {
                toast.success("Package updated successfully")
                setSaveStatus("Update")
                router.push("/admin")
            }
        } catch (error) {
            setSaveStatus("Update")
            if (error instanceof Error) toast.error(error.message)
            else toast.error("An unexpected error occurred")
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleArrayChange = (field: string, index: number, value: string) => {
        const updatedArray = [...(formData[field as keyof typeof formData] as string[])]
        updatedArray[index] = value
        setFormData({ ...formData, [field]: updatedArray })
    }

    const addArrayItem = (field: string) => {
        setFormData({ ...formData, [field]: [...(formData[field as keyof typeof formData] as string[]), ""] })
    }

    const removeArrayItem = (field: string, index: number) => {
        const updatedArray = (formData[field as keyof typeof formData] as string[]).filter((_, i) => i !== index)
        setFormData({ ...formData, [field]: updatedArray })
    }

  if(loading){
    return <div className="flex w-full h-screen justify-center items-center">
        <ClipLoader color="#36d7b7" size={50} />
    </div>
  }

    return (
        <div className="space-y-8">
            <div className="flex items-center space-x-4">
                <Link href="/admin" className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                    <ArrowLeft size={20} />
                </Link>
                <h1 className="text-3xl font-black text-gray-900">Edit Package</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white rounded-2xl shadow-lg p-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Basic Information</h2>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Package Title *</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent focus:outline-none"
                                        placeholder="e.g., Spiritual Rishikesh Retreat"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Description *</label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        rows={4}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent focus:outline-none"
                                        placeholder="Describe your package in detail..."
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Duration *</label>
                                        <input
                                            type="text"
                                            name="duration"
                                            value={formData.duration}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent focus:outline-none"
                                            placeholder="e.g., 7 days"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Price (₹) *</label>
                                        <input
                                            type="number"
                                            name="price"
                                            value={formData.price}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent focus:outline-none"
                                            placeholder="25000"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Type *</label>
                                        <select name="type" value={formData.type} onChange={handleChange} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent focus:outline-none" required>
                                            {categories?.map((cat) => <option key={cat?._id} value={cat?.name}>{cat?.name}</option>)}
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Meeting Point</label>
                                    <input
                                        type="text"
                                        name="meetingPoint"
                                        value={formData.meetingPoint}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent focus:outline-none"
                                        placeholder="e.g., Jolly Grant Airport, Dehradun"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-lg p-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Package Details</h2>

                            <div className="mb-8">
                                <div className="flex items-center justify-between mb-4">
                                    <label className="text-sm font-semibold text-gray-700">Highlights</label>
                                    <button
                                        type="button"
                                        onClick={() => addArrayItem("highlights")}
                                        className="text-emerald-600 hover:text-emerald-700 font-medium text-sm flex items-center"
                                    >
                                        <Plus size={16} className="mr-1" />
                                        Add Highlight
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    {formData.highlights.map((highlight, index) => (
                                        <div key={index} className="flex items-center space-x-3">
                                            <input
                                                type="text"
                                                value={highlight}
                                                onChange={(e) => handleArrayChange("highlights", index, e.target.value)}
                                                className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                                                placeholder="Enter a highlight..."
                                                required
                                            />
                                            {formData.highlights.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeArrayItem("highlights", index)}
                                                    className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors outline-none"
                                                >
                                                    <X size={16} />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-8">
                                <div className="flex items-center justify-between mb-4">
                                    <label className="text-sm font-semibold text-gray-700">What's Included</label>
                                    <button
                                        type="button"
                                        onClick={() => addArrayItem("includes")}
                                        className="text-emerald-600 hover:text-emerald-700 font-medium text-sm flex items-center outline-none"
                                    >
                                        <Plus size={16} className="mr-1" />
                                        Add Item
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    {formData?.includes?.map((item, index) => (
                                        <div key={index} className="flex items-center space-x-3">
                                            <input
                                                type="text"
                                                value={item}
                                                onChange={(e) => handleArrayChange("includes", index, e.target.value)}
                                                className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                                                placeholder="What's included..."
                                                required
                                            />
                                            {formData.includes.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeArrayItem("includes", index)}
                                                    className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors outline-none"
                                                >
                                                    <X size={16} />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-8">
                                <div className="flex items-center justify-between mb-4">
                                    <label className="text-sm font-semibold text-gray-700">What's Not Included</label>
                                    <button
                                        type="button"
                                        onClick={() => addArrayItem("excludes")}
                                        className="text-emerald-600 hover:text-emerald-700 font-medium text-sm flex items-center outline-none"
                                    >
                                        <Plus size={16} className="mr-1" />
                                        Add Item
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    {formData.excludes.map((item, index) => (
                                        <div key={index} className="flex items-center space-x-3">
                                            <input
                                                type="text"
                                                value={item}
                                                onChange={(e) => handleArrayChange("excludes", index, e.target.value)}
                                                className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                                                placeholder="What's not included..."
                                                required
                                            />
                                            {formData.excludes.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeArrayItem("excludes", index)}
                                                    className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors outline-none"
                                                >
                                                    <X size={16} />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <label className="text-sm font-semibold text-gray-700">Important Information</label>
                                    <button
                                        type="button"
                                        onClick={() => addArrayItem("importantInfo")}
                                        className="text-emerald-600 hover:text-emerald-700 font-medium text-sm flex items-center"
                                    >
                                        <Plus size={16} className="mr-1" />
                                        Add Info
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    {formData.importantInfo.map((info, index) => (
                                        <div key={index} className="flex items-center space-x-3">
                                            <input
                                                type="text"
                                                value={info}
                                                onChange={(e) => handleArrayChange("importantInfo", index, e.target.value)}
                                                className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent focus:outline-none"
                                                placeholder="Important information..."
                                                required
                                            />
                                            {formData.importantInfo.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeArrayItem("importantInfo", index)}
                                                    className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors outline-none"
                                                >
                                                    <X size={16} />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <ItineraryForm itinerary={itinerary} setItinerary={setItinerary} />
                    </div>
                <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Publish</h3>
                    <div className="flex flex-col space-y-3">
                        <button disabled={saveStatus === "Updating..."} type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105">
                            {saveStatus}
                        </button>
                        <Link href="/admin" className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold text-center">
                            Cancel
                        </Link>
                    </div>
                </div>
                </div>
            </form>
        </div>
    )
}
