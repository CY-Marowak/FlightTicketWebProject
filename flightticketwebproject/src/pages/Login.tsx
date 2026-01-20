import { useState, type CSSProperties } from "react"
import { useNavigate } from "react-router-dom"
import { login, register } from "../api/auth"
import { setToken } from "../utils/token"
import { AxiosError } from "axios"
import { type ApiError } from "../types/common"
import { useAuth } from "../hooks/useAuth"
import logo from "../assets/logo.png"


// 登入頁面

export default function Login() {
    const navigate = useNavigate()

    const { login: authLogin } = useAuth()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault()
        setError("")
        setLoading(true)

        try {
            const data = await login(username, password)

            // 儲存 JWT
            setToken(data.token)

            // ⭐ 同步更新 AuthContext
            authLogin(data.token, data.user_id)

            // 登入成功 → 導向 Dashboard
            navigate("/")
        } catch (err: unknown) {
            if (err instanceof AxiosError) {
                const axiosError = err as AxiosError<ApiError>;
                setError(axiosError.response?.data?.error ?? "伺服器錯誤");
            } else {
                setError("未知錯誤");
            }
        } finally {
            setLoading(false)
        }
    }

    async function handleRegister() {
        setError("")
        setLoading(true)

        try {
            await register(username, password)
            alert("註冊成功，請使用帳號登入")
        } catch (err: unknown) {
            if (err instanceof AxiosError) {
                setError(err.response?.data?.error ?? "註冊失敗")
            } else {
                setError("未知錯誤")
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div style= { styles.container } >
            <form onSubmit={ handleLogin } style = { styles.card } >
                <h1 style={styles.title}>Flight Ticket Tracker </h1>
                {/* Header */}
                <div style={styles.header}>
                    <img src={logo} alt="FlightTicketTracker" style={styles.logo} />
                </div>

                < input
                    placeholder = "Username"
                    value = { username }
                    onChange = { e => setUsername(e.target.value) }
                    required
                />

                <input
                    type="password"
                    placeholder = "Password"
                    value = { password }
                    onChange = { e => setPassword(e.target.value) }
                    required
                />

                { error && <p style={ styles.error }> { error } </p>}

                <div style={{ display: "flex", gap: 8 }}>
                    <button type="submit" disabled={loading}>
                        登入
                    </button>

                    <button
                        type="button"
                        disabled={loading}
                        onClick={handleRegister}
                    >
                        註冊
                    </button>
                </div>
            </form>
        </div>
  )
}

const styles: Record<string, CSSProperties> = {
    container: {
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5"
    },
    card: {
        width: 300,
        padding: 24,
        display: "flex",
        flexDirection: "column",
        gap: 12,
        backgroundColor: "#fff",
        borderRadius: 8
    },
    header: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: 16
    },
    logo: {
        width: 64,
        height: 64,
        marginBottom: 8
    },
    title: {
        fontSize: 32,
        fontWeight: 600,
        color: "black",
        margin: 0
    },
    error: {
        color: "red",
        fontSize: 14
    }
}
