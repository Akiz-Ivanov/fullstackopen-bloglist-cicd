const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const { title, author, url, likes } = request.body

  const user = request.user

  const blog = new Blog({
    title: title,
    author: author,
    url: url,
    likes: likes ?? 0,
    user: user._id,
  })

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog)
  await user.save()

  const populatedBlog = await savedBlog.populate('user', {
    username: 1,
    name: 1,
  })

  response.status(201).json(populatedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const user = request.user

  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    return response.status(204).end()
  }

  if (blog.user.toString() !== user._id.toString()) {
    return response
      .status(403)
      .json({ error: 'unauthorized: only the creator can delete this blog' })
  }

  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const { likes } = request.body

  const blogToUpdate = await Blog.findById(request.params.id)

  if (!blogToUpdate) {
    return response.status(404).end()
  }

  blogToUpdate.likes = likes

  const updatedBlog = await blogToUpdate.save()

  const populatedBlog = await updatedBlog.populate('user', {
    username: 1,
    name: 1,
  })

  response.json(populatedBlog)
})

blogsRouter.post('/:id/comments', async (request, response) => {
  const { comment } = request.body

  if (!comment || comment.trim() === '') {
    return response.status(400).json({ error: 'comment is required' })
  }

  const trimmedComment = comment.trim()

  const blogToUpdate = await Blog.findById(request.params.id)

  if (!blogToUpdate) {
    return response.status(404).json({ error: 'blog not found' })
  }

  blogToUpdate.comments = blogToUpdate.comments.concat(trimmedComment)
  const updatedBlog = await blogToUpdate.save()

  const populatedBlog = await updatedBlog.populate('user', {
    username: 1,
    name: 1,
  })

  response.status(201).json(populatedBlog)
})

module.exports = blogsRouter
