"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { getSpotifyLoginURL } from "@/lib/spotify"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FaSpotify } from "react-icons/fa"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [spotifyUrl, setSpotifyUrl] = useState("")

  useEffect(() => {
    // Generate the Spotify login URL when the component mounts
    const url = getSpotifyLoginURL()
    console.log("Generated Spotify login URL:", url)
    setSpotifyUrl(url)
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // For demo purposes, we'll just redirect to the dashboard
    // In a real app, you would validate credentials
    setTimeout(() => {
      router.push("/dashboard")
      setIsLoading(false)
    }, 1500)
  }

  const handleSpotifyLogin = () => {
    console.log("Redirecting to Spotify login:", spotifyUrl)
    if (spotifyUrl) {
      window.location.href = spotifyUrl
    } else {
      console.error("Spotify URL not generated yet")
      alert("Spotify login URL not ready. Please try again in a moment.")
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-black to-zinc-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <Button variant="outline" className="w-full flex items-center gap-2" onClick={handleSpotifyLogin}>
            <FaSpotify className="h-5 w-5 text-green-500" />
            <span>Login with Spotify</span>
          </Button>

          <div className="mt-4 text-xs text-muted-foreground">
            <p>Client ID: {process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID ? "✓ Set" : "❌ Missing"}</p>
            <p>Redirect URI: {process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI ? "✓ Set" : "❌ Missing"}</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <a href="/register" className="text-primary hover:underline">
              Sign up
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

