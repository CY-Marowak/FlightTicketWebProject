import { useState } from "react"
import { searchFlights} from "../api/flights"
import type { Flight } from "../types/flight"
import { addTrackedFlight } from "../api/flights"
import type { FlightResult } from "../types/flight"

/*
    查詢航班頁面
*/

export default function Flights() {
    const [from, setFrom] = useState("TPE")
    const [to, setTo] = useState("OKA")
    const [depart, setDepart] = useState("2026-03-12")
    const [ret, setRet] = useState("2026-03-15")
    const [result, setResult] = useState<Flight[]>([])
    const [loading, setLoading] = useState(false)

    async function handleSearch() {
        setLoading(true)
        try {
            const data = await searchFlights({
                from,
                to,
                depart,
                return: ret
            })
            setResult(data.flights ?? [])
        } finally {
            setLoading(false)
        }
    }

    async function handleAdd(flight: FlightResult){
        try {
            await addTrackedFlight(flight)
            alert("已加入追蹤")
        } catch (err) {
            alert("加入追蹤失敗")
        }
    }


    return (
        <div>
            <h2>查詢航班</h2>
            <table className="app-table">
                <thead>
                    <tr>
                        <th>出發地</th>
                        <th>目的地</th>
                        <th>出發時間</th>
                        <th>抵達時間</th>
                        <th>    </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><input value={from} onChange={e => setFrom(e.target.value)} /></td>
                        <td><input value={to} onChange={e => setTo(e.target.value)} /></td>
                        <td><input value={depart} onChange={e => setDepart(e.target.value)} /></td>
                        <td><input value={ret} onChange={e => setRet(e.target.value)} /></td>
                        <td>
                            <div className="app-table-actions">
                                <button
                                    className="app-btn app-btn"
                                    onClick={handleSearch} disabled={loading}
                                >
                                    {loading ? "查詢中..." : "查詢"}
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <br></br>
            <table className="app-table">
                <thead>
                    <tr>
                        <th>班機</th>
                        <th>價格</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    {result.map((f, i) => (
                        <tr key={i}>
                            <td>{f.flight_number}</td>
                            <td>{f.price}</td>
                            <td>
                                <div className="app-table-actions">
                                    <button
                                        className="app-btn app-btn-primary"
                                        onClick={() => handleAdd(f)}
                                    >
                                        加入追蹤
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
