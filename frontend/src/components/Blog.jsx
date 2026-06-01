import { Link as RouterLink } from 'react-router-dom'
import { Box, Typography, Link, Chip, Stack, useMediaQuery } from '@mui/material'
import { useTheme } from "@mui/material/styles"
import CommentIcon from '@mui/icons-material/Comment'

const Blog = ({ blog }) => {
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"))

  const commentCount = blog.comments ? blog.comments.length : 0

  if (!isDesktop) {
    //* Mobile layout - vertical stack
    return (
      <Stack spacing={1}>
        <Link
          component={RouterLink}
          to={`/blogs/${blog.id}`}
          underline="hover"
          sx={{
            color: 'text.primary',
            fontWeight: 800,
            fontSize: '1.05rem',
          }}
        >
          {blog.title}
        </Link>

        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="body2" color="text.secondary">
            {blog.author}
          </Typography>

          <Stack direction="row" spacing={0.5}>
            <Chip
              label={`${blog.likes} likes`}
              color="primary"
              variant="outlined"
              size="small"
              sx={{ fontWeight: 700 }}
            />
            <Chip
              icon={<CommentIcon sx={{ fontSize: '1rem' }} />}
              label={commentCount}
              color="secondary"
              variant="outlined"
              size="small"
              sx={{ fontWeight: 700 }}
            />
          </Stack>
        </Stack>
      </Stack>
    )
  }

  //* Desktop layout
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Box>
        <Link
          component={RouterLink}
          to={`/blogs/${blog.id}`}
          underline="hover"
          sx={{
            color: 'text.primary',
            fontWeight: 800,
            fontSize: '1.05rem',
          }}
        >
          {blog.title}
        </Link>

        <Typography variant="body2" color="text.secondary">
          {blog.author}
        </Typography>
      </Box>

      <Stack direction="row" spacing={1}>
        <Chip
          label={`${blog.likes} likes`}
          color="primary"
          variant="outlined"
          sx={{ fontWeight: 700 }}
        />
        <Chip
          icon={<CommentIcon />}
          label={commentCount}
          color="secondary"
          variant="outlined"
          sx={{ fontWeight: 700 }}
        />
      </Stack>
    </Stack>
  )
}

export default Blog