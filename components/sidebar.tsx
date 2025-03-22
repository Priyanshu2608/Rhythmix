"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { useAuth } from "@/context/auth-context"
import {
  MusicIcon,
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  BarChartIcon,
  UploadIcon,
  UsersIcon,
  WalletIcon,
  SettingsIcon,
  LogOutIcon,
  MenuIcon,
} from "lucide-react"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const [open, setOpen] = useState(false)

  const isArtist = user?.role === "artist"

  const routes = [
    {
      label: "Home",
      icon: HomeIcon,
      href: "/dashboard",
      active: pathname === "/dashboard",
    },
    {
      label: "Search",
      icon: SearchIcon,
      href: "/dashboard/search",
      active: pathname === "/dashboard/search",
    },
    {
      label: "Library",
      icon: LibraryIcon,
      href: "/dashboard/library",
      active: pathname === "/dashboard/library",
    },
    ...(isArtist
      ? [
          {
            label: "Upload Music",
            icon: UploadIcon,
            href: "/dashboard/upload",
            active: pathname === "/dashboard/upload",
          },
          {
            label: "Analytics",
            icon: BarChartIcon,
            href: "/dashboard/analytics",
            active: pathname === "/dashboard/analytics",
          },
          {
            label: "Fans",
            icon: UsersIcon,
            href: "/dashboard/fans",
            active: pathname === "/dashboard/fans",
          },
        ]
      : []),
    {
      label: "Marketplace",
      icon: WalletIcon,
      href: "/dashboard/marketplace",
      active: pathname === "/dashboard/marketplace",
    },
    {
      label: "Settings",
      icon: SettingsIcon,
      href: "/dashboard/settings",
      active: pathname === "/dashboard/settings",
    },
  ]

  const onNavigation = () => {
    setOpen(false)
  }

  const handleLogout = () => {
    logout()
  }

  const sidebarContent = (
    <div className={cn("flex h-full flex-col", className)}>
      <div className="px-3 py-4">
        <Link href="/dashboard" className="flex items-center gap-2 px-2 mb-6">
          <MusicIcon className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">RHYTHMIX</span>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              onClick={onNavigation}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                route.active ? "bg-primary text-primary-foreground" : "hover:bg-muted",
              )}
            >
              <route.icon className="h-5 w-5" />
              {route.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-auto px-3 py-4">
        {isArtist && (
          <Button variant="outline" className="w-full justify-start gap-2 mb-2" asChild>
            <Link href="/dashboard/create-nft">
              <PlusCircleIcon className="h-5 w-5" />
              Create NFT
            </Link>
          </Button>
        )}
        <Button variant="ghost" className="w-full justify-start gap-2 text-muted-foreground" onClick={handleLogout}>
          <LogOutIcon className="h-5 w-5" />
          Log out
        </Button>
      </div>
    </div>
  )

  return (
    <>
      <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 z-10 border-r">
        <ScrollArea className="flex-1">{sidebarContent}</ScrollArea>
      </aside>
      <div className="md:pl-64">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden fixed top-4 left-4 z-40">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0">
            <ScrollArea className="h-full">{sidebarContent}</ScrollArea>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}

