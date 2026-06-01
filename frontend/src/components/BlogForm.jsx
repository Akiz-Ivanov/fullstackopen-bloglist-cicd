import { useState } from 'react'
import PropTypes from 'prop-types'
import { TextField, Button, Paper, Typography, Box } from '@mui/material'
import CreateIcon from '@mui/icons-material/Create'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title,
      author,
      url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <Paper elevation={2} sx={{ p: 3, maxWidth: 500 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Create New Blog
      </Typography>

      <Box component="form" onSubmit={addBlog} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          id="title"
          label="Title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          fullWidth
          required
        />

        <TextField
          id="author"
          label="Author"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
          fullWidth
          required
        />

        <TextField
          id="url"
          label="URL"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
          fullWidth
          required
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          startIcon={<CreateIcon />}
          sx={{ mt: 1 }}
        >
          Create
        </Button>
      </Box>
    </Paper>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm