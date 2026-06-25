// src/pages/extra-pages/sample-page.jsx
import React, { useState, useEffect } from 'react';

// material-ui
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';

// project imports
import MainCard from 'components/MainCard';
import userService from '../../services/userService';

export default function SamplePage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const list = await userService.getAllUsers();
      setUsers(list);
    } catch (err) {
      setError('Failed to fetch users');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await userService.deleteUser(userId);
      setUsers((prev) => prev.filter((u) => u.id !== userId));
    } catch (err) {
      console.error('Failed to delete user:', err);
      alert('Failed to delete user');
    }
  };

  const handleCreateUser = async () => {
    const newUser = {
      first_name: 'New',
      last_name: 'User',
      email: 'newuser@example.com',
    };

    try {
      const created = await userService.createUser(newUser);
      setUsers((prev) => [...prev, created]);
    } catch (err) {
      console.error('Failed to create user:', err);
      alert('Failed to create user');
    }
  };

  return (
    <MainCard title="Sample Card">
      <ButtonGroup variant="contained" aria-label="basic button group">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </ButtonGroup>

      <Typography variant="body2" sx={{ mt: 2 }}>
        This card demonstrates combining UI and API functionality.
      </Typography>

      <Box sx={{ mt: 3 }}>
        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
          <Button variant="contained" onClick={handleCreateUser}>
            Add New User
          </Button>
          <Button variant="outlined" onClick={fetchUsers}>
            Refresh
          </Button>
          {loading && <CircularProgress size={20} />}
        </Stack>

        {error && <Typography color="error">{error}</Typography>}

        {!loading && users.length === 0 && <Typography>No users found.</Typography>}

        <Box>
          {users.map((user) => (
            <Box key={user.id} sx={{ mb: 2, p: 2, border: '1px solid rgba(0,0,0,0.08)', borderRadius: 1 }}>
              <Typography variant="h6">{user.name || '—'}</Typography>
              <Typography variant="body2">Email: {user.email || '—'}</Typography>
              <Typography variant="body2">Phone: {user.phone || '—'}</Typography>

              <Box sx={{ mt: 1 }}>
                <Button variant="outlined" size="small" sx={{ mr: 1 }} onClick={() => console.log('Edit', user.id)}>
                  Edit
                </Button>
                <Button variant="contained" color="error" size="small" onClick={() => handleDelete(user.id)}>
                  Delete
                </Button>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </MainCard>
  );
}
