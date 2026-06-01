import { useState } from "react"
import { useDispatch } from "react-redux"
import { commentBlog } from "../reducers/blogReducer"

import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
  Fade,
} from "@mui/material"

import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline"
import SendIcon from "@mui/icons-material/Send"

const Comments = ({ comments, blogId }) => {
  const dispatch = useDispatch()
  const [comment, setComment] = useState("")

  const handleComment = (event) => {
    event.preventDefault()

    if (!comment.trim()) return

    dispatch(commentBlog(blogId, comment.trim()))
    setComment("")
  }

  return (
    <Box sx={{ mt: 5 }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: 2,
        }}
      >
        <ChatBubbleOutlineIcon color="primary" />

        <Typography variant="h5" sx={{ fontWeight: 800 }}>
          Comments
        </Typography>

        <Chip
          label={comments.length}
          size="small"
          sx={{
            fontWeight: 700,
            ml: 1,
          }}
        />
      </Box>

      {/* Comments List */}
      <Paper
        elevation={2}
        sx={{
          p: 2.5,
          borderRadius: 3,
          mb: 3,
          backgroundColor: "background.paper",
        }}
      >
        {comments.length > 0 ? (
          <List disablePadding>
            {comments.map((comment, index) => (
              <Fade in timeout={300} key={index}>
                <Box>
                  <ListItem sx={{ px: 0, py: 1 }}>
                    <ListItemText
                      primary={comment}
                      primaryTypographyProps={{
                        sx: {
                          fontSize: "1rem",
                          fontWeight: 500,
                          lineHeight: 1.4,
                        },
                      }}
                    />
                  </ListItem>

                  {index !== comments.length - 1 && (
                    <Divider />
                  )}
                </Box>
              </Fade>
            ))}
          </List>
        ) : (
          <Typography
            color="text.secondary"
            sx={{ fontStyle: "italic", py: 1 }}
          >
            No comments yet. Be the first one
          </Typography>
        )}
      </Paper>

      {/* Add Comment Form */}
      <Box
        component="form"
        onSubmit={handleComment}
        sx={{
          display: "flex",
          gap: 2,
          alignItems: "center",
        }}
      >
        <TextField
          fullWidth
          size="small"
          label="Write a comment"
          value={comment}
          onChange={({ target }) => setComment(target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
            },
          }}
        />

        <Button
          type="submit"
          variant="contained"
          endIcon={<SendIcon />}
          sx={{
            fontWeight: 800,
            px: 2.5,
            borderRadius: 3,
            textTransform: "none",
            boxShadow: "none",
          }}
        >
          Add
        </Button>
      </Box>
    </Box>
  )
}

export default Comments
