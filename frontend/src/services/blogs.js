import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createBlog = async (newBlogObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newBlogObject, config)
  return response.data
}

const addLike = async (updatedBlog) => {
  const config = {
    headers: { Authorization: token },
  }

  const url = `${baseUrl}/${updatedBlog.id}`

  const response = await axios.put(
    url,
    {
      likes: updatedBlog.likes,
    },
    config
  )
  return response.data
}

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  }

  const url = `${baseUrl}/${id}`

  await axios.delete(url, config)
}

const addComment = async (blogId, comment) => {
  const response = await axios.post(`${baseUrl}/${blogId}/comments`, {
    comment,
  })
  return response.data
}

export default {
  getAll,
  createBlog,
  setToken,
  addLike,
  deleteBlog,
  addComment,
}
