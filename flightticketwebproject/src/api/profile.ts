import api from "./client"
import type{ UserProfile, ChangePasswordRequest } from "../types/profile"

export async function fetchProfile(): Promise<UserProfile> {
    const res = await api.get("/profile")
    return res.data
}

export async function changePassword(
    payload: ChangePasswordRequest
): Promise<{ message: string }> {
    const res = await api.post("/change_password", payload)
    return res.data
}
