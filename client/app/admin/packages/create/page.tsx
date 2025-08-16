"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Upload, X, Plus } from "lucide-react"
import Link from "next/link"
import toast from "react-hot-toast"
import axios from "axios"

export default function CreatePackage() {
    const router = useRouter()
    const [saveStatus, setSaveStatus] = useState("Save");

    interface FormData {
        title: string;
        description: string;
        duration: string;
        price: string;
        type: string;
        images: string[];
        highlights: string[];
        includes: string[];
        excludes: string[];
        importantInfo: string[];
        meetingPoint: string;
    }


    const [formData, setFormData] = useState<FormData>({
        title: "",
        description: "",
        duration: "",
        price: "",
        type: "Spiritual",
        images: [],
        highlights: [],
        includes: [],
        excludes: [],
        importantInfo: [],
        meetingPoint: "",
    });

    const [imageFiles, setImageFiles] = useState<File[]>([]);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            setSaveStatus("Saving...");
            const formDataToSend = new FormData();
            formDataToSend.append("title", formData.title);
            formDataToSend.append("description", formData.description);
            formDataToSend.append("duration", formData.duration);
            formDataToSend.append("price", formData.price);
            formDataToSend.append("type", formData.type);
            formDataToSend.append("meetingPoint", formData.meetingPoint);
            formDataToSend.append("highlights", JSON.stringify(formData.highlights));
            formDataToSend.append("includes", JSON.stringify(formData.includes));
            formDataToSend.append("excludes", JSON.stringify(formData.excludes));
            formDataToSend.append("importantInfo", JSON.stringify(formData.importantInfo));

            imageFiles.forEach((file) => {
                formDataToSend.append("images", file);
            });

            const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/packages/createPackage`, formDataToSend);

            if (res.data.success) {
                toast.success("Package created successfully")
                setSaveStatus("Save");
                router.push("/admin")
            }
        } catch (error) {
            setSaveStatus("Save");
            if (error instanceof Error) {
                toast.error(error.message)
            }
            else {
                toast.error("An unexpected error occurred")
            }
        }
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

    const MAX_IMAGES = 4;
    const MAX_SIZE_MB = 2;

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const selected = Array.from(e.target.files);

        const availableSlots = MAX_IMAGES - formData.images.length;

        if (availableSlots <= 0) {
            toast.error(`You can upload up to ${MAX_IMAGES} images.`);
            return;
        }

        const toAdd = selected.slice(0, availableSlots);
        const validFiles: File[] = [];
        const previews: string[] = [];

        for (const file of toAdd) {
            if (file.size > MAX_SIZE_MB * 1024 * 1024) {
                toast.error(`${file.name} is larger than ${MAX_SIZE_MB} MB. Please upload a smaller file.`);
                continue;
            }

            validFiles.push(file);
            previews.push(URL.createObjectURL(file));
        }

        if (validFiles.length === 0) return;


        setFormData((prev) => ({
            ...prev,
            images: [...prev.images, ...previews],
        }));

        setImageFiles((prev) => [...prev, ...validFiles]);

        e.currentTarget.value = "";
    };

    const removeImage = (index: number) => {
        const url = formData.images[index];
        if (url) URL.revokeObjectURL(url);

        setFormData((prev) => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index),
        }));
        setImageFiles((prev) => prev.filter((_, i) => i !== index));
    };


    return (
        <div className="space-y-8">
            <div className="flex items-center space-x-4">
                <Link href="/admin" className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                    <ArrowLeft size={20} />
                </Link>
                <div>
                    <h1 className="text-3xl font-black text-gray-900">Create a New Package</h1>
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
                                        <select name="type" value={formData.type} onChange={handleChange} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent focus:outline-none" required>
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
                                    {formData.includes.map((item, index) => (
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
                    </div>

                    <div className="space-y-8">
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Publish</h3>
                            <div className="flex flex-col space-y-3">
                                <button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105">
                                    {saveStatus}
                                </button>
                                <Link href="/admin" className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold transition-all text-center">
                                    Cancel
                                </Link>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Package Image</h3>
                            <label htmlFor="file-upload" className="cursor-pointer border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-emerald-500 transition-colors block">
                                <Upload className="mx-auto text-gray-400 mb-4" size={48} />
                                <p className="text-gray-600 mb-2">Drop your image here, or browse</p>
                                <p className="text-sm text-gray-500">Supports: JPG, PNG, WebP, Max: 2MB</p>
                                <input id="file-upload" type="file" accept="image/*" multiple className="hidden" onChange={handleImageChange} />
                                <label htmlFor="file-upload" className="block mt-4 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors">
                                    Choose File
                                </label>
                            </label>
                        </div>

                        {formData.images.map((img, index) => (
                            <div key={index} className="relative">
                                <img
                                    src={img}
                                    alt={`Preview ${index + 1}`}
                                    className="w-full h-40 object-cover rounded-lg"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeImage(index)}
                                    className="absolute top-2 right-2 bg-white rounded-full p-1 shadow"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        ))}

                    </div>
                </div>
            </form>
        </div>
    )
}