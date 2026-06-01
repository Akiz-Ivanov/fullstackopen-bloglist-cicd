import reducer, {
  removeNotification,
  setNotification,
  showNotification,
} from './notificationReducer'

describe('notificationReducer', () => {
  test('returns initial state when called with undefined state', () => {
    const action = { type: 'WRONG_ACTION' }
    const state = reducer(undefined, action)
    expect(state).toBe('')
  })

  test('showNotification correctly updates the message', () => {
    const action = showNotification('Test notification')
    const state = reducer('', action)
    expect(state).toBe('Test notification')
  })

  test('removeNotification correctly deletes the message', () => {
    const action = removeNotification()
    const state = reducer('Test notification', action)
    expect(state).toBe('')
  })

  test('setNotification dispatches show and remove with timeout', () => {
    vi.useFakeTimers()
    const dispatch = vi.fn()

    setNotification('Test notification', 2)(dispatch)
    expect(dispatch).toHaveBeenCalledWith(showNotification('Test notification'))

    vi.advanceTimersByTime(2000)
    expect(dispatch).toHaveBeenCalledWith(removeNotification())

    vi.useRealTimers()
  })
})
