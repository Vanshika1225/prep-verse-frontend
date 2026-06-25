import { ThemeProvider } from '@mui/material'
import './App.css'
import Theme from './theme/theme'


function App() {
  return (
    <>
      <ThemeProvider theme={Theme}></ThemeProvider>
    </>
  )
}

export default App
