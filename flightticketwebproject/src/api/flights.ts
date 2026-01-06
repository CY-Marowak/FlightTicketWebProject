import api from "./client"

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
