// CoverPage.jsx
import React, { useRef, useEffect, useState } from 'react';
import {
  Box, Typography, Button, Paper, Grid, Divider, Fab, Chip, Avatar, Card, CardContent, Alert, Snackbar
} from '@mui/material';
import {
  GitHub as GitHubIcon,
  Star as StarIcon,
  CompareArrows as CompareArrowsIcon,
  FileDownload as FileDownloadIcon,
  Group as GroupIcon,
  TrendingUp as TrendingUpIcon,
  Update as UpdateIcon,
  People as PeopleIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';
import ShieldIcon from '@mui/icons-material/Shield';
import { keyframes } from '@emotion/react';
import AnimatedGuide from '../components/AnimatedGuide';
import FeatureCarousel from '../components/FeatureCarousel';
import CodeIcon from '@mui/icons-material/Code';

const howItWorks = [
  { icon: <GitHubIcon sx={{ color: '#1976d2', fontSize: 36 }} />, title: 'Login', desc: 'Sign in with GitHub or Email' },
  { icon: <GroupIcon sx={{ color: '#43b649', fontSize: 36 }} />, title: 'See Followers', desc: 'View your followers, mutuals, and more' },
  { icon: <FileDownloadIcon sx={{ color: '#f9d923', fontSize: 36 }} />, title: 'Take Action', desc: 'Unfollow, export, or analyze your network' },
];

const heroImages = [
  // SVGs or JSX for each hero image/scene
  (
    <svg width="420" height="260" viewBox="0 0 420 260" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="210" cy="130" rx="180" ry="80" fill="#e0e7ff" />
      <ellipse cx="210" cy="140" rx="140" ry="60" fill="#fce4ec" fillOpacity="0.7" />
      <circle cx="210" cy="120" r="50" fill="#1976d2" fillOpacity="0.15">
        <animate attributeName="r" values="50;60;50" dur="2.2s" repeatCount="indefinite" />
      </circle>
      <circle cx="140" cy="110" r="18" fill="#f06292" fillOpacity="0.25">
        <animate attributeName="r" values="18;24;18" dur="2.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="280" cy="170" r="24" fill="#1976d2" fillOpacity="0.18">
        <animate attributeName="r" values="24;32;24" dur="2.1s" repeatCount="indefinite" />
      </circle>
      <rect x="180" y="90" width="60" height="60" rx="30" fill="#fff" fillOpacity="0.7" />
      <circle cx="210" cy="120" r="28" fill="#fff" />
      <path d="M210 105a15 15 0 100 30 15 15 0 000-30zm0 5a10 10 0 110 20 10 10 0 010-20z" fill="#1976d2" />
    </svg>
  ),
  (
    <svg width="420" height="260" viewBox="0 0 420 260" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="210" cy="130" rx="180" ry="80" fill="#fffbe7" />
      <ellipse cx="210" cy="140" rx="140" ry="60" fill="#e0ffe7" fillOpacity="0.7" />
      <circle cx="210" cy="120" r="50" fill="#43b649" fillOpacity="0.13">
        <animate attributeName="r" values="50;60;50" dur="2.2s" repeatCount="indefinite" />
      </circle>
      <circle cx="140" cy="110" r="18" fill="#f9d923" fillOpacity="0.18">
        <animate attributeName="r" values="18;24;18" dur="2.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="280" cy="170" r="24" fill="#1976d2" fillOpacity="0.13">
        <animate attributeName="r" values="24;32;24" dur="2.1s" repeatCount="indefinite" />
      </circle>
      <rect x="180" y="90" width="60" height="60" rx="30" fill="#fff" fillOpacity="0.7" />
      <circle cx="210" cy="120" r="28" fill="#fff" />
      <path d="M210 105a15 15 0 100 30 15 15 0 000-30zm0 5a10 10 0 110 20 10 10 0 010-20z" fill="#43b649" />
    </svg>
  ),
  (
    <svg width="420" height="260" viewBox="0 0 420 260" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="210" cy="130" rx="180" ry="80" fill="#e0e7ff" />
      <ellipse cx="210" cy="140" rx="140" ry="60" fill="#fce4ec" fillOpacity="0.7" />
      <circle cx="210" cy="120" r="50" fill="#f9d923" fillOpacity="0.13">
        <animate attributeName="r" values="50;60;50" dur="2.2s" repeatCount="indefinite" />
      </circle>
      <circle cx="140" cy="110" r="18" fill="#43b649" fillOpacity="0.18">
        <animate attributeName="r" values="18;24;18" dur="2.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="280" cy="170" r="24" fill="#1976d2" fillOpacity="0.13">
        <animate attributeName="r" values="24;32;24" dur="2.1s" repeatCount="indefinite" />
      </circle>
      <rect x="180" y="90" width="60" height="60" rx="30" fill="#fff" fillOpacity="0.7" />
      <circle cx="210" cy="120" r="28" fill="#fff" />
      <path d="M210 105a15 15 0 100 30 15 15 0 000-30zm0 5a10 10 0 110 20 10 10 0 010-20z" fill="#f9d923" />
    </svg>
  ),
];

// Enhanced animated background keyframes
const bgMove = keyframes`
  0% { background-position: 0% 0%; }
  100% { background-position: 100% 100%; }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
`;

const pulse = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.7; }
  100% { transform: scale(1); opacity: 1; }
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-10px); }
  60% { transform: translateY(-5px); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const rotate = keyframes`
  from { transform: translate(-50%, -50%) rotate(0deg); }
  to { transform: translate(-50%, -50%) rotate(360deg); }
`;

// Testimonials data
const testimonials = [
  {
    name: "Sarah Chen",
    role: "Full Stack Developer",
    avatar: "SC",
    content: "ByeBuddy helped me clean up my GitHub network. The mutual followers feature is brilliant!",
    rating: 5
  },
  {
    name: "Marcus Rodriguez",
    role: "Open Source Contributor",
    avatar: "MR",
    content: "Finally, a tool that respects privacy while being incredibly useful. Love the export feature!",
    rating: 5
  },
  {
    name: "Aisha Patel",
    role: "Tech Lead",
    avatar: "AP",
    content: "Our team uses ByeBuddy to manage our GitHub presence. It's become an essential tool.",
    rating: 5
  }
];

// Tech stack data
const techStack = [
  { name: "React", icon: "⚛️", color: "#61DAFB" },
  { name: "Django", icon: "🐍", color: "#092E20" },
  { name: "GitHub API", icon: "📡", color: "#181717" },
  { name: "Material-UI", icon: "🎨", color: "#0081CB" },
  { name: "Framer Motion", icon: "✨", color: "#0055FF" },
  { name: "PostgreSQL", icon: "🐘", color: "#336791" }
];

// Latest updates data
const latestUpdates = [
  { 
    title: "Real-time Sync", 
    description: "Live follower updates every 5 minutes",
    icon: <UpdateIcon />,
    badge: "NEW",
    color: "#43b649"
  },
  { 
    title: "Advanced Analytics", 
    description: "Detailed insights and trends",
    icon: <TrendingUpIcon />,
    badge: "BETA",
    color: "#f9d923"
  },
  { 
    title: "Privacy Controls", 
    description: "Enhanced data protection",
    icon: <ShieldIcon />,
    badge: "SECURE",
    color: "#1976d2"
  }
];

// Stats component with animated counters
function AnimatedStats() {
  const [counts, setCounts] = useState({ users: 0, followers: 0, mutuals: 0 });
  
  useEffect(() => {
    const targetCounts = { users: 15420, followers: 892340, mutuals: 234560 };
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;
    
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const easeOut = 1 - Math.pow(1 - progress, 3);
      
      setCounts({
        users: Math.floor(targetCounts.users * easeOut),
        followers: Math.floor(targetCounts.followers * easeOut),
        mutuals: Math.floor(targetCounts.mutuals * easeOut)
      });
      
      if (step >= steps) clearInterval(timer);
    }, stepDuration);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'space-around', 
      flexWrap: 'wrap', 
      gap: 4, 
      py: 6, 
      px: 2,
      background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(240,248,255,0.9) 100%)',
      borderRadius: 4,
      backdropFilter: 'blur(10px)',
      boxShadow: '0 8px 32px rgba(67, 182, 73, 0.1)',
      border: '1px solid rgba(255,255,255,0.2)'
    }}>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h3" sx={{ fontWeight: 900, color: '#1976d2', mb: 1 }}>
          {counts.users.toLocaleString()}+
        </Typography>
        <Typography variant="body1" sx={{ color: '#666', fontWeight: 500 }}>
          Active Users
        </Typography>
      </Box>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h3" sx={{ fontWeight: 900, color: '#43b649', mb: 1 }}>
          {counts.followers.toLocaleString()}+
        </Typography>
        <Typography variant="body1" sx={{ color: '#666', fontWeight: 500 }}>
          Followers Tracked
        </Typography>
      </Box>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h3" sx={{ fontWeight: 900, color: '#f9d923', mb: 1 }}>
          {counts.mutuals.toLocaleString()}+
        </Typography>
        <Typography variant="body1" sx={{ color: '#666', fontWeight: 500 }}>
          Mutual Connections
        </Typography>
      </Box>
    </Box>
  );
}

