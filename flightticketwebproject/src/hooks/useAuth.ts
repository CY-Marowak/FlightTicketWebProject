import { useContext } from "react"
import { AuthContext } from "../auth/AuthContext"
import type { AuthContextType } from "../types/auth"

export function useAuth(): AuthContextType {
    const ctx = useContext(AuthContext)

    if (!ctx) {
        throw new Error("useAuth 必須在 AuthProvider 內使用")
    }

    return ctx
}
