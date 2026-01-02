import { Routes, Route, Navigate } from "react-router-dom"
import { type ReactNode } from "react"
import { useAuth } from "../hooks/useAuth"
import Login from "../pages/Login"
import Dashboard from "../pages/Dashboard.tsx"

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
//export default PrivateRoute
export default function AppRoutes() {
    return (
        <Routes>
        <Route path= "/login" element = {< Login />} />
            < Route
path = "/"
element = {
          < PrivateRoute >
    <Dashboard />
    </PrivateRoute>
        }
      />
    </Routes>
  )
}
