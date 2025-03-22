import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MusicIcon, Disc3Icon, WalletIcon, ShieldIcon } from "lucide-react";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { SparklesCore } from "@/components/ui/sparkles";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { HoverEffect } from "@/components/ui/card-hover-effect";


export default function Home() {
  const teamMembers = [
    {
      id: 1,
      name: "Music NFTs",
      designation: "Core Platform",
      image: <MusicIcon className="h-8 w-8 text-primary" />,
      description: "Artists can create their music as NFTs with customizable royalty percentages."
    },
    {
      id: 2,
      name: "Direct Payments",
      designation: "Financial System",
      image: <WalletIcon className="h-8 w-8 text-primary" />,
      description: "Smart contracts handle royalty payments automatically, ensuring artists receive instant earnings."
    },
    {
      id: 3,
      name: "Secure Storage",
      designation: "Infrastructure",
      image: <ShieldIcon className="h-8 w-8 text-primary" />,
      description: "Music is securely stored on IPFS, preventing piracy and unauthorized distribution."
    },
  ];

  const features = [
    {
      title: "For Artists",
      description: "Take control of your music and earnings with RHYTHMIX's artist-first platform.",
      icon: <MusicIcon className="h-6 w-6 text-primary" />,
      link: "/register?role=artist",
      linkText: "Start Creating"
    },
    {
      title: "For Fans",
      description: "Discover, collect, and truly own the music you love.",
      icon: <Disc3Icon className="h-6 w-6 text-primary" />,
      link: "/register?role=user",
      linkText: "Start Exploring"
    },
  ];

  const howItWorksContent = [
    {
      title: "Artists Create",
      description: "Artists upload their music and mint it as an NFT, setting their royalty percentages.",
      step: "1"
    },
    {
      title: "Fans Purchase",
      description: "Fans buy music NFTs directly from artists or on the secondary market.",
      step: "2"
    },
    {
      title: "Royalties Flow",
      description: "Smart contracts automatically distribute royalties to artists whenever their music is resold.",
      step: "3"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <header className="border-b border-white/10">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <MusicIcon className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">RHYTHMIX</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium hover:text-primary transition-colors">
              How It Works
            </Link>
            <Link href="#for-artists" className="text-sm font-medium hover:text-primary transition-colors">
              For Artists
            </Link>
            <Link href="#for-fans" className="text-sm font-medium hover:text-primary transition-colors">
              For Fans
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline" className="border-white/20 hover:border-white/40 transition-colors">
                Log In
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-primary hover:bg-primary/80 transition-colors">Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-20 md:py-32 overflow-hidden relative">
          <div className="absolute inset-0 w-full h-full">
            <SparklesCore
              id="tsparticles"
              background="transparent"
              minSize={0.6}
              maxSize={1.4}
              particleDensity={70}
              className="w-full h-full"
              particleColor="#8a2be2"
            />
          </div>
          
          <div className="container px-4 md:px-6 relative z-10">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
                  <TextGenerateEffect words="The Future of Music Ownership is Here" />
                </h1>
                <p className="text-muted-foreground md:text-xl">
                  RHYTHMIX is a decentralized music platform where artists can mint their music as NFTs and fans can
                  truly own the music they love.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                  <Link href="/register?role=artist">
                    <Button size="lg" className="w-full border-white/20 border hover:border-white/40 sm:w-auto bg-black hover:bg-black/80">
                      Join as Artist
                    </Button>
                  </Link>
                  <Link href="/register?role=user">
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="w-full sm:w-auto border-white/20 hover:border-white/40"
                    >
                      Join as Fan
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative aspect-video overflow-hidden rounded-xl">
                
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter mb-4">Key Features</h2>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                RHYTHMIX combines the power of blockchain technology with music to create a revolutionary platform for
                artists and fans.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Feature Card 1 */}
              <div className="bg-black/30 border border-white/10 p-6 rounded-xl hover:border-primary/50 transition-all group">
                <div className="mb-4 bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center">
                  <MusicIcon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">Music NFTs</h3>
                <p className="text-muted-foreground">
                  Artists can create their music as NFTs with customizable royalty percentages, ensuring fair compensation for their work.
                </p>
              </div>

              {/* Feature Card 2 */}
              <div className="bg-black/30 border border-white/10 p-6 rounded-xl hover:border-primary/50 transition-all group">
                <div className="mb-4 bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center">
                  <WalletIcon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">Direct Payments</h3>
                <p className="text-muted-foreground">
                  Smart contracts handle royalty payments automatically, ensuring artists receive instant earnings without middlemen.
                </p>
              </div>

              {/* Feature Card 3 */}
              <div className="bg-black/30 border border-white/10 p-6 rounded-xl hover:border-primary/50 transition-all group">
                <div className="mb-4 bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center">
                  <ShieldIcon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">Secure Storage</h3>
                <p className="text-muted-foreground">
                  Music is securely stored on IPFS, preventing piracy and unauthorized distribution while ensuring permanent accessibility.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-16 md:py-24 bg-black/50">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter">How It Works</h2>
              <p className="text-muted-foreground mt-4 max-w-3xl mx-auto">
                A simple process that revolutionizes how music is created, shared, and owned.
              </p>
            </div>
            <TracingBeam className="px-6">
              {howItWorksContent.map((item, index) => (
                <div key={index} className="mb-12">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg mr-4">
                      {item.step}
                    </div>
                    <h3 className="text-2xl font-bold">{item.title}</h3>
                  </div>
                  <p className="text-muted-foreground ml-16">
                    {item.description}
                  </p>
                </div>
              ))}
            </TracingBeam>
          </div>
        </section>

        <section className="py-16  md:py-24">
          <div className="container px-4 md:px-6">
            
            <div className="grid md:grid-cols-2 gap-12 mt-16">
              <div id="for-artists" className="space-y-4">
                <BackgroundGradient className="p-8 bg-black rounded-[20px]">
                  <h2 className="text-3xl font-bold tracking-tighter">For Artists</h2>
                  <p className="text-muted-foreground">
                    Take control of your music and earnings with RHYTHMIX's artist-first platform.
                  </p>
                  <ul className="space-y-2 mt-4">
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
                  <div className="mt-6">
                    <Link href="/register?role=artist">
                      <Button className="bg-primary hover:bg-primary/80 transition-colors">Start Creating</Button>
                    </Link>
                  </div>
                </BackgroundGradient>
              </div>
              <div id="for-fans" className="space-y-4 h-[10px]">
                <BackgroundGradient className="p-8 bg-black rounded-[20px]">
                  <h2 className="text-3xl font-bold tracking-tighter">For Fans</h2>
                  <p className="text-muted-foreground">Discover, collect, and truly own the music you love.</p>
                  <ul className="space-y-2 mt-4">
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
                  <div className="mt-6">
                    <Link href="/register?role=user">
                      <Button className="bg-primary hover:bg-primary/80 transition-colors">Start Exploring</Button>
                    </Link>
                  </div>
                </BackgroundGradient>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t border-white/10 py-6 md:py-8">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 px-4 md:px-6">
          <div className="flex items-center gap-2">
            <MusicIcon className="h-5 w-5 text-primary" />
            <span className="text-lg font-semibold">RHYTHMIX</span>
          </div>
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} RHYTHMIX. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}