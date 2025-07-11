import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Avatar,
  Tooltip,
  IconButton,
  Drawer,
  Divider
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import LogoutIcon from '@mui/icons-material/Logout';
import StarIcon from '@mui/icons-material/Star';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { keyframes } from '@emotion/react';

const GITHUB_REPO_URL = 'https://github.com/your-repo-url';
const SPONSOR_URL = 'https://github.com/sponsors/Maxd646';

// Simple floating animation
const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-4px); }
`;

// Simple glow animation
const glow = keyframes`
  0%, 100% { box-shadow: 0 0 16px 0 rgba(249,217,35,0.3); }
  50% { box-shadow: 0 0 24px 4px rgba(249,217,35,0.5); }
`;

// Simple shimmer for gradient text
const shimmerText = keyframes`
  0% { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
`;

// Simple pulse for notification
const pulseDot = keyframes`
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.2); opacity: 0.8; }
`;

export default function Header({ user, onLogin, onLogout }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [hasNotification, setHasNotification] = useState(true);

  // Simulate notification for demo
  React.useEffect(() => {
    const timer = setTimeout(() => setHasNotification(false), 8000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AppBar
      position="fixed"
      color="transparent"
      elevation={0}
      sx={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(240,248,255,0.9) 100%)',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
        borderBottom: '2px solid rgba(67,182,73,0.2)',
        borderRadius: 0,
        px: { xs: 0, sm: 2 },
        py: 0.5,
        zIndex: 100,
        minHeight: 68,
        transition: 'background 0.3s, box-shadow 0.3s',
      }}
    >
      <Toolbar sx={{ minHeight: 68, display: 'flex', alignItems: 'center', px: { xs: 1, sm: 3 } }}>
        {/* Clean Logo + App Name */}
        <Box sx={{ display: 'flex', alignItems: 'center', mr: { xs: 1, sm: 2 }, position: 'relative' }}>
            <Avatar sx={{
              bgcolor: '#43b649',
            width: { xs: 40, sm: 46 }, 
            height: { xs: 40, sm: 46 }, 
            mr: 1, 
            boxShadow: '0 4px 16px rgba(67,182,73,0.3)', 
            border: '3px solid #f9d923', 
              boxSizing: 'border-box',
            animation: `${float} 3s ease-in-out infinite`, 
            transition: 'transform 0.2s', 
            ':hover': { 
              transform: 'scale(1.1)', 
              boxShadow: '0 0 24px rgba(249,217,35,0.5)' 
            }
          }}>
            <GitHubIcon sx={{ fontSize: { xs: 22, sm: 26 }, color: '#fff' }} />
            </Avatar>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 900,
              letterSpacing: 1,
              lineHeight: 1.1,
              px: 2,
              py: 0.5,
              borderRadius: 2,
              background: 'linear-gradient(90deg, #43b649, #f9d923, #1976d2)',
              backgroundSize: '200% 200%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: `${shimmerText} 3s ease-in-out infinite`,
              transition: 'box-shadow 0.3s',
              ':hover': { 
                boxShadow: '0 4px 20px rgba(249,217,35,0.4)',
              },
            }}
          >
            ByeBuddy
          </Typography>
        </Box>

        {/* Simple Notification bell */}
        <Box sx={{ ml: 2, mr: 1, display: { xs: 'none', md: 'flex' }, alignItems: 'center', position: 'relative' }}>
          <IconButton sx={{
            color: '#1976d2',
            fontSize: 28,
            mr: 1,
            position: 'relative',
            background: 'rgba(255,255,255,0.8)',
            border: '1px solid rgba(67,182,73,0.2)',
            borderRadius: 2,
            transition: 'all 0.3s',
            ':hover': { 
              color: '#43b649', 
              background: 'rgba(67,182,73,0.1)',
              borderColor: '#43b649',
              transform: 'scale(1.05)',
            },
          }}>
            <NotificationsActiveIcon fontSize="inherit" />
            {hasNotification && (
              <Box sx={{
                position: 'absolute',
                top: 6,
                right: 6,
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: '#f44336',
                boxShadow: '0 0 8px #f44336',
                animation: `${pulseDot} 1.2s infinite`,
                border: '1px solid #fff',
              }} />
            )}
          </IconButton>
        </Box>
        
        {/* Clean Navigation Links */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1, mr: 2 }}>
          {[
            { text: 'How to Work', id: 'how-it-works' },
            { text: 'Why', id: 'features' },
            { text: 'Updates', id: 'updates' },
            { text: 'What Our Users Say', id: 'testimonials' },
            { text: 'Tech Stack', id: 'tech-stack' }
          ].map((link, index) => (
            <Button
              key={link.text}
              onClick={() => {
                const element = document.getElementById(link.id);
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              sx={{
                color: '#1976d2',
                fontWeight: 600,
                textTransform: 'none',
                fontSize: 14,
                px: 2,
                py: 1,
                borderRadius: 2,
                transition: 'all 0.3s ease',
                position: 'relative',
                background: 'rgba(255,255,255,0.6)',
                border: '1px solid transparent',
                ':hover': {
                  color: '#43b649',
                  background: 'rgba(67,182,73,0.1)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(67,182,73,0.2)',
                  borderColor: '#43b649',
                },
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: '50%',
                  width: 0,
                  height: 2,
                  background: 'linear-gradient(90deg, #43b649, #f9d923)',
                  transition: 'all 0.3s ease',
                  transform: 'translateX(-50%)',
                  borderRadius: 1,
                },
                '&:hover::after': {
                  width: '80%',
                },
              }}
            >
              {link.text}
            </Button>
          ))}
        </Box>
        
        {/* Simple Hamburger for mobile */}
        <Box sx={{ display: { xs: 'flex', md: 'none' }, flexGrow: 1, justifyContent: 'flex-end' }}>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={() => setDrawerOpen(true)}
            sx={{ 
              ml: 1, 
              animation: `${float} 4s ease-in-out infinite 1s`,
              background: 'rgba(255,255,255,0.8)',
              border: '1px solid rgba(67,182,73,0.2)',
          borderRadius: 2,
              transition: 'all 0.3s',
              ':hover': {
                background: 'rgba(67,182,73,0.1)',
                borderColor: '#43b649',
                transform: 'scale(1.05)',
              }
            }}
          >
            <MenuIcon sx={{ fontSize: 28, color: '#43b649' }} />
          </IconButton>
        </Box>

        {/* Clean Desktop action buttons */}
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end', gap: 2 }}>
          <Button
            variant="contained"
            color="secondary"
            href={SPONSOR_URL}
            target="_blank"
            rel="noopener"
            startIcon={<EmojiEventsIcon />}
            sx={{
              fontWeight: 700,
              borderRadius: 3,
              px: { xs: 1.5, sm: 2.5 },
              py: 1,
              boxShadow: '0 2px 12px rgba(249,217,35,0.3)',
              background: 'linear-gradient(90deg, #f9d923 0%, #43b649 100%)',
              textTransform: 'none',
              fontSize: { xs: 14, sm: 15 },
              color: '#222',
              position: 'relative',
              transition: 'all 0.3s',
              animation: `${glow} 3s infinite`,
              ':hover': {
                background: 'linear-gradient(90deg, #43b649 0%, #f9d923 100%)',
                color: '#fff',
                boxShadow: '0 4px 20px rgba(249,217,35,0.5)',
                transform: 'translateY(-1px)',
              },
            }}
          >
            Sponsor
          </Button>

          <Button
            variant="outlined"
            color="inherit"
            href={GITHUB_REPO_URL}
            target="_blank"
            rel="noopener"
            startIcon={<StarIcon />}
            sx={{
              fontWeight: 700,
              borderRadius: 3,
              px: { xs: 1, sm: 2 },
              py: 1,
              borderColor: '#43b649',
              borderWidth: 2,
              color: '#43b649',
              textTransform: 'none',
              fontSize: { xs: 14, sm: 15 },
              position: 'relative',
              transition: 'all 0.3s',
              background: 'rgba(255,255,255,0.8)',
              ':hover': {
                background: 'rgba(67,182,73,0.1)',
                borderColor: '#f9d923',
                color: '#f9d923',
                boxShadow: '0 4px 20px rgba(67,182,73,0.3)',
                transform: 'translateY(-1px)',
              },
            }}
          >
            Star
          </Button>

          {user ? (
            <>
              <Avatar 
                src={user.avatar_url} 
                alt={user.login} 
                sx={{ 
                  ml: 2, 
                  width: { xs: 36, sm: 42 }, 
                  height: { xs: 36, sm: 42 }, 
                  border: '2px solid #43b649', 
                  boxShadow: '0 4px 16px rgba(67,182,73,0.3)', 
                  animation: `${float} 3s ease-in-out infinite 0.5s`, 
                  transition: 'transform 0.2s', 
                  ':hover': { 
                    transform: 'scale(1.1)', 
                    boxShadow: '0 0 20px rgba(249,217,35,0.5)' 
                  }
                }} 
              />
              <Tooltip title="Logout">
                <IconButton 
                  color="inherit" 
                  onClick={onLogout} 
                  sx={{ 
                    ml: 1, 
                    bgcolor: 'rgba(255,255,255,0.9)', 
                    color: '#43b649', 
                    borderRadius: 2, 
                    boxShadow: '0 2px 8px rgba(67,182,73,0.2)', 
                    transition: 'all 0.3s', 
                    border: '1px solid rgba(67,182,73,0.2)',
                    ':hover': { 
                      bgcolor: '#f9d923', 
                      color: '#fff', 
                      transform: 'scale(1.05)', 
                      boxShadow: '0 0 20px rgba(249,217,35,0.5)' 
                    } 
                  }}
                >
                  <LogoutIcon />
                </IconButton>
              </Tooltip>
            </>
          ) : (
            <Button
              variant="contained"
              color="primary"
              startIcon={<GitHubIcon />}
              onClick={onLogin}
              sx={{
                fontWeight: 700,
                borderRadius: 3,
                px: { xs: 2, sm: 3 },
                py: 1,
                boxShadow: '0 2px 12px rgba(67,182,73,0.3)',
                background: 'linear-gradient(90deg, #43b649 0%, #f9d923 100%)',
                textTransform: 'none',
                fontSize: { xs: 14, sm: 15 },
                transition: 'all 0.3s',
                ':hover': { 
                  boxShadow: '0 4px 20px rgba(67,182,73,0.4)', 
                  background: 'linear-gradient(90deg, #f9d923 0%, #43b649 100%)',
                  transform: 'translateY(-1px)',
                },
              }}
            >
              Login
            </Button>
          )}
        </Box>
      </Toolbar>

      {/* Clean Drawer for mobile nav */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{ 
          sx: { 
            width: 260, 
            bgcolor: 'rgba(255,255,255,0.95)', 
            background: 'linear-gradient(135deg, rgba(224,255,231,0.95) 0%, rgba(249,217,35,0.95) 100%)', 
            boxShadow: '0 8px 32px rgba(67,182,73,0.3)', 
            borderTopLeftRadius: 24, 
            borderBottomLeftRadius: 24, 
            border: '2px solid #43b649', 
            backdropFilter: 'blur(20px)',
          } 
        }}
      >
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1, borderBottom: '1px solid rgba(67,182,73,0.2)' }}>
          <Avatar sx={{ 
            bgcolor: '#43b649', 
            width: 36, 
            height: 36, 
            animation: `${float} 3s ease-in-out infinite`,
            border: '2px solid #f9d923',
          }}>
            <GitHubIcon sx={{ fontSize: 20, color: '#fff' }} />
          </Avatar>
          <Typography variant="h6" sx={{ fontWeight: 800, color: '#1976d2', letterSpacing: 1 }}>
            ByeBuddy
          </Typography>
        </Box>
        <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
          {/* Clean Navigation Links for Mobile */}
          {[
            { text: 'How to Work', id: 'how-it-works' },
            { text: 'Why', id: 'features' },
            { text: 'Updates', id: 'updates' },
            { text: 'What Our Users Say', id: 'testimonials' },
            { text: 'Tech Stack', id: 'tech-stack' }
          ].map((link, index) => (
            <Button
              key={link.text}
              onClick={() => {
                const element = document.getElementById(link.id);
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
                setDrawerOpen(false);
              }}
              sx={{
                color: '#1976d2',
                fontWeight: 600,
                textTransform: 'none',
                fontSize: 15,
                px: 2,
                py: 1.2,
                borderRadius: 2,
                mb: 1,
                transition: 'all 0.3s ease',
                background: 'rgba(255,255,255,0.8)',
                border: '1px solid rgba(67,182,73,0.1)',
                ':hover': {
                  color: '#43b649',
                  background: 'rgba(67,182,73,0.1)',
                  borderColor: '#43b649',
                  transform: 'translateX(4px)',
                },
              }}
            >
              {link.text}
            </Button>
          ))}
          
          <Divider sx={{ my: 2, borderColor: 'rgba(67,182,73,0.2)' }} />
          
          <Button
            variant="contained"
            color="secondary"
            href={SPONSOR_URL}
            target="_blank"
            rel="noopener"
            startIcon={<EmojiEventsIcon />}
            sx={{
              fontWeight: 700,
              borderRadius: 3,
              px: 2,
              py: 1.2,
              boxShadow: '0 2px 12px rgba(249,217,35,0.3)',
              background: 'linear-gradient(90deg, #f9d923 0%, #43b649 100%)',
              textTransform: 'none',
              fontSize: 15,
              color: '#222',
              mb: 1,
              ':hover': { 
                background: 'linear-gradient(90deg, #43b649 0%, #f9d923 100%)', 
                color: '#fff', 
                boxShadow: '0 4px 20px rgba(249,217,35,0.4)',
              },
            }}
          >
            Sponsor
          </Button>

          <Button
            variant="outlined"
            color="inherit"
            href={GITHUB_REPO_URL}
            target="_blank"
            rel="noopener"
            startIcon={<StarIcon />}
            sx={{
              fontWeight: 700,
              borderRadius: 3,
              px: 2,
              py: 1.2,
              borderColor: '#43b649',
              borderWidth: 2,
              color: '#43b649',
              textTransform: 'none',
              fontSize: 15,
              mb: 1,
              background: 'rgba(255,255,255,0.8)',
              ':hover': { 
                background: 'rgba(67,182,73,0.1)', 
                borderColor: '#f9d923', 
                color: '#f9d923', 
                boxShadow: '0 4px 20px rgba(67,182,73,0.3)',
              },
            }}
          >
            Star
          </Button>

          {user ? (
            <Button
              variant="outlined"
              color="inherit"
              startIcon={<LogoutIcon />}
              onClick={onLogout}
              sx={{
                fontWeight: 700,
                borderRadius: 3,
                px: 2,
                py: 1.2,
                borderColor: '#43b649',
                borderWidth: 2,
                color: '#43b649',
                textTransform: 'none',
                fontSize: 15,
                background: 'rgba(255,255,255,0.8)',
                ':hover': { 
                  background: '#f9d923', 
                  color: '#fff', 
                  borderColor: '#f9d923', 
                  boxShadow: '0 0 20px rgba(249,217,35,0.5)',
                },
              }}
            >
              Logout
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              startIcon={<GitHubIcon />}
              onClick={onLogin}
              sx={{
                fontWeight: 700,
                borderRadius: 3,
                px: 2,
                py: 1.2,
                boxShadow: '0 2px 12px rgba(67,182,73,0.3)',
                background: 'linear-gradient(90deg, #43b649 0%, #f9d923 100%)',
                textTransform: 'none',
                fontSize: 15,
                ':hover': { 
                  boxShadow: '0 4px 20px rgba(67,182,73,0.4)', 
                  background: 'linear-gradient(90deg, #f9d923 0%, #43b649 100%)',
                },
              }}
            >
              Login
            </Button>
          )}
        </Box>
      </Drawer>
    </AppBar>
  );
}