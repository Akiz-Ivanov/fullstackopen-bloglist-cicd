import { Box, Typography, Link } from "@mui/material"

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        mt: "auto",
        py: 3,
        textAlign: "center",
        borderTop: "1px solid",
        borderColor: "divider",
        backgroundColor: "background.paper",
      }}
    >
      <Typography variant="body2" color="text.secondary">
        BlogList App • FullStackOpen Part 7
      </Typography>

      <Typography variant="caption" color="text.secondary">
        © {new Date().getFullYear()} Built with React, Redux & Material UI
      </Typography>
    </Box>
  )
}

export default Footer
