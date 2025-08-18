"use client";

import { useState, FormEvent } from "react";
import toast from "react-hot-toast";
import { FiMail, FiLock } from "react-icons/fi";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/authContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { userInfo, setUserInfo } = useAuth();

  const handleSubmit = async(e: FormEvent) => {
    e.preventDefault();
    try{
     const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/login`, {email, password});
     if(res.data.success){
       toast.success("Login successful");
        setUserInfo({
          ...userInfo,
          user: res.data.user,
          token: res.data.token
        });
        localStorage.setItem("trek365", JSON.stringify(res.data));
        router.push("/admin");
     }
    }catch(error){
      toast.error("Please enter the correct email and password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-6">
          Sign in to access admin dashboard
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <div className="mt-1 flex items-center border rounded-lg px-3">
              <FiMail className="text-gray-400" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 outline-none"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="mt-1 flex items-center border rounded-lg px-3">
              <FiLock className="text-gray-400" />
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 outline-none"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-700 text-white py-2 rounded-lg hover:bg-emerald-800 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}