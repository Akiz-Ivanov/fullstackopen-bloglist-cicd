import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LoginForm from './LoginForm'

describe('<LoginForm />', () => {
  test('calls input change handlers when typing', async () => {
    const handleUsernameChange = vi.fn()
    const handlePasswordChange = vi.fn()
    const handleSubmit = vi.fn()

    const user = userEvent.setup()

    render(
      <LoginForm
        username=""
        password=""
        handleUsernameChange={handleUsernameChange}
        handlePasswordChange={handlePasswordChange}
        handleSubmit={handleSubmit}
      />
    )

    const usernameInput = screen.getByLabelText(/username/i)
    const passwordInput = screen.getByLabelText(/password/i)

    await user.type(usernameInput, 'alice123')
    await user.type(passwordInput, 'supersecret')

    expect(handleUsernameChange).toHaveBeenCalled()
    expect(handlePasswordChange).toHaveBeenCalled()
  })

  test('calls handleSubmit when submitted', async () => {
    const handleUsernameChange = vi.fn()
    const handlePasswordChange = vi.fn()
    const handleSubmit = vi.fn()

    const user = userEvent.setup()

    render(
      <LoginForm
        username="alice123"
        password="supersecret"
        handleUsernameChange={handleUsernameChange}
        handlePasswordChange={handlePasswordChange}
        handleSubmit={handleSubmit}
      />
    )

    const submitButton = screen.getByRole('button', { name: /Log in/i })
    await user.click(submitButton)

    expect(handleSubmit).toHaveBeenCalledTimes(1)
  })
})
