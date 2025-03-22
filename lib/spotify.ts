const SPOTIFY_API_BASE = "https://api.spotify.com/v1";

// Spotify API token management
let spotifyToken: string;
let tokenExpiry = 0;

/**
 * Get a Spotify API token using client credentials flow
 */
async function getSpotifyToken(): Promise<string> {
  if (spotifyToken && tokenExpiry > Date.now()) {
    return spotifyToken;
  }

  const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("Spotify credentials not configured");
  }

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
    },
    body: new URLSearchParams({ grant_type: "client_credentials" }),
  });

  if (!response.ok) {
    throw new Error("Failed to get Spotify token");
  }

  const data = await response.json();
  spotifyToken = data.access_token;
  tokenExpiry = Date.now() + data.expires_in * 1000;

  return spotifyToken;
}

/**
 * Make an authenticated request to the Spotify API
 */
async function spotifyFetch(endpoint: string, options: RequestInit = {}): Promise<any> {
  const token = await getSpotifyToken();

  const response = await fetch(`${SPOTIFY_API_BASE}${endpoint}`, {
    ...options,
    headers: {
      ...(options.headers as Record<string, string>), // Ensure headers exist
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Spotify API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Get new releases from Spotify
 */
export async function getNewReleases(limit: number = 20): Promise<any> {
  return spotifyFetch(`/browse/new-releases?limit=${limit}`);
}

/**
 * Get featured playlists from Spotify
 */
export async function getFeaturedPlaylists(limit: number = 20): Promise<any> {
  return spotifyFetch(`/browse/featured-playlists?limit=${limit}`);
}

/**
 * Get several categories from Spotify
 */
export async function getCategories(limit: number = 20): Promise<any> {
  return spotifyFetch(`/browse/categories?limit=${limit}`);
}

/**
 * Search Spotify for tracks, artists, albums, or playlists
 */
export async function search(query: string, type: string = "track,artist,album,playlist", limit: number = 20): Promise<any> {
  return spotifyFetch(`/search?q=${encodeURIComponent(query)}&type=${type}&limit=${limit}`);
}

/**
 * Get a track by ID
 */
export async function getTrack(id: string): Promise<any> {
  return spotifyFetch(`/tracks/${id}`);
}

/**
 * Get an artist by ID
 */
export async function getArtist(id: string): Promise<any> {
  return spotifyFetch(`/artists/${id}`);
}

/**
 * Get an artist's top tracks
 */
export async function getArtistTopTracks(id: string, market: string = "US"): Promise<any> {
  return spotifyFetch(`/artists/${id}/top-tracks?market=${market}`);
}

/**
 * Get an album by ID
 */
export async function getAlbum(id: string): Promise<any> {
  return spotifyFetch(`/albums/${id}`);
}

/**
 * Get a playlist by ID
 */
export async function getPlaylist(id: string): Promise<any> {
  return spotifyFetch(`/playlists/${id}`);
}

/**
 * Get recommendations based on seed artists, tracks, or genres
 */
export async function getRecommendations(
  seedArtists?: string[],
  seedTracks?: string[],
  seedGenres?: string[],
  limit: number = 20
): Promise<any> {
  const params = new URLSearchParams();

  if (seedArtists && seedArtists.length) {
    params.append("seed_artists", seedArtists.join(","));
  }

  if (seedTracks && seedTracks.length) {
    params.append("seed_tracks", seedTracks.join(","));
  }

  if (seedGenres && seedGenres.length) {
    params.append("seed_genres", seedGenres.join(","));
  }

  params.append("limit", limit.toString());

  return spotifyFetch(`/recommendations?${params.toString()}`);
}

/**
 * Get available genre seeds for recommendations
 */
export async function getGenreSeeds(): Promise<any> {
  return spotifyFetch("/recommendations/available-genre-seeds");
}
