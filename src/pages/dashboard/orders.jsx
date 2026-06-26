// src/pages/dashboard/orders.jsx
import { useState, useEffect } from 'react';
import {
  Box, Typography, Card, CardContent, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Chip, Select, MenuItem,
  FormControl, InputLabel, TextField, InputAdornment, Skeleton, Alert
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { getAllOrders, updateOrderStatus } from '../../api/orders';

const STATUSES = ['pending', 'confirmed', 'preparing', 'on-the-way', 'delivered', 'cancelled'];
const STATUS_COLOR = { delivered: 'success', 'on-the-way': 'info', preparing: 'warning', confirmed: 'primary', pending: 'default', cancelled: 'error' };

const MOCK = [
  { id: 'o1', restaurantName: 'Pizza Hut', status: 'on-the-way', total: 3405, items: [{ name: 'Pepperoni Pizza', qty: 1 }], createdAt: '2026-06-25T12:30:00Z', deliveryAddress: 'Kalutara' },
  { id: 'o2', restaurantName: 'Burger King', status: 'delivered', total: 3049, items: [{ name: 'Whopper', qty: 2 }], createdAt: '2026-06-20T19:15:00Z', deliveryAddress: 'Colombo 06' },
];

export default function OrdersAdmin() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');
  const [snack, setSnack] = useState('');

  useEffect(() => {
    getAllOrders().then(r => setOrders(r.data?.length ? r.data : MOCK)).catch(() => setOrders(MOCK)).finally(() => setLoading(false));
  }, []);

  const handleStatusChange = async (orderId, status) => {
    try {
      await updateOrderStatus(orderId, status);
      setOrders(os => os.map(o => o.id === orderId ? { ...o, status } : o));
      setSnack('Status updated');
    } catch { setSnack('Failed to update status'); }
  };

  const filtered = orders.filter(o => {
    const matchStatus = !filter || o.status === filter;
    const q = search.toLowerCase();
    return matchStatus && (!q || o.id.includes(q) || o.restaurantName.toLowerCase().includes(q));
  });

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Typography variant="h4" fontWeight={800} mb={0.5}>Orders</Typography>
      <Typography color="text.secondary" mb={3}>Manage and track all customer orders.</Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
        <TextField size="small" placeholder="Search by ID or restaurant…" value={search} onChange={e => setSearch(e.target.value)}
          InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: 18 }} /></InputAdornment> }}
          sx={{ minWidth: 260 }} />
        <FormControl size="small" sx={{ minWidth: 180 }}>
          <InputLabel>Filter by status</InputLabel>
          <Select value={filter} onChange={e => setFilter(e.target.value)} label="Filter by status">
            <MenuItem value="">All statuses</MenuItem>
            {STATUSES.map(s => <MenuItem key={s} value={s} sx={{ textTransform: 'capitalize' }}>{s.replace('-', ' ')}</MenuItem>)}
          </Select>
        </FormControl>
      </Box>

      {snack && <Alert severity="success" onClose={() => setSnack('')} sx={{ mb: 2 }}>{snack}</Alert>}

      <Card>
        <TableContainer>
          <Table>
            <TableHead sx={{ bgcolor: 'grey.50' }}>
              <TableRow>
                {['Order ID', 'Restaurant', 'Items', 'Total', 'Status', 'Date'].map(h => (
                  <TableCell key={h} sx={{ fontWeight: 700, color: 'text.secondary', fontSize: 12 }}>{h.toUpperCase()}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? [...Array(5)].map((_, i) => (
                <TableRow key={i}>{[...Array(6)].map((_, j) => <TableCell key={j}><Skeleton /></TableCell>)}</TableRow>
              )) : filtered.map(o => (
                <TableRow key={o.id} hover>
                  <TableCell sx={{ fontFamily: 'monospace', fontSize: 12, fontWeight: 600 }}>#{o.id.toUpperCase()}</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>{o.restaurantName}</TableCell>
                  <TableCell sx={{ maxWidth: 180 }}>
                    <Typography variant="caption" color="text.secondary">{o.items.map(i => `${i.name} ×${i.qty}`).join(', ')}</Typography>
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>LKR {o.total.toLocaleString()}</TableCell>
                  <TableCell>
                    <FormControl size="small" variant="outlined">
                      <Select value={o.status} onChange={e => handleStatusChange(o.id, e.target.value)}
                        sx={{ fontSize: 12, height: 30, '.MuiSelect-select': { py: 0.5, textTransform: 'capitalize' } }}>
                        {STATUSES.map(s => <MenuItem key={s} value={s} sx={{ fontSize: 13, textTransform: 'capitalize' }}>{s.replace('-', ' ')}</MenuItem>)}
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell sx={{ fontSize: 12, color: 'text.secondary', whiteSpace: 'nowrap' }}>
                    {new Date(o.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
              {!loading && filtered.length === 0 && (
                <TableRow><TableCell colSpan={6} align="center" sx={{ py: 6, color: 'text.secondary' }}>No orders found.</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
}
