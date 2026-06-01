import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Blog from './Blog'

describe('<Blog />', () => {
  const blog = {
    id: '123',
    title: 'How to test React components',
    author: 'Test Master',
    likes: 5,
    comments: ['nice', 'cool']
  }

  test('renders title and author', () => {
    render(
      <MemoryRouter>
        <Blog blog={blog} />
      </MemoryRouter>
    )

    expect(screen.getByText('How to test React components')).toBeInTheDocument()
    expect(screen.getByText('Test Master')).toBeInTheDocument()
  })

  test('renders likes and comment count', () => {
    render(
      <MemoryRouter>
        <Blog blog={blog} />
      </MemoryRouter>
    )

    expect(screen.getByText('5 likes')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
  })

  test('title link points to correct blog page', () => {
    render(
      <MemoryRouter>
        <Blog blog={blog} />
      </MemoryRouter>
    )

    const link = screen.getByRole('link', { name: 'How to test React components' })

    expect(link).toHaveAttribute('href', '/blogs/123')
  })

  test('comment count is 0 if comments missing', () => {
    const blogWithoutComments = {
      id: '555',
      title: 'No comments blog',
      author: 'Silent Guy',
      likes: 1
    }

    render(
      <MemoryRouter>
        <Blog blog={blogWithoutComments} />
      </MemoryRouter>
    )

    expect(screen.getByText('0')).toBeInTheDocument()
  })
})
