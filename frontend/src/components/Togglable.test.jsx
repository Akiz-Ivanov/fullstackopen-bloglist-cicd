import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Togglable from './Togglable'
import { createRef } from 'react'
import { act } from 'react'

describe('<Togglable />', () => {
  test('renders only show button at first', () => {
    render(
      <Togglable buttonLabel="show">
        <div>togglable content</div>
      </Togglable>
    )

    expect(screen.getByRole('button', { name: /show/i })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /cancel/i })).toBeNull()
  })

  test('shows content and cancel button after clicking show', async () => {
    const user = userEvent.setup()

    render(
      <Togglable buttonLabel="show">
        <div>togglable content</div>
      </Togglable>
    )

    await user.click(screen.getByRole('button', { name: /show/i }))

    expect(screen.getByText('togglable content')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument()
  })

  test('hides cancel button after clicking cancel', async () => {
    const user = userEvent.setup()

    render(
      <Togglable buttonLabel="show">
        <div>togglable content</div>
      </Togglable>
    )

    await user.click(screen.getByRole('button', { name: /show/i }))
    await user.click(screen.getByRole('button', { name: /cancel/i }))

    //* Wait for the collapse animation to complete
    await waitFor(() => {
      expect(screen.queryByRole('button', { name: /cancel/i })).toBeNull()
    })
  })

  test('toggleVisibility works via ref', async () => {
    const ref = createRef()

    render(
      <Togglable buttonLabel="show" ref={ref}>
        <div>togglable content</div>
      </Togglable>
    )

    expect(screen.queryByRole('button', { name: /cancel/i })).toBeNull()

    act(() => {
      ref.current.toggleVisibility()
    })

    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument()

    act(() => {
      ref.current.toggleVisibility()
    })

    //* Wait for the collapse animation to complete
    await waitFor(() => {
      expect(screen.queryByRole('button', { name: /cancel/i })).toBeNull()
    })
  })
})