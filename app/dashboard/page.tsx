"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { UserDashboard } from "@/components/user-dashboard"
import { ArtistDashboard } from "@/components/artist-dashboard"

export default function DashboardPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // If authentication is complete and no user is found, redirect to login
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
        <span className="ml-3">Loading...</span>
      </div>
    )
  }

  // If user exists, show the appropriate dashboard based on role
  if (user) {
    console.log("Rendering dashboard for user with role:", user.role)
    
    if (user.role === "artist") {
      return <ArtistDashboard />
    } else {
      return <UserDashboard />
    }
  }

  // This return is just for TypeScript, the useEffect will redirect if no user
  return null
}