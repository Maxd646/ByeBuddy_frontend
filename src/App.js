import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import Header from './components/Header';
import Footer from './components/Footer';
import CoverPage from './pages/CoverPage';
import Dashboard from './pages/Dashboard';
import NotFollowingBack from './pages/NotFollowingBack';
import NotFollowedBack from './pages/NotFollowedBack';
import MutualFollowers from './pages/MutualFollowers';
import AccountSummary from './pages/AccountSummary';
import Settings from './pages/Settings';
import Upgrade from './pages/Upgrade';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorAlert from './components/ErrorAlert';
import axios from 'axios';
import LoginModal from './components/LoginModal';

const theme = createTheme({
  palette: {
    primary: { main: '#43b649' },
    secondary: { main: '#f9d923' },
    background: { default: '#f4f6fa' },
  },
  typography: {
    fontFamily: 'Inter, Roboto, Arial, sans-serif',
    fontWeightBold: 800,
  },
});

function NotFound() {
  return <h2 style={{ textAlign: 'center', marginTop: 80 }}>404 - Page Not Found</h2>;
}

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [rateLimit, setRateLimit] = useState({ remaining: 45, limit: 60 });
  const [profile, setProfile] = useState(null);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  // Modal/login/register state
  const [modalOpen, setModalOpen] = useState(false);

  // Handlers for modal and forms
  const handleOpenLogin = () => { setModalOpen(true); setError(''); };
  const handleCloseModal = () => {
    setModalOpen(false);
    setError('');
  };

  const handleLogout = () => {
    setUser(null);
    setProfile(null);
    setFollowers([]);
    setFollowing([]);
    localStorage.removeItem('token');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header user={user} onLogin={handleOpenLogin} onLogout={handleLogout} />
      {user && rateLimit.remaining < 10 && (
        <ErrorAlert
          message={`Warning: GitHub API rate limit is low (${rateLimit.remaining} of ${rateLimit.limit} requests left). Some features may stop working soon.`}
          severity="warning"
        />
      )}
      {loading && <LoadingSpinner />}
      {error && <ErrorAlert message={error} />}
      <LoginModal
        open={modalOpen}
        onClose={handleCloseModal}
        onLoginSuccess={(data) => {
          setUser({ login: data.username || data.login, avatar_url: data.avatar_url || '' });
          setModalOpen(false);
        }}
      />
      <Router>
        <Routes>
          <Route path="/" element={
            // user ? (
            //   <Navigate to="/dashboard" replace />
            // ) : (
              <CoverPage
                handleOpenModal={handleOpenLogin}
              />
            // )
          } />
          <Route path="/dashboard" element={
            // user ? (
              <Dashboard profile={profile} followers={followers} following={following} />
            // ) : (
            //   <Navigate to="/" replace />
            // )
          } />
          <Route path="/dashboard/summary" element={
            // user ? (
              <AccountSummary profile={profile} followers={followers} following={following} />
            // ) : (
            //   <Navigate to="/" replace />
            // )
          } />
          <Route path="/dashboard/not-following" element={
            // user ? (
              <NotFollowingBack following={following} followers={followers} />
            // ) : (
            //   <Navigate to="/" replace />
            // )
          } />
          <Route path="/dashboard/not-followed-back" element={
            // user ? (
              <NotFollowedBack following={following} followers={followers} />
            // ) : (
            //   <Navigate to="/" replace />
            // )
          } />
          <Route path="/dashboard/mutuals" element={
            // user ? (
              <MutualFollowers following={following} followers={followers} />
            // ) : (
            //   <Navigate to="/" replace />
            // )
          } />
          <Route path="/dashboard/settings" element={
            // user ? (
              <Settings />
            // ) : (
            //   <Navigate to="/" replace />
            // )
          } />
          <Route path="/dashboard/upgrade" element={
            // user ? (
              <Upgrade />
            // ) : (
            //   <Navigate to="/" replace />
            // )
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
        <Footer />
    </ThemeProvider>
  );
}