function LargeHeroCarousel() {
  const [idx, setIdx] = React.useState(0);
  React.useEffect(() => {
    const timer = setInterval(() => setIdx(i => (i + 1) % heroImages.length), 3000);
    return () => clearInterval(timer);
  }, []);
  return (
    <Box sx={{ 
      width: { xs: '100%', md: 480 }, 
      minHeight: 500, 
      mx: 'auto', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      background: 'linear-gradient(135deg, #ffffff 0%, #f8faff 100%)', 
      borderRadius: 6, 
      boxShadow: '0 20px 60px rgba(67, 182, 73, 0.15), 0 8px 32px rgba(25, 118, 210, 0.1)', 
      p: 2, 
      mb: 2, 
      position: 'relative', 
      zIndex: 3,
      border: '1px solid rgba(255,255,255,0.8)',
      backdropFilter: 'blur(10px)',
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'translateY(-8px)',
        boxShadow: '0 32px 80px rgba(67, 182, 73, 0.2), 0 12px 40px rgba(25, 118, 210, 0.15)'
      }
    }}>
      {/* Enhanced floating images with better styling */}
      <img
        src="/ddd.jpg"
        alt="ddd"
        style={{
          width: 180,
          height: 180,
          objectFit: 'cover',
          marginBottom: 16,
          borderRadius: '50%',
          boxShadow: '0 12px 40px rgba(67, 182, 73, 0.3), 0 4px 16px rgba(249, 217, 35, 0.2)',
          border: '4px solid #f9d923',
          background: '#fffbe7',
          animation: `${float} 6s ease-in-out infinite`,
        }}
      />
      <img
        src="/ffff.jpg"
        alt="ffff"
        style={{
          width: 140,
          height: 140,
          objectFit: 'cover',
          marginBottom: 16,
          borderRadius: '50%',
          boxShadow: '0 12px 40px rgba(67, 182, 73, 0.3), 0 4px 16px rgba(67, 182, 73, 0.2)',
          border: '4px solid #43b649',
          background: '#e0ffe7',
          animation: `${float} 6s ease-in-out infinite 1s`,
        }}
      />
      {heroImages[idx]}
    </Box>
  );
}

// DottedConnector component
function DottedConnector() {
  return (
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', my: { xs: 2, md: 3 } }}>
      <svg width="60vw" height="48" viewBox="0 0 600 48" fill="none" style={{ maxWidth: 700, minWidth: 240 }}>
        <path
          d="M10 38 Q150 0 300 38 T590 38"
          stroke="#888"
          strokeWidth="2.5"
          strokeDasharray="8 8"
          fill="none"
        />
        <polygon points="590,38 580,33 583,38 580,43" fill="#888" />
      </svg>
    </Box>
  );
}

