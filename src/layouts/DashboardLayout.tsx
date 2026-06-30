import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'

import Sidebar from './Sidebar'


const DashboardLayout = () => {
    return (
        <Box>
            <Sidebar />
            <Outlet />
        </Box>
    )
}

export default DashboardLayout