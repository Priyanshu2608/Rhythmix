"use client";

import { useState, useEffect } from "react";
import { useSpotifyAuth } from "@/hooks/use-spotify-auth";
import { getUserProfile, getUserPlaylists } from "@/lib/spotify";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { FaMusic, FaSpotify } from "react-icons/fa";

export default function DashboardPage() {
  const { accessToken, isLoading: authLoading, error: authError } = useSpotifyAuth();
  const [user, setUser] = useState<any>(null);
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<any>({});

  useEffect(() => {
    // Debug info
    console.log("Auth state:", { accessToken, authLoading, authError });
    setDebugInfo(prev => ({ ...prev, auth: { accessToken: !!accessToken, authLoading, authError } }));
    
    if (!accessToken) return;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        console.log("Fetching data with token:", accessToken);
        
        // Fetch user profile
        console.log("Fetching user profile...");
        const userResponse = await getUserProfile(accessToken);
        console.log("User profile response:", userResponse.status);
        
        if (!userResponse.ok) {
          const errorText = await userResponse.text();
          console.error("User profile error:", errorText);
          throw new Error(`Failed to fetch user profile: ${userResponse.status} ${errorText}`);
        }
        
        const userData = await userResponse.json();
        console.log("User data:", userData);
        setUser(userData);
        setDebugInfo(prev => ({ ...prev, user: userData }));
        
        // Fetch user playlists
        console.log("Fetching playlists...");
        const playlistsResponse = await getUserPlaylists(accessToken);
        console.log("Playlists response:", playlistsResponse.status);
        
        if (!playlistsResponse.ok) {
          const errorText = await playlistsResponse.text();
          console.error("Playlists error:", errorText);
          throw new Error(`Failed to fetch playlists: ${playlistsResponse.status} ${errorText}`);
        }
        
        const playlistsData = await playlistsResponse.json();
        console.log("Playlists data:", playlistsData);
        setPlaylists(playlistsData.items || []);
        setDebugInfo(prev => ({ ...prev, playlists: playlistsData }));
        
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err instanceof Error ? err.message : "Failed to load data");
        setDebugInfo(prev => ({ ...prev, error: err instanceof Error ? err.message : "Failed to load data" }));
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [accessToken, authLoading, authError]);

  // Show debug information
  if (authLoading || isLoading) {
    return (
      <div className="container mx-auto p-4 space-y-6">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
          <p className="font-bold">Loading State</p>
          <p>Auth Loading: {String(authLoading)}</p>
          <p>Data Loading: {String(isLoading)}</p>
          <p>Has Token: {accessToken ? "Yes" : "No"}</p>
        </div>
        
        <Skeleton className="h-12 w-[250px]" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(6).fill(0).map((_, i) => (
            <Skeleton key={i} className="h-[200px] rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (authError || error) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p className="font-bold">Error</p>
          <p>Auth Error: {authError || "None"}</p>
          <p>Data Error: {error || "None"}</p>
          <p>Has Token: {accessToken ? "Yes" : "No"}</p>
          <pre className="mt-2 text-xs overflow-auto max-h-40">
            {JSON.stringify(debugInfo, null, 2)}
          </pre>
        </div>
        
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-6">
            <FaSpotify className="h-16 w-16 text-green-500 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Authentication Required</h2>
            <p className="text-muted-foreground mb-4 text-center">
              Please log in with your Spotify account to access your music library.
            </p>
            <Link href="/login">
              <Button>Log in with Spotify</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      
      
      {user && (
        <div className="flex items-center gap-4 mb-6">
          <div className="h-16 w-16 rounded-full overflow-hidden">
            <img 
              src={user.images?.[0]?.url || "/placeholder-user.jpg"} 
              alt={user.display_name} 
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{user.display_name}</h1>
            <p className="text-muted-foreground">{user.email}</p>
          </div>
        </div>
      )}

      <section>
        <h2 className="text-xl font-semibold mb-4">Your Playlists</h2>
        {playlists.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <FaMusic className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No playlists found</h3>
              <p className="text-muted-foreground text-center">
                You don't have any playlists on Spotify yet.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {playlists.map((playlist) => (
              <Link key={playlist.id} href={`/dashboard/playlists/${playlist.id}`}>
                <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
                  <div className="aspect-square w-full overflow-hidden">
                    <img 
                      src={playlist.images?.[0]?.url || "/placeholder.svg"} 
                      alt={playlist.name} 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <CardHeader className="p-4">
                    <CardTitle className="line-clamp-1">{playlist.name}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {playlist.description || `${playlist.tracks.total} tracks`}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
