
const client_id = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID
const client_secret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET
const redirect_uri = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI

const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token"
const PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/me/playlists"
const USER_ENDPOINT = "https://api.spotify.com/v1/me"
const TRACKS_ENDPOINT = "https://api.spotify.com/v1/tracks"
const SEARCH_ENDPOINT = "https://api.spotify.com/v1/search"
const ARTISTS_ENDPOINT = "https://api.spotify.com/v1/artists"

// Basic auth for token requests
const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64")

console.log("Spotify config:", {
  clientIdExists: !!client_id,
  clientSecretExists: !!client_secret,
  redirectUriExists: !!redirect_uri,
  redirectUri: redirect_uri,
})

export const getAccessToken = async (code: string) => {
  console.log("Getting access token with code:", code.substring(0, 10) + "...")

  const params = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri: redirect_uri as string,
  })

  try {
    console.log("Making token request to:", TOKEN_ENDPOINT)
    const response = await fetch(TOKEN_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    })

    console.log("Token response status:", response.status)
    const data = await response.json()

    if (data.error) {
      console.error("Token error:", data)
    } else {
      console.log("Token received successfully")
    }

    return data
  } catch (error) {
    console.error("Error getting access token:", error)
    throw error
  }
}

export const refreshAccessToken = async (refresh_token: string) => {
  console.log("Refreshing access token...")

  const params = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token,
  })

  try {
    const response = await fetch(TOKEN_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    })

    console.log("Refresh token response status:", response.status)
    const data = await response.json()

    if (data.error) {
      console.error("Refresh token error:", data)
    } else {
      console.log("Token refreshed successfully")
    }

    return data
  } catch (error) {
    console.error("Error refreshing token:", error)
    throw error
  }
}

export const getUserProfile = async (access_token: string) => {
  console.log("Getting user profile...")
  try {
    const response = await fetch(USER_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
    console.log("User profile response status:", response.status)
    return response
  } catch (error) {
    console.error("Error getting user profile:", error)
    throw error
  }
}

export const getUserPlaylists = async (access_token: string) => {
  console.log("Getting user playlists...")
  try {
    const response = await fetch(PLAYLISTS_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
    console.log("Playlists response status:", response.status)
    return response
  } catch (error) {
    console.error("Error getting playlists:", error)
    throw error
  }
}

export const getPlaylistTracks = async (access_token: string, playlist_id: string) => {
  console.log(`Getting tracks for playlist ${playlist_id}...`)
  try {
    const response = await fetch(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
    console.log("Playlist tracks response status:", response.status)
    return response
  } catch (error) {
    console.error("Error getting playlist tracks:", error)
    throw error
  }
}

export const getTrack = async (access_token: string, track_id: string) => {
  return fetch(`${TRACKS_ENDPOINT}/${track_id}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
}

export const searchSpotify = async (access_token: string, query: string, type = "track,artist,album") => {
  const params = new URLSearchParams({
    q: query,
    type,
  })

  return fetch(`${SEARCH_ENDPOINT}?${params.toString()}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
}

export const getArtist = async (access_token: string, artist_id: string) => {
  return fetch(`${ARTISTS_ENDPOINT}/${artist_id}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
}

export const getArtistTopTracks = async (access_token: string, artist_id: string, market = "US") => {
  return fetch(`${ARTISTS_ENDPOINT}/${artist_id}/top-tracks?market=${market}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
}

export const getArtistAlbums = async (access_token: string, artist_id: string) => {
  return fetch(`${ARTISTS_ENDPOINT}/${artist_id}/albums`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
}

export const getSpotifyLoginURL = () => {
  const scope = [
    "user-read-private",
    "user-read-email",
    "playlist-read-private",
    "playlist-read-collaborative",
    "user-library-read",
    "user-top-read",
    "user-read-recently-played",
    "user-follow-read",
  ].join(" ")

  const params = new URLSearchParams({
    client_id: client_id as string,
    response_type: "code",
    redirect_uri: redirect_uri as string,
    scope,
  })

  const url = `https://accounts.spotify.com/authorize?${params.toString()}`
  console.log("Generated Spotify login URL:", url)
  return url
}

