import client from "./client"

export async function login(username: string, password: string) {
    const res = await client.post("/login", {
        username,
        password
    })
    return res.data
}

export interface LoginResponse {
    token: string
    user_id: number
    username: string
}
