import { Box } from '@mui/material'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'

const DashboardLayout = () => {
    return (
        <Box>
            <Navbar />
            <Sidebar />
            <Outlet />
        </Box>
    )
}

export default DashboardLayout