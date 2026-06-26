// src/pages/dashboard/users.jsx
import { useState, useEffect } from 'react';
import {
  Box, Typography, Card, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Avatar, Chip, IconButton, TextField, InputAdornment, Skeleton, Alert, Tooltip
} from '@mui/material';
import { Search as SearchIcon, Block as BlockIcon, CheckCircle as ActiveIcon } from '@mui/icons-material';
import { getAllUsers, toggleUserStatus } from '../../api/users';

const MOCK_USERS = [
  { id: 'u1', firstName: 'Admin', lastName: 'User', email: 'admin@turboeats.lk', role: 'admin', phone: '+94 11 234 5678', isActive: true, createdAt: '2024-01-01T00:00:00Z' },
  { id: 'u2', firstName: 'Sashini', lastName: 'Dilhara', email: 'sashini@student.kdu.ac.lk', role: 'customer', phone: '+94 77 456 7890', isActive: true, createdAt: '2024-02-15T00:00:00Z' },
  { id: 'u3', firstName: 'Kamal', lastName: 'Perera', email: 'kamal@example.com', role: 'customer', phone: '+94 71 234 5678', isActive: true, createdAt: '2024-03-10T00:00:00Z' },
];

export default function UsersAdmin() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [snack, setSnack] = useState('');

  useEffect(() => {
    getAllUsers().then(r => setUsers(r.data?.length ? r.data : MOCK_USERS)).catch(() => setUsers(MOCK_USERS)).finally(() => setLoading(false));
  }, []);

  const handleToggle = async (user) => {
    try {
      await toggleUserStatus(user.id);
      setUsers(us => us.map(u => u.id === user.id ? { ...u, isActive: !u.isActive } : u));
      setSnack(`User ${user.isActive ? 'deactivated' : 'activated'}.`);
    } catch { setSnack('Failed to update user status.'); }
  };

  const filtered = users.filter(u => {
    const q = search.toLowerCase();
    return !q || u.firstName.toLowerCase().includes(q) || u.lastName.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
  });

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Typography variant="h4" fontWeight={800} mb={0.5}>Users</Typography>
      <Typography color="text.secondary" mb={3}>Manage all registered customers and admins.</Typography>

      {snack && <Alert severity="info" onClose={() => setSnack('')} sx={{ mb: 2 }}>{snack}</Alert>}

      <TextField size="small" placeholder="Search by name or email…" value={search} onChange={e => setSearch(e.target.value)} sx={{ mb: 3, minWidth: 300 }}
        InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: 18 }} /></InputAdornment> }} />

      <Card>
        <TableContainer>
          <Table>
            <TableHead sx={{ bgcolor: 'grey.50' }}>
              <TableRow>
                {['User', 'Email', 'Phone', 'Role', 'Status', 'Joined', 'Actions'].map(h => (
                  <TableCell key={h} sx={{ fontWeight: 700, color: 'text.secondary', fontSize: 12 }}>{h.toUpperCase()}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? [...Array(5)].map((_, i) => (
                <TableRow key={i}>{[...Array(7)].map((_, j) => <TableCell key={j}><Skeleton /></TableCell>)}</TableRow>
              )) : filtered.map(user => (
                <TableRow key={user.id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Avatar sx={{ width: 34, height: 34, background: 'linear-gradient(135deg,#FF4B2B,#FF416C)', fontSize: 13, fontWeight: 700 }}>
                        {user.firstName?.[0]}{user.lastName?.[0]}
                      </Avatar>
                      <Typography fontWeight={600} fontSize={14}>{user.firstName} {user.lastName}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ fontSize: 13, color: 'text.secondary' }}>{user.email}</TableCell>
                  <TableCell sx={{ fontSize: 13, color: 'text.secondary' }}>{user.phone || '—'}</TableCell>
                  <TableCell>
                    <Chip label={user.role} size="small" color={user.role === 'admin' ? 'error' : 'default'}
                      variant={user.role === 'admin' ? 'filled' : 'outlined'} sx={{ fontWeight: 600, textTransform: 'capitalize' }} />
                  </TableCell>
                  <TableCell>
                    <Chip label={user.isActive ? 'Active' : 'Inactive'} size="small"
                      color={user.isActive ? 'success' : 'error'} variant="outlined" sx={{ fontWeight: 600 }} />
                  </TableCell>
                  <TableCell sx={{ fontSize: 12, color: 'text.secondary' }}>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Tooltip title={user.isActive ? 'Deactivate user' : 'Activate user'}>
                      <IconButton size="small" onClick={() => handleToggle(user)} color={user.isActive ? 'error' : 'success'}>
                        {user.isActive ? <BlockIcon fontSize="small" /> : <ActiveIcon fontSize="small" />}
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
              {!loading && filtered.length === 0 && (
                <TableRow><TableCell colSpan={7} align="center" sx={{ py: 6, color: 'text.secondary' }}>No users found.</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
}
