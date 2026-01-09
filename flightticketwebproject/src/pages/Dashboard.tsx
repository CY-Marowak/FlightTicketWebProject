import { Link, Outlet } from "react-router-dom"

export default function Dashboard() {
    return (
        <div style={{ padding: 24 }}>
            <h1>Flight Ticket Tracker</h1>

            <nav style={{ display: "flex", gap: 16, marginBottom: 24 }}>
                <Link to="flights">查詢航班</Link>
                <Link to="tracked">我的航班</Link>
                <Link to="notifications">通知</Link>
            </nav>

            <Outlet />
        </div>
    )
}
