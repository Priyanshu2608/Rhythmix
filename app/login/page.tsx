"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { MusicIcon } from "lucide-react"
import { useAuth } from "@/context/auth-context"
import { FcGoogle } from "react-icons/fc"

// Add these styles to your global CSS or create a stylesheet
const globalStyles = `
@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  100% {
    transform: translate(0px, 0px) scale(1);
  }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}
`;

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { login, loginWithGoogle } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      await login(email, password)
      router.push("/dashboard")
    } catch (error: any) {
      console.error("Login failed:", error)
      setError(error.message || "Failed to login. Please check your credentials.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setError(null)
    setIsGoogleLoading(true)

    try {
      await loginWithGoogle()
      router.push("/dashboard")
    } catch (error: any) {
      console.error("Google login failed:", error)
      setError(error.message || "Failed to login with Google. Please try again.")
    } finally {
      setIsGoogleLoading(false)
    }
  }

  return (
    <>
      {/* Inject animation keyframes */}
      <style jsx global>{globalStyles}</style>
      
      <div className="flex min-h-screen items-center justify-center bg-black p-4 relative overflow-hidden">
        {/* Acernity-style gradient background with animated blobs */}
        <div className="absolute inset-0 w-full h-full bg-black">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-700 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-700 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-700 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
          <div className="absolute -bottom-32 right-20 w-96 h-96 bg-pink-700 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-2000"></div>
        </div>
        
        {/* Subtle grid overlay */}
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:20px_20px] pointer-events-none"></div>
        
        {/* Glassmorphism card */}
        <Card className="w-full max-w-md bg-black/50 backdrop-blur-lg border border-white/10 shadow-2xl relative z-10 overflow-hidden">
          {/* Card highlight effect */}
          <div className="absolute inset-x-0 h-40 -top-20 bg-gradient-to-r from-purple-500/30 to-blue-500/30 blur-3xl opacity-50 rounded-full"></div>
          
          <CardHeader className="space-y-1 text-center relative z-10">
            <div className="flex justify-center mb-4">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-2 rounded-xl group-hover:from-blue-500 group-hover:to-purple-500 transition-all duration-500 shadow-lg shadow-purple-500/25">
                  <MusicIcon className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500 group-hover:from-blue-500 group-hover:to-purple-500 transition-all duration-500">RHYTHMIX</span>
              </Link>
            </div>
            <CardTitle className="text-2xl font-bold text-white">Welcome back</CardTitle>
            <CardDescription className="text-gray-400">Enter your credentials to access your account</CardDescription>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6 relative z-10">
              {error && (
                <div className="bg-red-500/10 text-red-400 text-sm p-3 rounded-md border border-red-500/20 backdrop-blur-sm">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300 font-medium">Email</Label>
                <div className="relative group">
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-white/5 border-white/10 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 placeholder:text-gray-500 rounded-lg py-5 px-4 transition-all duration-200 group-hover:bg-white/10"
                  />
                  <div className="absolute inset-0 border border-white/0 rounded-lg group-hover:border-white/10 group-focus-within:border-purple-500/50 pointer-events-none transition-all duration-200"></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-gray-300 font-medium">Password</Label>
                  <Link href="/forgot-password" className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative group">
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-white/5 border-white/10 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 placeholder:text-gray-500 rounded-lg py-5 px-4 transition-all duration-200 group-hover:bg-white/10"
                  />
                  <div className="absolute inset-0 border border-white/0 rounded-lg group-hover:border-white/10 group-focus-within:border-purple-500/50 pointer-events-none transition-all duration-200"></div>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-medium py-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-purple-500/25 relative overflow-hidden group"
                disabled={isLoading}
              >
                <span className="relative z-10">{isLoading ? "Signing in..." : "Sign in"}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-white/10" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-black/50 px-2 text-gray-400">Or continue with</span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-colors py-6 rounded-lg group relative overflow-hidden"
                onClick={handleGoogleLogin}
                disabled={isGoogleLoading}
              >
                <span className="relative z-10 flex items-center justify-center">
                  {isGoogleLoading ? (
                    "Signing in..."
                  ) : (
                    <>
                      <FcGoogle className="mr-2 h-5 w-5" />
                      Google
                    </>
                  )}
                </span>
                <div className="absolute inset-0 opacity-0 bg-gradient-to-r from-white/5 to-white/10 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-4 pb-6 relative z-10">
              <div className="text-center text-sm text-gray-400">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="text-purple-400 hover:text-purple-300 transition-colors font-medium">
                  Sign up
                </Link>
              </div>
            </CardFooter>
          </form>
          
          {/* Bottom card highlight */}
          <div className="absolute inset-x-0 h-40 -bottom-20 bg-gradient-to-r from-blue-500/30 to-purple-500/30 blur-3xl opacity-50 rounded-full"></div>
        </Card>
      </div>
    </>
  )
}