"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { UploadIcon, MusicIcon, ImageIcon, DollarSignIcon } from "lucide-react"

export default function UploadPage() {
  const [uploadStep, setUploadStep] = useState(1)
  const [audioFile, setAudioFile] = useState<File | null>(null)
  const [coverImage, setCoverImage] = useState<File | null>(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [genre, setGenre] = useState("")
  const [price, setPrice] = useState(0.05)
  const [royaltyPercentage, setRoyaltyPercentage] = useState(10)
  const [isExclusive, setIsExclusive] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAudioFile(e.target.files[0])
    }
  }

  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCoverImage(e.target.files[0])
    }
  }

  const handleNextStep = () => {
    setUploadStep(uploadStep + 1)
  }

  const handlePreviousStep = () => {
    setUploadStep(uploadStep - 1)
  }

  const handleSubmit = async () => {
    setIsLoading(true)

    // Simulate minting process
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // In a real app, this would call your smart contract to mint the NFT

    setIsLoading(false)
    setUploadStep(4) // Success step
  }

  return (
    <div className="max-w-3xl mx-auto pb-16">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Upload Music NFT</h1>
        <p className="text-muted-foreground">Create and mint your music as an NFT on the blockchain</p>
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-center">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className={`flex flex-col items-center ${step < 4 ? "w-1/4" : ""}`}>
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                  step < uploadStep
                    ? "bg-primary text-primary-foreground"
                    : step === uploadStep
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                }`}
              >
                {step < uploadStep ? "✓" : step}
              </div>
              <div className="text-sm text-center">
                {step === 1 && "Upload Files"}
                {step === 2 && "Track Details"}
                {step === 3 && "NFT Settings"}
                {step === 4 && "Complete"}
              </div>
              {step < 4 && <div className={`h-1 w-full mt-2 ${step < uploadStep ? "bg-primary" : "bg-muted"}`}></div>}
            </div>
          ))}
        </div>
      </div>

      {uploadStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Upload Files</CardTitle>
            <CardDescription>Upload your music file and cover artwork</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="audio-file">Music File</Label>
              <div
                className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors ${
                  audioFile ? "border-primary" : "border-muted"
                }`}
                onClick={() => document.getElementById("audio-file")?.click()}
              >
                <input type="file" id="audio-file" accept="audio/*" className="hidden" onChange={handleAudioUpload} />
                {audioFile ? (
                  <div className="flex flex-col items-center">
                    <MusicIcon className="h-10 w-10 text-primary mb-2" />
                    <p className="font-medium">{audioFile.name}</p>
                    <p className="text-sm text-muted-foreground">{(audioFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <UploadIcon className="h-10 w-10 text-muted-foreground mb-2" />
                    <p className="font-medium">Upload Music File</p>
                    <p className="text-sm text-muted-foreground">MP3, WAV, FLAC (max 50MB)</p>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cover-image">Cover Artwork</Label>
              <div
                className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors ${
                  coverImage ? "border-primary" : "border-muted"
                }`}
                onClick={() => document.getElementById("cover-image")?.click()}
              >
                <input type="file" id="cover-image" accept="image/*" className="hidden" onChange={handleCoverUpload} />
                {coverImage ? (
                  <div className="flex flex-col items-center">
                    <div className="h-32 w-32 rounded-lg overflow-hidden mb-2">
                      <img
                        src={URL.createObjectURL(coverImage) || "/placeholder.svg"}
                        alt="Cover preview"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <p className="font-medium">{coverImage.name}</p>
                    <p className="text-sm text-muted-foreground">{(coverImage.size / (1024 * 1024)).toFixed(2)} MB</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <ImageIcon className="h-10 w-10 text-muted-foreground mb-2" />
                    <p className="font-medium">Upload Cover Artwork</p>
                    <p className="text-sm text-muted-foreground">JPG, PNG, GIF (1400x1400 recommended)</p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button onClick={handleNextStep} disabled={!audioFile || !coverImage}>
              Next
            </Button>
          </CardFooter>
        </Card>
      )}

      {uploadStep === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Track Details</CardTitle>
            <CardDescription>Provide information about your music</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Track Title</Label>
              <Input
                id="title"
                placeholder="Enter track title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your track..."
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="genre">Genre</Label>
              <Select value={genre} onValueChange={setGenre}>
                <SelectTrigger id="genre">
                  <SelectValue placeholder="Select genre" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="electronic">Electronic</SelectItem>
                  <SelectItem value="ambient">Ambient</SelectItem>
                  <SelectItem value="hiphop">Hip Hop</SelectItem>
                  <SelectItem value="jazz">Jazz</SelectItem>
                  <SelectItem value="rock">Rock</SelectItem>
                  <SelectItem value="classical">Classical</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Tags</Label>
              <Input placeholder="Add tags separated by commas" />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handlePreviousStep}>
              Back
            </Button>
            <Button onClick={handleNextStep} disabled={!title || !description || !genre}>
              Next
            </Button>
          </CardFooter>
        </Card>
      )}

      {uploadStep === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>NFT Settings</CardTitle>
            <CardDescription>Configure your NFT parameters and royalties</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="price">Price (ETH)</Label>
              <div className="flex items-center gap-2">
                <Slider
                  id="price"
                  value={[price]}
                  min={0.01}
                  max={1}
                  step={0.01}
                  onValueChange={(value) => setPrice(value[0])}
                />
                <div className="w-16 text-center font-medium">{price.toFixed(2)}</div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="royalty">Royalty Percentage</Label>
              <div className="flex items-center gap-2">
                <Slider
                  id="royalty"
                  value={[royaltyPercentage]}
                  min={0}
                  max={20}
                  step={1}
                  onValueChange={(value) => setRoyaltyPercentage(value[0])}
                />
                <div className="w-16 text-center font-medium">{royaltyPercentage}%</div>
              </div>
              <p className="text-sm text-muted-foreground">
                You will receive {royaltyPercentage}% of all secondary sales
              </p>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="exclusive">Exclusive NFT</Label>
                <p className="text-sm text-muted-foreground">
                  Create a single, unique NFT instead of multiple editions
                </p>
              </div>
              <Switch id="exclusive" checked={isExclusive} onCheckedChange={setIsExclusive} />
            </div>

            <div className="space-y-2">
              <Label>Preview</Label>
              <div className="border rounded-lg p-4 flex gap-4">
                <div className="w-24 h-24 rounded-lg bg-muted overflow-hidden">
                  {coverImage && (
                    <img
                      src={URL.createObjectURL(coverImage) || "/placeholder.svg"}
                      alt="Cover preview"
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{title || "Track Title"}</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {genre || "Genre"} • {isExclusive ? "1 of 1" : "Multiple Editions"}
                  </p>
                  <div className="flex items-center gap-2">
                    <DollarSignIcon className="h-4 w-4 text-primary" />
                    <span className="font-medium">{price.toFixed(2)} ETH</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handlePreviousStep}>
              Back
            </Button>
            <Button onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? "Minting..." : "Mint NFT"}
            </Button>
          </CardFooter>
        </Card>
      )}

      {uploadStep === 4 && (
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <svg
                className="h-8 w-8 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <CardTitle>NFT Created Successfully!</CardTitle>
            <CardDescription>Your music has been minted as an NFT on the blockchain</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 text-center">
            <div className="border rounded-lg p-6 flex flex-col items-center">
              <div className="w-32 h-32 rounded-lg overflow-hidden mb-4">
                {coverImage && (
                  <img
                    src={URL.createObjectURL(coverImage) || "/placeholder.svg"}
                    alt="Cover"
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
              <h3 className="text-xl font-bold">{title}</h3>
              <p className="text-muted-foreground mb-2">{genre}</p>
              <div className="flex items-center gap-2 mb-4">
                <DollarSignIcon className="h-4 w-4 text-primary" />
                <span className="font-medium">{price.toFixed(2)} ETH</span>
              </div>
              <div className="bg-muted rounded-md px-4 py-2 font-mono text-sm">
                0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button className="w-full">View in Marketplace</Button>
            <Button variant="outline" className="w-full" onClick={() => setUploadStep(1)}>
              Upload Another Track
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}

