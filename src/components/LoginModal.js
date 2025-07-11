import React, { useState } from 'react';
import {
  Dialog, DialogContent, DialogActions, Button, Box, TextField, Typography, Tabs, Tab, CircularProgress, Alert, Avatar
} from '@mui/material';
import { keyframes } from '@emotion/react';
import GitHubIcon from '@mui/icons-material/GitHub';
import VerifiedIcon from '@mui/icons-material/Verified';
import StarIcon from '@mui/icons-material/Star';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const GITHUB_LOGIN_URL = "http://localhost:8000/auth/login/github/";

// Animated entrance keyframes
const modalEntrance = keyframes`
  0% { opacity: 0; transform: scale(0.85) translateY(40px); }
  100% { opacity: 1; transform: scale(1) translateY(0); }
`;

export default function LoginModal({ open, onClose, onLoginSuccess }) {
  const [tab, setTab] = useState(0); // 0: Login, 1: Register
  const [form, setForm] = useState({ username: '', email: '', password: '', confirm: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleTab = (_, v) => {
    setTab(v);
    setForm({ username: '', email: '', password: '', confirm: '' });
    setError('');
  };

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('http://localhost:8000/api/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: form.username, password: form.password })
      });
      const data = await res.json();
      if (res.ok) {
        onLoginSuccess(data);
        onClose();
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (e) {
      setError('Network error');
    }
    setLoading(false);
  };

  const handleRegister = async () => {
    if (!form.username || !form.email || !form.password || !form.confirm) {
      setError('All fields required');
      return;
    }
    if (form.password !== form.confirm) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await fetch('http://localhost:8000/api/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: form.username, email: form.email, password: form.password })
      });
      const data = await res.json();
      if (res.ok) {
        onLoginSuccess(data);
        onClose();
      } else {
        setError(data.error || Object.values(data)[0] || 'Registration failed');
      }
    } catch (e) {
      setError('Network error');
    }
    setLoading(false);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth
      PaperProps={{
        sx: {
          background: 'linear-gradient(135deg, #e0ffe7 0%, #f9d923 80%, #fff 100%)',
          borderRadius: 4,
          boxShadow: '0 8px 32px #43b64933',
          p: 0,
          border: '3px solid',
          borderImage: 'linear-gradient(90deg, #43b649 0%, #f9d923 100%) 1',
          position: 'relative',
          overflow: 'hidden',
          animation: `${modalEntrance} 0.6s cubic-bezier(.4,2,.6,1)`
        }
      }}
      aria-labelledby="byebuddy-login-modal-title"
    >
      {/* Animated dynamic background */}
      <Box sx={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        background: 'radial-gradient(circle at 60% 40%, #f9d92333 0%, #43b64922 60%, transparent 100%)',
        animation: 'bgMove 8s linear infinite alternate',
        '@keyframes bgMove': {
          from: { backgroundPosition: '0% 0%' },
          to: { backgroundPosition: '100% 100%' }
        }
      }} />
      {/* Branding/Hero section */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pt: 3, zIndex: 2 }}>
        <Avatar sx={{ width: 64, height: 64, bgcolor: '#1976d2', boxShadow: 4, mb: 1, animation: 'iconBounce 1.8s infinite alternate' }}>
          <VerifiedIcon sx={{ fontSize: 40, color: '#f9d923' }} />
        </Avatar>
        <Typography id="byebuddy-login-modal-title" variant="h4" sx={{ fontWeight: 900, color: '#1976d2', letterSpacing: 1, mb: 0.5 }}>Welcome to ByeBuddy</Typography>
        <Typography variant="subtitle1" sx={{ color: '#43b649', fontWeight: 600, mb: 1, textAlign: 'center' }}>
          Track your GitHub followers, mutuals, and more!
        </Typography>
      </Box>
      <DialogContent sx={{ zIndex: 1, background: 'rgba(255,255,255,0.75)', borderRadius: 3, boxShadow: '0 2px 12px #43b64922', backdropFilter: 'blur(8px)', p: 3, mt: 1 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<GitHubIcon sx={{ transition: 'transform 0.2s', ':hover': { transform: 'scale(1.2) rotate(-8deg)' } }} />}
            fullWidth
            sx={{ mb: 2, fontWeight: 700, fontSize: 18, borderRadius: 2, py: 1.2, background: 'linear-gradient(90deg, #1976d2 0%, #43b649 100%)', boxShadow: '0 4px 16px #1976d244, 0 1.5px 8px #43b64933', transition: 'box-shadow 0.2s', ':hover': { boxShadow: '0 6px 24px #43b64955, 0 2px 12px #f9d92344', filter: 'brightness(1.08)' } }}
            onClick={() => { window.location.href = GITHUB_LOGIN_URL; }}
            aria-label="Login with GitHub"
          >
            Login with GitHub
          </Button>
          <Typography variant="body1" sx={{ color: '#888', mb: 1, fontWeight: 600 }}>or</Typography>
          <Tabs value={tab} onChange={handleTab} centered sx={{ mb: 2, '.MuiTabs-indicator': { height: 5, borderRadius: 2, background: 'linear-gradient(90deg, #43b649 0%, #f9d923 100%)', transition: 'all 0.3s cubic-bezier(.4,2,.6,1)' } }}>
            <Tab label={<span style={{ fontWeight: 700, fontSize: 16 }}>Login</span>} />
            <Tab label={<span style={{ fontWeight: 700, fontSize: 16 }}>Register</span>} />
          </Tabs>
          {tab === 0 ? (
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label="Username"
                name="username"
                value={form.username}
                onChange={handleChange}
                fullWidth
                autoFocus
                sx={{ background: 'rgba(255,255,255,0.85)', borderRadius: 2 }}
              />
              <TextField
                label="Password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                fullWidth
                sx={{ background: 'rgba(255,255,255,0.85)', borderRadius: 2 }}
              />
              {error && <Alert severity="error">{error}</Alert>}
              <Button
                variant="contained"
                color="success"
                fullWidth
                sx={{ fontWeight: 700, fontSize: 17, borderRadius: 2, py: 1.1, mt: 1, background: 'linear-gradient(90deg, #43b649 0%, #f9d923 100%)', boxShadow: '0 2px 8px #43b64933', ':hover': { background: 'linear-gradient(90deg, #f9d923 0%, #43b649 100%)', boxShadow: '0 4px 16px #f9d92344' } }}
                onClick={handleLogin}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : 'Login'}
              </Button>
              <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Button
                  variant="text"
                  size="small"
                  sx={{ color: '#43b649', fontWeight: 700, textDecoration: 'underline', borderRadius: 2, px: 1, py: 0.5, transition: 'background 0.2s', ':hover': { background: 'rgba(67,182,73,0.08)' } }}
                  onClick={() => setTab(1)}
                >
                  Don't have an account? Register
                </Button>
              </Box>
            </Box>
          ) : (
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label="Username"
                name="username"
                value={form.username}
                onChange={handleChange}
                fullWidth
                autoFocus
                sx={{ background: 'rgba(255,255,255,0.85)', borderRadius: 2 }}
              />
              <TextField
                label="Email"
                name="email"
                value={form.email}
                onChange={handleChange}
                fullWidth
                sx={{ background: 'rgba(255,255,255,0.85)', borderRadius: 2 }}
              />
              <TextField
                label="Password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                fullWidth
                sx={{ background: 'rgba(255,255,255,0.85)', borderRadius: 2 }}
              />
              <TextField
                label="Confirm Password"
                name="confirm"
                type="password"
                value={form.confirm}
                onChange={handleChange}
                fullWidth
                sx={{ background: 'rgba(255,255,255,0.85)', borderRadius: 2 }}
              />
              {error && <Alert severity="error">{error}</Alert>}
              <Button
                variant="contained"
                color="success"
                fullWidth
                sx={{ fontWeight: 700, fontSize: 17, borderRadius: 2, py: 1.1, mt: 1, background: 'linear-gradient(90deg, #43b649 0%, #f9d923 100%)', boxShadow: '0 2px 8px #43b64933', ':hover': { background: 'linear-gradient(90deg, #f9d923 0%, #43b649 100%)', boxShadow: '0 4px 16px #f9d92344' } }}
                onClick={handleRegister}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : 'Register'}
              </Button>
            </Box>
          )}
        </Box>
      </DialogContent>
      {/* Trusted by row */}
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 3, py: 1, px: 2, bgcolor: 'rgba(255,255,255,0.7)', borderRadius: 3, mx: 'auto', maxWidth: 320, boxShadow: 1, mb: 2, mt: 1 }}>
        <GitHubIcon sx={{ fontSize: 28, color: '#222' }} />
        <StarIcon sx={{ fontSize: 28, color: '#f9d923' }} />
        <EmojiEventsIcon sx={{ fontSize: 28, color: '#43b649' }} />
        <Typography variant="caption" sx={{ color: '#1976d2', fontWeight: 700, ml: 1 }}>Trusted by 1,000+ users</Typography>
      </Box>
      <DialogActions sx={{ zIndex: 1, background: 'rgba(255,255,255,0.65)', borderBottomLeftRadius: 16, borderBottomRightRadius: 16 }}>
        <Button onClick={onClose} color="inherit" sx={{ fontWeight: 700, borderRadius: 2 }}>Close</Button>
      </DialogActions>
      <style>{`
        @keyframes iconBounce {
          0% { transform: translateY(0); }
          50% { transform: translateY(-8px) scale(1.08); }
          100% { transform: translateY(0); }
        }
        @keyframes bgMove {
          0% { background-position: 0% 0%; }
          100% { background-position: 100% 100%; }
        }
      `}</style>
    </Dialog>
  );
} 