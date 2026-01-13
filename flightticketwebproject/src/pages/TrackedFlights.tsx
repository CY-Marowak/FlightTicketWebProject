import { useEffect, useState } from "react"
import { fetchTrackedFlights } from "../api/flights"
import type { TrackedFlight } from "../types/flight"

export default function TrackedFlights() {
    const [flights, setFlights] = useState<TrackedFlight[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function load() {
            try {
                setLoading(true)
                const data = await fetchTrackedFlights()
                setFlights(data)
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message)
                } else {
                    setError("載入失敗")
                }
            } finally {
                setLoading(false)
            }
        }

        load()
    }, [])

    if (loading) {
        return <p>載入中...</p>
    }

    if (error) {
        return <p style={{ color: "red" }}>{error}</p>
    }

    if (flights.length === 0) {
        return <p>目前沒有追蹤中的航班</p>
    }

    return (
        <div>
            <h2>我的航班</h2>

            <table>
                <thead>
                    <tr>
                        <th>航空公司</th>
                        <th>航班</th>
                        <th>出發</th>
                        <th>抵達</th>
                        <th>價格</th>
                    </tr>
                </thead>
                <tbody>
                    {flights.map(f => (
                        <tr key={f.id}>
                            <td>{f.airline}</td>
                            <td>{f.flight_number}</td>
                            <td>{f.depart_time}</td>
                            <td>{f.arrival_time}</td>
                            <td>{f.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
