import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';
import type { RootState } from '../redux/store';

const ProtectedRoutes = () => {
const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
);    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
}

export default ProtectedRoutes