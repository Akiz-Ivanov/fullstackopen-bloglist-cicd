import ReactDOM from 'react-dom/client'
import App from './App'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { useEffect, useState } from 'react'

const typography = {
  fontFamily: 'Inter, Arial, sans-serif',
}

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#ff8f8e',
    },
    secondary: {
      main: '#6366f1',
    },
    background: {
      default: '#f7f5f4',
      paper: '#ffffff',
    },
  },
  typography
})

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#d06b6a',
    },
    secondary: {
      main: '#818cf8',
    },
    success: {
      main: '#94ff90',
    },
    background: {
      default: '#262624',
      paper: '#323230',
    },
  },
  typography
})

const getInitialMode = () => {
  const saved = localStorage.getItem("themeMode")
  return saved === "dark" ? "dark" : "light"
}

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    notification: notificationReducer,
    user: userReducer
  }
})

function Root() {
  const [mode, setMode] = useState(() => getInitialMode())
  const theme = mode === 'light' ? lightTheme : darkTheme
  const toggleTheme = () => setMode(prev => prev === 'light' ? 'dark' : 'light')

  useEffect(() => {
    localStorage.setItem("themeMode", mode)
  }, [mode])

  return (
    <Provider store={store}>
      <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App toggleTheme={toggleTheme} mode={mode} />
        </ThemeProvider>
      </Router>
    </Provider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<Root />)