"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateProfile,
  type User as FirebaseUser,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db, googleProvider } from "@/lib/firebase";

// Define the User type for context
type User = {
  id: string;
  name: string;
  email: string;
  role: "artist" | "user";
  profileImage?: string;
};

// Define Firestore database structure
type UserData = {
  name: string;
  email: string;
  role: "artist" | "user";
  profileImage?: string;
  createdAt: Date;
  updatedAt: Date;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string,
    role: "artist" | "user"
  ) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch or create user data in Firestore
  const getUserData = async (firebaseUser: FirebaseUser): Promise<User> => {
    const userRef = doc(db, "users", firebaseUser.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const userData = userSnap.data() as UserData;
      return {
        id: firebaseUser.uid,
        name: userData.name || firebaseUser.displayName || "User",
        email: userData.email || firebaseUser.email || "",
        role: userData.role || "user",
        profileImage: userData.profileImage || firebaseUser.photoURL || undefined,
      };
    } else {
      const newUserData: UserData = {
        name: firebaseUser.displayName || "User",
        email: firebaseUser.email || "",
        role: "user",
        profileImage: firebaseUser.photoURL || undefined,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await setDoc(userRef, newUserData);
      return {
        id: firebaseUser.uid,
        name: newUserData.name,
        email: newUserData.email,
        role: newUserData.role,
        profileImage: newUserData.profileImage,
      };
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userData = await getUserData(firebaseUser);
          setUser(userData);
        } catch (error) {
          console.error("Error fetching user data:", error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const userData = await getUserData(userCredential.user);
    setUser(userData);
  };

  const loginWithGoogle = async () => {
    const userCredential = await signInWithPopup(auth, googleProvider);
    const userData = await getUserData(userCredential.user);
    setUser(userData);
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    role: "artist" | "user"
  ) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;

    await updateProfile(firebaseUser, {
      displayName: name,
    });

    const userRef = doc(db, "users", firebaseUser.uid);
    const userData: UserData = {
      name,
      email,
      role,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await setDoc(userRef, userData);

    setUser({
      id: firebaseUser.uid,
      name,
      email,
      role,
      profileImage: undefined,
    });
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, loginWithGoogle, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
