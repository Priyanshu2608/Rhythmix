"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/context/auth-context"
import { getUserProfile, updateUserProfile, uploadProfilePicture } from "@/services/user-service"
import { Loader2Icon, UserIcon, ImageIcon } from "lucide-react"

export default function ProfilePage() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  // Form state
  const [name, setName] = useState("")
  const [bio, setBio] = useState("")
  const [website, setWebsite] = useState("")
  const [profileImage, setProfileImage] = useState<string>("") // Ensure it's always a string
  const [newProfileImage, setNewProfileImage] = useState<File | null>(null)

  useEffect(() => {
    if (!user) {
      router.push("/login")
      return
    }

    async function loadUserProfile() {
      setIsLoading(true)
      try {
        const profile = await getUserProfile(user.id)
        if (profile) {
          setName(profile.name || user.name)
          setBio(profile.bio || "")
          setWebsite(profile.website || "")
          setProfileImage(profile.profileImage ?? user.profileImage ?? "") // Prevent undefined
        } else {
          setName(user.name)
        }
      } catch (error) {
        console.error("Error loading profile:", error)
        setError("Failed to load profile data")
      } finally {
        setIsLoading(false)
      }
    }

    loadUserProfile()
  }, [user, router])

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewProfileImage(e.target.files[0])
      
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setProfileImage(event.target.result as string)
        }
      }
      reader.readAsDataURL(e.target.files[0])
    }
  }

  const handleSaveProfile = async () => {
    if (!user) return

    setIsSaving(true)
    setError(null)
    setSuccess(null)

    try {
      let imageUrl = profileImage ?? "" // Ensure imageUrl is never undefined
      
      if (newProfileImage) {
        imageUrl = await uploadProfilePicture(user.id, newProfileImage) || ""
      }
      
      console.log("Saving Profile Image URL:", imageUrl)

      await updateUserProfile(user.id, {
        name,
        bio,
        website,
        profileImage: imageUrl, // Ensure it's always a string
        updatedAt: new Date(),
      })

      setSuccess("Profile updated successfully")
    } catch (error) {
      console.error("Error saving profile:", error)
      setError("Failed to update profile")
    } finally {
      setIsSaving(false)
    }
  }

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2Icon className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto pb-16">
      <h1 className="text-3xl font-bold tracking-tight mb-2">Your Profile</h1>
      <p className="text-muted-foreground">Manage your account settings and profile information</p>

      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>
        <CardContent>
          {error && <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">{error}</div>}
          {success && <div className="bg-green-500/15 text-green-500 text-sm p-3 rounded-md">{success}</div>}
          
          <div className="flex flex-col items-center">
            <Avatar className="h-24 w-24">
              <AvatarImage src={profileImage || undefined} alt={name} />
              <AvatarFallback><UserIcon className="h-12 w-12" /></AvatarFallback>
            </Avatar>
            <Input type="file" id="profile-image" accept="image/*" className="hidden" onChange={handleProfileImageChange} />
            <Button variant="outline" size="sm" onClick={() => document.getElementById("profile-image")?.click()}>
              <ImageIcon className="h-4 w-4 mr-2" /> Change Photo
            </Button>
          </div>

          <Label htmlFor="name">Name</Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />

          <Label htmlFor="bio">Bio</Label>
          <textarea id="bio" className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm" value={bio} onChange={(e) => setBio(e.target.value)} />

          <Label htmlFor="website">Website</Label>
          <Input id="website" value={website} onChange={(e) => setWebsite(e.target.value)} />
        </CardContent>
        <CardFooter>
          <Button onClick={handleSaveProfile} disabled={isSaving}>
            {isSaving ? <><Loader2Icon className="h-4 w-4 animate-spin mr-2" /> Saving...</> : "Save Changes"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