// Testimonial Carousel Component
function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Box sx={{ 
      py: 6, 
      px: 2, 
      background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(240,248,255,0.9) 100%)',
      borderRadius: 4,
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255,255,255,0.3)',
      boxShadow: '0 12px 40px rgba(67, 182, 73, 0.1)'
    }}>
      <Typography 
        variant="h4" 
        sx={{ 
          fontWeight: 900, 
          textAlign: 'center', 
          mb: 4,
          background: 'linear-gradient(135deg, #1976d2 0%, #43b649 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}
      >
        What Our Users Say
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
        <Card sx={{ 
          maxWidth: 500, 
          textAlign: 'center',
          background: 'rgba(255,255,255,0.8)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.3)',
          boxShadow: '0 8px 32px rgba(67, 182, 73, 0.15)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 16px 48px rgba(67, 182, 73, 0.25)'
          }
        }}>
          <CardContent sx={{ p: 4 }}>
            <Avatar sx={{ 
              width: 80, 
              height: 80, 
              mx: 'auto', 
              mb: 2,
              background: 'linear-gradient(135deg, #1976d2 0%, #43b649 100%)',
              fontSize: '1.5rem',
              fontWeight: 'bold'
            }}>
              {testimonials[currentIndex].avatar}
            </Avatar>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                <StarIcon key={i} sx={{ color: '#f9d923', fontSize: 20 }} />
              ))}
            </Box>
            <Typography variant="body1" sx={{ mb: 2, fontStyle: 'italic', color: '#666' }}>
              "{testimonials[currentIndex].content}"
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#1976d2' }}>
              {testimonials[currentIndex].name}
            </Typography>
            <Typography variant="body2" sx={{ color: '#888' }}>
              {testimonials[currentIndex].role}
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, gap: 1 }}>
        {testimonials.map((_, index) => (
          <Box
            key={index}
            sx={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              background: index === currentIndex ? '#43b649' : '#ddd',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              '&:hover': { background: '#43b649' }
            }}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </Box>
    </Box>
  );
}

// Tech Stack Component
function TechStackSection() {
  return (
    <Box sx={{ py: 6, px: 2, position: 'relative', minHeight: 600 }}>
      {/* Centered Container for Sun and Orbit */}
      <Box sx={{ 
        position: 'absolute', 
        top: '50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)',
        width: 500,
        height: 500,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {/* Center Sun - "Built with Modern Tech" */}
        <Box sx={{ 
          position: 'relative', 
          zIndex: 3,
          textAlign: 'center',
          background: 'radial-gradient(circle, #f9d923 0%, #ff9800 50%, #f57c00 100%)',
          borderRadius: '50%',
          width: 180,
          height: 180,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 60px #f9d923, 0 0 120px #ff9800, inset 0 0 20px rgba(255,255,255,0.3)',
          animation: `${pulse} 2s infinite`,
          border: '3px solid #f57c00'
        }}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 900,
              color: '#fff',
              fontSize: { xs: '1rem', md: '1.2rem' },
              lineHeight: 1.2,
              textAlign: 'center',
              textShadow: '0 2px 4px rgba(0,0,0,0.3)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: '100%'
            }}
          >
            Built with<br />Modern Tech
          </Typography>
        </Box>

      {/* True Circular Orbit Path */}
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        height: 400,
        borderRadius: '50%',
        border: '3px dashed rgba(67,182,73,0.4)',
        zIndex: 1,
        boxShadow: '0 0 20px rgba(67,182,73,0.1)'
      }} />

      {/* Planets Following True Circular Path */}
      {techStack.map((tech, index) => {
        const orbitRadius = 200; // Exact radius from center
        const orbitSpeed = 40; // Same speed for all
        const startAngle = (index * 60); // Perfect 60° spacing
        
        return (
          <Box
            key={index}
            sx={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: orbitRadius * 2,
              height: orbitRadius * 2,
              animation: `${rotate} ${orbitSpeed}s linear infinite`,
              animationDelay: `${(startAngle / 360) * orbitSpeed}s`
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: -25, // Half of planet height (50/2) to center it on the orbit
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 2,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateX(-50%) scale(1.3)',
                  zIndex: 4,
                }
              }}
            >
              {/* True Circular Planet */}
              <Box sx={{
                width: 50,
                height: 50,
                borderRadius: '50%',
                position: 'relative',
                background: `radial-gradient(circle, ${tech.color}88 0%, ${tech.color}44 50%, ${tech.color}22 100%)`,
                boxShadow: `0 0 20px ${tech.color}44, inset 0 0 10px rgba(255,255,255,0.2)`,
                border: `2px solid ${tech.color}66`,
                // Remove planet rotation to maintain true circular orbit
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: '15%',
                  left: '20%',
                  width: '20%',
                  height: '20%',
                  borderRadius: '50%',
                  background: `radial-gradient(circle, ${tech.color}99 0%, ${tech.color}66 100%)`,
                  boxShadow: `0 0 8px ${tech.color}88`
                },
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: '60%',
                  left: '70%',
                  width: '15%',
                  height: '15%',
                  borderRadius: '50%',
                  background: `radial-gradient(circle, ${tech.color}77 0%, ${tech.color}44 100%)`,
                  boxShadow: `0 0 6px ${tech.color}66`
                }
              }}>
                {/* Tech Icon in center */}
                <Box sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  fontSize: '1.2rem',
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
                }}>
                  {tech.icon}
                </Box>
              </Box>
              
              {/* Planet Name */}
              <Typography
                sx={{
                  position: 'absolute',
                  top: 60,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  color: tech.color,
                  textAlign: 'center',
                  textShadow: `0 1px 2px ${tech.color}44`,
                  whiteSpace: 'nowrap'
                }}
              >
                {tech.name}
              </Typography>
            </Box>
          </Box>
        );
      })}

      {/* Glowing Center Effect */}
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        height: 500,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(249,217,35,0.08) 0%, rgba(249,217,35,0.04) 50%, transparent 100%)',
        zIndex: 0,
        animation: `${pulse} 3s infinite`
      }} />

      {/* Center Reference Point */}
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 4,
        height: 4,
        borderRadius: '50%',
        background: 'rgba(67,182,73,0.8)',
        zIndex: 5
      }} />

      {/* Perfect Circle Verification */}
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        height: 400,
        borderRadius: '50%',
        border: '1px solid rgba(67,182,73,0.1)',
        zIndex: 0
      }} />
      </Box>
    </Box>
  );
}

