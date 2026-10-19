"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  auth,
  googleProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  isFirebaseConfigured,
} from "@/lib/firebase/client";

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  company?: string | null;
  photoURL?: string | null;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signUpWithVerifiedOtp: (params: {
    email: string;
    password: string;
    name: string;
    company?: string;
    registrationToken: string;
  }) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_STORAGE_USER_KEY = "paytrack_user_meta";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Sync session with server endpoint to set/maintain HttpOnly cookie
  const syncServerSession = async (userPayload: AuthUser, idToken?: string) => {
    try {
      await fetch("/api/auth/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idToken: idToken || "dev-token",
          user: userPayload,
        }),
      });
    } catch (err) {
      console.warn("[Auth] Server session sync error:", err);
    }
  };

  useEffect(() => {
    // 1. Check local storage cache for immediate render
    try {
      const cached = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        setUser(parsed);
      }
    } catch {
      // Ignore storage errors
    }

    // 2. Listen to Firebase Auth state if auth is initialized
    if (auth && isFirebaseConfigured) {
      const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        if (firebaseUser) {
          const idToken = await firebaseUser.getIdToken().catch(() => "");
          // Check if local storage has extra metadata like company
          let company = "";
          try {
            const cached = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
            if (cached) {
              const parsed = JSON.parse(cached);
              if (parsed.uid === firebaseUser.uid && parsed.company) {
                company = parsed.company;
              }
            }
          } catch {
            // Ignore
          }

          const authUser: AuthUser = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
            company,
          };

          setUser(authUser);
          localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(authUser));
          await syncServerSession(authUser, idToken);
        } else {
          // If no user in Firebase and we are in real Firebase mode
          setUser(null);
          localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
        }
        setLoading(false);
      });

      return () => unsubscribe();
    } else {
      // Demo / fallback mode without Firebase keys
      setLoading(false);
    }
  }, []);

  const signInWithEmail = async (email: string, password: string) => {
    setLoading(true);
    try {
      if (auth && isFirebaseConfigured) {
        const cred = await signInWithEmailAndPassword(auth, email.trim(), password);
        const idToken = await cred.user.getIdToken();
        const authUser: AuthUser = {
          uid: cred.user.uid,
          email: cred.user.email,
          displayName: cred.user.displayName || email.split("@")[0],
          photoURL: cred.user.photoURL,
        };
        setUser(authUser);
        localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(authUser));
        await syncServerSession(authUser, idToken);
      } else {
        // Fallback demo sign in
        const demoUser: AuthUser = {
          uid: `demo_${Date.now()}`,
          email: email.trim(),
          displayName: "Vinay Bhadane",
          company: "Bhadane Enterprises Ltd",
        };
        setUser(demoUser);
        localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(demoUser));
        await syncServerSession(demoUser);
      }
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      if (auth && googleProvider && isFirebaseConfigured) {
        const result = await signInWithPopup(auth, googleProvider);
        const idToken = await result.user.getIdToken();
        const authUser: AuthUser = {
          uid: result.user.uid,
          email: result.user.email,
          displayName: result.user.displayName,
          photoURL: result.user.photoURL,
        };
        setUser(authUser);
        localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(authUser));
        await syncServerSession(authUser, idToken);
      } else {
        // Fallback Google login in demo mode
        const demoUser: AuthUser = {
          uid: `google_demo_${Date.now()}`,
          email: "vinay.bhadane@example.com",
          displayName: "Vinay Bhadane",
          company: "Bhadane Precision Tools",
          photoURL: "",
        };
        setUser(demoUser);
        localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(demoUser));
        await syncServerSession(demoUser);
      }
    } finally {
      setLoading(false);
    }
  };

  const signUpWithVerifiedOtp = async (params: {
    email: string;
    password: string;
    name: string;
    company?: string;
    registrationToken: string;
  }) => {
    setLoading(true);
    try {
      const { email, password, name, company } = params;

      if (auth && isFirebaseConfigured) {
        // 1. Create account in Firebase
        const cred = await createUserWithEmailAndPassword(auth, email.trim(), password);
        // 2. Update display name
        await updateProfile(cred.user, { displayName: name.trim() });
        const idToken = await cred.user.getIdToken();

        const authUser: AuthUser = {
          uid: cred.user.uid,
          email: cred.user.email,
          displayName: name.trim(),
          company: company?.trim() || "",
        };

        setUser(authUser);
        localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(authUser));
        await syncServerSession(authUser, idToken);
      } else {
        // Fallback simulation account creation
        const demoUser: AuthUser = {
          uid: `user_${Date.now()}`,
          email: email.trim(),
          displayName: name.trim(),
          company: company?.trim() || "Bhadane Precision MSME",
        };
        setUser(demoUser);
        localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(demoUser));
        await syncServerSession(demoUser);
      }
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      if (auth && isFirebaseConfigured) {
        await firebaseSignOut(auth).catch(() => {});
      }
      await fetch("/api/auth/logout", { method: "POST" }).catch(() => {});
    } finally {
      setUser(null);
      localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
      window.location.href = "/login";
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signInWithEmail,
        signInWithGoogle,
        signUpWithVerifiedOtp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
