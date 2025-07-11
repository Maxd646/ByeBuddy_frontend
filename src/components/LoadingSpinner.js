import React from 'react';
import { Box, CircularProgress } from '@mui/material';

/**
 * LoadingSpinner displays a centered loading indicator.
 */
export default function LoadingSpinner() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 120 }}>
      <CircularProgress color="primary" aria-label="Loading" />
    </Box>
  );
} 