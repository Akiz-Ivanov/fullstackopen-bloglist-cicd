import { useState, useEffect, useRef } from 'react'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import { setNotification } from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { createNewBlog, deleteBlog, initializeBlogs, likeBlog } from './reducers/blogReducer'
import { loginUser, loginUserFromStorage, logoutUser } from './reducers/userReducer'
import UsersView from './components/UsersView'
import { Routes, Route, useMatch, useNavigate, useLocation } from 'react-router-dom'
import User from './components/User'
import userService from './services/users'
import BlogList from './components/BlogList'
import BlogView from './components/BlogView'
import Navbar from './components/NavBar'
import { Box, Container, Paper } from '@mui/material'
import Footer from './components/Footer'

const App = ({ toggleTheme, mode }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const isHomePage = location.pathname === "/"

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [users, setUsers] = useState([])

  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)

  const blogFormRef = useRef(null)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(loginUserFromStorage())
  }, [dispatch])


  useEffect(() => {

    const loadUsers = async () => {
      try {
        const users = await userService.getAll()
        setUsers(users)
      } catch (error) {
        console.log(error)
      }
    }

    loadUsers()
  }, [])

  const sendNotification = (text) => {
    dispatch(setNotification(text, 5))
  }

  const reloadUsers = async () => {
    try {
      const updatedUsers = await userService.getAll()
      setUsers(updatedUsers)
    } catch (error) {
      console.log(error)
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      await dispatch(loginUser(username, password))
      setUsername('')
      setPassword('')
      sendNotification('Successful login!')
    } catch (exception) {
      sendNotification('Wrong username or password')
    }
  }

  const handleLogout = () => {
    dispatch(logoutUser())
    sendNotification('Logged out')
  }

  const handleUsernameChange = ({ target }) => {
    setUsername(target.value)
  }

  const handlePasswordChange = ({ target }) => {
    setPassword(target.value)
  }

  const handleLike = async (blog) => {
    try {
      await dispatch(likeBlog(blog))
    } catch {
      sendNotification(`Blog '${blog.title}' was already removed from server`)
    }
  }

  const handleDeleteBlog = async (id) => {
    const confirmDelete = window.confirm('Delete blog?')
    if (!confirmDelete) return

    try {
      await dispatch(deleteBlog(id))
      sendNotification('Blog deleted successfully')
      navigate('/')
      await reloadUsers()
    } catch {
      sendNotification('Failed to delete the blog')
    }
  }

  const createBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()

    try {
      await dispatch(createNewBlog(blogObject))
      sendNotification(`a new blog ${blogObject.title} by ${blogObject.author} added`)
      await reloadUsers()
    } catch {
      sendNotification('Failed to add blog. Please check your input or try again later.')
    }
  }

  const matchUser = useMatch('/users/:id')
  const selectedUser = matchUser ? users.find(user => user.id === matchUser.params.id) : null

  const matchBlog = useMatch('/blogs/:id')
  const selectedBlog = matchBlog ? blogs.find(blog => blog.id === matchBlog.params.id) : null

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {user && (
        <Navbar
          user={user}
          handleLogout={handleLogout}
          toggleTheme={toggleTheme}
          mode={mode}
        />
      )}

      <Container maxWidth="lg" sx={{ flexGrow: 1, mt: 4 }}>
        <Notification />

        {!user && (
          <LoginForm
            handleSubmit={handleLogin}
            handleUsernameChange={handleUsernameChange}
            handlePasswordChange={handlePasswordChange}
            username={username}
            password={password}
          />
        )}

        {user && (
          <Box sx={{ p: 2, mb: 2 }}>
            {isHomePage && (
              <Togglable buttonLabel="new blog" ref={blogFormRef}>
                <BlogForm createBlog={createBlog} />
              </Togglable>
            )}

            <Routes>
              <Route
                path="/blogs/:id"
                element={
                  <BlogView
                    blog={selectedBlog}
                    handleLike={handleLike}
                    handleDeleteBlog={handleDeleteBlog}
                    user={user}
                  />
                }
              />
              <Route path="/users/:id" element={<User user={selectedUser} />} />
              <Route path="/users" element={<UsersView users={users} />} />
              <Route path="/" element={<BlogList blogs={blogs} />} />
            </Routes>
          </Box>
        )}
      </Container>

      <Footer />
    </Box>
  )
}

export default App