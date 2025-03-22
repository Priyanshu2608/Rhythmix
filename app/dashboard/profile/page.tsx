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
  const [profileImage, setProfileImage] = useState<string | null>(null)
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
          setProfileImage(profile.profileImage || user.profileImage || null)
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
      // Create a preview URL
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
      // Upload new profile image if selected
      let imageUrl = profileImage
      if (newProfileImage) {
        imageUrl = await uploadProfilePicture(user.id, newProfileImage)
      }

      // Update profile data
      await updateUserProfile(user.id, {
        name,
        bio,
        website,
        profileImage: imageUrl,
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
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Your Profile</h1>
        <p className="text-muted-foreground">Manage your account settings and profile information</p>
      </div>

      <Tabs defaultValue="profile">
        <TabsList className="mb-6">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your profile details and public information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {error && <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">{error}</div>}

              {success && <div className="bg-green-500/15 text-green-500 text-sm p-3 rounded-md">{success}</div>}

              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex flex-col items-center gap-2">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={profileImage || undefined} alt={name} />
                    <AvatarFallback className="text-2xl">
                      <UserIcon className="h-12 w-12" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="relative">
                    <Input
                      type="file"
                      id="profile-image"
                      accept="image/*"
                      className="hidden"
                      onChange={handleProfileImageChange}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => document.getElementById("profile-image")?.click()}
                    >
                      <ImageIcon className="h-4 w-4 mr-2" />
                      Change Photo
                    </Button>
                  </div>
                </div>

                <div className="flex-1 space-y-4 w-full">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <textarea
                      id="bio"
                      className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                      placeholder="Tell us about yourself..."
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      placeholder="https://yourwebsite.com"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveProfile} disabled={isSaving}>
                {isSaving ? (
                  <>
                    <Loader2Icon className="h-4 w-4 animate-spin mr-2" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your account preferences and security</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Email Address</Label>
                <div className="flex items-center gap-2">
                  <Input value={user?.email || ""} disabled />
                  <Button variant="outline" disabled>
                    Verify
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">Your email address is used for login and notifications</p>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-medium mb-2">Account Type</h3>
                <div className="flex items-center gap-2 p-3 bg-muted rounded-md">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <UserIcon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">{user?.role === "artist" ? "Artist" : "Fan"}</div>
                    <div className="text-sm text-muted-foreground">
                      {user?.role === "artist"
                        ? "You can create and sell music NFTs"
                        : "You can discover and collect music"}
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-medium mb-4">Danger Zone</h3>
                <div className="space-y-4">
                  <div className="p-4 border border-destructive/50 rounded-md">
                    <h4 className="font-medium text-destructive mb-2">Log out from all devices</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      This will log you out from all devices where you're currently signed in
                    </p>
                    <Button variant="outline" className="text-destructive">
                      Log out everywhere
                    </Button>
                  </div>

                  <div className="p-4 border border-destructive/50 rounded-md">
                    <h4 className="font-medium text-destructive mb-2">Delete account</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Permanently delete your account and all your data
                    </p>
                    <Button variant="destructive">Delete account</Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleLogout}>
                Log out
              </Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

