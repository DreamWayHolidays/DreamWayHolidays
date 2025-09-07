"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { ArrowLeft, Trash2 } from "lucide-react"
import Link from "next/link"
import toast from "react-hot-toast"
import axios from "axios"
import { ClipLoader } from "react-spinners"


export default function CreatePackage() {

    interface category{
        _id : string
        name : string
    }

    const [category, setCategory] = useState("");
    const [saveStatus, setSaveStatus] = useState("Save");
    const [allCategories, setAllCategories] = useState<category[]>([]);
    const [loading, setLoading] = useState(true);

    const getAllCategories = async() => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/packages/getCategories`);
            if(res.data.success){
                setAllCategories(res.data.allCategories);
            }
        } catch (error) {
            toast.error("Unable to fetch categories");
        }finally{
            setLoading(false);
        }
    }

    useEffect(() => {
      getAllCategories();
    },[])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (!category) {
                toast.error("Category can not be empty");
                return;
            }
            setSaveStatus("Saving...");
            const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/packages/createCategory`, { category });
            if (res.data.success) {
                toast.success("Category created successfully");
                setCategory("");
                getAllCategories();
            }
            setSaveStatus("Save");

        } catch (error) {
            toast.error("something went wrong, please try again later.");
            setSaveStatus("Save");

        }
    }

    const handleDelete = async(cid : String) =>{
        try {
            if(!cid){
                toast.error("Category id is required");
                return;
            }

            const res = await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/packages/deleteCategory/${cid}`);

            if(res.data.success){
                toast.success("Category deleted successfully");
                getAllCategories();
            }
            
        } catch (error) {
            toast.error("Something went wrong, unable to delete category.")
        }
    }

    if (loading) {
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
                <div>
                    <h1 className="text-3xl font-black text-gray-900">Create a New Category</h1>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Category Name</label>
                    <input
                        type="text"
                        name="title"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent focus:outline-none"
                        placeholder="e.g., Monsoon Trek "
                        required
                    />
                </div>
                <div className="flex justify-end mt-4">
                    <button disabled={saveStatus === "Saving..."} type="submit" className="w-full md:w-40 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105">
                        {saveStatus}
                    </button>
                </div>

            </form>

            <div>
                <h2 className="text-lg text-gray-900 font-semibold mb-8">All Categories</h2>
                <div>
                    {allCategories?.map((cat) =>
                     <div key={cat?._id} className="flex justify-between mb-8 ">
                       <p>{cat?.name}</p>
                       <button className="flex justify-center items-center cursor-pointer" onClick={() => handleDelete(cat?._id)}><Trash2 className=" w-20 group-hover:block text-red-500"/></button>
                     </div>
                     
                    )}

                    {allCategories.length == 0 && <>
                      <div className="flex h-[20vh] justify-center items-center">
                        <p className="text-gray-500">No categories found</p>
                      </div>
                    </>}
                </div>
            </div>
        </div>
    )
}