import { useState } from 'react';
import {
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  TextField,
  Avatar,
  Paper,
  Container,
  AppBar,
  Toolbar,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Switch,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Snackbar,
  Tab,
  Tabs,
  Badge,
  Stack,
  Chip,
  Rating,
  Menu,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  InputAdornment
} from '@mui/material';
import {
  Person as PersonIcon,
  ArrowBack as ArrowBackIcon,
  Edit as EditIcon,
  LocationOn as LocationIcon,
  Payment as PaymentIcon,
  ShoppingBag as OrdersIcon,
  Favorite as FavoriteIcon,
  Notifications as NotificationsIcon,
  Security as SecurityIcon,
  Help as HelpIcon,
  Logout as LogoutIcon,
  ChevronRight as ChevronRightIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  CalendarToday as CalendarIcon,
  CreditCard as CreditCardIcon,
  Home as HomeIcon,
  Work as WorkIcon,
  Star as StarIcon,
  Restaurant as RestaurantIcon,
  AccessTime as TimeIcon,
  Receipt as ReceiptIcon,
  Verified as VerifiedIcon
} from '@mui/icons-material';
import { useNavigate, Link } from 'react-router-dom';

// Mock user data
const mockUser = {
  id: 1,
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  phone: '+94 77 123 4567',
  avatar: null,
  dateJoined: '2024-01-15',
  dateOfBirth: '1990-05-15',
  gender: 'male',
  preferences: {
    notifications: true,
    emailUpdates: true,
    smsAlerts: false
  }
};

// Mock addresses
const mockAddresses = [
  {
    id: 1,
    type: 'home',
    label: 'Home',
    addressLine1: '123, Galle Road',
    addressLine2: 'Bambalapitiya',
    city: 'Colombo',
    district: 'Colombo',
    postalCode: '00400',
    isDefault: true,
    instructions: 'Ring the doorbell twice'
  },
  {
    id: 2,
    type: 'work',
    label: 'Office',
    addressLine1: '45, Union Place',
    addressLine2: 'Colombo 02',
    city: 'Colombo',
    district: 'Colombo',
    postalCode: '00200',
    isDefault: false,
    instructions: 'Leave at reception'
  }
];

// Mock payment methods
const mockPaymentMethods = [
  {
    id: 1,
    type: 'card',
    cardType: 'visa',
    last4: '4242',
    expiryDate: '12/25',
    cardHolderName: 'John Doe',
    isDefault: true
  },
  {
    id: 2,
    type: 'card',
    cardType: 'mastercard',
    last4: '8888',
    expiryDate: '08/24',
    cardHolderName: 'John Doe',
    isDefault: false
  }
];

// Mock order history
const mockOrders = [
  {
    id: 'ORD-2024-001',
    restaurant: 'Pizza Hut',
    date: '2024-03-18T18:30:00Z',
    total: 2800,
    status: 'delivered',
    items: 3,
    rating: 5
  },
  {
    id: 'ORD-2024-002',
    restaurant: 'KFC',
    date: '2024-03-15T19:45:00Z',
    total: 3370,
    status: 'delivered',
    items: 3,
    rating: 4
  },
  {
    id: 'ORD-2024-003',
    restaurant: 'Burger King',
    date: '2024-03-10T13:20:00Z',
    total: 4580,
    status: 'delivered',
    items: 2,
    rating: 5
  },
  {
    id: 'ORD-2024-004',
    restaurant: 'McDonald\'s',
    date: '2024-03-05T12:15:00Z',
    total: 2040,
    status: 'cancelled',
    items: 2,
    rating: null
  }
];

// Mock favorites
const mockFavorites = [
  {
    id: 1,
    name: 'Pizza Hut',
    cuisine: 'Italian • Pizza',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200'
  },
  {
    id: 2,
    name: 'KFC',
    cuisine: 'Fast Food • Chicken',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=200'
  },
  {
    id: 3,
    name: 'Burger King',
    cuisine: 'Fast Food • Burgers',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=200'
  }
];

