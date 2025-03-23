"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAccessToken } from "@/lib/spotify";

export default function CallbackPage() {
  const router = useRouter();
  const [status, setStatus] = useState("Initializing...");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        setStatus("Getting code from URL...");
        // Get the code from the URL
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");
        const errorParam = urlParams.get("error");
        
        if (errorParam) {
          console.error("Error in Spotify callback:", errorParam);
          setError(`Spotify returned an error: ${errorParam}`);
          setStatus("Error from Spotify");
          return;
        }
        
        if (!code) {
          console.error("No code found in URL");
          setError("No authorization code found in the URL");
          setStatus("Missing code");
          return;
        }

        setStatus("Exchanging code for access token...");
        console.log("Got code, exchanging for token...");
        
        // Exchange code for access token
        const tokenResponse = await getAccessToken(code);
        
        if (tokenResponse.error) {
          console.error("Error getting access token:", tokenResponse);
          setError(`Error getting access token: ${tokenResponse.error}`);
          setStatus("Token error");
          return;
        }

        console.log("Token received successfully");
        setStatus("Token received, storing...");
        
        // Store tokens in localStorage
        localStorage.setItem("spotify_access_token", tokenResponse.access_token);
        localStorage.setItem("spotify_refresh_token", tokenResponse.refresh_token);
        localStorage.setItem("spotify_token_expiry", (Date.now() + tokenResponse.expires_in * 1000).toString());

        setStatus("Success! Redirecting to dashboard...");
        console.log("Tokens stored, redirecting to dashboard");
        
        // Redirect to dashboard
        setTimeout(() => {
          router.push("/dashboard");
        }, 1000);
      } catch (error) {
        console.error("Error in callback:", error);
        setError(`Unexpected error: ${error instanceof Error ? error.message : String(error)}`);
        setStatus("Unexpected error");
      }
    };

    handleCallback();
  }, [router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Connecting to Spotify...</h1>
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">{status}</p>
          
          {error && (
            <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              <p className="font-bold">Error</p>
              <p>{error}</p>
              <div className="mt-4">
                <button 
                  onClick={() => router.push("/login")}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
                >
                  Back to Login
                </button>
              </div>
            </div>
          )}
        </div>
        
        <div className="bg-muted p-4 rounded text-xs">
          <p className="font-medium mb-2">Debug Information:</p>
          <p>Current URL: {typeof window !== 'undefined' ? window.location.href : 'N/A'}</p>
          <p>Status: {status}</p>
          <p>Error: {error || 'None'}</p>
        </div>
      </div>
    </div>
  );
}
