import { render, screen } from '@testing-library/react'
import Notification from './Notification'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from '../reducers/notificationReducer'

describe('<Notification />', () => {

  const renderWithStore = (preloadedState) => {
    const store = configureStore({
      reducer: {
        notification: notificationReducer,
      },
      preloadedState,
    })

    return render(
      <Provider store={store}>
        <Notification />
      </Provider>
    )
  }

  test('renders nothing when message is null', () => {
    const { container } = renderWithStore({ notification: null })
    expect(container).toBeEmptyDOMElement()
  })

  test('renders the message when given', () => {
    renderWithStore({ notification: 'Test notification' })
    expect(screen.getByRole('alert')).toHaveTextContent('Test notification')

  })

})