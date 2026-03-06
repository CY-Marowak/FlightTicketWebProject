import { useEffect, useState } from "react"
import type { TrackedFlight } from "../types/flight"
import { fetchTrackedFlights } from "../api/flights"
import { deleteTrackedFlight } from "../api/flights"
import "../styles/table.css"

/*
    我的航班頁面
*/

export default function TrackedFlights() {
    const [flights, setFlights] = useState<TrackedFlight[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function load() {
            try {
                setLoading(true)
                setError(null)

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

    async function handleDelete(id: number) {
        const ok = window.confirm("確定要刪除此航班嗎？")
        if (!ok) return

        try {
            await deleteTrackedFlight(id)

            // 前端同步移除（不用重抓 API）
            setFlights(prev => prev.filter(f => f.id !== id))
        } catch (err) {
            alert("刪除失敗")
        }
    }

    return (
        <div>
            <h2>我的航班</h2>

            {loading && <p>載入中...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            <table className="app-table">
                <thead>
                    <tr>
                        <th>航空公司</th>
                        <th>航班</th>
                        <th>出發時間</th>
                        <th>抵達時間</th>
                        <th>價格</th>
                        <th>操作</th>
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
                            <td>
                                <div className="app-table-actions">
                                    <button
                                        className="app-btn app-btn-danger"
                                        onClick={() => handleDelete(f.id)}
                                    >
                                        刪除
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}


