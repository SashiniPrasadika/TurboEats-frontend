import { useState, useEffect } from 'react';
import {
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Chip,
  Avatar,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  Tooltip,
  Paper,
  FormControl,
  InputLabel,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Rating,
  LinearProgress
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Restaurant as RestaurantIcon,
  LocationOn as LocationIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  AccessTime as TimeIcon,
  AttachMoney as MoneyIcon,
  Block as BlockIcon,
  CheckCircle as CheckCircleIcon,
  MoreVert as MoreVertIcon,
  Refresh as RefreshIcon,
  FilterList as FilterIcon,
  Star as StarIcon,
  Category as CategoryIcon,
  Image as ImageIcon
} from '@mui/icons-material';
import MainCard from 'components/MainCard';

// Mock data for restaurants matching your backend structure
const mockRestaurants = [
  {
    id: 1,
    name: 'Pizza Hut',
    email: 'contact@pizzahut.lk',
    phone: '+94 11 234 5678',
    address: 'Colombo 03, Sri Lanka',
    cuisine_type: 'Italian, Pizza',
    owner_name: 'John Doe',
    owner_phone: '+94 77 123 4567',
    opening_time: '10:00 AM',
    closing_time: '11:00 PM',
    rating: 4.8,
    total_orders: 1250,
    revenue: 45600,
    is_active: true,
    is_verified: true,
    delivery_fee: 150,
    minimum_order: 500,
    created_at: '2024-01-15T10:30:00Z',
    updated_at: '2024-03-10T14:20:00Z',
    image_url: null
  },
  {
    id: 2,
    name: 'KFC',
    email: 'contact@kfc.lk',
    phone: '+94 11 345 6789',
    address: 'Colombo 02, Sri Lanka',
    cuisine_type: 'Fast Food, Chicken',
    owner_name: 'Jane Smith',
    owner_phone: '+94 77 234 5678',
    opening_time: '10:00 AM',
    closing_time: '10:00 PM',
    rating: 4.6,
    total_orders: 980,
    revenue: 38900,
    is_active: true,
    is_verified: true,
    delivery_fee: 120,
    minimum_order: 400,
    created_at: '2024-02-20T09:15:00Z',
    updated_at: '2024-03-09T11:30:00Z',
    image_url: null
  },
  {
    id: 3,
    name: 'Burger King',
    email: 'contact@burgerking.lk',
    phone: '+94 11 456 7890',
    address: 'Colombo 04, Sri Lanka',
    cuisine_type: 'Fast Food, Burgers',
    owner_name: 'Bob Johnson',
    owner_phone: '+94 77 345 6789',
    opening_time: '10:00 AM',
    closing_time: '11:00 PM',
    rating: 4.5,
    total_orders: 876,
    revenue: 32450,
    is_active: true,
    is_verified: true,
    delivery_fee: 130,
    minimum_order: 450,
    created_at: '2024-01-10T16:45:00Z',
    updated_at: '2024-03-08T10:10:00Z',
    image_url: null
  },
  {
    id: 4,
    name: 'McDonald\'s',
    email: 'contact@mcdonalds.lk',
    phone: '+94 11 567 8901',
    address: 'Colombo 07, Sri Lanka',
    cuisine_type: 'Fast Food, Burgers',
    owner_name: 'Alice Williams',
    owner_phone: '+94 77 456 7890',
    opening_time: '10:00 AM',
    closing_time: '11:00 PM',
    rating: 4.7,
    total_orders: 1100,
    revenue: 41200,
    is_active: true,
    is_verified: true,
    delivery_fee: 140,
    minimum_order: 500,
    created_at: '2023-12-05T13:20:00Z',
    updated_at: '2024-03-07T15:40:00Z',
    image_url: null
  },
  {
    id: 5,
    name: 'Subway',
    email: 'contact@subway.lk',
    phone: '+94 11 678 9012',
    address: 'Colombo 05, Sri Lanka',
    cuisine_type: 'Healthy, Sandwiches',
    owner_name: 'Charlie Brown',
    owner_phone: '+94 77 567 8901',
    opening_time: '09:00 AM',
    closing_time: '10:00 PM',
    rating: 4.4,
    total_orders: 654,
    revenue: 23400,
    is_active: false,
    is_verified: false,
    delivery_fee: 100,
    minimum_order: 350,
    created_at: '2024-03-01T11:00:00Z',
    updated_at: '2024-03-01T11:00:00Z',
    image_url: null
  },
  {
    id: 6,
    name: 'Dominos Pizza',
    email: 'contact@dominos.lk',
    phone: '+94 11 789 0123',
    address: 'Colombo 06, Sri Lanka',
    cuisine_type: 'Italian, Pizza',
    owner_name: 'Emma Davis',
    owner_phone: '+94 77 678 9012',
    opening_time: '10:00 AM',
    closing_time: '11:00 PM',
    rating: 4.3,
    total_orders: 543,
    revenue: 19800,
    is_active: true,
    is_verified: true,
    delivery_fee: 150,
    minimum_order: 500,
    created_at: '2024-02-15T09:30:00Z',
    updated_at: '2024-03-06T14:20:00Z',
    image_url: null
  },
  {
    id: 7,
    name: 'Taco Bell',
    email: 'contact@tacobell.lk',
    phone: '+94 11 890 1234',
    address: 'Colombo 03, Sri Lanka',
    cuisine_type: 'Mexican, Fast Food',
    owner_name: 'Michael Wilson',
    owner_phone: '+94 77 789 0123',
    opening_time: '11:00 AM',
    closing_time: '10:00 PM',
    rating: 4.2,
    total_orders: 432,
    revenue: 15600,
    is_active: false,
    is_verified: false,
    delivery_fee: 120,
    minimum_order: 400,
    created_at: '2024-02-28T15:45:00Z',
    updated_at: '2024-03-05T11:10:00Z',
    image_url: null
  }
];

