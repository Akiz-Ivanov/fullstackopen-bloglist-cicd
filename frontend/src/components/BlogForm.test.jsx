import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('<BlogForm /> calls createBlog with correct details', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  const titleInput = screen.getByLabelText(/title/i)
  const authorInput = screen.getByLabelText(/author/i)
  const urlInput = screen.getByLabelText(/url/i)

  const button = screen.getByRole('button', { name: /create/i })

  await user.type(titleInput, 'How to test React components')
  await user.type(authorInput, 'Test Master')
  await user.type(urlInput, 'https://blog.test.com')
  await user.click(button)

  expect(createBlog).toHaveBeenCalledTimes(1)

  expect(createBlog).toHaveBeenCalledWith({
    title: 'How to test React components',
    author: 'Test Master',
    url: 'https://blog.test.com'
  })
})
