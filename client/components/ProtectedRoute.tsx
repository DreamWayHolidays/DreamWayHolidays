"use client"

import { useRouter } from "next/navigation"
import { ReactNode, useEffect } from "react"
import { useAuth } from "@/contexts/authContext"

export default function AdminRoute({ children }: { children: ReactNode }) {
  const { userInfo, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (!userInfo?.user) {
        router.replace("/login")
      } else if (userInfo.user.role !== "admin") {
        router.replace("/admin")
      }
    }
  }, [loading, userInfo, router])

  if (loading) {
    return <p>Loading...</p>
  }

  return <>{children}</>
}
