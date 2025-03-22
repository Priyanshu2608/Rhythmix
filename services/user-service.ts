import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { db, storage } from "@/lib/firebase"

// User profile
export async function createUserProfile(userId: string, data: any) {
  await setDoc(doc(db, "users", userId), {
    ...data,
    createdAt: new Date(),
    updatedAt: new Date(),
  })
}

export async function getUserProfile(userId: string) {
  const docRef = doc(db, "users", userId)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    return docSnap.data()
  } else {
    return null
  }
}

export async function updateUserProfile(userId: string, data: any) {
  const userRef = doc(db, "users", userId)
  await updateDoc(userRef, {
    ...data,
    updatedAt: new Date(),
  })
}

// Profile picture
export async function uploadProfilePicture(userId: string, file: File) {
  const storageRef = ref(storage, `profile-pictures/${userId}`)
  await uploadBytes(storageRef, file)
  const downloadURL = await getDownloadURL(storageRef)

  // Update user profile with the new picture URL
  await updateUserProfile(userId, { profileImage: downloadURL })

  return downloadURL
}

// Favorites
export async function addToFavorites(userId: string, trackId: string, trackData: any) {
  const userRef = doc(db, "users", userId)

  // Add to favorites array
  await updateDoc(userRef, {
    favorites: arrayUnion(trackId),
  })

  // Store track data in tracks collection if it doesn't exist
  const trackRef = doc(db, "tracks", trackId)
  const trackSnap = await getDoc(trackRef)

  if (!trackSnap.exists()) {
    await setDoc(trackRef, {
      ...trackData,
      createdAt: new Date(),
    })
  }
}

export async function removeFromFavorites(userId: string, trackId: string) {
  const userRef = doc(db, "users", userId)
  await updateDoc(userRef, {
    favorites: arrayRemove(trackId),
  })
}

export async function getFavorites(userId: string) {
  const userRef = doc(db, "users", userId)
  const userSnap = await getDoc(userRef)

  if (!userSnap.exists()) {
    return []
  }

  const userData = userSnap.data()
  const favorites = userData.favorites || []

  // Get track data for each favorite
  const tracks = []

  for (const trackId of favorites) {
    const trackRef = doc(db, "tracks", trackId)
    const trackSnap = await getDoc(trackRef)

    if (trackSnap.exists()) {
      tracks.push({
        id: trackId,
        ...trackSnap.data(),
      })
    }
  }

  return tracks
}

// Playlists
export async function createPlaylist(userId: string, name: string, description = "") {
  const playlistsRef = collection(db, "playlists")
  const playlistRef = doc(playlistsRef)

  await setDoc(playlistRef, {
    name,
    description,
    userId,
    tracks: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  })

  return playlistRef.id
}

export async function getUserPlaylists(userId: string) {
  const playlistsRef = collection(db, "playlists")
  const q = query(playlistsRef, where("userId", "==", userId))
  const querySnapshot = await getDocs(q)

  const playlists = []
  querySnapshot.forEach((doc) => {
    playlists.push({
      id: doc.id,
      ...doc.data(),
    })
  })

  return playlists
}

export async function getPlaylist(playlistId: string) {
  const playlistRef = doc(db, "playlists", playlistId)
  const playlistSnap = await getDoc(playlistRef)

  if (!playlistSnap.exists()) {
    return null
  }

  const playlistData = playlistSnap.data()
  const tracks = []

  // Get track data for each track in the playlist
  for (const trackId of playlistData.tracks || []) {
    const trackRef = doc(db, "tracks", trackId)
    const trackSnap = await getDoc(trackRef)

    if (trackSnap.exists()) {
      tracks.push({
        id: trackId,
        ...trackSnap.data(),
      })
    }
  }

  return {
    id: playlistId,
    ...playlistData,
    tracks,
  }
}

export async function addTrackToPlaylist(playlistId: string, trackId: string, trackData: any) {
  const playlistRef = doc(db, "playlists", playlistId)

  // Add track to playlist
  await updateDoc(playlistRef, {
    tracks: arrayUnion(trackId),
    updatedAt: new Date(),
  })

  // Store track data in tracks collection if it doesn't exist
  const trackRef = doc(db, "tracks", trackId)
  const trackSnap = await getDoc(trackRef)

  if (!trackSnap.exists()) {
    await setDoc(trackRef, {
      ...trackData,
      createdAt: new Date(),
    })
  }
}

export async function removeTrackFromPlaylist(playlistId: string, trackId: string) {
  const playlistRef = doc(db, "playlists", playlistId)
  await updateDoc(playlistRef, {
    tracks: arrayRemove(trackId),
    updatedAt: new Date(),
  })
}

// Listening history
export async function addToHistory(userId: string, trackId: string, trackData: any) {
  const historyRef = doc(db, "history", userId)
  const historySnap = await getDoc(historyRef)

  let history = []

  if (historySnap.exists()) {
    history = historySnap.data().tracks || []

    // Remove the track if it already exists in history
    history = history.filter((item: any) => item.trackId !== trackId)
  }

  // Add the track to the beginning of the history
  history.unshift({
    trackId,
    timestamp: new Date(),
  })

  // Limit history to 50 items
  if (history.length > 50) {
    history = history.slice(0, 50)
  }

  // Update history
  await setDoc(
    historyRef,
    {
      tracks: history,
      updatedAt: new Date(),
    },
    { merge: true },
  )

  // Store track data in tracks collection if it doesn't exist
  const trackRef = doc(db, "tracks", trackId)
  const trackSnap = await getDoc(trackRef)

  if (!trackSnap.exists()) {
    await setDoc(trackRef, {
      ...trackData,
      createdAt: new Date(),
    })
  }
}

export async function getHistory(userId: string) {
  const historyRef = doc(db, "history", userId)
  const historySnap = await getDoc(historyRef)

  if (!historySnap.exists()) {
    return []
  }

  const historyData = historySnap.data()
  const historyItems = historyData.tracks || []

  // Get track data for each item in history
  const tracks = []

  for (const item of historyItems) {
    const trackRef = doc(db, "tracks", item.trackId)
    const trackSnap = await getDoc(trackRef)

    if (trackSnap.exists()) {
      tracks.push({
        id: item.trackId,
        timestamp: item.timestamp,
        ...trackSnap.data(),
      })
    }
  }

  return tracks
}

