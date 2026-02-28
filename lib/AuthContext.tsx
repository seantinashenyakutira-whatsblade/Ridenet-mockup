"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User, onAuthStateChanged, signOut as firebaseSignOut, signInWithPopup, GoogleAuthProvider, RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

interface AuthContextType {
    user: User | null;
    loading: boolean;
    isAdmin: boolean;
    userData: any;
    signInWithGoogle: () => Promise<void>;
    setupRecaptcha: (containerId: string) => void;
    signInWithPhone: (phoneNumber: string) => Promise<void>;
    verifyOtp: (otp: string) => Promise<void>;
    signOut: () => Promise<void>;
    refreshUserData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

// Expose a custom hook
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [userData, setUserData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);

    const fetchUserData = async (currentUser: User) => {
        try {
            const userRef = doc(db, "users", currentUser.uid);
            const userSnap = await getDoc(userRef);
            if (userSnap.exists()) {
                const data = userSnap.data();
                setUserData(data);
                setIsAdmin(!!data.isAdmin);
            } else {
                // Create basic user doc
                const newUserData = {
                    email: currentUser.email,
                    phone: currentUser.phoneNumber,
                    name: currentUser.displayName || "User",
                    createdAt: new Date(),
                    isAdmin: false
                };
                await setDoc(userRef, newUserData);
                setUserData(newUserData);
                setIsAdmin(false);
            }
        } catch (e) {
            console.warn("Could not fetch user data from Firestore (mocking config?)", e);
        }
    };

    useEffect(() => {
        let unsubscribe = () => { };
        try {
            if (process.env.NEXT_PUBLIC_FIREBASE_API_KEY === "mock-api-key" || !process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
                // We are in mock mode, so let's mock the user
                const isMockSignedIn = typeof window !== 'undefined' && localStorage.getItem('mockUser') === 'signed_in';
                if (isMockSignedIn) {
                    setUser({ uid: 'mock-123', email: 'admin@ridenet.co.zm', displayName: "Mock Admin" } as User);
                    setUserData({ name: "Mock Admin", email: "admin@ridenet.co.zm", phone: "+260971234567" });
                    setIsAdmin(true);
                } else {
                    setUser(null);
                    setUserData(null);
                    setIsAdmin(false);
                }
                setLoading(false);
                return;
            }

            unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
                setUser(currentUser);
                if (currentUser) {
                    await fetchUserData(currentUser);
                } else {
                    setUserData(null);
                    setIsAdmin(false);
                }
                setLoading(false);
            });
        } catch (e) {
            console.warn("Firebase Auth Error: mock config?", e);
            setLoading(false);
        }
        return () => unsubscribe();
    }, []);

    const signInWithGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error("Google Sign-in Error:", error);
            throw error;
        }
    };

    const setupRecaptcha = (containerId: string) => {
        if (!(window as any).recaptchaVerifier) {
            (window as any).recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
                size: "invisible",
            });
        }
    };

    const signInWithPhone = async (phoneNumber: string) => {
        try {
            const appVerifier = (window as any).recaptchaVerifier;
            const result = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
            setConfirmationResult(result);
        } catch (error) {
            console.error("Phone sign in error", error);
            throw error;
        }
    };

    const verifyOtp = async (otp: string) => {
        if (!confirmationResult) throw new Error("No confirmation result available. Request OTP first.");
        try {
            await confirmationResult.confirm(otp);
        } catch (error) {
            console.error("OTP Verification Error", error);
            throw error;
        }
    };

    const signOut = async () => {
        try {
            if (process.env.NEXT_PUBLIC_FIREBASE_API_KEY === "mock-api-key" || !process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
                localStorage.removeItem('mockUser');
                setUser(null);
                setUserData(null);
                setIsAdmin(false);
                window.location.reload();
                return;
            }
            await firebaseSignOut(auth);
        } catch (error) {
            console.error("Sign-out Error:", error);
            throw error;
        }
    };

    const refreshUserData = async () => {
        if (user) await fetchUserData(user);
    };

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            isAdmin,
            userData,
            signInWithGoogle,
            setupRecaptcha,
            signInWithPhone,
            verifyOtp,
            signOut,
            refreshUserData
        }}>
            {children}
        </AuthContext.Provider>
    );
}
