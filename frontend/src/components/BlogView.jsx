import {
  Box,
  Typography,
  Paper,
  Button,
  Stack,
  Link,
  Divider
} from '@mui/material'

import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'

import Comments from './Comments'

const BlogView = ({ blog, handleLike, handleDeleteBlog, user }) => {
  if (!blog) return null

  const isUsersBlog = user && blog.user?.name === user?.name

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 3,
      }}
    >
      <Stack spacing={2}>
        <Box>
          <Typography variant="h4" fontWeight={800}>
            {blog.title}
          </Typography>

          <Typography variant="subtitle1" color="text.secondary">
            {blog.author}
          </Typography>
        </Box>

        <Divider />

        <Box>
          <Typography variant="body2" color="text.secondary">
            URL
          </Typography>

          <Link
            href={blog.url}
            target="_blank"
            rel="noreferrer"
            underline="hover"
            sx={{
              fontWeight: 600,
              wordBreak: 'break-word',
              overflowWrap: 'break-word'
            }}
          >
            {blog.url}
          </Link>
        </Box>

        <Box>
          <Typography variant="body1">
            <strong>Likes:</strong> {blog.likes}
          </Typography>

          <Button
            variant="contained"
            color="primary"
            startIcon={<ThumbUpAltOutlinedIcon />}
            onClick={() => handleLike(blog)}
            sx={{
              mt: 1,
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 700,
            }}
          >
            Like
          </Button>
        </Box>

        <Typography variant="body2" color="text.secondary">
          Added by <strong>{blog.user?.name}</strong>
        </Typography>

        {isUsersBlog && (
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteOutlineIcon />}
            onClick={() => handleDeleteBlog(blog.id)}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 700,
              width: 'fit-content'
            }}
          >
            Delete
          </Button>
        )}

        <Divider sx={{ my: 1 }} />

        <Comments comments={blog.comments ?? []} blogId={blog.id} />
      </Stack>
    </Paper>
  )
}

export default BlogView
