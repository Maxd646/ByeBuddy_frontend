import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Typography, TextField, List, ListItem, ListItemAvatar, Avatar, ListItemText, Pagination, Box } from '@mui/material';

/**
 * MutualFollowers displays users who mutually follow each other.
 * Uses real data from props.
 */
export default function MutualFollowers({ following = [], followers = [] }) {
  const mutuals = followers.filter(f => following.some(u => u.login === f.login));
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 8;
  const filtered = mutuals.filter(u => u.login.toLowerCase().includes(search.toLowerCase()));
  const pageCount = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2 }}>Mutual Followers</Typography>
      <TextField
        label="Search users"
        variant="outlined"
        size="small"
        value={search}
        onChange={e => { setSearch(e.target.value); setPage(1); }}
        sx={{ mb: 2 }}
        inputProps={{ 'aria-label': 'Search mutual followers' }}
      />
      <List aria-label="Mutual followers">
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

MutualFollowers.propTypes = {
  following: PropTypes.array,
  followers: PropTypes.array,
}; 