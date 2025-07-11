import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Typography, TextField, List, ListItem, ListItemAvatar, Avatar, ListItemText, Pagination, Box } from '@mui/material';

/**
 * NotFollowedBack displays users who follow you, but you don't follow them back.
 * Uses real data from props.
 */
export default function NotFollowedBack({ following = [], followers = [] }) {
  const notFollowedBack = followers.filter(f => !following.some(u => u.login === f.login));
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 8;
  const filtered = notFollowedBack.filter(u => u.login.toLowerCase().includes(search.toLowerCase()));
  const pageCount = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2 }}>You&apos;re Not Following Back</Typography>
      <TextField
        label="Search users"
        variant="outlined"
        size="small"
        value={search}
        onChange={e => { setSearch(e.target.value); setPage(1); }}
        sx={{ mb: 2 }}
        inputProps={{ 'aria-label': 'Search users you are not following back' }}
      />
      <List aria-label="Users you are not following back">
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

NotFollowedBack.propTypes = {
  following: PropTypes.array,
  followers: PropTypes.array,
}; 