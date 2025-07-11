import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import GitHubIcon from '@mui/icons-material/GitHub';
import StarIcon from '@mui/icons-material/Star';
import GroupIcon from '@mui/icons-material/Group';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const steps = [
  {
    title: 'Welcome to ByeBuddy!',
    desc: 'The easiest way to track your GitHub followers and more.',
    icon: <GitHubIcon sx={{ fontSize: 60, color: '#1976d2' }} />,
  },
  {
    title: 'Login or Register',
    desc: 'Start by logging in with GitHub or your email.',
    icon: <StarIcon sx={{ fontSize: 60, color: '#f9d923' }} />,
  },
  {
    title: 'Dashboard Overview',
    desc: 'See your followers, following, mutuals, and more at a glance.',
    icon: <GroupIcon sx={{ fontSize: 60, color: '#43b649' }} />,
  },
  {
    title: 'Explore Features',
    desc: 'Find mutuals, see who’s not following you back, and export your data.',
    icon: <FileDownloadIcon sx={{ fontSize: 60, color: '#43b649' }} />,
  },
  {
    title: 'Need Help?',
    desc: 'We’ll warn you if you’re close to GitHub’s API limit. Need help? Just ask!',
    icon: <HelpOutlineIcon sx={{ fontSize: 60, color: '#1976d2' }} />,
  },
];

export default function AnimatedGuide() {
  const [step, setStep] = React.useState(0);

  return (
    <Box sx={{ width: '100%', maxWidth: 420, mx: 'auto', my: 6, p: 3, bgcolor: '#fff', borderRadius: 4, boxShadow: 4, textAlign: 'center', position: 'relative' }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -40, scale: 0.95 }}
          transition={{ duration: 0.6, type: 'spring' }}
        >
          <Box sx={{ mb: 2 }}>{steps[step].icon}</Box>
          <Typography variant="h5" fontWeight={900} color="#1976d2" mb={1}>{steps[step].title}</Typography>
          <Typography variant="body1" color="text.secondary" mb={3}>{steps[step].desc}</Typography>
        </motion.div>
      </AnimatePresence>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
        <Button
          variant="outlined"
          disabled={step === 0}
          onClick={() => setStep(s => Math.max(0, s - 1))}
        >
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setStep(s => Math.min(steps.length - 1, s + 1))}
          disabled={step === steps.length - 1}
        >
          Next
        </Button>
      </Box>
      <Box sx={{ mt: 2 }}>
        {steps.map((_, i) => (
          <span key={i} style={{
            display: 'inline-block',
            width: 10,
            height: 10,
            borderRadius: '50%',
            margin: '0 4px',
            background: i === step ? '#43b649' : '#e0e7ff',
            transition: 'background 0.3s'
          }} />
        ))}
      </Box>
    </Box>
  );
} 