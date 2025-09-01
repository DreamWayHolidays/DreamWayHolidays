"use client"

import { useRouter } from "next/navigation"
import { ReactNode, useEffect } from "react"
import { useAuth } from "@/contexts/authContext"
import { ClipLoader } from "react-spinners"

export default function AdminRoute({ children }: { children: ReactNode }) {
  const { userInfo, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (!userInfo?.user) {
        router.replace("/login")
      } else if (userInfo.user.role !== "admin") {
        router.replace("/")
      }
    }
  }, [loading, userInfo, router])

  if (loading || !userInfo?.user || userInfo.user.role !== "admin") {
    return <div className="flex w-full h-screen justify-center items-center">
        <ClipLoader color="#36d7b7" size={50} />
    </div>
  }

  return <>{children}</>
}
