import { Link } from "react-router-dom"
import {
  Container,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText
} from "@mui/material"

const User = ({ user }) => {
  if (!user) {
    return null
  }

  return (
    <Container sx={{ mt: 4 }} >
      <Paper sx={{ p: 3, borderRadius: '.75rem' }} elevation={3}>
        <Typography variant="h4" gutterBottom>
          {user.name}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Blogs created: {user.blogs.length}
        </Typography>

        <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
          Added blogs
        </Typography>

        {user.blogs.length === 0 ? (
          <Typography
            color="text.secondary"
            sx={{ fontStyle: "italic" }}
          >
            No blogs added yet.
          </Typography>
        ) : (
          <List>
            {user.blogs.map(blog => (
              <ListItem
                key={blog.id}
                disablePadding
                sx={{
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                  py: 1
                }}
              >
                <ListItemText
                  primary={
                    <Link
                      to={`/blogs/${blog.id}`}
                      style={{
                        textDecoration: "none",
                        color: "inherit",
                        fontWeight: 600
                      }}
                    >
                      {blog.title}
                    </Link>
                  }
                />
              </ListItem>
            ))}
          </List>
        )}
      </Paper>
    </Container>
  )
}

export default User
