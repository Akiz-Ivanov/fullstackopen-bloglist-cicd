import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Comments from './Comments'
import { commentBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'

vi.mock('react-redux', async () => {
  const actual = await vi.importActual('react-redux')
  return {
    ...actual,
    useDispatch: vi.fn(),
  }
})

vi.mock('../reducers/blogReducer', () => ({
  commentBlog: vi.fn(),
}))

describe('<Comments />', () => {

  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('renders "no comments yet" text if comments list is empty', () => {
    useDispatch.mockReturnValue(vi.fn())

    render(<Comments comments={[]} blogId="123" />)

    expect(screen.getByText(/no comments yet/i)).toBeInTheDocument()
    expect(screen.getByText('0')).toBeInTheDocument()
  })

  test('renders all comments', () => {
    useDispatch.mockReturnValue(vi.fn())

    render(
      <Comments
        comments={['first comment', 'second comment']}
        blogId="123"
      />
    )

    expect(screen.getByText('first comment')).toBeInTheDocument()
    expect(screen.getByText('second comment')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
  })

  test('dispatches commentBlog action when new comment is submitted', async () => {
    const dispatchMock = vi.fn()
    useDispatch.mockReturnValue(dispatchMock)

    commentBlog.mockReturnValue({ type: 'blogs/commentBlog' })

    const user = userEvent.setup()

    render(
      <Comments
        comments={['existing comment']}
        blogId="123"
      />
    )

    const input = screen.getByLabelText(/write a comment/i)
    const button = screen.getByRole('button', { name: /add/i })

    await user.type(input, 'new comment')
    await user.click(button)

    expect(commentBlog).toHaveBeenCalledTimes(1)
    expect(commentBlog).toHaveBeenCalledWith('123', 'new comment')

    expect(dispatchMock).toHaveBeenCalledTimes(1)
  })

  test('does not dispatch if comment is empty', async () => {
    const dispatchMock = vi.fn()
    useDispatch.mockReturnValue(dispatchMock)

    const user = userEvent.setup()

    render(
      <Comments
        comments={[]}
        blogId="123"
      />
    )

    const button = screen.getByRole('button', { name: /add/i })
    await user.click(button)

    expect(dispatchMock).not.toHaveBeenCalled()
    expect(commentBlog).not.toHaveBeenCalled()
  })
})
