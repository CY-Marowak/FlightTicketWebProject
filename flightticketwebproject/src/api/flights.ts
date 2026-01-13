import api from "./client"
import { getToken } from "../utils/token"
import type { TrackedFlight } from "../types/flight"


/* ============================
   航班搜尋（公開）
============================ */
export interface FlightQuery {
    from: string
    to: string
    depart: string
    return: string
}

export async function searchFlights(params: FlightQuery) {
    const res = await api.get("/price", { params })
    return res.data
}

/* ============================
   追蹤航班（需要 JWT）
============================ */
export async function fetchTrackedFlights(): Promise<TrackedFlight[]> {
    const token = getToken()

    if (!token) {
        throw new Error("未登入")
    }

    const res = await api.get<TrackedFlight[]>(
        "/flights",
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )

    return res.data
}

