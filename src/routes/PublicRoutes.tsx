import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router';

const PublicRoutes = () => {
    const isAuthenticated = useSelector((state: any) => state.user.isAuthenticated);
    return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Outlet />
}

export default PublicRoutes