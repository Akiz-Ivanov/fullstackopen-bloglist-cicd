import { useState } from "react"
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  useMediaQuery
} from "@mui/material"
import { useTheme } from "@mui/material/styles"
import { Link } from "react-router-dom"

import LogoutIcon from "@mui/icons-material/Logout"
import ArticleIcon from "@mui/icons-material/Article"
import PeopleIcon from "@mui/icons-material/People"
import MenuIcon from "@mui/icons-material/Menu"
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined"
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined"

const Navbar = ({ user, handleLogout, toggleTheme, mode }) => {
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"))

  const [drawerOpen, setDrawerOpen] = useState(false)

  const buttonHoverStyle = {
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.2)",
    },
  }

  const closeDrawer = () => setDrawerOpen(false)
  const openDrawer = () => setDrawerOpen(true)

  return (
    <>
      <AppBar position="static" sx={{ bgcolor: "primary.main" }}>
        <Toolbar>
          <ArticleIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            BlogList App
          </Typography>

          {/* Desktop nav (unchanged) */}
          {isDesktop && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Button
                color="inherit"
                component={Link}
                to="/"
                startIcon={<ArticleIcon />}
                sx={buttonHoverStyle}
              >
                Blogs
              </Button>

              <Button
                color="inherit"
                component={Link}
                to="/users"
                startIcon={<PeopleIcon />}
                sx={buttonHoverStyle}
              >
                Users
              </Button>

              <Typography variant="body1" sx={{ ml: 2 }}>
                {user.name}
              </Typography>

              <Button
                color="inherit"
                onClick={handleLogout}
                startIcon={<LogoutIcon />}
                sx={buttonHoverStyle}
              >
                Logout
              </Button>

              {toggleTheme && (
                <IconButton sx={{ ml: 1 }} onClick={toggleTheme} color="inherit">
                  {mode === "light" ? (
                    <DarkModeOutlinedIcon />
                  ) : (
                    <LightModeOutlinedIcon />
                  )}
                </IconButton>
              )}
            </Box>
          )}

          {/* Mobile nav (hamburger) */}
          {!isDesktop && (
            <IconButton color="inherit" onClick={openDrawer}>
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer menu for mobile */}
      <Drawer anchor="right" open={drawerOpen} onClose={closeDrawer}>
        <Box sx={{ width: 250 }} role="presentation">
          <Box sx={{ p: 2 }}>
            <Typography variant="h6">Menu</Typography>
            <Typography variant="body2" sx={{ opacity: 0.7 }}>
              Logged in as {user.name}
            </Typography>
          </Box>

          <Divider />

          <List>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/" onClick={closeDrawer}>
                <ListItemIcon>
                  <ArticleIcon />
                </ListItemIcon>
                <ListItemText primary="Blogs" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton component={Link} to="/users" onClick={closeDrawer}>
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Users" />
              </ListItemButton>
            </ListItem>
          </List>

          <Divider />

          <List>
            {toggleTheme && (
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    toggleTheme()
                    closeDrawer()
                  }}
                >
                  <ListItemIcon>
                    {mode === "light" ? (
                      <DarkModeOutlinedIcon />
                    ) : (
                      <LightModeOutlinedIcon />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={mode === "light" ? "Dark mode" : "Light mode"}
                  />
                </ListItemButton>
              </ListItem>
            )}

            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  handleLogout()
                  closeDrawer()
                }}
              >
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  )
}

export default Navbar
