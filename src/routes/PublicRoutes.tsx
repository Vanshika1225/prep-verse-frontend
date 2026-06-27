import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';
import type { RootState } from '../redux/store';

const PublicRoutes = () => {
const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
);    return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Outlet />
}

export default PublicRoutes