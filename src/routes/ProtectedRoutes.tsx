import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router';

const ProtectedRoutes = () => {
    const isAuthenticated = useSelector((state: any) => state.user.isAuthenticated);
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
}

export default ProtectedRoutes