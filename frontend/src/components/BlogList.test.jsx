import { render, screen } from '@testing-library/react'
import BlogList from './BlogList'
import { renderWithProviders } from './test-utils'

describe('<BlogList />', () => {
  test('renders blogs sorted by likes (descending)', () => {
    const blogs = [
      { id: '1', title: 'Least liked', author: 'A', likes: 1, comments: [] },
      { id: '2', title: 'Most liked', author: 'B', likes: 50, comments: [] },
      { id: '3', title: 'Medium liked', author: 'C', likes: 10, comments: [] },
    ]

    const { container } = renderWithProviders(<BlogList blogs={blogs} />)

    expect(screen.getByText('Blogs')).toBeInTheDocument()

    const titles = container.querySelectorAll('a')

    expect(titles).toHaveLength(3)

    expect(titles[0]).toHaveTextContent('Most liked')
    expect(titles[1]).toHaveTextContent('Medium liked')
    expect(titles[2]).toHaveTextContent('Least liked')
  })
})
