import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Typography, TextField, List, ListItem, ListItemAvatar, Avatar, ListItemText, Pagination, Box } from '@mui/material';

/**
 * NotFollowingBack displays users you follow who don't follow you back.
 * Uses real data from props.
 */
export default function NotFollowingBack({ following = [], followers = [] }) {
  const notFollowingBack = following.filter(f => !followers.some(u => u.login === f.login));
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 8;
  const filtered = notFollowingBack.filter(u => u.login.toLowerCase().includes(search.toLowerCase()));
  const pageCount = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2 }}>Not Following You Back</Typography>
      <TextField
        label="Search users"
        variant="outlined"
        size="small"
        value={search}
        onChange={e => { setSearch(e.target.value); setPage(1); }}
        sx={{ mb: 2 }}
        inputProps={{ 'aria-label': 'Search users not following you back' }}
      />
      <List aria-label="Users not following you back">
        {paginated.map(user => (
          <ListItem key={user.login}>
            <ListItemAvatar>
              <Avatar src={user.avatar_url} alt={user.login} />
            </ListItemAvatar>
            <ListItemText primary={user.login} />
          </ListItem>
        ))}
      </List>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Pagination
          count={pageCount}
          page={page}
          onChange={(_, value) => setPage(value)}
          color="primary"
        />
      </Box>
    </Box>
  );
}

NotFollowingBack.propTypes = {
  following: PropTypes.array,
  followers: PropTypes.array,
}; 