// src/pages/dashboard/default.jsx
import { useState, useEffect } from 'react';
import { Box, Typography, Grid, Card, CardContent, Chip, Avatar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Skeleton } from '@mui/material';
import { People, Restaurant, ShoppingBag, AttachMoney } from '@mui/icons-material';
import { getDashboardStats } from '../../api/users';

const MOCK_STATS = {
  totalUsers: 3, totalRestaurants: 6, totalOrders: 2, totalRevenue: 6454,
  recentOrders: [
    { id: 'o1', restaurantName: 'Pizza Hut', status: 'on-the-way', total: 3405, createdAt: '2026-06-25T12:30:00Z' },
    { id: 'o2', restaurantName: 'Burger King', status: 'delivered', total: 3049, createdAt: '2026-06-20T19:15:00Z' },
  ],
  ordersByStatus: { pending: 0, confirmed: 0, preparing: 0, 'on-the-way': 1, delivered: 1, cancelled: 0 },
};

const STATUS_COLOR = { delivered: 'success', 'on-the-way': 'info', preparing: 'warning', confirmed: 'primary', pending: 'default', cancelled: 'error' };

function StatCard({ icon, title, value, sub, color }) {
  return (
    <Card>
      <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2.5, p: 2.5 }}>
        <Avatar sx={{ width: 52, height: 52, bgcolor: `${color}.lighter` || '#fff3f0', color: `${color}.main` }}>
          {icon}
        </Avatar>
        <Box>
          <Typography variant="h4" fontWeight={800} lineHeight={1.2}>{value}</Typography>
          <Typography variant="body2" fontWeight={600} color="text.primary">{title}</Typography>
          {sub && <Typography variant="caption" color="text.secondary">{sub}</Typography>}
        </Box>
      </CardContent>
    </Card>
  );
}

export default function DashboardDefault() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardStats().then(r => setStats(r.data)).catch(() => setStats(MOCK_STATS)).finally(() => setLoading(false));
  }, []);

  const s = stats || MOCK_STATS;

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Typography variant="h4" fontWeight={800} mb={0.5}>Dashboard Overview</Typography>
      <Typography color="text.secondary" mb={3}>Welcome back, Admin! Here's what's happening today.</Typography>

      {loading ? (
        <Grid container spacing={2.5}>{[...Array(4)].map((_, i) => <Grid item xs={12} sm={6} md={3} key={i}><Skeleton height={100} sx={{ borderRadius: 2 }} /></Grid>)}</Grid>
      ) : (
        <Grid container spacing={2.5} mb={4}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard icon={<People />} title="Total Customers" value={s.totalUsers} sub="Registered users" color="primary" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard icon={<Restaurant />} title="Restaurants" value={s.totalRestaurants} sub="Active partners" color="warning" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard icon={<ShoppingBag />} title="Total Orders" value={s.totalOrders} sub="All time" color="info" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard icon={<AttachMoney />} title="Revenue" value={`LKR ${(s.totalRevenue || 0).toLocaleString()}`} sub="From delivered orders" color="success" />
          </Grid>
        </Grid>
      )}

      <Grid container spacing={3}>
        {/* Order status breakdown */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography fontWeight={700} fontSize={16} mb={2}>Orders by Status</Typography>
              {Object.entries(s.ordersByStatus || {}).map(([status, count]) => (
                <Box key={status} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.2 }}>
                  <Chip label={status.replace('-', ' ')} color={STATUS_COLOR[status]} size="small" sx={{ fontWeight: 600, textTransform: 'capitalize', minWidth: 100 }} />
                  <Typography fontWeight={700}>{count}</Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Recent orders */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography fontWeight={700} fontSize={16} mb={2}>Recent Orders</Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700, color: 'text.secondary', fontSize: 12 }}>ORDER ID</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: 'text.secondary', fontSize: 12 }}>RESTAURANT</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: 'text.secondary', fontSize: 12 }}>STATUS</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: 'text.secondary', fontSize: 12 }} align="right">TOTAL</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(s.recentOrders || []).map(o => (
                      <TableRow key={o.id} hover>
                        <TableCell sx={{ fontFamily: 'monospace', fontSize: 12 }}>#{o.id.toUpperCase()}</TableCell>
                        <TableCell>{o.restaurantName}</TableCell>
                        <TableCell><Chip label={o.status.replace('-', ' ')} color={STATUS_COLOR[o.status]} size="small" sx={{ fontWeight: 600, textTransform: 'capitalize' }} /></TableCell>
                        <TableCell align="right" sx={{ fontWeight: 700 }}>LKR {o.total.toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
