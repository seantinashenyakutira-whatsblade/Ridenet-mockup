"use client"
import { useAuth } from "@/lib/AuthContext"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { ShieldAlert } from "lucide-react"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { user, loading, isAdmin } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!loading) {
            if (!user) {
                router.push("/")
            } else if (!isAdmin) {
                // Not admin
                router.push("/profile")
            }
        }
    }, [user, loading, isAdmin, router])

    if (loading) {
        return <div className="min-h-screen flex text-center justify-center p-12">Checking admin access...</div>
    }

    if (!user || !isAdmin) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
                <ShieldAlert className="w-16 h-16 text-rose-500 mb-4" />
                <h1 className="text-xl font-bold mb-2">Access Denied</h1>
                <p className="text-sm text-muted-foreground">You do not have permission to view this page.</p>
            </div>
        )
    }

    return <>{children}</>
}