export default function RestaurantsPage() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  
  // Table pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  
  // Filter state
  const [statusFilter, setStatusFilter] = useState('all');
  const [verificationFilter, setVerificationFilter] = useState('all');
  const [cuisineFilter, setCuisineFilter] = useState('all');
  
  // Action menu
  const [anchorEl, setAnchorEl] = useState(null);
  const [actionRestaurant, setActionRestaurant] = useState(null);

  // Load restaurants
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setRestaurants(mockRestaurants);
      setLoading(false);
    }, 1000);
  }, []);

  // Get unique cuisine types for filter
  const cuisineTypes = ['all', ...new Set(restaurants.map(r => r.cuisine_type.split(',')[0].trim()))];

  // Filter restaurants based on search and filters
  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchesSearch = 
      restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      restaurant.cuisine_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      restaurant.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      restaurant.owner_name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'active' && restaurant.is_active) ||
      (statusFilter === 'inactive' && !restaurant.is_active);
    
    const matchesVerification = verificationFilter === 'all' || 
      (verificationFilter === 'verified' && restaurant.is_verified) ||
      (verificationFilter === 'unverified' && !restaurant.is_verified);
    
    const matchesCuisine = cuisineFilter === 'all' || 
      restaurant.cuisine_type.toLowerCase().includes(cuisineFilter.toLowerCase());
    
    return matchesSearch && matchesStatus && matchesVerification && matchesCuisine;
  });

  // Pagination
  const paginatedRestaurants = filteredRestaurants.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // Handlers
  const handleDelete = (restaurantId) => {
    if (window.confirm('Are you sure you want to deactivate this restaurant?')) {
      setRestaurants(restaurants.map(restaurant => 
        restaurant.id === restaurantId ? { ...restaurant, is_active: false } : restaurant
      ));
      setSnackbar({
        open: true,
        message: 'Restaurant deactivated successfully',
        severity: 'success'
      });
    }
    handleMenuClose();
  };

  const handleActivate = (restaurantId) => {
    setRestaurants(restaurants.map(restaurant => 
      restaurant.id === restaurantId ? { ...restaurant, is_active: true } : restaurant
    ));
    setSnackbar({
      open: true,
      message: 'Restaurant activated successfully',
      severity: 'success'
    });
    handleMenuClose();
  };

  const handleVerify = (restaurantId) => {
    setRestaurants(restaurants.map(restaurant => 
      restaurant.id === restaurantId ? { ...restaurant, is_verified: true } : restaurant
    ));
    setSnackbar({
      open: true,
      message: 'Restaurant verified successfully',
      severity: 'success'
    });
    handleMenuClose();
  };

  const handleEdit = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setOpenDialog(true);
    handleMenuClose();
  };

  const handleAdd = () => {
    setSelectedRestaurant(null);
    setOpenDialog(true);
  };

  const handleMenuOpen = (event, restaurant) => {
    setAnchorEl(event.currentTarget);
    setActionRestaurant(restaurant);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setActionRestaurant(null);
  };

  // Helper functions
  const getStatusChip = (isActive) => {
    return isActive ? (
      <Chip
        label="Active"
        size="small"
        icon={<CheckCircleIcon />}
        sx={{
          bgcolor: 'success.lighter',
          color: 'success.dark',
          '& .MuiChip-icon': { color: 'success.dark' }
        }}
      />
    ) : (
      <Chip
        label="Inactive"
        size="small"
        icon={<BlockIcon />}
        sx={{
          bgcolor: 'error.lighter',
          color: 'error.dark',
          '& .MuiChip-icon': { color: 'error.dark' }
        }}
      />
    );
  };

  const getVerificationChip = (isVerified) => {
    return isVerified ? (
      <Chip
        label="Verified"
        size="small"
        sx={{
          bgcolor: 'info.lighter',
          color: 'info.dark'
        }}
      />
    ) : (
      <Chip
        label="Unverified"
        size="small"
        variant="outlined"
        sx={{
          color: 'text.secondary'
        }}
      />
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  // Stats
  const stats = {
    total: restaurants.length,
    active: restaurants.filter(r => r.is_active).length,
    inactive: restaurants.filter(r => !r.is_active).length,
    verified: restaurants.filter(r => r.is_verified).length,
    unverified: restaurants.filter(r => !r.is_verified).length,
    totalRevenue: restaurants.reduce((sum, r) => sum + r.revenue, 0),
    totalOrders: restaurants.reduce((sum, r) => sum + r.total_orders, 0)
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <LinearProgress sx={{ width: 300 }} />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            🍽️ Restaurant Management
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage restaurants, verify listings, and monitor performance
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAdd}
          size="large"
        >
          Add Restaurant
        </Button>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={2.4}>
          <MainCard>
            <Stack spacing={1}>
              <Typography color="text.secondary" variant="body2">Total Restaurants</Typography>
              <Typography variant="h4">{stats.total}</Typography>
            </Stack>
          </MainCard>
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <MainCard>
            <Stack spacing={1}>
              <Typography color="text.secondary" variant="body2">Active</Typography>
              <Typography variant="h4" color="success.main">{stats.active}</Typography>
            </Stack>
          </MainCard>
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <MainCard>
            <Stack spacing={1}>
              <Typography color="text.secondary" variant="body2">Verified</Typography>
              <Typography variant="h4" color="info.main">{stats.verified}</Typography>
            </Stack>
          </MainCard>
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <MainCard>
            <Stack spacing={1}>
              <Typography color="text.secondary" variant="body2">Total Orders</Typography>
              <Typography variant="h4">{stats.totalOrders}</Typography>
            </Stack>
          </MainCard>
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <MainCard>
            <Stack spacing={1}>
              <Typography color="text.secondary" variant="body2">Total Revenue</Typography>
              <Typography variant="h4" color="primary.main">{formatCurrency(stats.totalRevenue)}</Typography>
            </Stack>
          </MainCard>
        </Grid>
      </Grid>

      {/* Filters */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              size="small"
              placeholder="Search by name, cuisine, address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel>Status</InputLabel>
              <Select
                value={statusFilter}
                label="Status"
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <MenuItem value="all">All Status</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel>Verification</InputLabel>
              <Select
                value={verificationFilter}
                label="Verification"
                onChange={(e) => setVerificationFilter(e.target.value)}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="verified">Verified</MenuItem>
                <MenuItem value="unverified">Unverified</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel>Cuisine</InputLabel>
              <Select
                value={cuisineFilter}
                label="Cuisine"
                onChange={(e) => setCuisineFilter(e.target.value)}
              >
                {cuisineTypes.map((cuisine) => (
                  <MenuItem key={cuisine} value={cuisine}>
                    {cuisine === 'all' ? 'All Cuisines' : cuisine}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
                setVerificationFilter('all');
                setCuisineFilter('all');
              }}
            >
              Reset Filters
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Restaurants Table */}
      <MainCard content={false}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Restaurant</TableCell>
                <TableCell>Contact</TableCell>
                <TableCell>Cuisine</TableCell>
                <TableCell>Rating</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Verification</TableCell>
                <TableCell>Performance</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedRestaurants.map((restaurant) => (
                <TableRow key={restaurant.id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar
                        sx={{
                          bgcolor: restaurant.is_active ? 'warning.main' : 'grey.400',
                          width: 40,
                          height: 40
                        }}
                      >
                        <RestaurantIcon />
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle2">
                          {restaurant.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Owner: {restaurant.owner_name}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Stack spacing={0.5}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <EmailIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                        <Typography variant="body2">{restaurant.email}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <PhoneIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                        <Typography variant="body2">{restaurant.phone}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LocationIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                        <Typography variant="body2" noWrap sx={{ maxWidth: 200 }}>
                          {restaurant.address}
                        </Typography>
                      </Box>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={restaurant.cuisine_type}
                      size="small"
                      icon={<CategoryIcon />}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Rating value={restaurant.rating} precision={0.1} readOnly size="small" />
                      <Typography variant="body2">{restaurant.rating}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {getStatusChip(restaurant.is_active)}
                  </TableCell>
                  <TableCell>
                    {getVerificationChip(restaurant.is_verified)}
                  </TableCell>
                  <TableCell>
                    <Stack spacing={0.5}>
                      <Typography variant="caption" color="text.secondary">
                        Orders: {restaurant.total_orders}
                      </Typography>
                      <Typography variant="caption" color="primary.main">
                        Revenue: {formatCurrency(restaurant.revenue)}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      size="small"
                      onClick={(e) => handleMenuOpen(e, restaurant)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredRestaurants.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
        />
      </MainCard>

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleEdit(actionRestaurant)}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          Edit Details
        </MenuItem>
        {!actionRestaurant?.is_verified && (
          <MenuItem onClick={() => handleVerify(actionRestaurant?.id)} sx={{ color: 'info.main' }}>
            <ListItemIcon>
              <CheckCircleIcon fontSize="small" color="info" />
            </ListItemIcon>
            Verify Restaurant
          </MenuItem>
        )}
        <Divider />
        {actionRestaurant?.is_active ? (
          <MenuItem onClick={() => handleDelete(actionRestaurant.id)} sx={{ color: 'error.main' }}>
            <ListItemIcon>
              <BlockIcon fontSize="small" color="error" />
            </ListItemIcon>
            Deactivate
          </MenuItem>
        ) : (
          <MenuItem onClick={() => handleActivate(actionRestaurant.id)} sx={{ color: 'success.main' }}>
            <ListItemIcon>
              <CheckCircleIcon fontSize="small" color="success" />  {/* ✅ FIXED: Changed from ActiveIcon to CheckCircleIcon */}
            </ListItemIcon>
            Activate
          </MenuItem>
        )}
      </Menu>

      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Typography variant="h5">
            {selectedRestaurant ? 'Edit Restaurant' : 'Add New Restaurant'}
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Restaurant Name"
                defaultValue={selectedRestaurant?.name || ''}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Cuisine Type"
                defaultValue={selectedRestaurant?.cuisine_type || ''}
                required
                placeholder="e.g., Italian, Pizza"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                defaultValue={selectedRestaurant?.email || ''}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Phone Number"
                defaultValue={selectedRestaurant?.phone || ''}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Address"
                defaultValue={selectedRestaurant?.address || ''}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>
                Owner Information
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Owner Name"
                defaultValue={selectedRestaurant?.owner_name || ''}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Owner Phone"
                defaultValue={selectedRestaurant?.owner_phone || ''}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>
                Operating Hours
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Opening Time"
                type="time"
                defaultValue={selectedRestaurant?.opening_time || '10:00'}
                InputLabelProps={{ shrink: true }}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <TimeIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Closing Time"
                type="time"
                defaultValue={selectedRestaurant?.closing_time || '22:00'}
                InputLabelProps={{ shrink: true }}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <TimeIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>
                Delivery Settings
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Delivery Fee (LKR)"
                type="number"
                defaultValue={selectedRestaurant?.delivery_fee || 0}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MoneyIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Minimum Order (LKR)"
                type="number"
                defaultValue={selectedRestaurant?.minimum_order || 0}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MoneyIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  defaultValue={selectedRestaurant?.is_active ? 'active' : 'inactive'}
                  label="Status"
                >
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Verification</InputLabel>
                <Select
                  defaultValue={selectedRestaurant?.is_verified ? 'verified' : 'unverified'}
                  label="Verification"
                >
                  <MenuItem value="verified">Verified</MenuItem>
                  <MenuItem value="unverified">Unverified</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button 
            variant="contained"
            onClick={() => {
              setOpenDialog(false);
              setSnackbar({
                open: true,
                message: selectedRestaurant ? 'Restaurant updated successfully' : 'Restaurant added successfully',
                severity: 'success'
              });
            }}
          >
            {selectedRestaurant ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}