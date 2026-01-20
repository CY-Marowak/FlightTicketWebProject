import { useEffect, useState } from "react"
import { fetchNotifications } from "../api/notifications"
import type { Notification } from "../types/notification"
import "../styles/table.css"

export default function Notifications() {
    const [notifications, setNotifications] = useState<Notification[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    // 載入通知（共用給第一次 + 輪詢）
    async function loadNotifications() {
        try {
            setLoading(true)
            setError(null)

            const data = await fetchNotifications()
            setNotifications(data)
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message)
            } else {
                setError("載入通知失敗")
            }
        } finally {
            setLoading(false)
        }
    }

    // 第一次載入 + 輪詢
    useEffect(() => {
        loadNotifications()

        const timer = setInterval(loadNotifications, 30_000) // 30 秒輪詢
        return () => clearInterval(timer)
    }, [])

    // ---------- UI 狀態分流 ----------

    if (loading && notifications.length === 0) {
        return <p>通知載入中...</p>
    }

    if (error) {
        return <p style={{ color: "red" }}>{error}</p>
    }

    if (notifications.length === 0) {
        return <p>目前沒有通知紀錄</p>
    }

    // ---------- 正式畫面 ----------

    return (
        <div>
            <h2>通知紀錄</h2>

            <table className="app-table">
                <thead>
                    <tr>
                        <th>航班 ID</th>
                        <th>價格</th>
                        <th>通知內容</th>
                        <th>時間</th>
                    </tr>
                </thead>

                <tbody>
                    {notifications.map(n => (
                        <tr key={n.id}>
                            <td>{n.flight_id}</td>
                            <td>NT$ {n.price.toLocaleString()}</td>
                            <td>{n.message}</td>
                            <td>{n.time}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
