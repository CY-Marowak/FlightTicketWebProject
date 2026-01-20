import api from "./client"
import type { LoginResponse} from "../types/auth"

export async function register(username: string, password: string) {
    const res = await api.post<LoginResponse>("/register", {
        username,
        password
    })
    return res.data
}

export async function login(username: string, password: string) {
    const res = await api.post("/login", {
        username,
        password
    })
    return res.data
}

