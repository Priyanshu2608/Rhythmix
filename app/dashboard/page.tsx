"use client"

import { useAuth } from "@/context/auth-context"
import { ArtistDashboard } from "@/components/artist-dashboard"
import { UserDashboard } from "@/components/user-dashboard"

export default function DashboardPage() {
  const { user } = useAuth()

  return <>{user?.role === "artist" ? <ArtistDashboard /> : <UserDashboard />}</>
}

