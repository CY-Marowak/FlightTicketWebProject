import { useState } from "react"
import axios from 'axios'
import type { Flight } from "../types/flight"
import { searchFlights} from "../api/flights"
import { addTrackedFlight } from "../api/flights"
import type { FlightResult } from "../types/flight"
import "../styles/table.css"

const COMMON_AIRPORTS = [
    { code: "TPE", name: "桃園" },
    { code: "NRT", name: "成田" },
    { code: "HND", name: "羽田" },
    { code: "OKA", name: "沖繩" },
    { code: "PUS", name: "釜山" },
    { code: "HKG", name: "香港" },
    { code: "LAX", name: "洛杉磯" },
];

/*
    查詢航班頁面
*/

export default function Flights() {
    const [from, setFrom] = useState("TPE")
    const [to, setTo] = useState("OKA")

    const today = new Date().toISOString().split('T')[0];
    const [depart, setDepart] = useState(today)
    const [ret, setRet] = useState("") // 回程預設空白代表未選
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
        }
        catch (e) {
            let errorMsg = "網路或伺服器錯誤";

            // 檢查 e 是否為 Axios 錯誤
            if (axios.isAxiosError(e)) {
                errorMsg = e.response?.data?.error || errorMsg;
            } else if (e instanceof Error) {
                errorMsg = e.message;
            }

            alert(`加入追蹤失敗：${errorMsg}`);
        }
    }


    return (
        <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>查詢航班</h2>
                {/* 加入機場代碼查詢連結 */}
                <a
                    href="https://www.como.com.tw/html_information/airportcode.htm"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#007bff', fontSize: '14px', textDecoration: 'none' }}
                >
                    ✈️ 機場名稱對照表
                </a>
            </div>

            <table className="app-table">
                <thead>
                    <tr>
                        <th>出發地</th>
                        <th>目的地</th>
                        <th>出發日期</th>
                        <th>回程日期(選填)</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style={{ verticalAlign: 'top' }}>
                            <input
                                className="app-input"
                                value={from}
                                onChange={e => setFrom(e.target.value.toUpperCase())}
                                placeholder="例如: TPE"
                            />
                            {/* 出發地常用標籤 */}
                            <div className="web-quick-select">
                                {COMMON_AIRPORTS.map(a => (
                                    <span key={a.code} onClick={() => setFrom(a.code)} className="web-badge">
                                        {a.code}
                                    </span>
                                ))}
                            </div>
                        </td>
                        <td style={{ verticalAlign: 'top' }}>
                            <input
                                className="app-input"
                                value={to}
                                onChange={e => setTo(e.target.value.toUpperCase())}
                                placeholder="例如: OKA"
                            />
                            {/* 目的地常用標籤 */}
                            <div className="web-quick-select">
                                {COMMON_AIRPORTS.map(a => (
                                    <span key={a.code} onClick={() => setTo(a.code)} className="web-badge">
                                        {a.code}
                                    </span>
                                ))}
                            </div>
                        </td>
                        <td style={{ verticalAlign: 'top' }}>
                            <input
                                type="date"
                                className="app-input-date"
                                min={today}
                                value={depart}
                                onChange={e => setDepart(e.target.value)}
                            />
                        </td>
                        <td style={{ verticalAlign: 'top' }}>
                            <input
                                type="date"
                                className="app-input-date"
                                min={depart}
                                value={ret}
                                onChange={e => setRet(e.target.value)}
                            />
                        </td>
                        <td style={{ verticalAlign: 'top' }}>
                            <button
                                className="app-btn"
                                onClick={handleSearch}
                                disabled={loading}
                            >
                                {loading ? "查詢中..." : "查詢"}
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <br></br>
            <table className="app-table">
                <thead>
                    <tr>
                        <th>班機</th>
                        <th>時間</th>
                        <th>價格</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    {result.map((f, i) => (
                        <tr key={i}>
                            <td>{f.flight_number}</td>
                            <td>{f.depart_time} - {f.arrival_time}</td>
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