// Tab Panel Component
function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default function ProfilePage() {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  
  // User state
  const [user, setUser] = useState(mockUser);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editForm, setEditForm] = useState(user);
  
  // Address state
  const [addresses, setAddresses] = useState(mockAddresses);
  const [addressDialogOpen, setAddressDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [addressForm, setAddressForm] = useState({
    type: 'home',
    label: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    district: '',
    postalCode: '',
    isDefault: false,
    instructions: ''
  });
  
  // Payment methods state
  const [paymentMethods, setPaymentMethods] = useState(mockPaymentMethods);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [paymentForm, setPaymentForm] = useState({
    cardNumber: '',
    cardHolderName: '',
    expiryDate: '',
    cvv: '',
    isDefault: false
  });
  
  // Orders state
  const [orders] = useState(mockOrders);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderDetailsOpen, setOrderDetailsOpen] = useState(false);
  
  // Favorites state
  const [favorites] = useState(mockFavorites);
  
  // Settings state
  const [settings, setSettings] = useState(user.preferences);
  
  // Snackbar state
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  
  // Menu state
  const [anchorEl, setAnchorEl] = useState(null);
  const [actionItem, setActionItem] = useState(null);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Profile handlers
  const handleSaveProfile = () => {
    setUser(editForm);
    setEditDialogOpen(false);
    setSnackbar({
      open: true,
      message: 'Profile updated successfully',
      severity: 'success'
    });
  };

  // Address handlers
  const handleAddAddress = () => {
    setEditingAddress(null);
    setAddressForm({
      type: 'home',
      label: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      district: '',
      postalCode: '',
      isDefault: false,
      instructions: ''
    });
    setAddressDialogOpen(true);
  };

  const handleEditAddress = (address) => {
    setEditingAddress(address);
    setAddressForm(address);
    setAddressDialogOpen(true);
  };

  const handleSaveAddress = () => {
    if (editingAddress) {
      // Update existing address
      setAddresses(addresses.map(addr => 
        addr.id === editingAddress.id ? { ...addressForm, id: addr.id } : addr
      ));
      setSnackbar({
        open: true,
        message: 'Address updated successfully',
        severity: 'success'
      });
    } else {
      // Add new address
      const newAddress = {
        ...addressForm,
        id: addresses.length + 1
      };
      setAddresses([...addresses, newAddress]);
      setSnackbar({
        open: true,
        message: 'Address added successfully',
        severity: 'success'
      });
    }
    setAddressDialogOpen(false);
  };

  const handleDeleteAddress = (addressId) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      setAddresses(addresses.filter(addr => addr.id !== addressId));
      setSnackbar({
        open: true,
        message: 'Address deleted successfully',
        severity: 'success'
      });
    }
    handleMenuClose();
  };

  const handleSetDefaultAddress = (addressId) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === addressId
    })));
    setSnackbar({
      open: true,
      message: 'Default address updated',
      severity: 'success'
    });
  };

  // Payment method handlers
  const handleAddPayment = () => {
    setPaymentForm({
      cardNumber: '',
      cardHolderName: '',
      expiryDate: '',
      cvv: '',
      isDefault: false
    });
    setPaymentDialogOpen(true);
  };

  const handleSavePayment = () => {
    // Mock saving payment method
    const last4 = paymentForm.cardNumber.slice(-4);
    const newPayment = {
      id: paymentMethods.length + 1,
      type: 'card',
      cardType: 'visa',
      last4: last4,
      expiryDate: paymentForm.expiryDate,
      cardHolderName: paymentForm.cardHolderName,
      isDefault: paymentForm.isDefault
    };
    
    if (paymentForm.isDefault) {
      setPaymentMethods(paymentMethods.map(p => ({ ...p, isDefault: false })));
    }
    
    setPaymentMethods([...paymentMethods, newPayment]);
    setPaymentDialogOpen(false);
    setSnackbar({
      open: true,
      message: 'Payment method added successfully',
      severity: 'success'
    });
  };

  const handleDeletePayment = (paymentId) => {
    if (window.confirm('Are you sure you want to delete this payment method?')) {
      setPaymentMethods(paymentMethods.filter(p => p.id !== paymentId));
      setSnackbar({
        open: true,
        message: 'Payment method deleted',
        severity: 'success'
      });
    }
    handleMenuClose();
  };

  const handleSetDefaultPayment = (paymentId) => {
    setPaymentMethods(paymentMethods.map(p => ({
      ...p,
      isDefault: p.id === paymentId
    })));
    setSnackbar({
      open: true,
      message: 'Default payment method updated',
      severity: 'success'
    });
  };

  // Order handlers
  const handleViewOrderDetails = (order) => {
    setSelectedOrder(order);
    setOrderDetailsOpen(true);
  };

  const handleReorder = (orderId) => {
    navigate(`/restaurant/1`); // Navigate to restaurant page
    setSnackbar({
      open: true,
      message: 'Items added to cart',
      severity: 'success'
    });
  };

  const handleRateOrder = (orderId, rating) => {
    // Update order rating
    setSnackbar({
      open: true,
      message: 'Thank you for your rating!',
      severity: 'success'
    });
  };

  // Menu handlers
  const handleMenuOpen = (event, item, type) => {
    setAnchorEl(event.currentTarget);
    setActionItem({ item, type });
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setActionItem(null);
  };

  // Settings handlers
  const handleSettingChange = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  // Logout handler
  const handleLogout = () => {
    // Add logout logic here
    setSnackbar({
      open: true,
      message: 'Logged out successfully',
      severity: 'success'
    });
    setTimeout(() => {
      navigate('/login');
    }, 1500);
  };

  // Helper functions
  const getAddressIcon = (type) => {
    switch(type) {
      case 'home': return <HomeIcon />;
      case 'work': return <WorkIcon />;
      default: return <LocationIcon />;
    }
  };

  const getStatusChip = (status) => {
    const statusConfig = {
      delivered: { color: 'success', label: 'Delivered' },
      pending: { color: 'warning', label: 'Pending' },
      preparing: { color: 'info', label: 'Preparing' },
      out_for_delivery: { color: 'primary', label: 'Out for Delivery' },
      cancelled: { color: 'error', label: 'Cancelled' }
    };
    
    const config = statusConfig[status] || { color: 'default', label: status };
    
    return (
      <Chip
        label={config.label}
        size="small"
        color={config.color}
      />
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
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
          
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
            My Profile
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Profile Header Card */}
        <Paper sx={{ p: 3, mb: 3 }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={8} sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <Avatar
                sx={{
                  width: 100,
                  height: 100,
                  bgcolor: 'primary.main',
                  fontSize: '2.5rem'
                }}
              >
                {user.firstName.charAt(0)}{user.lastName.charAt(0)}
              </Avatar>
              
              <Box>
                <Typography variant="h4" gutterBottom>
                  {user.firstName} {user.lastName}
                </Typography>
                
                <Stack direction="row" spacing={2} flexWrap="wrap">
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <EmailIcon fontSize="small" color="action" />
                    <Typography variant="body2">{user.email}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <PhoneIcon fontSize="small" color="action" />
                    <Typography variant="body2">{user.phone}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <CalendarIcon fontSize="small" color="action" />
                    <Typography variant="body2">
                      Member since {new Date(user.dateJoined).toLocaleDateString()}
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={4} sx={{ textAlign: 'right' }}>
              <Button
                variant="outlined"
                startIcon={<EditIcon />}
                onClick={() => setEditDialogOpen(true)}
                size="large"
              >
                Edit Profile
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {/* Profile Tabs */}
        <Paper sx={{ mb: 3 }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab icon={<PersonIcon />} label="Profile" iconPosition="start" />
            <Tab icon={<LocationIcon />} label="Addresses" iconPosition="start" />
            <Tab icon={<PaymentIcon />} label="Payments" iconPosition="start" />
            <Tab icon={<OrdersIcon />} label="Orders" iconPosition="start" />
            <Tab icon={<FavoriteIcon />} label="Favorites" iconPosition="start" />
            <Tab icon={<SettingsIcon />} label="Settings" iconPosition="start" />
          </Tabs>
        </Paper>

        {/* Profile Tab Content */}
        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            {/* Personal Information */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Personal Information
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  
                  <Stack spacing={2}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" color="text.secondary">Full Name</Typography>
                      <Typography variant="body2">{user.firstName} {user.lastName}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" color="text.secondary">Email Address</Typography>
                      <Typography variant="body2">{user.email}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" color="text.secondary">Phone Number</Typography>
                      <Typography variant="body2">{user.phone}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" color="text.secondary">Date of Birth</Typography>
                      <Typography variant="body2">
                        {new Date(user.dateOfBirth).toLocaleDateString()}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" color="text.secondary">Gender</Typography>
                      <Typography variant="body2" textTransform="capitalize">{user.gender}</Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            {/* Account Statistics */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Account Statistics
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                        <Typography variant="h4" color="primary.main">
                          {orders.length}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Total Orders
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={6}>
                      <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                        <Typography variant="h4" color="success.main">
                          {orders.filter(o => o.status === 'delivered').length}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Delivered
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={6}>
                      <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                        <Typography variant="h4" color="warning.main">
                          {addresses.length}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Saved Addresses
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={6}>
                      <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                        <Typography variant="h4" color="info.main">
                          {favorites.length}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Favorite Restaurants
                        </Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            {/* Recent Activity */}
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Recent Activity
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  
                  <List>
                    {orders.slice(0, 3).map((order) => (
                      <ListItem key={order.id} divider>
                        <ListItemIcon>
                          <ReceiptIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText
                          primary={order.restaurant}
                          secondary={`Order #${order.id} • ${formatDate(order.date)}`}
                        />
                        <Typography variant="body2" color="primary.main">
                          LKR {order.total}
                        </Typography>
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Addresses Tab Content */}
        <TabPanel value={tabValue} index={1}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Typography variant="h6">Saved Addresses</Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddAddress}
            >
              Add New Address
            </Button>
          </Box>

          <Grid container spacing={3}>
            {addresses.map((address) => (
              <Grid item xs={12} md={6} key={address.id}>
                <Card sx={{ position: 'relative' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar sx={{ bgcolor: 'primary.lighter', color: 'primary.main' }}>
                          {getAddressIcon(address.type)}
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle1">
                            {address.label}
                            {address.isDefault && (
                              <Chip
                                label="Default"
                                size="small"
                                color="primary"
                                sx={{ ml: 1 }}
                              />
                            )}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {address.type}
                          </Typography>
                        </Box>
                      </Box>
                      <IconButton
                        size="small"
                        onClick={(e) => handleMenuOpen(e, address, 'address')}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </Box>

                    <Typography variant="body2" paragraph>
                      {address.addressLine1}<br />
                      {address.addressLine2}<br />
                      {address.city}, {address.district} - {address.postalCode}
                    </Typography>

                    {address.instructions && (
                      <Chip
                        label={`Note: ${address.instructions}`}
                        size="small"
                        variant="outlined"
                      />
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        {/* Payments Tab Content */}
        <TabPanel value={tabValue} index={2}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Typography variant="h6">Payment Methods</Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddPayment}
            >
              Add Payment Method
            </Button>
          </Box>

          <Grid container spacing={3}>
            {paymentMethods.map((payment) => (
              <Grid item xs={12} md={6} key={payment.id}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{ bgcolor: 'grey.100' }}>
                          <CreditCardIcon color="primary" />
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle1">
                            {payment.cardType.charAt(0).toUpperCase() + payment.cardType.slice(1)} •••• {payment.last4}
                            {payment.isDefault && (
                              <Chip
                                label="Default"
                                size="small"
                                color="primary"
                                sx={{ ml: 1 }}
                              />
                            )}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Expires {payment.expiryDate}
                          </Typography>
                        </Box>
                      </Box>
                      <IconButton
                        size="small"
                        onClick={(e) => handleMenuOpen(e, payment, 'payment')}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </Box>
                    <Typography variant="body2">
                      {payment.cardHolderName}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        {/* Orders Tab Content */}
        <TabPanel value={tabValue} index={3}>
          <Typography variant="h6" gutterBottom>
            Order History
          </Typography>

          <List>
            {orders.map((order) => (
              <Card key={order.id} sx={{ mb: 2 }}>
                <CardContent>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={3}>
                      <Typography variant="subtitle2">{order.id}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {formatDate(order.date)}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <Typography variant="body2">{order.restaurant}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {order.items} items
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sm={2}>
                      <Typography variant="body2" color="primary.main">
                        LKR {order.total}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sm={2}>
                      {getStatusChip(order.status)}
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                        {order.status === 'delivered' && !order.rating && (
                          <Rating
                            size="small"
                            onChange={(e, value) => handleRateOrder(order.id, value)}
                          />
                        )}
                        {order.status === 'delivered' && order.rating && (
                          <Rating size="small" value={order.rating} readOnly />
                        )}
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => handleViewOrderDetails(order)}
                        >
                          Details
                        </Button>
                        <Button
                          size="small"
                          variant="contained"
                          onClick={() => handleReorder(order.id)}
                        >
                          Reorder
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))}
          </List>
        </TabPanel>

        {/* Favorites Tab Content */}
        <TabPanel value={tabValue} index={4}>
          <Typography variant="h6" gutterBottom>
            Favorite Restaurants
          </Typography>

          <Grid container spacing={3}>
            {favorites.map((fav) => (
              <Grid item xs={12} sm={6} md={4} key={fav.id}>
                <Card sx={{ display: 'flex', cursor: 'pointer' }}
                  onClick={() => navigate(`/restaurant/${fav.id}`)}
                >
                  <CardMedia
                    component="img"
                    sx={{ width: 100, height: 100, objectFit: 'cover' }}
                    image={fav.image}
                    alt={fav.name}
                  />
                  <CardContent sx={{ flex: 1 }}>
                    <Typography variant="subtitle2">{fav.name}</Typography>
                    <Typography variant="caption" color="text.secondary" display="block">
                      {fav.cuisine}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                      <StarIcon sx={{ fontSize: 16, color: 'warning.main', mr: 0.5 }} />
                      <Typography variant="body2">{fav.rating}</Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        {/* Settings Tab Content */}
        <TabPanel value={tabValue} index={5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Notification Settings
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <NotificationsIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="Push Notifications"
                        secondary="Receive order updates and offers"
                      />
                      <Switch
                        edge="end"
                        checked={settings.notifications}
                        onChange={() => handleSettingChange('notifications')}
                      />
                    </ListItem>
                    
                    <ListItem>
                      <ListItemIcon>
                        <EmailIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="Email Updates"
                        secondary="Receive promotional emails"
                      />
                      <Switch
                        edge="end"
                        checked={settings.emailUpdates}
                        onChange={() => handleSettingChange('emailUpdates')}
                      />
                    </ListItem>
                    
                    <ListItem>
                      <ListItemIcon>
                        <PhoneIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="SMS Alerts"
                        secondary="Get SMS for order status"
                      />
                      <Switch
                        edge="end"
                        checked={settings.smsAlerts}
                        onChange={() => handleSettingChange('smsAlerts')}
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Account Settings
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  
                  <List>
                    <ListItemButton component={Link} to="/security">
                      <ListItemIcon>
                        <SecurityIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="Security"
                        secondary="Password and account security"
                      />
                      <ChevronRightIcon />
                    </ListItemButton>
                    
                    <ListItemButton component={Link} to="/help">
                      <ListItemIcon>
                        <HelpIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="Help & Support"
                        secondary="FAQs and contact support"
                      />
                      <ChevronRightIcon />
                    </ListItemButton>
                    
                    <ListItemButton onClick={handleLogout}>
                      <ListItemIcon>
                        <LogoutIcon color="error" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Logout"
                        secondary="Sign out of your account"
                        primaryTypographyProps={{ color: 'error' }}
                      />
                    </ListItemButton>
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>
      </Container>

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {actionItem?.type === 'address' && (
          [
            <MenuItem key="edit" onClick={() => {
              handleEditAddress(actionItem.item);
              handleMenuClose();
            }}>
              <ListItemIcon><EditIcon fontSize="small" /></ListItemIcon>
              Edit Address
            </MenuItem>,
            !actionItem.item.isDefault && (
              <MenuItem key="set-default" onClick={() => {
                handleSetDefaultAddress(actionItem.item.id);
                handleMenuClose();
              }}>
                <ListItemIcon><VerifiedIcon fontSize="small" color="primary" /></ListItemIcon>
                Set as Default
              </MenuItem>
            ),
            <MenuItem key="delete" onClick={() => {
              handleDeleteAddress(actionItem.item.id);
              handleMenuClose();
            }} sx={{ color: 'error.main' }}>
              <ListItemIcon><DeleteIcon fontSize="small" color="error" /></ListItemIcon>
              Delete Address
            </MenuItem>
          ]
        )}

        {actionItem?.type === 'payment' && (
          [
            !actionItem.item.isDefault && (
              <MenuItem key="set-default" onClick={() => {
                handleSetDefaultPayment(actionItem.item.id);
                handleMenuClose();
              }}>
                <ListItemIcon><VerifiedIcon fontSize="small" color="primary" /></ListItemIcon>
                Set as Default
              </MenuItem>
            ),
            <MenuItem key="delete" onClick={() => {
              handleDeletePayment(actionItem.item.id);
              handleMenuClose();
            }} sx={{ color: 'error.main' }}>
              <ListItemIcon><DeleteIcon fontSize="small" color="error" /></ListItemIcon>
              Delete Payment Method
            </MenuItem>
          ]
        )}
      </Menu>

      {/* Edit Profile Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                value={editForm.firstName}
                onChange={(e) => setEditForm({ ...editForm, firstName: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                value={editForm.lastName}
                onChange={(e) => setEditForm({ ...editForm, lastName: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={editForm.email}
                onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone"
                value={editForm.phone}
                onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Date of Birth"
                type="date"
                value={editForm.dateOfBirth}
                onChange={(e) => setEditForm({ ...editForm, dateOfBirth: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Gender</InputLabel>
                <Select
                  value={editForm.gender}
                  label="Gender"
                  onChange={(e) => setEditForm({ ...editForm, gender: e.target.value })}
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveProfile}>
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add/Edit Address Dialog */}
      <Dialog open={addressDialogOpen} onClose={() => setAddressDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingAddress ? 'Edit Address' : 'Add New Address'}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Address Type</InputLabel>
                <Select
                  value={addressForm.type}
                  label="Address Type"
                  onChange={(e) => setAddressForm({ ...addressForm, type: e.target.value })}
                >
                  <MenuItem value="home">Home</MenuItem>
                  <MenuItem value="work">Work</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address Label"
                placeholder="e.g., Home, Office, etc."
                value={addressForm.label}
                onChange={(e) => setAddressForm({ ...addressForm, label: e.target.value })}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address Line 1"
                value={addressForm.addressLine1}
                onChange={(e) => setAddressForm({ ...addressForm, addressLine1: e.target.value })}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address Line 2"
                value={addressForm.addressLine2}
                onChange={(e) => setAddressForm({ ...addressForm, addressLine2: e.target.value })}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="City"
                value={addressForm.city}
                onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="District"
                value={addressForm.district}
                onChange={(e) => setAddressForm({ ...addressForm, district: e.target.value })}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Postal Code"
                value={addressForm.postalCode}
                onChange={(e) => setAddressForm({ ...addressForm, postalCode: e.target.value })}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={2}
                label="Delivery Instructions (Optional)"
                placeholder="e.g., Ring doorbell twice, Leave at reception, etc."
                value={addressForm.instructions}
                onChange={(e) => setAddressForm({ ...addressForm, instructions: e.target.value })}
              />
            </Grid>
            
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={addressForm.isDefault}
                    onChange={(e) => setAddressForm({ ...addressForm, isDefault: e.target.checked })}
                  />
                }
                label="Set as default address"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddressDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveAddress}>
            {editingAddress ? 'Update' : 'Save'} Address
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Payment Method Dialog */}
      <Dialog open={paymentDialogOpen} onClose={() => setPaymentDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add Payment Method</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Card Number"
                placeholder="1234 5678 9012 3456"
                value={paymentForm.cardNumber}
                onChange={(e) => setPaymentForm({ ...paymentForm, cardNumber: e.target.value })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CreditCardIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Card Holder Name"
                placeholder="John Doe"
                value={paymentForm.cardHolderName}
                onChange={(e) => setPaymentForm({ ...paymentForm, cardHolderName: e.target.value })}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Expiry Date"
                placeholder="MM/YY"
                value={paymentForm.expiryDate}
                onChange={(e) => setPaymentForm({ ...paymentForm, expiryDate: e.target.value })}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="CVV"
                type="password"
                placeholder="123"
                value={paymentForm.cvv}
                onChange={(e) => setPaymentForm({ ...paymentForm, cvv: e.target.value })}
              />
            </Grid>
            
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={paymentForm.isDefault}
                    onChange={(e) => setPaymentForm({ ...paymentForm, isDefault: e.target.checked })}
                  />
                }
                label="Set as default payment method"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPaymentDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSavePayment}>
            Add Payment Method
          </Button>
        </DialogActions>
      </Dialog>

      {/* Order Details Dialog */}
      <Dialog open={orderDetailsOpen} onClose={() => setOrderDetailsOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Typography variant="h5">Order Details - {selectedOrder?.id}</Typography>
        </DialogTitle>
        <DialogContent dividers>
          {selectedOrder && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="subtitle2" gutterBottom>
                  Order Status
                </Typography>
                {getStatusChip(selectedOrder.status)}
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" gutterBottom>
                  Restaurant
                </Typography>
                <Typography variant="body2">{selectedOrder.restaurant}</Typography>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" gutterBottom>
                  Order Date
                </Typography>
                <Typography variant="body2">{formatDate(selectedOrder.date)}</Typography>
              </Grid>
              
              <Grid item xs={12}>
                <Typography variant="subtitle2" gutterBottom>
                  Order Summary
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">Subtotal</Typography>
                  <Typography variant="body2">LKR {selectedOrder.total - 150 - (selectedOrder.total * 0.05)}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">Delivery Fee</Typography>
                  <Typography variant="body2">LKR 150</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">Tax (5%)</Typography>
                  <Typography variant="body2">LKR {Math.round(selectedOrder.total * 0.05)}</Typography>
                </Box>
                <Divider sx={{ my: 1 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="subtitle1">Total</Typography>
                  <Typography variant="h6" color="primary.main">
                    LKR {selectedOrder.total}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOrderDetailsOpen(false)}>Close</Button>
          <Button variant="contained" onClick={() => handleReorder(selectedOrder?.id)}>
            Reorder
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

// Add missing icons
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SettingsIcon from '@mui/icons-material/Settings';