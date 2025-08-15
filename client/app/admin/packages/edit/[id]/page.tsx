"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Upload, X, Plus } from "lucide-react"
import Link from "next/link"

export default function CreatePackage() {
    const router = useRouter()
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        duration: "",
        price: "",
        type: "Spiritual",
        status: "draft",
        highlights: [""],
        includes: [""],
        excludes: [""],
        importantInfo: [""],
        meetingPoint: "",
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        router.push("/admin")
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleArrayChange = (field: string, index: number, value: string) => {
        const updatedArray = [...(formData[field as keyof typeof formData] as string[])]
        updatedArray[index] = value
        setFormData({
            ...formData,
            [field]: updatedArray,
        })
    }

    const addArrayItem = (field: string) => {
        setFormData({
            ...formData,
            [field]: [...(formData[field as keyof typeof formData] as string[]), ""],
        })
    }

    const removeArrayItem = (field: string, index: number) => {
        const updatedArray = (formData[field as keyof typeof formData] as string[]).filter((_, i) => i !== index)
        setFormData({
            ...formData,
            [field]: updatedArray,
        })
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center space-x-4">
                <Link href="/admin" className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                    <ArrowLeft size={20} />
                </Link>
                <div>
                    <h1 className="text-3xl font-black text-gray-900">Edit Package</h1>
                </div>
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
                                        <select
                                            name="type"
                                            value={formData.type}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent focus:outline-none"
                                            required
                                        >
                                            <option value="Spiritual">Spiritual</option>
                                            <option value="Adventure">Adventure</option>
                                            <option value="Cultural">Cultural</option>
                                            <option value="Wildlife">Wildlife</option>
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
                                    {formData.includes.map((item, index) => (
                                        <div key={index} className="flex items-center space-x-3">
                                            <input
                                                type="text"
                                                value={item}
                                                onChange={(e) => handleArrayChange("includes", index, e.target.value)}
                                                className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                                                placeholder="What's included..."
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
                    </div>

                    <div className="space-y-8">
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Publish</h3>

                                <div className="flex flex-col space-y-3">
                                    <button
                                        type="submit"
                                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105"
                                    >
                                        Save Changes
                                    </button>
                                    <Link
                                        href="/admin/packages"
                                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold transition-all text-center"
                                    >
                                        Cancel
                                    </Link>
                                </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Package Image</h3>

                            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-emerald-500 transition-colors">
                                <Upload className="mx-auto text-gray-400 mb-4" size={48} />
                                <p className="text-gray-600 mb-2">Drop your image here, or browse</p>
                                <p className="text-sm text-gray-500">Supports: JPG, PNG, WebP</p>
                                <input type="file" className="hidden" accept="image/*" />
                                <button
                                    type="button"
                                    className="mt-4 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"
                                >
                                    Choose File
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
