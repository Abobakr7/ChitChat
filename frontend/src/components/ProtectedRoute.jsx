import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

// eslint-disable-next-line react/prop-types
export default function ProtectedRoute({ isProtected }) {
    const { currentUser } = useAuth();
    const location = useLocation();

    if (!isProtected) {
        return currentUser ? (
            <Navigate to="/chat" replace />
        ) : (
            <Outlet />
        );
    }

    return currentUser ? (
        <Outlet />
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    );
}
