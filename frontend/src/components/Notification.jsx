import { Snackbar, Alert } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { removeNotification } from '../reducers/notificationReducer'

const Notification = () => {
  const dispatch = useDispatch()
  const message = useSelector(state => state.notification)

  const handleClose = (event, reason) => {
    //* Don't close on clickaway, only on close button or timeout
    if (reason === 'clickaway') {
      return
    }
    dispatch(removeNotification())
  }

  //* Determine severity based on message content
  const getSeverity = () => {
    if (!message) return 'info'

    const lowerMessage = message.toLowerCase()
    if (lowerMessage.includes('success') || lowerMessage.includes('added') || lowerMessage.includes('logged in')) {
      return 'success'
    }
    if (lowerMessage.includes('error') || lowerMessage.includes('failed') || lowerMessage.includes('wrong')) {
      return 'error'
    }
    if (lowerMessage.includes('removed') || lowerMessage.includes('deleted') || lowerMessage.includes('logged out')) {
      return 'warning'
    }
    return 'info'
  }

  if (!message || message === '') {
    return null
  }

  return (
    <Snackbar
      open={!!message}
      autoHideDuration={5000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert
        onClose={handleClose}
        severity={getSeverity()}
        variant="filled"
        sx={{ width: '100%', borderRadius: '.75rem' }}
        className="notification"
      >
        {message}
      </Alert>
    </Snackbar>
  )
}

export default Notification