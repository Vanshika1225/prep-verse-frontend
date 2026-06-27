import { ThemeProvider } from '@mui/material'
import './App.css'
import Theme from './theme/theme'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/Rroutes'


function App() {
  return (
    <>
      <ThemeProvider theme={Theme}>
          <RouterProvider router={router}/>
      </ThemeProvider>
    </>
  )
}

export default App
