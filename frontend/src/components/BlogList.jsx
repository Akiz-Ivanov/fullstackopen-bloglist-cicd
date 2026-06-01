import { Paper, Typography, Stack, Box } from '@mui/material'
import Blog from './Blog'

const BlogList = ({ blogs }) => {
  const sortedBlogs = blogs.toSorted((a, b) => b.likes - a.likes)

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
        Blogs
      </Typography>

      <Stack spacing={2} data-testid="blog-list">
        {sortedBlogs.map(blog => (
          <Paper
            key={blog.id}
            data-testid="blog-item"
            elevation={2}
            sx={{
              p: 2,
              borderRadius: 2,
              transition: '0.15s',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: 6,
              },
            }}
          >
            <Blog blog={blog} />
          </Paper>
        ))}
      </Stack>
    </Box>
  )
}

export default BlogList
