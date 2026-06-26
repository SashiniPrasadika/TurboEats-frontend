// src/pages/customer/orders/OrdersPage.jsx
import { useState, useEffect } from 'react';
import {
  Box, Typography, Card, CardContent, Chip, Button, Divider, Stepper,
  Step, StepLabel, Skeleton, Alert
} from '@mui/material';
import { Refresh as ReorderIcon } from '@mui/icons-material';
import { getMyOrders } from '../../../api/orders';

const STATUS_COLOR = {
  delivered: 'success', 'on-the-way': 'info', preparing: 'warning',
  confirmed: 'primary', pending: 'default', cancelled: 'error',
};

const STATUS_STEPS = ['confirmed', 'preparing', 'on-the-way', 'delivered'];

const MOCK_ORDERS = [
  {
    id: 'o1', restaurantName: 'Pizza Hut', status: 'on-the-way', total: 3405,
    items: [{ name: 'Pepperoni Pizza', qty: 1 }, { name: 'Garlic Bread', qty: 2 }],
    createdAt: '2026-06-25T12:30:00.000Z', deliveryAddress: 'Kalutara, Western Province',
  },
  {
    id: 'o2', restaurantName: 'Burger King', status: 'delivered', total: 3049,
    items: [{ name: 'Whopper', qty: 2 }, { name: 'Onion Rings', qty: 1 }],
    createdAt: '2026-06-20T19:15:00.000Z', deliveryAddress: 'Kalutara, Western Province',
  },
  {
    id: 'o3', restaurantName: 'KFC', status: 'delivered', total: 2780,
    items: [{ name: 'Zinger Burger', qty: 2 }, { name: 'Hot Wings 6 pcs', qty: 1 }],
    createdAt: '2026-06-17T13:00:00.000Z', deliveryAddress: 'Kalutara, Western Province',
  },
];

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyOrders()
      .then(r => setOrders(r.data?.length ? r.data : MOCK_ORDERS))
      .catch(() => setOrders(MOCK_ORDERS))
      .finally(() => setLoading(false));
  }, []);

  const active = orders.find(o => !['delivered', 'cancelled'].includes(o.status));
  const past = orders.filter(o => ['delivered', 'cancelled'].includes(o.status));

  const stepIndex = active ? STATUS_STEPS.indexOf(active.status) : -1;

  return (
    <Box sx={{ maxWidth: 820, mx: 'auto', px: 3, py: 4 }}>
      <Typography variant="h4" fontWeight={800} mb={3}>My Orders</Typography>

      {loading ? (
        [...Array(3)].map((_, i) => <Skeleton key={i} height={120} sx={{ borderRadius: 2, mb: 2 }} />)
      ) : (
        <>
          {/* Active order tracker */}
          {active && (
            <Card sx={{ mb: 4, border: '2px solid', borderColor: 'primary.light' }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 0.5 }}>
                  <Box>
                    <Typography variant="caption" color="text.secondary">Current order</Typography>
                    <Typography fontWeight={700} fontSize={16}>{active.restaurantName} — #{active.id.toUpperCase()}</Typography>
                  </Box>
                  <Chip label={active.status.replace('-', ' ')} color={STATUS_COLOR[active.status]} size="small" sx={{ fontWeight: 700, textTransform: 'capitalize' }} />
                </Box>
                {active.status === 'on-the-way' && (
                  <Alert severity="info" sx={{ my: 1.5, py: 0.5 }}>🛵 Your order is on the way — arriving in approx. 12 minutes!</Alert>
                )}
                <Stepper activeStep={stepIndex} alternativeLabel sx={{ mt: 2.5 }}>
                  {STATUS_STEPS.map(s => (
                    <Step key={s}><StepLabel sx={{ '& .MuiStepLabel-label': { fontSize: 12, textTransform: 'capitalize' } }}>{s.replace('-', ' ')}</StepLabel></Step>
                  ))}
                </Stepper>
              </CardContent>
            </Card>
          )}

          {/* Past orders */}
          {past.length > 0 && (
            <>
              <Typography variant="h6" fontWeight={700} mb={2}>Past Orders</Typography>
              {past.map(order => (
                <Card key={order.id} sx={{ mb: 2, transition: 'box-shadow 0.2s', '&:hover': { boxShadow: 3 } }}>
                  <CardContent sx={{ p: 2.5 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                      <Box>
                        <Typography fontWeight={700} fontSize={15} mb={0.3}>{order.restaurantName}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {order.items.map(i => `${i.name} ×${i.qty}`).join(', ')}
                        </Typography>
                      </Box>
                      <Chip label={order.status} color={STATUS_COLOR[order.status]} size="small" sx={{ fontWeight: 700, textTransform: 'capitalize', flexShrink: 0 }} />
                    </Box>
                    <Divider sx={{ my: 1.5 }} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box>
                        <Typography fontWeight={700} color="primary.main">LKR {order.total.toLocaleString()}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {new Date(order.createdAt).toLocaleDateString('en-LK', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </Typography>
                      </Box>
                      <Button variant="outlined" size="small" startIcon={<ReorderIcon />} sx={{ fontWeight: 600 }}>
                        Reorder
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </>
          )}

          {orders.length === 0 && (
            <Box textAlign="center" py={10}>
              <Typography fontSize={56} mb={2}>📦</Typography>
              <Typography variant="h6" fontWeight={700}>No orders yet</Typography>
              <Typography color="text.secondary">Your order history will appear here.</Typography>
            </Box>
          )}
        </>
      )}
    </Box>
  );
}
