import { Link } from 'react-router-dom'
import {
  Container,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'

const UsersView = ({ users }) => {
  if (!users || users.length === 0) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Users
        </Typography>
        <Typography>No users.</Typography>
      </Container>
    )
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Users
      </Typography>

      <TableContainer component={Paper} elevation={3} sx={{ borderRadius: '.75rem' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>User</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Blogs created</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {users.map(user => (
              <TableRow
                key={user.id}
                hover
                sx={{ cursor: 'pointer' }}
              >
                <TableCell>
                  <Link
                    to={`/users/${user.id}`}
                    style={{
                      textDecoration: 'none',
                      color: 'inherit',
                      fontWeight: 600
                    }}
                  >
                    {user.name}
                  </Link>
                </TableCell>
                <TableCell>{user.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>

        </Table>
      </TableContainer>
    </Container>
  )
}

export default UsersView
