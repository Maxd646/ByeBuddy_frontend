import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Card, CardContent, Typography, Box, Avatar } from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';

/**
 * AccountSummary displays summary cards for followers, following, and mutuals.
 * Accepts real data via props.
 */
export default function AccountSummary({ profile, followers, following }) {
  const mutuals = followers && following ? followers.filter(f => following.some(u => u.login === f.login)) : [];
  return (
    <Box sx={{ mt: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        {profile && (
          <Avatar src={profile.avatar_url} alt={profile.login} sx={{ width: 64, height: 64 }} />
        )}
        <Typography variant="h4" sx={{ fontWeight: 800, color: '#1976d2' }}>
          {profile ? profile.login : 'Account Summary'}
        </Typography>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ bgcolor: '#e0ffe7', boxShadow: 3, borderRadius: 4, transition: 'transform 0.2s', ':hover': { transform: 'scale(1.04)' } }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 4 }}>
              <GroupIcon sx={{ fontSize: 40, color: '#43b649' }} />
              <Typography variant="h5" sx={{ fontWeight: 700, mt: 2 }}>{followers ? followers.length : '-'}</Typography>
              <Typography color="text.secondary" sx={{ fontWeight: 500 }}>Followers</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ bgcolor: '#e0e7ff', boxShadow: 3, borderRadius: 4, transition: 'transform 0.2s', ':hover': { transform: 'scale(1.04)' } }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 4 }}>
              <PersonAddIcon sx={{ fontSize: 40, color: '#1976d2' }} />
              <Typography variant="h5" sx={{ fontWeight: 700, mt: 2 }}>{following ? following.length : '-'}</Typography>
              <Typography color="text.secondary" sx={{ fontWeight: 500 }}>Following</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ bgcolor: '#fffbe7', boxShadow: 3, borderRadius: 4, transition: 'transform 0.2s', ':hover': { transform: 'scale(1.04)' } }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 4 }}>
              <CompareArrowsIcon sx={{ fontSize: 40, color: '#f9d923' }} />
              <Typography variant="h5" sx={{ fontWeight: 700, mt: 2 }}>{mutuals ? mutuals.length : '-'}</Typography>
              <Typography color="text.secondary" sx={{ fontWeight: 500 }}>Mutuals</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

AccountSummary.propTypes = {
  profile: PropTypes.object,
  followers: PropTypes.array,
  following: PropTypes.array,
}; 