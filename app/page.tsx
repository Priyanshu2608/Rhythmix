import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MusicIcon, Disc3Icon, WalletIcon, ShieldIcon } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <MusicIcon className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">RHYTHMIX</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#features" className="text-sm font-medium hover:underline underline-offset-4">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium hover:underline underline-offset-4">
              How It Works
            </Link>
            <Link href="#for-artists" className="text-sm font-medium hover:underline underline-offset-4">
              For Artists
            </Link>
            <Link href="#for-fans" className="text-sm font-medium hover:underline underline-offset-4">
              For Fans
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline">Log In</Button>
            </Link>
            <Link href="/register">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="py-20 md:py-32 bg-gradient-to-b from-background to-background/80">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl md:text-5xl font-bold tracking-tighter">
                  The Future of Music Ownership is Here
                </h1>
                <p className="text-muted-foreground md:text-xl">
                  RHYTHMIX is a decentralized music platform where artists can mint their music as NFTs and fans can
                  truly own the music they love.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/register?role=artist">
                    <Button size="lg" className="w-full sm:w-auto">
                      Join as Artist
                    </Button>
                  </Link>
                  <Link href="/register?role=user">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto">
                      Join as Fan
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative aspect-video overflow-hidden rounded-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl flex items-center justify-center">
                  <div className="relative w-48 h-48 md:w-64 md:h-64">
                    <div className="absolute inset-0 rounded-full bg-primary/10 animate-pulse"></div>
                    <Disc3Icon className="w-full h-full text-primary/80" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter">Key Features</h2>
              <p className="text-muted-foreground mt-4 max-w-3xl mx-auto">
                RHYTHMIX combines the power of blockchain technology with music to create a revolutionary platform for
                artists and fans.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg border shadow-sm">
                <div className="p-3 rounded-full bg-primary/10 mb-4">
                  <MusicIcon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Music NFTs</h3>
                <p className="text-muted-foreground">
                  Artists can create their music as NFTs with customizable royalty percentages.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg border shadow-sm">
                <div className="p-3 rounded-full bg-primary/10 mb-4">
                  <WalletIcon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Direct Payments</h3>
                <p className="text-muted-foreground">
                  Smart contracts handle royalty payments automatically, ensuring artists receive instant earnings.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg border shadow-sm">
                <div className="p-3 rounded-full bg-primary/10 mb-4">
                  <ShieldIcon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Secure Storage</h3>
                <p className="text-muted-foreground">
                  Music is securely stored on IPFS, preventing piracy and unauthorized distribution.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-16 md:py-24 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter">How It Works</h2>
              <p className="text-muted-foreground mt-4 max-w-3xl mx-auto">
                A simple process that revolutionizes how music is created, shared, and owned.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg mb-4">
                  1
                </div>
                <h3 className="text-xl font-bold mb-2">Artists Create</h3>
                <p className="text-muted-foreground">
                  Artists upload their music and mint it as an NFT, setting their royalty percentages.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg mb-4">
                  2
                </div>
                <h3 className="text-xl font-bold mb-2">Fans Purchase</h3>
                <p className="text-muted-foreground">
                  Fans buy music NFTs directly from artists or on the secondary market.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg mb-4">
                  3
                </div>
                <h3 className="text-xl font-bold mb-2">Royalties Flow</h3>
                <p className="text-muted-foreground">
                  Smart contracts automatically distribute royalties to artists whenever their music is resold.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-12">
              <div id="for-artists" className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter">For Artists</h2>
                <p className="text-muted-foreground">
                  Take control of your music and earnings with RHYTHMIX's artist-first platform.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-primary/10 p-1 mt-1">
                      <svg
                        className="h-3 w-3 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <span>Mint your music as NFTs with customizable royalty percentages</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-primary/10 p-1 mt-1">
                      <svg
                        className="h-3 w-3 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <span>Receive instant payments directly to your wallet</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-primary/10 p-1 mt-1">
                      <svg
                        className="h-3 w-3 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <span>Build a direct relationship with your fans</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-primary/10 p-1 mt-1">
                      <svg
                        className="h-3 w-3 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <span>Access detailed analytics about your audience</span>
                  </li>
                </ul>
                <div>
                  <Link href="/register?role=artist">
                    <Button>Start Creating</Button>
                  </Link>
                </div>
              </div>
              <div id="for-fans" className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter">For Fans</h2>
                <p className="text-muted-foreground">Discover, collect, and truly own the music you love.</p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-primary/10 p-1 mt-1">
                      <svg
                        className="h-3 w-3 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <span>Own your favorite music as NFTs with real value</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-primary/10 p-1 mt-1">
                      <svg
                        className="h-3 w-3 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <span>Trade and resell music in the marketplace</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-primary/10 p-1 mt-1">
                      <svg
                        className="h-3 w-3 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <span>Discover new music with AI-powered recommendations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-primary/10 p-1 mt-1">
                      <svg
                        className="h-3 w-3 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <span>Support artists directly without intermediaries</span>
                  </li>
                </ul>
                <div>
                  <Link href="/register?role=user">
                    <Button>Start Exploring</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-8">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 px-4 md:px-6">
          <div className="flex items-center gap-2">
            <MusicIcon className="h-5 w-5 text-primary" />
            <span className="text-lg font-semibold">RHYTHMIX</span>
          </div>
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} RHYTHMIX. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Terms
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

