import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, Typography, Box, IconButton, Avatar, Menu, MenuItem, Tooltip, Button } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import MenuIcon from '@mui/icons-material/Menu';

export default function TopNav({ user, onLogout, onMenuClick }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleAvatarClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: '2px solid #e0e7ff', bgcolor: '#fff', minHeight: 56 }}>
      <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Mobile menu button */}
        <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}>
          <Tooltip title="Open menu">
            <IconButton color="inherit" onClick={onMenuClick} aria-label="Open sidebar menu">
              <MenuIcon />
            </IconButton>
          </Tooltip>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Avatar sx={{ bgcolor: '#43b649', width: 32, height: 32 }} aria-label="App logo">
            <GitHubIcon sx={{ fontSize: 20, color: '#fff' }} />
          </Avatar>
          <Typography variant="h6" sx={{ fontWeight: 800, color: '#1976d2', letterSpacing: 1 }}>ByeBuddy</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {user ? (
            <>
              <Tooltip title={user.login}>
                <IconButton onClick={handleAvatarClick} sx={{ p: 0 }} aria-label="Open user menu">
                  <Avatar src={user.avatar_url} alt={user.login} />
                </IconButton>
              </Tooltip>
              <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose} onClick={handleMenuClose}>
                <MenuItem aria-label="Settings">
                  <SettingsIcon fontSize="small" sx={{ mr: 1 }} />
                  <Typography variant="inherit">Settings</Typography>
                </MenuItem>
                <MenuItem onClick={onLogout} aria-label="Logout">
                  <LogoutIcon fontSize="small" sx={{ mr: 1 }} />
                  <Typography variant="inherit">Logout</Typography>
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Button variant="contained" color="primary" startIcon={<GitHubIcon />} onClick={() => window.location.href = '/'} aria-label="Login with GitHub">
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

TopNav.propTypes = {
  user: PropTypes.shape({
    login: PropTypes.string,
    avatar_url: PropTypes.string,
  }),
  onLogout: PropTypes.func,
  onMenuClick: PropTypes.func,
}; 