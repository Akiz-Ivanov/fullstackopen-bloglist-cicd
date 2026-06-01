import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogView from './BlogView'

vi.mock('./Comments', () => {
  return {
    default: () => <div>comments component</div>
  }
})

describe('<BlogView />', () => {
  const blog = {
    id: '123',
    title: 'Testing BlogView',
    author: 'Test Author',
    url: 'https://testurl.com',
    likes: 10,
    user: { name: 'Alice' },
    comments: ['nice', 'cool']
  }

  test('renders nothing if blog is null', () => {
    const { container } = render(
      <BlogView
        blog={null}
        handleLike={vi.fn()}
        handleDeleteBlog={vi.fn()}
        user={{ name: 'Alice' }}
      />
    )

    expect(container).toBeEmptyDOMElement()
  })

  test('renders blog title, author, url and likes', () => {
    render(
      <BlogView
        blog={blog}
        handleLike={vi.fn()}
        handleDeleteBlog={vi.fn()}
        user={{ name: 'Alice' }}
      />
    )

    expect(screen.getByText('Testing BlogView')).toBeInTheDocument()
    expect(screen.getByText('Test Author')).toBeInTheDocument()
    expect(screen.getByText('https://testurl.com')).toBeInTheDocument()
    expect(screen.getByText(/Likes:/)).toBeInTheDocument()
    expect(screen.getByText('10')).toBeInTheDocument()
  })

  test('clicking like calls handleLike with correct blog', async () => {
    const user = userEvent.setup()
    const handleLike = vi.fn()

    render(
      <BlogView
        blog={blog}
        handleLike={handleLike}
        handleDeleteBlog={vi.fn()}
        user={{ name: 'Alice' }}
      />
    )

    const likeButton = screen.getByRole('button', { name: /like/i })
    await user.click(likeButton)

    expect(handleLike).toHaveBeenCalledTimes(1)
    expect(handleLike).toHaveBeenCalledWith(blog)
  })

  test('shows delete button if blog belongs to logged in user', () => {
    render(
      <BlogView
        blog={blog}
        handleLike={vi.fn()}
        handleDeleteBlog={vi.fn()}
        user={{ name: 'Alice' }}
      />
    )

    expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument()
  })

  test('does NOT show delete button if blog belongs to different user', () => {
    render(
      <BlogView
        blog={blog}
        handleLike={vi.fn()}
        handleDeleteBlog={vi.fn()}
        user={{ name: 'Bob' }}
      />
    )

    expect(screen.queryByRole('button', { name: /delete/i })).toBeNull()
  })

  test('clicking delete calls handleDeleteBlog with blog id', async () => {
    const user = userEvent.setup()
    const handleDeleteBlog = vi.fn()

    render(
      <BlogView
        blog={blog}
        handleLike={vi.fn()}
        handleDeleteBlog={handleDeleteBlog}
        user={{ name: 'Alice' }}
      />
    )

    const deleteButton = screen.getByRole('button', { name: /delete/i })
    await user.click(deleteButton)

    expect(handleDeleteBlog).toHaveBeenCalledTimes(1)
    expect(handleDeleteBlog).toHaveBeenCalledWith('123')
  })
})
