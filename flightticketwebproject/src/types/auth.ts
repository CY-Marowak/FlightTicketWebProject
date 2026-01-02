export interface LoginRequest {
    username: string
    password: string
}

export interface LoginResponse {
    token: string
    user_id: number
    username: string
}

export interface AuthContextType {
    token: string | null
    userId: number | null
    isAuthenticated: boolean
    login: (token: string, userId: number) => void
    logout: () => void
}
