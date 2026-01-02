import { useState, type CSSProperties } from "react"
import { useNavigate } from "react-router-dom"
import { login } from "../api/auth"
import { setToken } from "../utils/token"
import { AxiosError } from "axios"
import { type ApiError } from "../types/common"
import { useAuth } from "../hooks/useAuth"


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

    return (
        <div style= { styles.container } >
        <form onSubmit={ handleLogin } style = { styles.card } >
            <h2>Flight Ticket Tracker </h2>

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

        { error && <p style={ styles.error }> { error } </p>
}

<button disabled={ loading }>
    { loading? "登入中...": "登入" }
    </button>
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
    error: {
        color: "red",
        fontSize: 14
    }
}
