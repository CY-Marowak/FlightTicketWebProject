import React, { useState } from "react"
import { AuthContext } from "./AuthContext"
import type { AuthContextType } from "../types/auth"

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children
}) => {
    const [token, setToken] = useState<string | null>(null)
    const [userId, setUserId] = useState<number | null>(null)

    const login = (token: string, userId: number) => {
        setToken(token)
        setUserId(userId)
    }

    const logout = () => {
        setToken(null)
        setUserId(null)
    }

    const value: AuthContextType = {
        token,
        userId,
        isAuthenticated: !!token,
        login,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
