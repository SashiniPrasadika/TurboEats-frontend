import { useState } from 'react';
import {
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Paper,
  Container,
  AppBar,
  Toolbar,
  IconButton,
  Chip,
  Rating,
  Divider,
  Tab,
  Tabs,
  Avatar,
  Stack
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Restaurant as RestaurantIcon,
  Receipt as ReceiptIcon,
  Replay as ReplayIcon,
  Visibility as VisibilityIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Mock orders data
const mockOrders = [
  {
    id: 'ORD-2024-001',
    restaurant: 'Pizza Hut',
    restaurantId: 1,
    date: '2024-03-18T18:30:00Z',
    items: [
      { name: 'Pepperoni Pizza', quantity: 2, price: 1850 },
      { name: 'Garlic Bread', quantity: 1, price: 450 }
    ],
    total: 2800,
    status: 'delivered',
    rating: 5
  },
  {
    id: 'ORD-2024-002',
    restaurant: 'KFC',
    restaurantId: 2,
    date: '2024-03-15T19:45:00Z',
    items: [
      { name: 'Chicken Bucket', quantity: 1, price: 2450 },
      { name: 'Fries', quantity: 2, price: 350 }
    ],
    total: 3370,
    status: 'delivered',
    rating: 4
  },
  {
    id: 'ORD-2024-003',
    restaurant: 'Burger King',
    restaurantId: 3,
    date: '2024-03-10T13:20:00Z',
    items: [
      { name: 'Whopper Meal', quantity: 2, price: 1950 }
    ],
    total: 4580,
    status: 'preparing',
    rating: null
  },
  {
    id: 'ORD-2024-004',
    restaurant: 'McDonald\'s',
    restaurantId: 4,
    date: '2024-03-05T12:15:00Z',
    items: [
      { name: 'Big Mac Meal', quantity: 1, price: 1450 },
      { name: 'McFlurry', quantity: 2, price: 450 }
    ],
    total: 2040,
    status: 'cancelled',
    rating: null
  }
];

// Tab Panel Component
function TabPanel({ children, value, index }) {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

export default function MyOrders() {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [orders] = useState(mockOrders);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const getFilteredOrders = () => {
    switch(tabValue) {
      case 0: return orders; // All orders
      case 1: return orders.filter(o => o.status === 'delivered');
      case 2: return orders.filter(o => ['preparing', 'out_for_delivery'].includes(o.status));
      case 3: return orders.filter(o => o.status === 'cancelled');
      default: return orders;
    }
  };

  const getStatusChip = (status) => {
    const statusConfig = {
      delivered: { color: 'success', label: 'Delivered' },
      preparing: { color: 'info', label: 'Preparing' },
      out_for_delivery: { color: 'primary', label: 'Out for Delivery' },
      cancelled: { color: 'error', label: 'Cancelled' },
      pending: { color: 'warning', label: 'Pending' }
    };
    
    const config = statusConfig[status] || { color: 'default', label: status };
    return <Chip label={config.label} size="small" color={config.color} />;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleReorder = (order) => {
    navigate(`/restaurant/${order.restaurantId}`);
  };

  const handleViewDetails = (orderId) => {
    navigate(`/order/${orderId}`);
  };

  const filteredOrders = getFilteredOrders();

  return (
    <Box sx={{ bgcolor: '#f8f9fa', minHeight: '100vh' }}>
      {/* Header */}
      <AppBar position="sticky" color="default" elevation={1} sx={{ bgcolor: 'white' }}>
        <Toolbar>
          <IconButton edge="start" onClick={() => navigate(-1)} sx={{ mr: 2 }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            My Orders
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Tabs */}
        <Paper sx={{ mb: 3 }}>
          <Tabs value={tabValue} onChange={handleTabChange} variant="fullWidth">
            <Tab label="All Orders" />
            <Tab label="Delivered" />
            <Tab label="In Progress" />
            <Tab label="Cancelled" />
          </Tabs>
        </Paper>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <ReceiptIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No orders found
            </Typography>
            <Button variant="contained" onClick={() => navigate('/restaurants')} sx={{ mt: 2 }}>
              Browse Restaurants
            </Button>
          </Paper>
        ) : (
          <Grid container spacing={3}>
            {filteredOrders.map((order) => (
              <Grid item xs={12} key={order.id}>
                <Card>
                  <CardContent>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={12} sm={3}>
                        <Typography variant="subtitle2">{order.id}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {formatDate(order.date)}
                        </Typography>
                      </Grid>
                      
                      <Grid item xs={12} sm={2}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.light' }}>
                            <RestaurantIcon fontSize="small" />
                          </Avatar>
                          <Typography variant="body2">{order.restaurant}</Typography>
                        </Box>
                      </Grid>
                      
                      <Grid item xs={6} sm={2}>
                        <Typography variant="body2" color="text.secondary">
                          {order.items.length} items
                        </Typography>
                        <Typography variant="subtitle2" color="primary.main">
                          LKR {order.total}
                        </Typography>
                      </Grid>
                      
                      <Grid item xs={6} sm={2}>
                        {getStatusChip(order.status)}
                      </Grid>
                      
                      <Grid item xs={12} sm={3}>
                        <Stack direction="row" spacing={1} justifyContent="flex-end">
                          {order.status === 'delivered' && !order.rating && (
                            <Box>
                              <Typography variant="caption" display="block" gutterBottom>
                                Rate your order
                              </Typography>
                              <Rating size="small" />
                            </Box>
                          )}
                          {order.status === 'delivered' && order.rating && (
                            <Rating size="small" value={order.rating} readOnly />
                          )}
                          <Button
                            size="small"
                            variant="outlined"
                            startIcon={<VisibilityIcon />}
                            onClick={() => handleViewDetails(order.id)}
                          >
                            Details
                          </Button>
                          <Button
                            size="small"
                            variant="contained"
                            startIcon={<ReplayIcon />}
                            onClick={() => handleReorder(order)}
                          >
                            Reorder
                          </Button>
                        </Stack>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}