// Latest Updates Component
function LatestUpdatesSection() {
  return (
    <Box sx={{ py: 6, px: 2 }}>
      <Typography 
        variant="h4" 
        sx={{ 
          fontWeight: 900, 
          textAlign: 'center', 
          mb: 4,
          background: 'linear-gradient(135deg, #1976d2 0%, #43b649 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}
      >
        Latest Updates
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {latestUpdates.map((update, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card sx={{ 
              p: 3, 
              textAlign: 'center',
              background: 'rgba(255,255,255,0.8)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.3)',
              boxShadow: '0 8px 32px rgba(67, 182, 73, 0.15)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 16px 48px rgba(67, 182, 73, 0.25)'
              }
            }}>
              <Box sx={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                width: 60, 
                height: 60, 
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${update.color}22 0%, ${update.color}11 100%)`,
                mb: 2,
                animation: `${pulse} 2s infinite`
              }}>
                {React.cloneElement(update.icon, { 
                  sx: { fontSize: 30, color: update.color } 
                })}
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: '#1976d2' }}>
                {update.title}
              </Typography>
              <Typography variant="body2" sx={{ color: '#666', mb: 2 }}>
                {update.description}
              </Typography>
              <Chip
                label={update.badge}
                size="small"
                sx={{
                  background: update.color,
                  color: 'white',
                  fontWeight: 600,
                  animation: `${bounce} 2s infinite`
                }}
              />
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

// Community Stats Component
function CommunitySection() {
  return (
    <Box sx={{ 
      py: 6, 
      px: 2,
      background: 'linear-gradient(135deg, rgba(224, 255, 231, 0.9) 0%, rgba(255, 251, 231, 0.9) 100%)',
      borderRadius: 4,
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255,255,255,0.3)',
      boxShadow: '0 12px 40px rgba(67, 182, 73, 0.1)'
    }}>
      <Typography 
        variant="h4" 
        sx={{ 
          fontWeight: 900, 
          textAlign: 'center', 
          mb: 4,
          background: 'linear-gradient(135deg, #43b649 0%, #f9d923 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}
      >
        Join Our Community
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={3}>
          <Box sx={{ textAlign: 'center' }}>
            <PeopleIcon sx={{ fontSize: 48, color: '#1976d2', mb: 2 }} />
            <Typography variant="h5" sx={{ fontWeight: 900, color: '#1976d2', mb: 1 }}>
              2,847
            </Typography>
            <Typography variant="body1" sx={{ color: '#666' }}>
              Active Users
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
          <Box sx={{ textAlign: 'center' }}>
            <StarIcon sx={{ fontSize: 48, color: '#f9d923', mb: 2 }} />
            <Typography variant="h5" sx={{ fontWeight: 900, color: '#f9d923', mb: 1 }}>
              4.9/5
            </Typography>
            <Typography variant="body1" sx={{ color: '#666' }}>
              User Rating
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
          <Box sx={{ textAlign: 'center' }}>
            <CodeIcon sx={{ fontSize: 48, color: '#43b649', mb: 2 }} />
            <Typography variant="h5" sx={{ fontWeight: 900, color: '#43b649', mb: 1 }}>
              156
            </Typography>
            <Typography variant="body1" sx={{ color: '#666' }}>
              Contributors
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
          <Box sx={{ textAlign: 'center' }}>
            <CheckCircleIcon sx={{ fontSize: 48, color: '#1976d2', mb: 2 }} />
            <Typography variant="h5" sx={{ fontWeight: 900, color: '#1976d2', mb: 1 }}>
              99.9%
            </Typography>
            <Typography variant="body1" sx={{ color: '#666' }}>
              Uptime
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

// Move GreenCurveSeparator here
function GreenCurveSeparator() {
  return (
    <Box sx={{ width: '100%', height: { xs: 180, md: 260 }, my: { xs: 3, md: 6 }, overflow: 'hidden', position: 'relative', zIndex: 2, background: 'linear-gradient(90deg, #e0ffe7 0%, #fffbe7 100%)' }}>
      <svg width="100%" height="100%" viewBox="0 0 1440 260" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
        <defs>
          {/* Ethiopian flag gradient: green, yellow, red */}
          <linearGradient id="ethiopianFlagCurve" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#078930" />
            <stop offset="33%" stopColor="#FCDD09" />
            <stop offset="66%" stopColor="#DA121A" />
            <stop offset="100%" stopColor="#DA121A" />
          </linearGradient>
          <linearGradient id="ethiopianFlagCurve2" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FCDD09" />
            <stop offset="50%" stopColor="#078930" />
            <stop offset="100%" stopColor="#DA121A" />
          </linearGradient>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="24" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* Main animated river path with Ethiopian flag colors */}
        <path
          id="riverPath"
          d="M0,130 Q400,60 800,180 T1440,110"
          stroke="url(#ethiopianFlagCurve)"
          strokeWidth="36"
          fill="none"
          opacity="0.9"
          filter="url(#glow)"
        >
          <animate attributeName="d"
            values="M0,130 Q400,60 800,180 T1440,110;M0,150 Q400,100 800,160 T1440,130;M0,130 Q400,60 800,180 T1440,110"
            dur="6s"
            repeatCount="indefinite"
          />
        </path>
        {/* Second offset river path for depth, also flag colors */}
        <path
          d="M0,200 Q400,160 800,240 T1440,180"
          stroke="url(#ethiopianFlagCurve2)"
          strokeWidth="18"
          fill="none"
          opacity="0.4"
          filter="url(#glow)"
        >
          <animate attributeName="d"
            values="M0,200 Q400,160 800,240 T1440,180;M0,220 Q400,200 800,220 T1440,200;M0,200 Q400,160 800,240 T1440,180"
            dur="7s"
            repeatCount="indefinite"
          />
        </path>
        {/* Animated sparkles */}
        <circle cx="400" cy="100" r="10" fill="#fff" opacity="0.7">
          <animate attributeName="cy" values="100;80;100" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.7;1;0.7" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="900" cy="180" r="8" fill="#fff" opacity="0.6">
          <animate attributeName="cy" values="180;160;180" dur="2.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.6;1;0.6" dur="2.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="1200" cy="160" r="14" fill="#fff" opacity="0.8">
          <animate attributeName="cy" values="160;140;160" dur="4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.8;1;0.8" dur="4s" repeatCount="indefinite" />
        </circle>
        {/* Animated accent circles in flag colors */}
        <circle cx="1200" cy="200" r="80" fill="#078930" opacity="0.13">
          <animate attributeName="cy" values="200;180;200" dur="4s" repeatCount="indefinite" />
          <animate attributeName="r" values="80;96;80" dur="3.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="300" cy="110" r="56" fill="#FCDD09" opacity="0.10">
          <animate attributeName="cy" values="110;130;110" dur="5s" repeatCount="indefinite" />
          <animate attributeName="r" values="56;72;56" dur="4.2s" repeatCount="indefinite" />
        </circle>
        <circle cx="700" cy="150" r="44" fill="#DA121A" opacity="0.12">
          <animate attributeName="cy" values="150;130;150" dur="4.7s" repeatCount="indefinite" />
          <animate attributeName="r" values="44;60;44" dur="3.8s" repeatCount="indefinite" />
        </circle>
      </svg>
    </Box>
  );
}

// DottedStepConnector for How It Works
function DottedStepConnector() {
  return (
    <Box sx={{
      position: 'absolute',
      top: { xs: 0, md: 0 }, // align with icon centers
      left: 0,
      width: '100%',
      height: { xs: 160, md: 160 },
      pointerEvents: 'none',
      zIndex: 1,
      display: { xs: 'none', md: 'block' },
    }}>
      <svg width="100%" height="160" viewBox="0 0 1200 160" fill="none" style={{ width: '100%', height: 160 }}>
        {/* First segment: from left icon to center icon */}
        <path
          d="M240 80 Q340 40 420 80 Q500 120 600 80"
          stroke="#888"
          strokeWidth="3"
          strokeDasharray="8 8"
          fill="none"
        />
        {/* Arrowhead for first segment */}
        <polygon points="600,80 590,75 593,80 590,85" fill="#888" />
        {/* Second segment: from center icon to right icon */}
        <path
          d="M600 80 Q700 40 780 80 Q860 120 960 80"
          stroke="#888"
          strokeWidth="3"
          strokeDasharray="8 8"
          fill="none"
        />
        {/* Arrowhead for second segment */}
        <polygon points="960,80 950,75 953,80 950,85" fill="#888" />
      </svg>
    </Box>
  );
}

export default function CoverPage(props) {
  const heroRef = useRef();
  const [parallax, setParallax] = useState('');
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const handleMove = e => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 12;
      setParallax(`translate(${x}px, ${y}px)`);
    };
    const node = heroRef.current;
    node?.addEventListener('mousemove', handleMove);
    node?.addEventListener('mouseleave', () => setParallax(''));
    return () => {
      node?.removeEventListener('mousemove', handleMove);
      node?.removeEventListener('mouseleave', () => setParallax(''));
    };
  }, []);

  useEffect(() => {
    // Show welcome notification after 2 seconds
    const timer = setTimeout(() => setShowNotification(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      bgcolor: 'background.default',
      position: 'relative', 
      overflow: 'hidden' 
    }}>
      {/* Enhanced animated gradient overlay */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)',
        backgroundSize: '400% 400%',
        animation: `${bgMove} 20s ease infinite`,
        opacity: 0.6,
        filter: 'blur(1px)',
      }} />

      {/* Enhanced floating particles with better distribution */}
      <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none' }}>
        {[...Array(25)].map((_, i) => (
          <Box
            key={i}
            sx={{
              position: 'absolute',
              width: Math.random() * 8 + 3,
              height: Math.random() * 8 + 3,
              background: `rgba(255,255,255,${Math.random() * 0.3 + 0.1})`,
              borderRadius: Math.random() > 0.5 ? '50%' : '0%',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `${float} ${Math.random() * 20 + 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 10}s`,
              transform: `rotate(${Math.random() * 360}deg)`,
              filter: 'blur(0.5px)',
            }}
          />
        ))}
      </Box>

      {/* Enhanced Welcome Notification */}
      <Snackbar
        open={showNotification}
        autoHideDuration={8000}
        onClose={() => setShowNotification(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setShowNotification(false)} 
          severity="success" 
          sx={{ 
            background: 'linear-gradient(135deg, #43b649 0%, #1976d2 100%)',
            color: 'white',
            fontWeight: 700,
            boxShadow: '0 12px 40px rgba(67, 182, 73, 0.4)',
            borderRadius: 3,
            border: '2px solid rgba(255,255,255,0.3)',
            backdropFilter: 'blur(10px)',
            fontSize: 16,
            '& .MuiAlert-icon': {
              color: 'white',
              fontSize: 28,
            }
          }}
        >
          🎉 Welcome to ByeBuddy! Track your GitHub followers with style and precision!
        </Alert>
      </Snackbar>

      {/* Enhanced Section 1: Hero, Trusted By, Features */}
      <Box sx={{ 
        pb: 10, 
        background: 'rgba(255,255,255,0.95)', 
        backdropFilter: 'blur(25px)',
        borderBottomLeftRadius: { xs: 40, md: 100 }, 
        borderBottomRightRadius: { xs: 40, md: 100 }, 
        boxShadow: '0 25px 80px rgba(0,0,0,0.12)', 
        position: 'relative', 
        zIndex: 2, 
        overflow: 'hidden',
        border: '2px solid rgba(255,255,255,0.3)',
      }}>
        {/* Enhanced flowing green SVG curve background */}
        <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: { xs: 200, md: 350 }, zIndex: 0, pointerEvents: 'none' }}>
          <svg width="100%" height="100%" viewBox="0 0 1440 350" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
            <path
              d="M0,140 Q400,60 800,200 T1440,120"
              stroke="url(#heroGradient)"
              strokeWidth="20"
              fill="none"
              opacity="0.7"
            />
            <defs>
              <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#5ec9a6" />
                <stop offset="50%" stopColor="#43b649" />
                <stop offset="100%" stopColor="#f9d923" />
              </linearGradient>
            </defs>
            <circle cx="1200" cy="280" r="140" fill="url(#heroGradient)" opacity="0.2" />
            <circle cx="300" cy="100" r="80" fill="url(#heroGradient)" opacity="0.15" />
            <circle cx="800" cy="50" r="60" fill="url(#heroGradient)" opacity="0.1" />
          </svg>
        </Box>

        {/* Enhanced Hero Section */}
        <Box sx={{ 
          pt: { xs: 10, md: 16 }, 
          pb: 8, 
          px: { xs: 3, md: 10 }, 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' }, 
          alignItems: 'center', 
          justifyContent: 'center', 
          gap: 8, 
          zIndex: 2, 
          position: 'relative' 
        }}>
          {/* Enhanced Left: App name, tagline, CTA */}
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', md: 'flex-start' }, gap: 3 }}>
            <Box sx={{ position: 'relative' }}>
              <Typography 
                variant="h1" 
                sx={{ 
                  fontWeight: 900, 
                  background: 'linear-gradient(135deg, #1976d2 0%, #43b649 50%, #f9d923 100%)',
                  backgroundSize: '200% 200%',
                  animation: `${shimmer} 4s ease-in-out infinite`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  mb: 1, 
                  letterSpacing: 3, 
                  textAlign: { xs: 'center', md: 'left' }, 
                  textShadow: '0 6px 30px rgba(67, 182, 73, 0.4)',
                  fontSize: { xs: '3.5rem', md: '5rem' },
                  lineHeight: 1.1,
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -10,
                    left: 0,
                    right: 0,
                    height: 8,
                    background: 'linear-gradient(90deg, #f9d923 0%, #43b649 50%, #1976d2 100%)',
                    borderRadius: 4,
                    opacity: 0.8,
                    animation: 'underlineGlow 3s ease-in-out infinite alternate',
                    '@keyframes underlineGlow': {
                      from: { opacity: 0.6, boxShadow: '0 0 10px rgba(249,217,35,0.3)' },
                      to: { opacity: 1, boxShadow: '0 0 20px rgba(249,217,35,0.6)' }
                    }
                  }
                }}
              >
                ByeBuddy
              </Typography>
            </Box>
            <Typography 
              variant="h3" 
              sx={{ 
                color: '#43b649', 
                mb: 3, 
                fontWeight: 700, 
                textAlign: { xs: 'center', md: 'left' }, 
                textShadow: '0 3px 12px rgba(249, 217, 35, 0.5)',
                fontSize: { xs: '1.8rem', md: '2.5rem' },
                letterSpacing: 1,
                animation: `${fadeIn} 1.5s ease-out 0.5s both`,
              }}
            >
              Track your GitHub followers in real time
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                color: '#666', 
                mb: 4, 
                fontWeight: 500, 
                textAlign: { xs: 'center', md: 'left' }, 
                fontSize: { xs: '1.1rem', md: '1.3rem' },
                maxWidth: 500,
                lineHeight: 1.6,
                animation: `${fadeIn} 1.5s ease-out 1s both`,
              }}
            >
              Discover mutual followers, analyze your network, and manage your GitHub presence with powerful insights and beautiful analytics.
            </Typography>
            <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', justifyContent: { xs: 'center', md: 'flex-start' } }}>
              <Button 
                variant="contained" 
                color="primary" 
                startIcon={<GitHubIcon />} 
                sx={{ 
                  px: 6, 
                  py: 2.5, 
                  fontWeight: 800, 
                  fontSize: 20, 
                  borderRadius: 4, 
                  boxShadow: '0 12px 40px rgba(67, 182, 73, 0.5)', 
                  animation: `${pulse} 2.5s infinite`, 
                  transition: 'all 0.4s ease', 
                  background: 'linear-gradient(135deg, #1976d2 0%, #43b649 100%)',
                  textTransform: 'none',
                  letterSpacing: 1,
                  ':hover': { 
                    transform: 'scale(1.08) translateY(-3px)', 
                    boxShadow: '0 16px 60px rgba(67, 182, 73, 0.7)',
                    background: 'linear-gradient(135deg, #43b649 0%, #1976d2 100%)'
                  },
                  animation: `${fadeIn} 1.5s ease-out 1.5s both`,
                }} 
                onClick={props.handleOpenModal}
              >
                Get Started
              </Button>
              <Button 
                variant="outlined" 
                color="primary" 
                startIcon={<StarIcon />} 
                sx={{ 
                  px: 4, 
                  py: 2.5, 
                  fontWeight: 700, 
                  fontSize: 18, 
                  borderRadius: 4, 
                  borderWidth: 3,
                  borderColor: '#f9d923',
                  color: '#f9d923',
                  textTransform: 'none',
                  letterSpacing: 1,
                  transition: 'all 0.4s ease',
                  background: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(10px)',
                  ':hover': { 
                    transform: 'scale(1.05) translateY(-2px)', 
                    boxShadow: '0 8px 30px rgba(249, 217, 35, 0.4)',
                    background: 'rgba(249, 217, 35, 0.1)',
                    borderColor: '#43b649',
                    color: '#43b649',
                  },
                  animation: `${fadeIn} 1.5s ease-out 2s both`,
                }}
              >
                Learn More
              </Button>
            </Box>
          </Box>
          {/* Enhanced Right: Large, independent hero image carousel */}
          <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 3 }}>
            <Box sx={{ 
              transform: parallax,
              transition: 'transform 0.1s ease-out',
              animation: `${fadeIn} 1.5s ease-out 2.5s both`,
            }}>
              <LargeHeroCarousel />
            </Box>
          </Box>
        </Box>

        {/* Enhanced Stats Section */}
        <Box sx={{ px: { xs: 3, md: 10 }, mb: 8 }}>
          <Box sx={{ 
            animation: `${fadeIn} 1.5s ease-out 3s both`,
          }}>
            <AnimatedStats />
          </Box>
        </Box>

        {/* Enhanced Features Row */}
        <Box sx={{ 
          animation: `${fadeIn} 1.5s ease-out 3.5s both`,
        }}>
          <FeatureCarousel />
        </Box>
        <DottedConnector />
      </Box>

      <GreenCurveSeparator />

      {/* Enhanced Testimonials Section */}
      <Box id="testimonials" sx={{ 
        px: { xs: 3, md: 10 }, 
        mb: 8,
        animation: `${fadeIn} 1s ease-out both`,
        animationDelay: '0.5s',
      }}>
        <Box sx={{ 
          background: 'rgba(255,255,255,0.9)',
          backdropFilter: 'blur(20px)',
          borderRadius: 6,
          p: 4,
          boxShadow: '0 20px 60px rgba(67,182,73,0.1)',
          border: '2px solid rgba(255,255,255,0.3)',
        }}>
          <TestimonialCarousel />
        </Box>
        <DottedConnector />
      </Box>

      <GreenCurveSeparator />

      {/* Enhanced Tech Stack Section */}
      <Box id="tech-stack" sx={{ 
        px: { xs: 3, md: 10 }, 
        mb: 8,
        animation: `${fadeIn} 1s ease-out both`,
        animationDelay: '1s',
      }}>
        <Box sx={{ 
          background: 'rgba(255,255,255,0.9)',
          backdropFilter: 'blur(20px)',
          borderRadius: 6,
          p: 4,
          boxShadow: '0 20px 60px rgba(67,182,73,0.1)',
          border: '2px solid rgba(255,255,255,0.3)',
        }}>
          <TechStackSection />
        </Box>
        <DottedConnector />
      </Box>

      <GreenCurveSeparator />

      {/* Enhanced Latest Updates Section */}
      <Box id="updates" sx={{ 
        px: { xs: 3, md: 10 }, 
        mb: 8,
        animation: `${fadeIn} 1s ease-out both`,
        animationDelay: '1.5s',
      }}>
        <Box sx={{ 
          background: 'rgba(255,255,255,0.9)',
          backdropFilter: 'blur(20px)',
          borderRadius: 6,
          p: 4,
          boxShadow: '0 20px 60px rgba(67,182,73,0.1)',
          border: '2px solid rgba(255,255,255,0.3)',
        }}>
          <LatestUpdatesSection />
        </Box>
        <DottedConnector />
      </Box>

      <GreenCurveSeparator />

      {/* Enhanced Community Section */}
      <Box id="community" sx={{ 
        py: 10, 
        px: { xs: 3, md: 10 },
        animation: `${fadeIn} 1s ease-out both`,
        animationDelay: '2s',
      }}>
        <Box sx={{ 
          background: 'rgba(255,255,255,0.9)',
          backdropFilter: 'blur(20px)',
          borderRadius: 6,
          p: 4,
          boxShadow: '0 20px 60px rgba(67,182,73,0.1)',
          border: '2px solid rgba(255,255,255,0.3)',
        }}>
          <CommunitySection />
        </Box>
      </Box>

      <GreenCurveSeparator />

      {/* Enhanced AnimatedGuide Section */}
      <Box sx={{ 
        py: 10, 
        px: 3, 
        background: 'linear-gradient(135deg, rgba(224, 231, 255, 0.95) 0%, rgba(255, 255, 255, 0.95) 100%)', 
        borderRadius: 8, 
        boxShadow: '0 25px 80px rgba(67, 182, 73, 0.15)', 
        my: 8, 
        maxWidth: 800, 
        mx: 'auto', 
        position: 'relative', 
        zIndex: 3,
        backdropFilter: 'blur(20px)',
        border: '2px solid rgba(255,255,255,0.4)',
        animation: `${fadeIn} 1s ease-out both`,
        animationDelay: '2.5s',
      }}>
        <Typography 
          variant="h3" 
          sx={{ 
            fontWeight: 900, 
            background: 'linear-gradient(135deg, #1976d2 0%, #43b649 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            mb: 6, 
            letterSpacing: 2, 
            textAlign: 'center',
            fontSize: { xs: '2.5rem', md: '3.5rem' },
            textShadow: '0 4px 20px rgba(67, 182, 73, 0.3)',
          }}
        >
          How to Use ByeBuddy
        </Typography>
        <AnimatedGuide />
      </Box>

      <GreenCurveSeparator />

      {/* Enhanced Section 2: Why Use ByeBuddy */}
      <Box id="features" sx={{ 
        py: 12, 
        px: { xs: 3, md: 10 }, 
        background: 'linear-gradient(135deg, rgba(255, 251, 231, 0.95) 0%, rgba(224, 255, 231, 0.95) 100%)', 
        borderRadius: 8, 
        boxShadow: '0 25px 80px rgba(67, 182, 73, 0.15)', 
        my: 8, 
        maxWidth: 1400, 
        mx: 'auto', 
        position: 'relative', 
        zIndex: 3,
        backdropFilter: 'blur(20px)',
        border: '2px solid rgba(255,255,255,0.4)',
        animation: `${fadeIn} 1s ease-out both`,
        animationDelay: '3s',
      }}>
        <Typography 
          variant="h3" 
          sx={{ 
            fontWeight: 900, 
            background: 'linear-gradient(135deg, #43b649 0%, #f9d923 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            mb: 8, 
            letterSpacing: 2, 
            textAlign: 'center',
            fontSize: { xs: '2.5rem', md: '3.5rem' },
            textShadow: '0 4px 20px rgba(67, 182, 73, 0.3)',
          }}
        >
          Why Use ByeBuddy?
        </Typography>
        <Grid container spacing={6} justifyContent="center">
          <Grid item xs={12} md={4}>
            <Paper elevation={8} sx={{ 
              p: 5, 
              borderRadius: 6, 
              minHeight: 220, 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              gap: 3, 
              bgcolor: 'rgba(224, 255, 231, 0.9)', 
              boxShadow: '0 16px 50px rgba(67, 182, 73, 0.2)',
              backdropFilter: 'blur(15px)',
              border: '2px solid rgba(255,255,255,0.4)',
              transition: 'all 0.4s ease',
              '&:hover': {
                transform: 'translateY(-12px) scale(1.02)',
                boxShadow: '0 25px 80px rgba(67, 182, 73, 0.35)',
                borderColor: '#43b649',
              }
            }}>
              <Box sx={{ 
                p: 2, 
                borderRadius: '50%', 
                background: 'linear-gradient(135deg, rgba(249,217,35,0.2) 0%, rgba(67,182,73,0.2) 100%)',
                border: '3px solid #f9d923',
                animation: `${pulse} 3s infinite`,
              }}>
                <StarIcon sx={{ color: '#f9d923', fontSize: 48 }} />
              </Box>
              <Typography fontWeight={800} fontSize={24} color="#1976d2" textAlign="center">Open Source & Free</Typography>
              <Typography fontSize={18} color="#333" align="center" lineHeight={1.6}>No hidden fees. 100% open source and privacy-friendly with full transparency.</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={8} sx={{ 
              p: 5, 
              borderRadius: 6, 
              minHeight: 220, 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              gap: 3, 
              bgcolor: 'rgba(255, 251, 231, 0.9)', 
              boxShadow: '0 16px 50px rgba(67, 182, 73, 0.2)',
              backdropFilter: 'blur(15px)',
              border: '2px solid rgba(255,255,255,0.4)',
              transition: 'all 0.4s ease',
              '&:hover': {
                transform: 'translateY(-12px) scale(1.02)',
                boxShadow: '0 25px 80px rgba(67, 182, 73, 0.35)',
                borderColor: '#1976d2',
              }
            }}>
              <Box sx={{ 
                p: 2, 
                borderRadius: '50%', 
                background: 'linear-gradient(135deg, rgba(25,118,210,0.2) 0%, rgba(67,182,73,0.2) 100%)',
                border: '3px solid #1976d2',
                animation: `${pulse} 3s infinite 1s`,
              }}>
                <CompareArrowsIcon sx={{ color: '#1976d2', fontSize: 48 }} />
              </Box>
              <Typography fontWeight={800} fontSize={24} color="#1976d2" textAlign="center">Mutuals & Analytics</Typography>
              <Typography fontSize={18} color="#333" align="center" lineHeight={1.6}>See mutual followers, not following back, and get detailed insights about your network.</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={8} sx={{ 
              p: 5, 
              borderRadius: 6, 
              minHeight: 220, 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              gap: 3, 
              bgcolor: 'rgba(224, 231, 255, 0.9)', 
              boxShadow: '0 16px 50px rgba(67, 182, 73, 0.2)',
              backdropFilter: 'blur(15px)',
              border: '2px solid rgba(255,255,255,0.4)',
              transition: 'all 0.4s ease',
              '&:hover': {
                transform: 'translateY(-12px) scale(1.02)',
                boxShadow: '0 25px 80px rgba(67, 182, 73, 0.35)',
                borderColor: '#43b649',
              }
            }}>
              <Box sx={{ 
                p: 2, 
                borderRadius: '50%', 
                background: 'linear-gradient(135deg, rgba(67,182,73,0.2) 0%, rgba(249,217,35,0.2) 100%)',
                border: '3px solid #43b649',
                animation: `${pulse} 3s infinite 2s`,
              }}>
                <FileDownloadIcon sx={{ color: '#43b649', fontSize: 48 }} />
              </Box>
              <Typography fontWeight={800} fontSize={24} color="#1976d2" textAlign="center">Export & Alerts</Typography>
              <Typography fontSize={18} color="#333" align="center" lineHeight={1.6}>Export your data, set up alerts, and stay in complete control of your information.</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      <GreenCurveSeparator />

      {/* Enhanced Section 3: How It Works */}
      <Box id="how-it-works" sx={{ 
        px: { xs: 3, md: 10 }, 
        py: 12, 
        background: 'linear-gradient(135deg, rgba(224, 231, 255, 0.95) 0%, rgba(255, 255, 255, 0.95) 100%)', 
        borderRadius: 8, 
        boxShadow: '0 25px 80px rgba(67, 182, 73, 0.15)', 
        maxWidth: 1400, 
        mx: 'auto', 
        mb: 10, 
        position: 'relative', 
        zIndex: 2,
        backdropFilter: 'blur(20px)',
        border: '2px solid rgba(255,255,255,0.4)',
        animation: `${fadeIn} 1s ease-out both`,
        animationDelay: '3.5s',
      }}>
        <Typography 
          variant="h3" 
          fontWeight={900} 
          textAlign="center" 
          mb={8} 
          sx={{
            background: 'linear-gradient(135deg, #1976d2 0%, #43b649 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontSize: { xs: '2.5rem', md: '3.5rem' },
            letterSpacing: 2,
            textShadow: '0 4px 20px rgba(67, 182, 73, 0.3)',
          }}
        >
          How It Works
        </Typography>
        <DottedStepConnector />
        <Grid container spacing={6} justifyContent="center" sx={{ position: 'relative', zIndex: 2, mt: 4 }}>
          {howItWorks.map(({ icon, title, desc }, i) => (
            <Grid item xs={12} md={4} key={i}>
              <Box textAlign="center" sx={{ 
                p: 4, 
                borderRadius: 4, 
                background: 'rgba(255,255,255,0.6)',
                backdropFilter: 'blur(10px)',
                border: '2px solid rgba(255,255,255,0.3)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 16px 40px rgba(67,182,73,0.2)',
                  background: 'rgba(255,255,255,0.8)',
                }
              }}>
                <Box sx={{ 
                  display: 'inline-block',
                  p: 2,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(67,182,73,0.1) 0%, rgba(249,217,35,0.1) 100%)',
                  border: '3px solid rgba(67,182,73,0.3)',
                  mb: 2,
                  animation: `${pulse} 3s infinite ${i * 0.5}s`,
                }}>
                  {React.cloneElement(icon, { sx: { fontSize: 48, color: '#43b649' } })}
                </Box>
                <Typography mt={3} fontWeight={800} fontSize={22} color="#1976d2" mb={2}>{title}</Typography>
                <Typography fontSize={18} color="#333" lineHeight={1.6}>{desc}</Typography>
              </Box>
              {i < howItWorks.length - 1 && (
                <Divider sx={{ my: 4, mx: 'auto', width: 80, borderColor: '#43b649', borderBottomWidth: 4 }} />
              )}
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Enhanced Floating Action Button */}
      <Fab
        color="primary"
        aria-label="Get Started"
        onClick={props.handleOpenModal}
        sx={{
          position: 'fixed',
          bottom: 40,
          right: 40,
          width: 72,
          height: 72,
          background: 'linear-gradient(135deg, #1976d2 0%, #43b649 100%)',
          boxShadow: '0 12px 40px rgba(67, 182, 73, 0.5)',
          animation: `${pulse} 2.5s infinite`,
          zIndex: 1000,
          border: '3px solid rgba(255,255,255,0.3)',
          backdropFilter: 'blur(10px)',
          '&:hover': {
            background: 'linear-gradient(135deg, #43b649 0%, #1976d2 100%)',
            transform: 'scale(1.15)',
            boxShadow: '0 16px 60px rgba(67, 182, 73, 0.7)'
          }
        }}
      >
        <GitHubIcon sx={{ fontSize: 32 }} />
      </Fab>

      <style>{`
        @keyframes pulseCta {
          0% { box-shadow: 0 0 0 0 rgba(249, 217, 35, 0.4); }
          100% { box-shadow: 0 0 40px 12px rgba(249, 217, 35, 0.4); }
        }
      `}</style>
    </Box>
  );
}
 