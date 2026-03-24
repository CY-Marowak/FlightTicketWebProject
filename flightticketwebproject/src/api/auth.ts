import api from "./client"
import type { LoginResponse, LoginRequest } from "../types/auth"

export async function register(username: string, password: string) {
    const res = await api.post<LoginResponse>("/register", {
        username,
        password
    })
    return res.data
}


export async function login(data: LoginRequest): Promise<LoginResponse> {
    const res = await api.post("/login", data)
    return res.data
}

