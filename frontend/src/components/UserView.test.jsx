import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import UsersView from './UsersView'

describe('<UsersView />', () => {
  test('renders "No users." if users array is empty', () => {
    render(
      <MemoryRouter>
        <UsersView users={[]} />
      </MemoryRouter>
    )

    expect(screen.getByText('Users')).toBeInTheDocument()
    expect(screen.getByText('No users.')).toBeInTheDocument()
  })

  test('renders a table of users with blog counts', () => {
    const users = [
      {
        id: 'u1',
        name: 'Alice',
        blogs: [{ id: 'b1', title: 'Blog1' }],
      },
      {
        id: 'u2',
        name: 'Bob',
        blogs: [
          { id: 'b2', title: 'Blog2' },
          { id: 'b3', title: 'Blog3' },
        ],
      },
    ]

    render(
      <MemoryRouter>
        <UsersView users={users} />
      </MemoryRouter>
    )

    expect(screen.getByText('Alice')).toBeInTheDocument()
    expect(screen.getByText('Bob')).toBeInTheDocument()

    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
  })

  test('renders user name as a link with correct href', () => {
    const users = [
      {
        id: 'u1',
        name: 'Alice',
        blogs: [],
      },
    ]

    render(
      <MemoryRouter>
        <UsersView users={users} />
      </MemoryRouter>
    )

    const link = screen.getByRole('link', { name: 'Alice' })
    expect(link).toHaveAttribute('href', '/users/u1')
  })
})
