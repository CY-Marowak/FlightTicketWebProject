import api from "./client"
import type { Notification } from "../types/notification"

export async function fetchNotifications(): Promise<Notification[]> {
    const res = await api.get("/notifications")
    return res.data
}
