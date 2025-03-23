"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Music, Upload, X } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Progress } from "@/components/ui/progress"

export default function UploadPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isUploading, setIsUploading] = useState(false)
  const [isMinting, setIsMinting] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [mintProgress, setMintProgress] = useState(0)
  const [coverImage, setCoverImage] = useState<string | null>(null)
  const [audioFile, setAudioFile] = useState<File | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setCoverImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAudioFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setAudioFile(file)
    }
  }

  const simulateUploadProgress = () => {
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 10
      if (progress >= 100) {
        progress = 100
        clearInterval(interval)
        setUploadProgress(100)
        simulateMinting()
      }
      setUploadProgress(Math.min(progress, 100))
    }, 300)
  }

  const simulateMinting = () => {
    setIsMinting(true)
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 15
      if (progress >= 100) {
        progress = 100
        clearInterval(interval)
        setMintProgress(100)

        // Save to localStorage for demo purposes
        const existingUploads = JSON.parse(localStorage.getItem("userUploads") || "[]")
        const newUpload = {
          id: Date.now(),
          title: formData.title,
          description: formData.description,
          price: formData.price,
          coverImage: coverImage,
          uploadDate: new Date().toISOString().split("T")[0],
        }
        localStorage.setItem("userUploads", JSON.stringify([...existingUploads, newUpload]))

        // Update upload count
        const currentCount = Number.parseInt(localStorage.getItem("uploadCount") || "0")
        localStorage.setItem("uploadCount", (currentCount + 1).toString())

        setTimeout(() => {
          toast({
            title: "NFT Minted Successfully!",
            description: "Your music NFT has been minted and is now available on the blockchain.",
          })
          setIsUploading(false)
          setIsMinting(false)
          router.push("/dashboard")
        }, 500)
      }
      setMintProgress(Math.min(progress, 100))
    }, 300)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!audioFile || !coverImage || !formData.title) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)
    simulateUploadProgress()
  }

  return (
    <div className="container max-w-4xl mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Upload New Music NFT</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center justify-center h-full">
                  {coverImage ? (
                    <div className="relative w-full aspect-square rounded-md overflow-hidden mb-4">
                      <Image src={coverImage || "/placeholder.svg"} alt="Cover preview" fill className="object-cover" />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 h-8 w-8 rounded-full"
                        onClick={() => setCoverImage(null)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="w-full aspect-square flex items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-md mb-4">
                      <div className="flex flex-col items-center">
                        <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground text-center">Click to upload cover image</p>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={handleCoverImageChange}
                      />
                    </div>
                  )}

                  <div className="w-full">
                    <Label htmlFor="audio-file" className="block mb-2">
                      Audio File
                    </Label>
                    <div className="relative">
                      <div
                        className={`flex items-center p-3 rounded-md border ${audioFile ? "border-primary" : "border-input"}`}
                      >
                        <Music className="h-5 w-5 mr-2 text-muted-foreground" />
                        <span className="text-sm truncate">{audioFile ? audioFile.name : "No file selected"}</span>
                      </div>
                      <input
                        id="audio-file"
                        type="file"
                        accept="audio/*"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={handleAudioFileChange}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Enter track title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe your music NFT"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="price">Price (ETH)</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  step="0.001"
                  min="0"
                  placeholder="0.05"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>

          {isUploading && (
            <Card className="p-4">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <Label>{isMinting ? "Minting NFT on Blockchain" : "Uploading to IPFS"}</Label>
                    <span className="text-sm">
                      {isMinting ? `${Math.round(mintProgress)}%` : `${Math.round(uploadProgress)}%`}
                    </span>
                  </div>
                  <Progress value={isMinting ? mintProgress : uploadProgress} className="h-2" />
                </div>

                {isMinting && (
                  <div className="text-sm text-muted-foreground">
                    <p>Transaction Hash: 0x7f9e8d7c6b5a4e3d2c1b0a9f8e7d6c5b4a3f2e1d</p>
                    <p>Gas Fee: 0.002 ETH</p>
                  </div>
                )}
              </div>
            </Card>
          )}

          <div className="flex justify-end">
            <Button
              type="button"
              variant="outline"
              className="mr-2"
              onClick={() => router.push("/dashboard")}
              disabled={isUploading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isUploading}>
              {isUploading ? (isMinting ? "Minting NFT..." : "Uploading...") : "Upload & Mint NFT"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}