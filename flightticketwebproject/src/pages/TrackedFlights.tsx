import { useEffect, useState } from "react"
import { fetchTrackedFlights, deleteTrackedFlight, fetchPriceHistory } from "../api/flights"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { TrackedFlight, FlightPrice } from "../types/flight"; // 確保你有這個類型
import "../styles/table.css"

export default function TrackedFlights() {
    const [flights, setFlights] = useState<TrackedFlight[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    // 圖表相關狀態
    const [historyData, setHistoryData] = useState<FlightPrice[] | null>(null)
    const [selectedFlight, setSelectedFlight] = useState<string>("")
    const [isChartLoading, setIsChartLoading] = useState(false)

    useEffect(() => {
        loadFlights();
    }, [])

    async function loadFlights() {
        try {
            setLoading(true)
            setError(null)
            const data = await fetchTrackedFlights()
            setFlights(data)
        } catch (err) {
            setError(err instanceof Error ? err.message : "載入失敗")
        } finally {
            setLoading(false)
        }
    }

    async function handleShowHistory(id: number, flightNo: string) {
        try {
            setIsChartLoading(true)
            const data: FlightPrice[] = await fetchPriceHistory(id);

            const formatted = data.map((d) => ({
                ...d,
                displayTime: new Date(d.time).toLocaleString("zh-TW", {
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit"
                })
            }));

            setHistoryData(formatted);
            setSelectedFlight(flightNo);
        } catch (err) {
            alert("目前沒有歷史紀錄");
            console.error(err);
        } finally {
            setIsChartLoading(false);
        }
    }

    async function handleDelete(id: number) {
        if (!window.confirm("確定要刪除嗎？")) return;
        try {
            await deleteTrackedFlight(id);
            setFlights(prev => prev.filter(f => f.id !== id));
        } catch (err) {
            alert("刪除失敗");
        }
    }

    // 處理 Loading 畫面
    if (loading) return <div className="container"><p>載入航班中...</p></div>;
    // 處理 Error 畫面
    if (error) return <div className="container"><p style={{ color: "red" }}>{error}</p></div>;

    return (
        <div className="container">
            <h2>我的航班</h2>

            <table className="app-table">
                <thead>
                    <tr>
                        <th>航空公司</th>
                        <th>航班</th>
                        <th>出發時間</th>
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
                            <td>NT$ {f.price.toLocaleString()}</td>
                            <td>
                                <div className="app-table-actions">
                                    <button
                                        className="app-btn"
                                        onClick={() => handleShowHistory(f.id, f.flight_number)}
                                        disabled={isChartLoading}
                                    >
                                        {isChartLoading && selectedFlight === f.flight_number ? "載入中..." : "趨勢"}
                                    </button>
                                    <button className="app-btn app-btn-danger" onClick={() => handleDelete(f.id)}>
                                        刪除
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* 票價歷史 Modal */}
            {historyData && (
                <div className="modal-overlay" onClick={() => setHistoryData(null)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <h3>{selectedFlight} 票價趨勢</h3>
                        <div style={{ width: '100%', height: 300, marginTop: '20px' }}>
                            <ResponsiveContainer>
                                <LineChart data={historyData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis
                                        dataKey="displayTime"
                                        tick={{ fontSize: 12 }}
                                        interval="preserveStartEnd"
                                    />
                                    <YAxis tick={{ fontSize: 12 }} />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="price"
                                        stroke="#1a73e8"
                                        strokeWidth={3}
                                        dot={{ r: 4 }}
                                        activeDot={{ r: 6 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                        <div style={{ textAlign: 'right', marginTop: '20px' }}>
                            <button className="app-btn" onClick={() => setHistoryData(null)}>關閉</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
