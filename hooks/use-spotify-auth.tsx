"use client"

import { useState, useEffect } from "react"
import { refreshAccessToken } from "@/lib/spotify"

export function useSpotifyAuth() {
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const getToken = async () => {
      try {
        setIsLoading(true)
        console.log("Checking for Spotify tokens...")

        // Check if we have a token in localStorage
        const storedToken = localStorage.getItem("spotify_access_token")
        const tokenExpiry = localStorage.getItem("spotify_token_expiry")
        const refreshToken = localStorage.getItem("spotify_refresh_token")

        console.log("Stored token exists:", !!storedToken)
        console.log("Refresh token exists:", !!refreshToken)

        // If we have a valid token that's not expired, use it
        if (storedToken && tokenExpiry && Number.parseInt(tokenExpiry) > Date.now()) {
          console.log("Using existing token (not expired)")
          setAccessToken(storedToken)
          setIsLoading(false)
          return
        }

        // If we have a refresh token, use it to get a new access token
        if (refreshToken) {
          console.log("Refreshing token...")
          const response = await refreshAccessToken(refreshToken)

          if (response.error) {
            console.error("Refresh token error:", response)
            throw new Error(response.error_description || "Failed to refresh token")
          }

          console.log("Token refreshed successfully")
          localStorage.setItem("spotify_access_token", response.access_token)
          localStorage.setItem("spotify_token_expiry", (Date.now() + response.expires_in * 1000).toString())

          if (response.refresh_token) {
            localStorage.setItem("spotify_refresh_token", response.refresh_token)
          }

          setAccessToken(response.access_token)
          setIsLoading(false)
          return
        }

        // If we don't have any tokens, we're not authenticated
        console.log("No tokens found, not authenticated")
        setAccessToken(null)
        setError("Not authenticated")
      } catch (err) {
        console.error("Authentication error:", err)
        setError(err instanceof Error ? err.message : "Authentication failed")
        setAccessToken(null)
      } finally {
        setIsLoading(false)
      }
    }

    getToken()
  }, [])

  const logout = () => {
    console.log("Logging out, clearing tokens")
    localStorage.removeItem("spotify_access_token")
    localStorage.removeItem("spotify_refresh_token")
    localStorage.removeItem("spotify_token_expiry")
    setAccessToken(null)
  }

  return { accessToken, isLoading, error, logout }
}

