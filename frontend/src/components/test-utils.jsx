import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

import blogReducer from '../reducers/blogReducer'
import notificationReducer from '../reducers/notificationReducer'
import userReducer from '../reducers/userReducer'

const theme = createTheme({
  palette: { mode: "light" }
})

export const renderWithProviders = (
  ui,
  {
    preloadedState = {},
    store = configureStore({
      reducer: {
        blogs: blogReducer,
        notification: notificationReducer,
        user: userReducer
      },
      preloadedState
    }),
  } = {}
) => {
  return render(
    <Provider store={store}>
      <MemoryRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {ui}
        </ThemeProvider>
      </MemoryRouter>
    </Provider>
  )
}
