import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import User from './User'

describe('<User />', () => {
  test('renders nothing if user is null', () => {
    const { container } = render(
      <MemoryRouter>
        <User user={null} />
      </MemoryRouter>
    )

    expect(container).toBeEmptyDOMElement()
  })

  test('renders user name and number of blogs', () => {
    const user = {
      id: 'u1',
      name: 'Test User',
      blogs: [
        { id: 'b1', title: 'First blog' },
        { id: 'b2', title: 'Second blog' },
      ],
    }

    render(
      <MemoryRouter>
        <User user={user} />
      </MemoryRouter>
    )

    expect(screen.getByText('Test User')).toBeInTheDocument()
    expect(screen.getByText('Blogs created: 2')).toBeInTheDocument()
    expect(screen.getByText('First blog')).toBeInTheDocument()
    expect(screen.getByText('Second blog')).toBeInTheDocument()
  })

  test('renders "No blogs added yet." if user has no blogs', () => {
    const user = {
      id: 'u1',
      name: 'Empty User',
      blogs: [],
    }

    render(
      <MemoryRouter>
        <User user={user} />
      </MemoryRouter>
    )

    expect(screen.getByText('Empty User')).toBeInTheDocument()
    expect(screen.getByText(/no blogs added yet/i)).toBeInTheDocument()
    expect(screen.getByText('Blogs created: 0')).toBeInTheDocument()
  })

  test('renders blog links with correct href', () => {
    const user = {
      id: 'u1',
      name: 'Link User',
      blogs: [{ id: 'b123', title: 'Some Blog' }],
    }

    render(
      <MemoryRouter>
        <User user={user} />
      </MemoryRouter>
    )

    const link = screen.getByRole('link', { name: 'Some Blog' })
    expect(link).toHaveAttribute('href', '/blogs/b123')
  })
})
