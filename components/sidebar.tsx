"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
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
  ChevronLeftIcon,
  ChevronRightIcon,
  AlbumIcon
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const [open, setOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const isArtist = user?.role === "artist"

  // Check if mobile on first render and when window resizes
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024)
      // Auto-collapse on smaller screens
      if (window.innerWidth < 1280 && !collapsed) {
        setCollapsed(true)
      }
    }
    
    // Set on mount
    checkIfMobile()
    
    // Add event listener
    window.addEventListener('resize', checkIfMobile)
    
    // Clean up
    return () => window.removeEventListener('resize', checkIfMobile)
  }, [collapsed])

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
      href: "/dashboard/librarydash",
      active: pathname === "/dashboard/library",
    },
  ]

  const artistRoutes = [
    {
      label: "Upload Music",
      icon: UploadIcon,
      href: "/dashboard/upload",
      active: pathname === "/dashboard/upload",
      badge: "New",
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

  const generalRoutes = [
    {
      label: "Marketplace",
      icon: WalletIcon,
      href: "/dashboard/marketplace",
      active: pathname === "/dashboard/marketplace",
    },
   
  ]

  const onNavigation = () => {
    setOpen(false)
  }

  const handleLogout = () => {
    logout()
  }

  const toggleSidebar = () => {
    setCollapsed(!collapsed)
  }

  const NavLink = ({ route }: { route: any }) => {
    return collapsed ? (
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href={route.href}
              onClick={onNavigation}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-md transition-colors relative",
                route.active 
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <route.icon className="h-5 w-5" />
              {route.badge && (
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-destructive"></span>
              )}
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right" className="font-medium">
            {route.label}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ) : (
      <Link
        href={route.href}
        onClick={onNavigation}
        className={cn(
          "group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
          route.active 
            ? "bg-primary text-primary-foreground" 
            : "text-muted-foreground hover:bg-muted hover:text-foreground"
        )}
      >
        <route.icon className="h-5 w-5 flex-shrink-0" />
        <span className="truncate">{route.label}</span>
        {route.badge && (
          <Badge variant="destructive" className="ml-auto text-xs py-0 h-5">
            {route.badge}
          </Badge>
        )}
      </Link>
    )
  }

  const sidebarContent = (
    <div className={cn("flex h-full flex-col", className)}>
      <div className={cn(
        "sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-10",
        collapsed ? "py-4" : "px-3 py-4"
      )}>
        <div className={cn(
          "flex items-center",
          collapsed ? "justify-center mb-6" : "gap-2 px-2 mb-6"
        )}>
          <Link href="/dashboard" className={cn(
            "flex items-center", 
            collapsed ? "justify-center" : "gap-2"
          )}>
            <MusicIcon className="h-6 w-6 text-primary" />
            {!collapsed && <span className="text-xl font-bold">RHYTHMIX</span>}
          </Link>
          
          {!isMobile && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleSidebar}
              className={cn(
                "h-8 w-8 p-0", 
                collapsed ? "absolute right-2 top-4" : "ml-auto"
              )}
            >
              {collapsed ? (
                <ChevronRightIcon className="h-4 w-4" />
              ) : (
                <ChevronLeftIcon className="h-4 w-4" />
              )}
              <span className="sr-only">Toggle sidebar</span>
            </Button>
          )}
        </div>
        
        {!collapsed && (
          <div className="border-b pb-4 mb-4">
            <div className="flex items-center gap-3 px-2">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user?.image || ""} alt={user?.name || "User"} />
                <AvatarFallback className="bg-primary/10 text-primary">
                  {user?.name?.substring(0, 2) || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col truncate">
                <span className="font-medium truncate">{user?.name || "User"}</span>
                <span className="text-xs text-muted-foreground truncate">{user?.email}</span>
              </div>
            </div>
          </div>
        )}
        
        <div className={cn(
          "space-y-1",
          collapsed && "flex flex-col items-center gap-1"
        )}>
          {routes.map((route) => (
            <NavLink key={route.href} route={route} />
          ))}
          
          {/* Divider */}
          {isArtist && (
            <>
              <div className={cn(
                "my-3",
                collapsed ? "w-8 border-t mx-auto" : "px-3 py-2"
              )}>
                {!collapsed && (
                  <p className="text-xl font-semibold text-muted-foreground">ARTIST TOOLS</p>
                )}
              </div>
              {artistRoutes.map((route) => (
                <NavLink key={route.href} route={route} />
              ))}
            </>
          )}
          
          {/* Divider */}
          <div className={cn(
            "my-3",
            collapsed ? "w-8 border-t mx-auto" : "px-3 py-2"
          )}>
            {!collapsed && (
              <p className="text-xs font-semibold text-muted-foreground">GENERAL</p>
            )}
          </div>
          
          {generalRoutes.map((route) => (
            <NavLink key={route.href} route={route} />
          ))}
        </div>
      </div>
      
      <div className={cn(
        "mt-auto",
        collapsed ? "px-0 py-4" : "px-3 py-4"
      )}>
        {isArtist && (
          <div className="mb-2">
            {collapsed ? (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-10 w-10 rounded-md" 
                      asChild
                    >
                      <Link href="/dashboard/create-nft">
                        <PlusCircleIcon className="h-5 w-5" />
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">Create NFT</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              <Button 
                variant="outline" 
                className="w-full justify-start gap-2 bg-primary/5" 
                asChild
              >
                <Link href="/dashboard/create-nft">
                  <PlusCircleIcon className="h-5 w-5" />
                  Create NFT
                </Link>
              </Button>
            )}
          </div>
        )}
        
        {collapsed ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-10 w-10 rounded-md text-muted-foreground" 
                  onClick={handleLogout}
                >
                  <LogOutIcon className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">Log out</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive" 
            onClick={handleLogout}
          >
            <LogOutIcon className="h-5 w-5" />
            Log out
          </Button>
        )}
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar - Now Collapsible */}
      <aside className={cn(
        "hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 z-20 border-r transition-all duration-300",
        collapsed ? "lg:w-16" : "lg:w-64"
      )}>
        <ScrollArea className="flex-1">{sidebarContent}</ScrollArea>
      </aside>
      
      {/* Content Container - Adjusts based on sidebar state */}
      <div className={cn(
        "transition-all duration-300",
        collapsed ? "lg:pl-16" : "lg:pl-64"
      )}>
        {/* Mobile Menu Button and Sheet */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button 
              variant="outline" 
              size="icon" 
              className="lg:hidden fixed top-[20px] left-4 z-40 h-10 w-10"
            >
              <MenuIcon className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 max-w-[280px] sm:max-w-[320px]">
            <ScrollArea className="h-full">{sidebarContent}</ScrollArea>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}