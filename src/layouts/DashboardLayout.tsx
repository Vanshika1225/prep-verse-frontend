import { Box } from '@mui/material'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
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