import { useAuth } from "../hooks/useAuth"

export default function Dashboard() {
    const { token, userId, logout } = useAuth()

    return (
        <div style={{ padding: 24 }}>
            <h1>📊 Dashboard</h1>

            <p>
                <strong>登入狀態：</strong> 已登入
            </p>

            <p>
                <strong>User ID：</strong> {userId}
            </p>

            <div style={{ marginTop: 24 }}>
                <button onClick={logout}>登出</button>
            </div>
        </div>
    )
}
