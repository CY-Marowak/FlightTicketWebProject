import { useState } from "react"
import { searchFlights } from "../api/flights"

export default function Flights() {
    const [from, setFrom] = useState("TPE")
    const [to, setTo] = useState("OKA")
    const [depart, setDepart] = useState("2026-03-12")
    const [ret, setRet] = useState("2026-03-15")
    const [result, setResult] = useState<any[]>([])
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

    return (
        <div>
            <h2>查詢航班</h2>

            <input value={from} onChange={e => setFrom(e.target.value)} />
            <input value={to} onChange={e => setTo(e.target.value)} />
            <input value={depart} onChange={e => setDepart(e.target.value)} />
            <input value={ret} onChange={e => setRet(e.target.value)} />

            <button onClick={handleSearch} disabled={loading}>
                {loading ? "查詢中..." : "查詢"}
            </button>

            <ul>
                {result.map((f, i) => (
                    <li key={i}>
                        {f.flight_number} - {f.price}
                    </li>
                ))}
            </ul>
        </div>
    )
}
