import { Routes, Route, Navigate } from "react-router-dom"
import { type ReactNode } from "react"
import { useAuth } from "../hooks/useAuth"

import Login from "../pages/Login"
import Dashboard from "../pages/Dashboard"
import Flights from "../pages/Flights"
import TrackedFlights from "../pages/TrackedFlights"
import Notifications from "../pages/Notifications"

interface PrivateRouteProps {
    children: ReactNode
}

function PrivateRoute({ children }: PrivateRouteProps) {
    const { isAuthenticated } = useAuth()

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    return <>{children}</>
}

export default function AppRoutes() {
    return (
        <Routes>
            {/* 公開頁面 */}
            <Route path="/login" element={<Login />} />

            {/* 受保護的 Dashboard */}
            <Route
                path="/"
                element={
                    <PrivateRoute>
                        <Dashboard />
                    </PrivateRoute>
                }
            >
                {/* 🔽 Dashboard 的子頁面 */}
                <Route path="flights" element={<Flights />} />
                <Route path="tracked" element={<TrackedFlights />} />
                <Route path="notifications" element={<Notifications />} />
            </Route>
        </Routes>
    )
}
