"use client"

import { useState, createContext, useContext, useEffect, ReactNode } from "react"
import axios from "axios"

interface User {
  _id: string
  name : string
  email: string
  password: string
  role: "user" | "admin"
}

interface UserInfo {
  user: User | null 
  token: string | null
}


interface AuthContextType {
  userInfo: UserInfo
  loading: boolean
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(true)

  const [userInfo, setUserInfo] = useState<UserInfo>({
    user: null,
    token: null,
  })

  axios.defaults.headers.common["Authorization"] = userInfo?.token ?? ""

  useEffect(() => {
    const data = localStorage.getItem("dreamWayHolidays")

    if (data) {
      const parseData = JSON.parse(data) as UserInfo
      setUserInfo({
        user: parseData.user,
        token: parseData.token,
      })
    }

    setLoading(false)
  }, [])

  return (
    <AuthContext.Provider value={{ userInfo, loading, setUserInfo }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

// Custom hook
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
