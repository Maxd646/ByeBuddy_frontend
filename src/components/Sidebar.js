import React from 'react';
import { Box, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { NavLink, useLocation } from 'react-router-dom';

const menuItems = [
  { label: 'Mutuals', path: '/dashboard/mutuals' },
  { label: 'Not Following', path: '/dashboard/not-following' },
  { label: 'Following Back', path: '/dashboard/not-followed-back' },
  { label: 'Upgrade', path: '/dashboard/upgrade' },
];

export default function Sidebar() {
  const location = useLocation();
  return (
    <Box sx={{ width: 220, bgcolor: '#fff', borderRight: '1px solid #e0e7ff', py: 2, display: { xs: 'none', md: 'block' } }}>
      <List>
        {menuItems.map(item => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              component={NavLink}
              to={item.path}
              selected={location.pathname === item.path}
              aria-label={`Go to ${item.label}`}
              sx={{
                '&.active': {
                  bgcolor: '#e0ffe7',
                  color: '#43b649',
                  fontWeight: 700,
                },
              }}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
} 