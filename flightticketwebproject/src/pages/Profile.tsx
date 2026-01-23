import { useEffect, useState } from "react"
import { fetchProfile, changePassword } from "../api/profile"
import type { UserProfile } from "../types/profile"
import { AxiosError } from "axios"
import type { ApiError } from "../types/common"


export default function Profile() {
    const [profile, setProfile] = useState<UserProfile | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [message, setMessage] = useState("")

    useEffect(() => {
        async function load() {
            try {
                setLoading(true)
                const data = await fetchProfile()
                setProfile(data)
            } catch (err) {
                setError("無法載入個人資料")
            } finally {
                setLoading(false)
            }
        }
        load()
    }, [])

    async function handleChangePassword(e: React.FormEvent) {
        e.preventDefault()
        setError("")
        setMessage("")

        try {
            const res = await changePassword({
                old_password: oldPassword,
                new_password: newPassword
            })
            setMessage(res.message)
            setOldPassword("")
            setNewPassword("")
        } catch (err: unknown) {
            if (err instanceof AxiosError) {
                const axiosError = err as AxiosError<ApiError>
                setError(axiosError.response?.data?.error ?? "修改失敗")
            } else {
                setError("修改失敗")
            }
        }
    }

    if (loading) return <p>載入中...</p>
    if (error && !profile) return <p style={{ color: "red" }}>{error}</p>

    return (
        <div style={{ maxWidth: 480 }}>
            <h2>個人資料</h2>

            {profile && (
                <table className="table">
                    <tbody>
                        <tr>
                            <th>ID</th>
                            <td>{profile.user_id}</td>
                        </tr>
                        <tr>
                            <th>帳號</th>
                            <td>{profile.username}</td>
                        </tr>
                        <tr>
                            <th>註冊時間</th>
                            
                            <td>{new Date(profile.created_at).toLocaleString("zh-TW")}</td>
                        </tr>
                    </tbody>
                </table>
            )}

            <h3 style={{ marginTop: 24 }}>修改密碼</h3>

            <form onSubmit={handleChangePassword}>
                <input
                    type="password"
                    placeholder="舊密碼"
                    value={oldPassword}
                    onChange={e => setOldPassword(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="新密碼"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    required
                />
                <button type="submit">修改密碼</button>
            </form>

            {message && <p style={{ color: "green" }}>{message}</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    )
}
