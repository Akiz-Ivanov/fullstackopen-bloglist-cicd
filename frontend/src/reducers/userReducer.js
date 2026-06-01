import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import loginService from '../services/login'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
  },
})

export const { setUser } = userSlice.actions

export const loginUser = (username, password) => {
  return async (dispatch) => {
    const user = await loginService.login({
      username,
      password,
    })

    window.localStorage.setItem('loggedUser', JSON.stringify(user))
    blogService.setToken(user.token)

    dispatch(setUser(user))
  }
}

export const loginUserFromStorage = () => {
  return (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')

    if (!loggedUserJSON) return

    const user = JSON.parse(loggedUserJSON)

    if (!user || !user.token) return

    blogService.setToken(user.token)
    dispatch(setUser(user))
  }
}

export const logoutUser = () => {
  return (dispatch) => {
    window.localStorage.removeItem('loggedUser')
    blogService.setToken(null)
    dispatch(setUser(null))
  }
}

export default userSlice.reducer
