import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Avatar,
  Chip,
  IconButton,
  Tooltip,
  Paper,
  Badge,
  Alert,
  AlertTitle
} from '@mui/material';
import {
  People as PeopleIcon,
  PersonAdd as PersonAddIcon,
  PersonRemove as PersonRemoveIcon,
  CompareArrows as CompareArrowsIcon,
  Settings as SettingsIcon,
  Upgrade as UpgradeIcon,
  GitHub as GitHubIcon,
  Group as GroupIcon,
  Favorite as FavoriteIcon,
  CheckCircle as CheckCircleIcon,
  Analytics as AnalyticsIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { keyframes } from '@emotion/react';

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.8; }
`;

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 20px 0 rgba(249,217,35,0.3); }
  50% { box-shadow: 0 0 40px 8px rgba(249,217,35,0.5); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

export default function Dashboard({ profile, followers, following }) {
  const navigate = useNavigate();
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Calculate stats (with mock data for demo)
  const followersCount = followers?.length || 1247;
  const followingCount = following?.length || 892;
  const mutualCount = followers?.filter(f => following?.some(f2 => f2.id === f.id)).length || 567;
  const notFollowingBack = following?.filter(f => !followers?.some(f2 => f2.id === f.id)).length || 325;
  const notFollowedBack = followers?.filter(f => !following?.some(f2 => f2.id === f.id)).length || 680;

  const dashboardCards = [
    {
      title: 'Account Summary',
      description: 'Overview of your GitHub network',
      icon: <AnalyticsIcon sx={{ fontSize: 40, color: '#1976d2' }} />,
      color: '#1976d2',
      gradient: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
      path: '/dashboard/summary',
      stats: `${followersCount} followers, ${followingCount} following`
    },
    {
      title: 'Mutual Followers',
      description: 'People you follow who follow you back',
      icon: <CompareArrowsIcon sx={{ fontSize: 40, color: '#43b649' }} />,
      color: '#43b649',
      gradient: 'linear-gradient(135deg, #43b649 0%, #66bb6a 100%)',
      path: '/dashboard/mutuals',
      stats: `${mutualCount} mutual connections`,
      badge: mutualCount > 0 ? mutualCount : null
    },
    {
      title: 'Not Following Back',
      description: 'People you follow who don\'t follow you',
      icon: <PersonRemoveIcon sx={{ fontSize: 40, color: '#f44336' }} />,
      color: '#f44336',
      gradient: 'linear-gradient(135deg, #f44336 0%, #ef5350 100%)',
      path: '/dashboard/not-following',
      stats: `${notFollowingBack} not following back`,
      badge: notFollowingBack > 0 ? notFollowingBack : null
    },
    {
      title: 'Not Followed Back',
      description: 'People following you who you don\'t follow',
      icon: <PersonAddIcon sx={{ fontSize: 40, color: '#ff9800' }} />,
      color: '#ff9800',
      gradient: 'linear-gradient(135deg, #ff9800 0%, #ffb74d 100%)',
      path: '/dashboard/not-followed-back',
      stats: `${notFollowedBack} not followed back`,
      badge: notFollowedBack > 0 ? notFollowedBack : null
    }
  ];

  const quickActions = [
    {
      title: 'Settings',
      description: 'Manage your preferences',
      icon: <SettingsIcon />,
      color: '#9c27b0',
      path: '/dashboard/settings'
    },
    {
      title: 'Upgrade',
      description: 'Get premium features',
      icon: <UpgradeIcon />,
      color: '#f9d923',
      path: '/dashboard/upgrade'
    }
  ];

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate refresh
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLastUpdated(new Date());
    setIsRefreshing(false);
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, rgba(240,248,255,0.9) 0%, rgba(255,248,220,0.9) 100%)',
      backdropFilter: 'blur(20px)',
      pt: 10,
      pb: 4,
      px: { xs: 2, md: 4 }
    }}>
      {/* Welcome Header */}
      <Box sx={{ 
        mb: 6, 
        textAlign: 'center',
        animation: `${fadeIn} 1s ease-out`,
      }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          gap: 3, 
          mb: 3 
        }}>
          <Avatar 
            src={profile?.avatar_url || 'https://i.pravatar.cc/150?img=8'} 
            sx={{ 
              width: 80, 
              height: 80, 
              border: '4px solid #43b649',
              boxShadow: '0 8px 32px rgba(67,182,73,0.3)',
              animation: `${float} 3s ease-in-out infinite`,
            }}
          />
          <Box>
            <Typography 
              variant="h3" 
              sx={{ 
                fontWeight: 900,
                background: 'linear-gradient(135deg, #1976d2 0%, #43b649 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                mb: 1,
              }}
            >
              Welcome back, {profile?.login || 'JohnDoe'}! 👋
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                color: '#666', 
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1
              }}
            >
              <GitHubIcon sx={{ fontSize: 20 }} />
              GitHub Network Dashboard
            </Typography>
          </Box>
        </Box>
        
        {/* Stats Overview */}
        <Paper sx={{ 
          p: 3, 
          mb: 4, 
          background: 'rgba(255,255,255,0.9)',
          backdropFilter: 'blur(20px)',
          borderRadius: 4,
          boxShadow: '0 8px 32px rgba(67,182,73,0.1)',
          border: '2px solid rgba(255,255,255,0.3)',
          maxWidth: 800,
          mx: 'auto'
        }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#1976d2' }}>
              Network Overview
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" sx={{ color: '#666' }}>
                Last updated: {lastUpdated.toLocaleTimeString()}
              </Typography>
              <Tooltip title="Refresh data">
                <IconButton 
                  onClick={handleRefresh} 
                  disabled={isRefreshing}
                  sx={{ 
                    color: '#43b649',
                    animation: isRefreshing ? `${pulse} 1s infinite` : 'none'
                  }}
                >
                  <RefreshIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
          
          <Grid container spacing={3}>
            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: 'center', p: 2 }}>
                <PeopleIcon sx={{ fontSize: 40, color: '#1976d2', mb: 1 }} />
                <Typography variant="h4" sx={{ fontWeight: 900, color: '#1976d2' }}>
                  {followersCount}
                </Typography>
                <Typography variant="body2" sx={{ color: '#666' }}>Followers</Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: 'center', p: 2 }}>
                <GroupIcon sx={{ fontSize: 40, color: '#43b649', mb: 1 }} />
                <Typography variant="h4" sx={{ fontWeight: 900, color: '#43b649' }}>
                  {followingCount}
                </Typography>
                <Typography variant="body2" sx={{ color: '#666' }}>Following</Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: 'center', p: 2 }}>
                <FavoriteIcon sx={{ fontSize: 40, color: '#f44336', mb: 1 }} />
                <Typography variant="h4" sx={{ fontWeight: 900, color: '#f44336' }}>
                  {mutualCount}
                </Typography>
                <Typography variant="body2" sx={{ color: '#666' }}>Mutuals</Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: 'center', p: 2 }}>
                <CheckCircleIcon sx={{ fontSize: 40, color: '#ff9800', mb: 1 }} />
                <Typography variant="h4" sx={{ fontWeight: 900, color: '#ff9800' }}>
                  {Math.round((mutualCount / Math.max(followingCount, 1)) * 100)}%
                </Typography>
                <Typography variant="body2" sx={{ color: '#666' }}>Match Rate</Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>

      {/* Main Dashboard Cards */}
      <Grid container spacing={4} sx={{ mb: 6 }}>
        {dashboardCards.map((card, index) => (
          <Grid item xs={12} md={6} lg={3} key={card.title}>
            <Card sx={{
              height: '100%',
              background: 'rgba(255,255,255,0.9)',
              backdropFilter: 'blur(20px)',
              borderRadius: 4,
              boxShadow: '0 8px 32px rgba(67,182,73,0.1)',
              border: '2px solid rgba(255,255,255,0.3)',
              transition: 'all 0.3s ease',
              animation: `${fadeIn} 1s ease-out ${index * 0.1}s both`,
              '&:hover': {
                transform: 'translateY(-8px) scale(1.02)',
                boxShadow: '0 16px 60px rgba(67,182,73,0.2)',
                borderColor: card.color,
              }
            }}>
              <CardActionArea 
                onClick={() => navigate(card.path)}
                sx={{ height: '100%', p: 3 }}
              >
                <CardContent sx={{ textAlign: 'center', p: 0 }}>
                  <Box sx={{ 
                    display: 'inline-block',
                    p: 2,
                    borderRadius: '50%',
                    background: card.gradient,
                    mb: 2,
                    animation: `${float} 3s ease-in-out infinite ${index * 0.5}s`,
                    position: 'relative'
                  }}>
                    {card.icon}
                    {card.badge && (
                      <Badge 
                        badgeContent={card.badge} 
                        color="error"
                        sx={{
                          position: 'absolute',
                          top: -8,
                          right: -8,
                          '& .MuiBadge-badge': {
                            background: '#f44336',
                            color: 'white',
                            fontWeight: 700,
                            fontSize: 12,
                          }
                        }}
                      />
                    )}
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 800, mb: 1, color: card.color }}>
                    {card.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#666', mb: 2, lineHeight: 1.5 }}>
                    {card.description}
                  </Typography>
                  <Chip 
                    label={card.stats} 
                    size="small" 
                    sx={{ 
                      background: `${card.color}15`,
                      color: card.color,
                      fontWeight: 600,
                      border: `1px solid ${card.color}30`
                    }} 
                  />
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Quick Actions */}
      <Box sx={{ mb: 6 }}>
        <Typography 
          variant="h5" 
          sx={{ 
            fontWeight: 800, 
            mb: 3, 
            textAlign: 'center',
            background: 'linear-gradient(135deg, #43b649 0%, #f9d923 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Quick Actions
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {quickActions.map((action, index) => (
            <Grid item xs={12} sm={6} md={4} key={action.title}>
              <Card sx={{
                background: 'rgba(255,255,255,0.9)',
                backdropFilter: 'blur(20px)',
                borderRadius: 4,
                boxShadow: '0 8px 32px rgba(67,182,73,0.1)',
                border: '2px solid rgba(255,255,255,0.3)',
                transition: 'all 0.3s ease',
                animation: `${fadeIn} 1s ease-out ${index * 0.2 + 0.5}s both`,
                '&:hover': {
                  transform: 'translateY(-4px) scale(1.02)',
                  boxShadow: '0 12px 40px rgba(67,182,73,0.2)',
                  borderColor: action.color,
                }
              }}>
                <CardActionArea 
                  onClick={() => navigate(action.path)}
                  sx={{ p: 3 }}
                >
                  <CardContent sx={{ textAlign: 'center', p: 0 }}>
                    <Box sx={{ 
                      display: 'inline-block',
                      p: 2,
                      borderRadius: '50%',
                      background: `linear-gradient(135deg, ${action.color}20 0%, ${action.color}40 100%)`,
                      border: `2px solid ${action.color}`,
                      mb: 2,
                      animation: `${glow} 3s infinite ${index * 0.5}s`,
                    }}>
                      {React.cloneElement(action.icon, { 
                        sx: { fontSize: 32, color: action.color } 
                      })}
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: action.color }}>
                      {action.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#666' }}>
                      {action.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Tips & Insights */}
      <Paper sx={{ 
        p: 4, 
        background: 'rgba(255,255,255,0.9)',
        backdropFilter: 'blur(20px)',
        borderRadius: 4,
        boxShadow: '0 8px 32px rgba(67,182,73,0.1)',
        border: '2px solid rgba(255,255,255,0.3)',
        maxWidth: 1000,
        mx: 'auto',
        animation: `${fadeIn} 1s ease-out 1s both`,
      }}>
        <Typography variant="h6" sx={{ fontWeight: 800, mb: 3, color: '#1976d2', textAlign: 'center' }}>
          💡 Tips & Insights
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Alert severity="info" sx={{ mb: 2 }}>
              <AlertTitle>Network Health</AlertTitle>
              Your mutual follower rate is {Math.round((mutualCount / Math.max(followingCount, 1)) * 100)}%. 
              {mutualCount > followingCount * 0.7 ? ' Excellent engagement!' : ' Consider engaging more with your followers.'}
            </Alert>
          </Grid>
          <Grid item xs={12} md={6}>
            <Alert severity="success" sx={{ mb: 2 }}>
              <AlertTitle>Quick Actions</AlertTitle>
              Use the dashboard cards above to analyze your network and discover new connections.
            </Alert>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
} 