import React, { useState, useEffect } from 'react';
import { Box, Typography, Link as MuiLink, IconButton, Tooltip, Avatar, Button, Card, CardContent, Grid, Divider } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import StarIcon from '@mui/icons-material/Star';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { keyframes } from '@emotion/react';

const SOCIAL_LINKS = [
  { icon: <GitHubIcon />, label: 'GitHub', url: 'https://github.com/Maxd646' },
  { icon: <TwitterIcon />, label: 'Twitter', url: 'https://x.com/GashawDaniel17' },
  { icon: <LinkedInIcon />, label: 'LinkedIn', url: 'https://linkedin.com/in/your-profile' },
  { icon: <EmailIcon />, label: 'Email', url: 'mailto:your@email.com' },
];

const PROMOTED = [
  { name: 'Open Source', icon: <StarIcon sx={{ color: '#f9d923', fontSize: 28 }} />, url: 'https://github.com/explore' },
  { name: 'Sponsor', icon: <EmojiEventsIcon sx={{ color: '#43b649', fontSize: 28 }} />, url: 'https://github.com/sponsors' },
  { name: 'React', icon: <Avatar src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" sx={{ width: 28, height: 28, bgcolor: 'white' }} />, url: 'https://react.dev/' },
];

const EXPLORE_LINKS = [
  { label: 'Privacy', url: '#' },
  { label: 'Terms', url: '#' },
  { label: 'Blog', url: '#' },
  { label: 'More Projects', url: '#' },
];

const EMOJI_CAROUSEL = ['🎉', '🚀', '😎', '🌈', '🔥', '💡', '🎵', '🦄', '🍕', '🥳'];

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 0px 0 #43b64944; }
  50% { box-shadow: 0 0 16px 4px #f9d92388; }
`;
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;
const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
`;
const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

export default function Footer() {
  const [emojiIdx, setEmojiIdx] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setEmojiIdx(i => (i + 1) % EMOJI_CAROUSEL.length), 1200);
    return () => clearInterval(timer);
  }, []);

  return (
    <Box component="footer" sx={{
      py: 6,
      px: 3,
      mt: 'auto',
      background: `
        linear-gradient(135deg, rgba(227,242,253,0.95) 0%, rgba(252,228,236,0.95) 50%, rgba(255,248,220,0.95) 100%),
        url('https://www.transparenttextures.com/patterns/diamond-upholstery.png') repeat
      `,
      backdropFilter: 'blur(20px)',
      textAlign: 'center',
      boxShadow: '0 -12px 40px 0 rgba(67,182,73,0.15)',
      position: 'relative',
      overflow: 'hidden',
      borderTopLeftRadius: 40,
      borderTopRightRadius: 40,
      animation: `${fadeIn} 1.2s cubic-bezier(.4,2,.6,1)`,
    }}>
      {/* Glowing animated top border */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: 10,
        background: 'linear-gradient(90deg, #43b649, #f9d923, #1976d2, #43b649)',
        filter: 'blur(4px)',
        opacity: 0.9,
        zIndex: 2,
        animation: 'footerBorderGlow 6s linear infinite',
        '@keyframes footerBorderGlow': {
          '0%': { filter: 'blur(4px) brightness(1)' },
          '50%': { filter: 'blur(8px) brightness(1.4)' },
          '100%': { filter: 'blur(4px) brightness(1)' },
        }
      }} />

      {/* Main Content Grid */}
      <Grid container spacing={4} sx={{ mb: 4, justifyContent: 'center' }}>
        {/* Promoted/Advertised Section */}
        <Grid item xs={12} md={4} sx={{ maxWidth: 350 }}>
          <Card sx={{
            background: 'rgba(255,255,255,0.8)',
            backdropFilter: 'blur(10px)',
            borderRadius: 4,
            boxShadow: '0 8px 32px rgba(67,182,73,0.1)',
            border: '2px solid rgba(249,217,35,0.3)',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 16px 48px rgba(67,182,73,0.2)',
            }
          }}>
            <CardContent sx={{ py: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 900, color: '#1976d2', mb: 3, textAlign: 'center' }}>
                🏆 Promoted Partners
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {PROMOTED.map(partner => (
                  <Button
                    key={partner.name}
                    href={partner.url}
                    target="_blank"
                    rel="noopener"
                    startIcon={partner.icon}
                    sx={{
                      fontWeight: 700,
                      borderRadius: 3,
                      px: 2,
                      py: 1.5,
                      background: 'linear-gradient(90deg, rgba(249,217,35,0.1) 0%, rgba(67,182,73,0.1) 100%)',
                      color: '#1976d2',
                      border: '2px solid rgba(249,217,35,0.4)',
                      transition: 'all 0.3s',
                      animation: `${float} 3.5s infinite`,
                      ':hover': {
                        background: 'linear-gradient(90deg, #f9d923 0%, #43b649 100%)',
                        color: '#fff',
                        boxShadow: '0 8px 24px rgba(249,217,35,0.4)',
                        borderColor: '#43b649',
                        transform: 'scale(1.05) rotate(-1deg)',
                      },
                    }}
                  >
                    {partner.name}
                  </Button>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Entertainment Section */}
        <Grid item xs={12} md={4} sx={{ maxWidth: 350 }}>
          <Card sx={{
            background: 'rgba(255,255,255,0.8)',
            backdropFilter: 'blur(10px)',
            borderRadius: 4,
            boxShadow: '0 8px 32px rgba(67,182,73,0.1)',
            border: '2px solid rgba(67,182,73,0.3)',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 16px 48px rgba(67,182,73,0.2)',
            }
          }}>
            <CardContent sx={{ py: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 900, color: '#43b649', mb: 3, textAlign: 'center' }}>
                🎮 Entertainment Zone
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <Box sx={{ 
                  fontSize: 48, 
                  animation: `${float} 2.2s infinite`,
                  mb: 2,
                  p: 2,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(249,217,35,0.2) 0%, rgba(67,182,73,0.2) 100%)',
                  border: '3px solid rgba(249,217,35,0.4)'
                }}>
                  {EMOJI_CAROUSEL[emojiIdx]}
                </Box>
                <Typography variant="body1" sx={{ color: '#1976d2', fontWeight: 600, textAlign: 'center' }}>
                  Enjoy a little fun while you scroll!
                </Typography>
                <Typography variant="body2" sx={{ color: '#666', textAlign: 'center', fontStyle: 'italic' }}>
                  New emoji every 1.2 seconds
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Explore Section */}
        <Grid item xs={12} md={4} sx={{ maxWidth: 350 }}>
          <Card sx={{
            background: 'rgba(255,255,255,0.8)',
            backdropFilter: 'blur(10px)',
            borderRadius: 4,
            boxShadow: '0 8px 32px rgba(67,182,73,0.1)',
            border: '2px solid rgba(25,118,210,0.3)',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 16px 48px rgba(67,182,73,0.2)',
            }
          }}>
            <CardContent sx={{ py: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 900, color: '#1976d2', mb: 3, textAlign: 'center' }}>
                🔍 Explore More
      </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {EXPLORE_LINKS.map(link => (
                  <Button
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener"
                    sx={{
                      fontWeight: 600,
                      borderRadius: 2,
                      px: 2,
                      py: 1,
                      background: 'rgba(25,118,210,0.05)',
                      color: '#1976d2',
                      border: '1px solid rgba(25,118,210,0.2)',
                      transition: 'all 0.3s',
                      ':hover': {
                        background: 'rgba(25,118,210,0.1)',
                        color: '#43b649',
                        borderColor: '#43b649',
                        transform: 'translateX(4px)',
                      },
                    }}
                  >
                    {link.label}
                  </Button>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Social Icons Section */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: 3, 
        mb: 4,
        p: 3,
        background: 'rgba(255,255,255,0.6)',
        borderRadius: 4,
        backdropFilter: 'blur(10px)',
        border: '2px solid rgba(249,217,35,0.2)'
      }}>
        {SOCIAL_LINKS.map(link => (
          <Tooltip title={link.label} key={link.label}>
            <IconButton
              component="a"
              href={link.url}
              target="_blank"
              rel="noopener"
              color="primary"
              sx={{
                transition: 'transform 0.3s, box-shadow 0.3s',
                animation: `${glow} 3.5s infinite`,
                fontSize: 28,
                p: 2,
                background: 'rgba(255,255,255,0.8)',
                border: '2px solid rgba(67,182,73,0.3)',
                '&:hover': {
                  transform: 'scale(1.25) rotate(-8deg)',
                  boxShadow: '0 0 32px rgba(249,217,35,0.6)',
                  color: '#f9d923',
                  background: 'rgba(67,182,73,0.1)',
                  borderColor: '#f9d923',
                }
              }}
            >
              {link.icon}
            </IconButton>
          </Tooltip>
        ))}
      </Box>

      {/* Divider */}
      <Divider sx={{ 
        mb: 4, 
        borderColor: 'rgba(67,182,73,0.3)', 
        borderWidth: 2,
        borderRadius: 2,
        background: 'linear-gradient(90deg, transparent, rgba(67,182,73,0.5), transparent)'
      }} />

      {/* Copyright Section */}
      <Box sx={{ 
        mb: 3,
        p: 2,
        background: 'rgba(255,255,255,0.7)',
        borderRadius: 3,
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(67,182,73,0.2)'
      }}>
        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600, mb: 1 }}>
          © {new Date().getFullYear()} ByeBuddy &nbsp;|&nbsp;
          <MuiLink href="https://github.com/your-repo-url" target="_blank" rel="noopener" underline="hover" color="inherit">
            <GitHubIcon sx={{ verticalAlign: 'middle', fontSize: 20, mb: '2px' }} /> View on GitHub
          </MuiLink>
        </Typography>
      </Box>

      {/* Branding Section - Made with Love */}
      <Box sx={{
        p: 3,
        background: 'linear-gradient(135deg, rgba(249,217,35,0.1) 0%, rgba(67,182,73,0.1) 100%)',
        borderRadius: 4,
        border: '3px solid rgba(249,217,35,0.4)',
        boxShadow: '0 8px 32px rgba(249,217,35,0.2)',
        animation: `${pulse} 3s infinite`,
      }}>
        <Typography
          variant="h6"
          sx={{
            color: '#43b649',
            fontWeight: 900,
            letterSpacing: 2,
            fontSize: 18,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
            animation: `${fadeIn} 1.8s cubic-bezier(.4,2,.6,1) 0.5s both`,
          }}
        >
          <FavoriteIcon sx={{ color: '#f44336', fontSize: 24, animation: 'heartbeat 1.2s infinite' }} />
          Made with Love by 
          <Box component="span" sx={{ 
            color: '#1976d2', 
            fontWeight: 900, 
            background: 'linear-gradient(90deg, #1976d2, #43b649)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            Daniel Kebede
          </Box>
          <FavoriteIcon sx={{ color: '#f44336', fontSize: 24, animation: 'heartbeat 1.2s infinite 0.6s' }} />
        </Typography>
      </Box>
    </Box>
  );
} 
