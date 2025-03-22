"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateProfile,
  type User as FirebaseUser,
} from "firebase/auth"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { auth, db, googleProvider } from "@/lib/firebase"

type User = {
  id: string
  name: string
  email: string
  role: "artist" | "user"
  profileImage?: string
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  loginWithGoogle: () => Promise<void>
  register: (name: string, email: string, password: string, role: "artist" | "user") => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Helper function to get or create user data in Firestore
  const getUserData = async (firebaseUser: FirebaseUser): Promise<User> => {
    const userRef = doc(db, "users", firebaseUser.uid)
    const userSnap = await getDoc(userRef)

    if (userSnap.exists()) {
      // User exists in Firestore, return data
      const userData = userSnap.data()
      return {
        id: firebaseUser.uid,
        name: userData.name || firebaseUser.displayName || "User",
        email: userData.email || firebaseUser.email || "",
        role: userData.role || "user",
        profileImage: userData.profileImage || firebaseUser.photoURL || undefined,
      }
    } else {
      // User doesn't exist in Firestore, create new user
      const newUser = {
        id: firebaseUser.uid,
        name: firebaseUser.displayName || "User",
        email: firebaseUser.email || "",
        role: "user", // Default role
        profileImage: firebaseUser.photoURL || undefined,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      // Save to Firestore
      await setDoc(userRef, newUser)

      return newUser
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userData = await getUserData(firebaseUser)
          setUser(userData)
        } catch (error) {
          console.error("Error getting user data:", error)
          setUser(null)
        }
      } else {
        setUser(null)
      }
      setIsLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const userData = await getUserData(userCredential.user)
      setUser(userData)
    } catch (error) {
      console.error("Login error:", error)
      throw error
    }
  }

  const loginWithGoogle = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider)
      const userData = await getUserData(userCredential.user)
      setUser(userData)
    } catch (error) {
      console.error("Google login error:", error)
      throw error
    }
  }

  const register = async (name: string, email: string, password: string, role: "artist" | "user") => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const firebaseUser = userCredential.user

      // Update profile with display name
      await updateProfile(firebaseUser, {
        displayName: name,
      })

      // Create user in Firestore with role
      const userRef = doc(db, "users", firebaseUser.uid)
      await setDoc(userRef, {
        name,
        email,
        role,
        createdAt: new Date(),
        updatedAt: new Date(),
      })

      setUser({
        id: firebaseUser.uid,
        name,
        email,
        role,
        profileImage: undefined,
      })
    } catch (error) {
      console.error("Registration error:", error)
      throw error
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
      setUser(null)
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, loginWithGoogle, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

