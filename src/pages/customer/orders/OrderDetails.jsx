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
  Divider,
  Stepper,
  Step,
  StepLabel,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Stack
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Restaurant as RestaurantIcon,
  LocationOn as LocationIcon,
  AccessTime as TimeIcon,
  Payment as PaymentIcon,
  Receipt as ReceiptIcon
} from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';

// Mock order details
const mockOrderDetails = {
  id: 'ORD-2024-001',
  restaurant: 'Pizza Hut',
  restaurantId: 1,
  restaurantAddress: '123, Galle Road, Colombo 03',
  restaurantPhone: '+94 11 234 5678',
  date: '2024-03-18T18:30:00Z',
  items: [
    { name: 'Pepperoni Pizza', quantity: 2, price: 1850 },
    { name: 'Garlic Bread', quantity: 1, price: 450 },
    { name: 'Coca Cola', quantity: 2, price: 250 }
  ],
  subtotal: 2650,
  deliveryFee: 150,
  tax: 140,
  total: 2800,
  status: 'delivered',
  paymentMethod: 'Credit Card •••• 4242',
  deliveryAddress: '123, Galle Road, Bambalapitiya, Colombo 04',
  estimatedDelivery: '2024-03-18T19:30:00Z',
  driver: {
    name: 'Kasun Perera',
    phone: '+94 77 123 4567',
    vehicle: 'Motorcycle'
  }
};

const orderSteps = ['Order Placed', 'Confirmed', 'Preparing', 'Out for Delivery', 'Delivered'];

const getStatusStep = (status) => {
  switch(status) {
    case 'pending': return 0;
    case 'confirmed': return 1;
    case 'preparing': return 2;
    case 'out_for_delivery': return 3;
    case 'delivered': return 4;
    default: return 0;
  }
};

export default function OrderDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [order] = useState(mockOrderDetails); // In real app, fetch by id

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Box sx={{ bgcolor: '#f8f9fa', minHeight: '100vh' }}>
      {/* Header */}
      <AppBar position="sticky" color="default" elevation={1} sx={{ bgcolor: 'white' }}>
        <Toolbar>
          <IconButton edge="start" onClick={() => navigate(-1)} sx={{ mr: 2 }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Order Details
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ py: 4 }}>
        {/* Order Status */}
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h5" gutterBottom>
            Order #{order.id}
          </Typography>
          <Stepper activeStep={getStatusStep(order.status)} sx={{ mt: 3 }}>
            {orderSteps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Paper>

        {/* Restaurant Info */}
        <Paper sx={{ p: 3, mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Avatar sx={{ bgcolor: 'primary.main', width: 48, height: 48 }}>
              <RestaurantIcon />
            </Avatar>
            <Box>
              <Typography variant="h6">{order.restaurant}</Typography>
              <Typography variant="body2" color="text.secondary">
                {order.restaurantAddress}
              </Typography>
            </Box>
          </Box>
          <Button variant="outlined" size="small" onClick={() => navigate(`/restaurant/${order.restaurantId}`)}>
            View Restaurant
          </Button>
        </Paper>

        {/* Order Items */}
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Order Items
          </Typography>
          <List>
            {order.items.map((item, index) => (
              <ListItem key={index} divider={index < order.items.length - 1}>
                <ListItemText
                  primary={item.name}
                  secondary={`Quantity: ${item.quantity}`}
                />
                <Typography variant="body2">
                  LKR {item.price * item.quantity}
                </Typography>
              </ListItem>
            ))}
          </List>
          
          <Divider sx={{ my: 2 }} />
          
          <Stack spacing={1}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2">Subtotal</Typography>
              <Typography variant="body2">LKR {order.subtotal}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2">Delivery Fee</Typography>
              <Typography variant="body2">LKR {order.deliveryFee}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2">Tax</Typography>
              <Typography variant="body2">LKR {order.tax}</Typography>
            </Box>
            <Divider />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h6">Total</Typography>
              <Typography variant="h6" color="primary.main">
                LKR {order.total}
              </Typography>
            </Box>
          </Stack>
        </Paper>

        {/* Delivery Info */}
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Delivery Information
          </Typography>
          
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <LocationIcon color="action" />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Delivery Address
                  </Typography>
                  <Typography variant="body2">{order.deliveryAddress}</Typography>
                </Box>
              </Box>
            </Grid>
            
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <AccessTimeIcon color="action" />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Estimated Delivery
                  </Typography>
                  <Typography variant="body2">{formatDate(order.estimatedDelivery)}</Typography>
                </Box>
              </Box>
            </Grid>
            
            {order.driver && (
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <PersonIcon color="action" />
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Delivery Partner
                    </Typography>
                    <Typography variant="body2">{order.driver.name}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {order.driver.vehicle} • {order.driver.phone}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            )}
          </Grid>
        </Paper>

        {/* Payment Info */}
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Payment Information
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 1 }}>
            <PaymentIcon color="action" />
            <Box>
              <Typography variant="body2" color="text.secondary">
                Payment Method
              </Typography>
              <Typography variant="body2">{order.paymentMethod}</Typography>
            </Box>
          </Box>
        </Paper>

        {/* Actions */}
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button
            variant="contained"
            startIcon={<ReplayIcon />}
            onClick={() => navigate(`/restaurant/${order.restaurantId}`)}
          >
            Reorder
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate('/orders')}
          >
            Back to Orders
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

// Add missing icons
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import ReplayIcon from '@mui/icons-material/Replay';