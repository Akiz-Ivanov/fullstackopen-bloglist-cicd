import reducer, {
  setUser,
  loginUser,
  loginUserFromStorage,
  logoutUser,
} from './userReducer'

vi.mock('../services/login')
vi.mock('../services/blogs')
import loginService from '../services/login'
import blogService from '../services/blogs'
import { test } from 'vitest'

const mockUser = {
  id: 'u1',
  name: 'Test User',
  username: 'testuser',
  token: 'fake-token-123',
}

describe('userReducer', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
  })

  test('returns initial state when called with undefined state', () => {
    const action = { type: 'WRONG_ACTION' }
    const state = reducer(undefined, action)
    expect(state).toBe(null)
  })

  test('setUser correctly updates the state', () => {
    const state = reducer(null, setUser(mockUser))
    expect(state).toEqual(mockUser)
  })

  test('login correctly updates the state and sets token', async () => {
    loginService.login.mockResolvedValue(mockUser)
    const dispatch = vi.fn()

    await loginUser('testuser', 'password')(dispatch)

    expect(dispatch).toHaveBeenCalledWith(setUser(mockUser))
    expect(blogService.setToken).toHaveBeenCalledWith(mockUser.token)
    expect(localStorage.getItem('loggedUser')).toBe(JSON.stringify(mockUser))
  })

  test('logout correctly updates the state and removes token', () => {
    const dispatch = vi.fn()

    logoutUser()(dispatch)

    expect(dispatch).toHaveBeenCalledWith(setUser(null))
    expect(blogService.setToken).toHaveBeenCalledWith(null)
    expect(localStorage.getItem('loggedUser')).toBe(null)
  })

  test('loginUserFromStorage correctly updates the state and sets token', () => {
    localStorage.setItem('loggedUser', JSON.stringify(mockUser))
    const dispatch = vi.fn()

    loginUserFromStorage()(dispatch)

    expect(dispatch).toHaveBeenCalledWith(setUser(mockUser))
    expect(blogService.setToken).toHaveBeenCalledWith(mockUser.token)
  })

  test('loginUserFromStorage does not update the state if no user in local storage', () => {
    const dispatch = vi.fn()

    loginUserFromStorage()(dispatch)

    expect(dispatch).not.toHaveBeenCalled()
  })

  test('loginUserFromStorage does not update the state if user has no token', () => {
    const userWithoutToken = {
      id: 'u1',
      name: 'Test User',
      username: 'testuser',
    }
    localStorage.setItem('loggedUser', JSON.stringify(userWithoutToken))
    const dispatch = vi.fn()

    loginUserFromStorage()(dispatch)

    expect(dispatch).not.toHaveBeenCalled()
  })
})
