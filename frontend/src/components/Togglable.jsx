import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Button, Box, Collapse } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import CancelIcon from '@mui/icons-material/Cancel'

const Togglable = forwardRef(({ buttonLabel, children }, ref) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <Box sx={{ mb: 2 }}>
      {!visible && (
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={toggleVisibility}
        >
          {buttonLabel}
        </Button>
      )}

      <Collapse in={visible} timeout={700}>
        <Box sx={{ mt: 2 }}>
          {children}
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<CancelIcon />}
            onClick={toggleVisibility}
            sx={{ mt: 2 }}
          >
            Cancel
          </Button>
        </Box>
      </Collapse>
    </Box>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

Togglable.displayName = 'Togglable'

export default Togglable