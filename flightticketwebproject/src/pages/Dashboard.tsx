import { Link, Outlet, useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { clearToken } from "../utils/token"

/*
    整體頁面
*/

export default function Dashboard() {
    const navigate = useNavigate()
    const { logout } = useAuth()
    
    function handleLogout() {
        clearToken()
        logout()
        navigate("/login")
    }


    return (
        <div style={styles.container}>
            {/* 頂部：標題與登出按鈕 */}
            <header style={styles.topBar}>
                <h1 style={{ margin: 0 }}>Flight Ticket Tracker</h1>
                <button onClick={handleLogout} style={styles.logoutBtn}>
                    登出
                </button>
            </header>

            {/* 下方：導覽選單 */}
            <nav style={styles.navBar}>
                <Link to="flights">查詢航班</Link>
                <Link to="tracked">我的航班</Link>
                <Link to="notifications">通知</Link>
            </nav>

            <hr style={styles.divider} />

            <Outlet />
        </div>
    )
}

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        padding: "20px",
        display: "flex",
        flexDirection: "column", // 讓內容垂直排列
    },
    topBar: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "16px"
    },
    logoutBtn: {
        marginLeft: "20px", // 讓按鈕往右移，不貼著標題
        color: "red",       // 文字變紅色
        cursor: "pointer",
        padding: "5px 10px"
    },
    navBar: {
        display: "flex",
        gap: "16px",
        marginBottom: "20px"
    },
    divider: {
        width: "100%",
        border: "0.5px solid #444",
        marginBottom: "20px"
    }
}
