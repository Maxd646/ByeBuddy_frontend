import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import GroupIcon from '@mui/icons-material/Group';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import StarIcon from '@mui/icons-material/Star';

const features = [
  {
    label: 'Mutual Followers',
    icon: <CompareArrowsIcon sx={{ fontSize: 48, color: '#1976d2', mb: 1 }} />,
    samples: ['@alice', '@bob'],
    color: '#e0ffe7',
  },
  {
    label: 'Not Following Back',
    icon: <GroupIcon sx={{ fontSize: 48, color: '#43b649', mb: 1 }} />,
    samples: ['@charlie'],
    color: '#fffbe7',
  },
  {
    label: 'Export to CSV',
    icon: <FileDownloadIcon sx={{ fontSize: 48, color: '#f9d923', mb: 1 }} />,
    samples: ['sample.csv'],
    color: '#e0e7ff',
  },
  {
    label: 'Open Source',
    icon: <StarIcon sx={{ fontSize: 48, color: '#f9d923', mb: 1 }} />,
    samples: ['github.com/ByeBuddy'],
    color: '#e0ffe7',
  },
];

function mod(n, m) {
  return ((n % m) + m) % m;
}

export default function FeatureCarousel() {
  const [active, setActive] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);
  const [direction, setDirection] = React.useState(1); // 1 = right, -1 = left

  // Auto-play logic with infinite loop
  React.useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActive((a) => mod(a + direction, features.length));
    }, 3000);
    return () => clearInterval(timer);
  }, [isPaused, direction]);

  // Pause on drag/interact, resume after
  const handleDragStart = () => setIsPaused(true);
  const handleDragEnd = () => setIsPaused(false);

  // Keyboard navigation
  React.useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowRight') { setActive((a) => mod(a + 1, features.length)); setIsPaused(true); setDirection(1); }
      if (e.key === 'ArrowLeft') { setActive((a) => mod(a - 1, features.length)); setIsPaused(true); setDirection(-1); }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  // For infinite loop, reorder features so active is always in the center
  const visible = features.map((_, i) => features[mod(active + i, features.length)]);

  return (
    <Box sx={{ width: '100vw', maxWidth: '100vw', mx: 'auto', py: 4, position: 'relative', overflow: 'visible' }}>
      <Box
        sx={{
          display: 'flex',
          gap: { xs: 2, md: 4 },
          justifyContent: 'center',
          alignItems: 'center',
          overflowX: 'hidden',
          scrollSnapType: 'x mandatory',
          px: 0,
        }}
        component={motion.div}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        style={{ cursor: 'grab' }}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <AnimatePresence initial={false}>
          {visible.map((f, i) => (
            <motion.div
              key={f.label}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: i === 0 ? 1.08 : 0.96 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              style={{
                width: '60vw',
                maxWidth: 400,
                minWidth: '60vw',
                minHeight: 220,
                margin: '0 auto',
                zIndex: i === 0 ? 2 : 1,
              }}
              onClick={() => setActive(mod(active + i, features.length))}
            >
              <Paper
                elevation={i === 0 ? 16 : 4}
                sx={{
                  width: '100%',
                  height: '100%',
                  px: 3,
                  py: 3,
                  borderRadius: 5,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 2,
                  background: f.color,
                  boxShadow: i === 0 ? '0 8px 32px #43b64955' : '0 2px 8px #43b64922',
                  transform: i === 0 ? 'scale(1.08)' : 'scale(0.96)',
                  transition: 'all 0.4s cubic-bezier(.4,2,.6,1)',
                  scrollSnapAlign: 'center',
                  cursor: 'pointer',
                  position: 'relative',
                  mx: 'auto',
                }}
                component={motion.div}
                whileTap={{ scale: 0.95 }}
              >
                {f.icon}
                <Typography fontWeight={900} fontSize={22} color="#1976d2" mb={1}>
                  {f.label}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center', mt: 1 }}>
                  {f.samples.map((sample, j) => (
                    <Box
                      key={j}
                      sx={{
                        bgcolor: '#fff',
                        color: '#1976d2',
                        px: 1.5,
                        py: 0.3,
                        borderRadius: 2,
                        fontWeight: 700,
                        fontSize: 14,
                        boxShadow: '0 2px 8px #43b64922',
                      }}
                    >
                      {sample}
                    </Box>
                  ))}
                </Box>
              </Paper>
            </motion.div>
          ))}
        </AnimatePresence>
      </Box>
      <Box sx={{ textAlign: 'center', mt: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Use ← → arrows or drag to explore features
        </Typography>
      </Box>
    </Box>
  );
} 