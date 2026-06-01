import reducer, {
  addLike,
  appendBlog,
  createNewBlog,
  deleteBlog,
  initializeBlogs,
  likeBlog,
  removeBlog,
  setBlogs,
} from './blogReducer'
import blogService from '../services/blogs'
vi.mock('../services/blogs')

const blogs = [
  {
    id: '1',
    title: 'Test Blog 1',
    author: 'Author 1',
    url: 'https://blog1.com',
    likes: 5,
    user: { id: 'u1', name: 'User 1' },
  },
  {
    id: '2',
    title: 'Test Blog 2',
    author: 'Author 2',
    url: 'https://blog2.com',
    likes: 10,
    user: { id: 'u2', name: 'User 2' },
  },
]

describe('blogReducer', () => {
  test('returns initial state when called with undefined state', () => {
    const action = { type: 'WRONG_ACTION' }
    const state = reducer(undefined, action)
    expect(state).toStrictEqual([])
  })

  test('setBlogs correctly updates the state', () => {
    const state = reducer([], setBlogs(blogs))
    expect(state).toEqual(blogs)
  })

  test('appendBlog adds a new blog to the state', () => {
    const newBlog = {
      id: '3',
      title: 'New Blog',
      author: 'Author 3',
      url: 'https://blog3.com',
      likes: 0,
      user: { id: 'u3', name: 'User 3' },
    }
    const state = reducer(blogs, appendBlog(newBlog))
    expect(state).toHaveLength(3)
    expect(state).toContainEqual(newBlog)
  })

  test('addLike updates the correct blog', () => {
    const updatedBlog = { ...blogs[0], likes: 6 }
    const state = reducer(blogs, addLike(updatedBlog))
    expect(state[0].likes).toBe(6)
    expect(state[1].likes).toBe(10) //* other blog unchanged
  })

  test('removeBlog removes the correct blog', () => {
    const state = reducer(blogs, removeBlog('1'))
    expect(state).toHaveLength(1)
    expect(state[0].id).toBe('2')
  })

  test('initializeBlogs correctly updates the state', async () => {
    blogService.getAll.mockResolvedValue(blogs)
    const dispatch = vi.fn()

    await initializeBlogs()(dispatch)

    expect(dispatch).toHaveBeenCalledWith(setBlogs(blogs))
  })

  test('createNewBlog dispatches appendBlog with the returned blog', async () => {
    const newBlog = {
      id: '3',
      title: 'New Blog',
      author: 'Author 3',
      url: 'https://blog3.com',
      likes: 0,
      user: { id: 'u3', name: 'User 3' },
    }
    blogService.createBlog.mockResolvedValue(newBlog)
    const dispatch = vi.fn()

    await createNewBlog(newBlog)(dispatch)

    expect(dispatch).toHaveBeenCalledWith(appendBlog(newBlog))
  })

  test('likeBlog dispatches addLike with updated blog', async () => {
    const updatedBlog = { ...blogs[0], likes: 6 }
    blogService.addLike.mockResolvedValue(updatedBlog)
    const dispatch = vi.fn()

    await likeBlog(blogs[0])(dispatch)

    expect(dispatch).toHaveBeenCalledWith(addLike(updatedBlog))
  })

  test('deleteBlog dispatches removeBlog with correct id', async () => {
    blogService.deleteBlog.mockResolvedValue()
    const dispatch = vi.fn()

    await deleteBlog('1')(dispatch)

    expect(dispatch).toHaveBeenCalledWith(removeBlog('1'))
  })
})
