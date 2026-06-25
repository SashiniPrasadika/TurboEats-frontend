import { useState, useEffect } from 'react';
import {
  Grid,
  Typography,
  Box,
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
  LinearProgress,
  Card,
  CardContent,
  Stepper,
  Step,
  StepLabel,
  StepConnector,
  stepConnectorClasses,
  styled
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
  Person as PersonIcon,
  DeliveryDining as DeliveryIcon,
  Cancel as CancelIcon,
  Assignment as AssignmentIcon,
  Receipt as ReceiptIcon,
  Pending as PendingIcon,
  LocalShipping as ShippingIcon,
  DoneAll as DoneAllIcon,
  Visibility as VisibilityIcon
} from '@mui/icons-material';
import MainCard from 'components/MainCard';

// Mock data for orders
const mockOrders = [
  {
    id: 'ORD-2024-001',
    customer: {
      name: 'John Doe',
      phone: '+94 77 123 4567',
      address: '123, Galle Road, Colombo 03'
    },
    restaurant: {
      name: 'Pizza Hut',
      id: 1,
      phone: '+94 11 234 5678'
    },
    items: [
      { name: 'Pepperoni Pizza', quantity: 2, price: 1850 },
      { name: 'Garlic Bread', quantity: 1, price: 450 },
      { name: 'Coca Cola', quantity: 2, price: 250 }
    ],
    subtotal: 2650,
    delivery_fee: 150,
    total: 2800,
    status: 'pending',
    payment_status: 'paid',
    payment_method: 'card',
    assigned_crew: null,
    created_at: '2024-03-18T10:30:00Z',
    updated_at: '2024-03-18T10:30:00Z',
    estimated_delivery: '2024-03-18T11:30:00Z',
    delivery_address: '123, Galle Road, Colombo 03',
    special_instructions: 'Ring doorbell twice'
  },
  {
    id: 'ORD-2024-002',
    customer: {
      name: 'Jane Smith',
      phone: '+94 77 234 5678',
      address: '45, Kandy Road, Colombo 07'
    },
    restaurant: {
      name: 'KFC',
      id: 2,
      phone: '+94 11 345 6789'
    },
    items: [
      { name: 'Chicken Bucket', quantity: 1, price: 2450 },
      { name: 'Fries', quantity: 2, price: 350 },
      { name: 'Pepsi', quantity: 2, price: 200 }
    ],
    subtotal: 3250,
    delivery_fee: 120,
    total: 3370,
    status: 'confirmed',
    payment_status: 'paid',
    payment_method: 'cash',
    assigned_crew: 'Kasun Perera',
    created_at: '2024-03-18T09:15:00Z',
    updated_at: '2024-03-18T09:20:00Z',
    estimated_delivery: '2024-03-18T10:30:00Z',
    delivery_address: '45, Kandy Road, Colombo 07',
    special_instructions: ''
  },
  {
    id: 'ORD-2024-003',
    customer: {
      name: 'Bob Johnson',
      phone: '+94 77 345 6789',
      address: '78, Marine Drive, Colombo 04'
    },
    restaurant: {
      name: 'Burger King',
      id: 3,
      phone: '+94 11 456 7890'
    },
    items: [
      { name: 'Whopper Meal', quantity: 2, price: 1950 },
      { name: 'Chicken Fries', quantity: 1, price: 550 }
    ],
    subtotal: 4450,
    delivery_fee: 130,
    total: 4580,
    status: 'preparing',
    payment_status: 'paid',
    payment_method: 'card',
    assigned_crew: 'Nuwan Silva',
    created_at: '2024-03-18T08:45:00Z',
    updated_at: '2024-03-18T08:50:00Z',
    estimated_delivery: '2024-03-18T10:00:00Z',
    delivery_address: '78, Marine Drive, Colombo 04',
    special_instructions: 'Leave at reception'
  },
  {
    id: 'ORD-2024-004',
    customer: {
      name: 'Alice Williams',
      phone: '+94 77 456 7890',
      address: '12, Duplication Road, Colombo 02'
    },
    restaurant: {
      name: 'McDonald\'s',
      id: 4,
      phone: '+94 11 567 8901'
    },
    items: [
      { name: 'Big Mac Meal', quantity: 1, price: 1450 },
      { name: 'McFlurry', quantity: 2, price: 450 }
    ],
    subtotal: 1900,
    delivery_fee: 140,
    total: 2040,
    status: 'out_for_delivery',
    payment_status: 'paid',
    payment_method: 'card',
    assigned_crew: 'Chamara Weerasinghe',
    created_at: '2024-03-18T07:30:00Z',
    updated_at: '2024-03-18T08:15:00Z',
    estimated_delivery: '2024-03-18T09:15:00Z',
    delivery_address: '12, Duplication Road, Colombo 02',
    special_instructions: 'Call on arrival'
  },
  {
    id: 'ORD-2024-005',
    customer: {
      name: 'Charlie Brown',
      phone: '+94 77 567 8901',
      address: '34, Havelock Road, Colombo 05'
    },
    restaurant: {
      name: 'Subway',
      id: 5,
      phone: '+94 11 678 9012'
    },
    items: [
      { name: 'Footlong Sandwich', quantity: 2, price: 1250 },
      { name: 'Cookies', quantity: 3, price: 150 },
      { name: 'Juice', quantity: 2, price: 250 }
    ],
    subtotal: 3100,
    delivery_fee: 100,
    total: 3200,
    status: 'delivered',
    payment_status: 'paid',
    payment_method: 'card',
    assigned_crew: 'Ruwan Jayasuriya',
    created_at: '2024-03-17T18:30:00Z',
    updated_at: '2024-03-17T19:45:00Z',
    estimated_delivery: '2024-03-17T19:30:00Z',
    delivery_address: '34, Havelock Road, Colombo 05',
    special_instructions: ''
  },
  {
    id: 'ORD-2024-006',
    customer: {
      name: 'Emma Davis',
      phone: '+94 77 678 9012',
      address: '56, Galle Road, Colombo 06'
    },
    restaurant: {
      name: 'Dominos Pizza',
      id: 6,
      phone: '+94 11 789 0123'
    },
    items: [
      { name: 'Chicken Pizza', quantity: 1, price: 1650 },
      { name: 'Stuffed Garlic Bread', quantity: 1, price: 650 }
    ],
    subtotal: 2300,
    delivery_fee: 150,
    total: 2450,
    status: 'cancelled',
    payment_status: 'refunded',
    payment_method: 'card',
    assigned_crew: null,
    created_at: '2024-03-17T16:20:00Z',
    updated_at: '2024-03-17T17:00:00Z',
    estimated_delivery: '2024-03-17T17:30:00Z',
    delivery_address: '56, Galle Road, Colombo 06',
    special_instructions: 'Customer cancelled - wrong address'
  },
  {
    id: 'ORD-2024-007',
    customer: {
      name: 'Michael Wilson',
      phone: '+94 77 789 0123',
      address: '89, Ward Place, Colombo 07'
    },
    restaurant: {
      name: 'Taco Bell',
      id: 7,
      phone: '+94 11 890 1234'
    },
    items: [
      { name: 'Taco Pack', quantity: 3, price: 850 },
      { name: 'Burrito', quantity: 2, price: 950 },
      { name: 'Nachos', quantity: 1, price: 650 }
    ],
    subtotal: 4250,
    delivery_fee: 120,
    total: 4370,
    status: 'pending',
    payment_status: 'unpaid',
    payment_method: 'cash',
    assigned_crew: null,
    created_at: '2024-03-18T11:00:00Z',
    updated_at: '2024-03-18T11:00:00Z',
    estimated_delivery: '2024-03-18T12:15:00Z',
    delivery_address: '89, Ward Place, Colombo 07',
    special_instructions: 'Extra salsa please'
  }
];

// Mock delivery crew data
const mockCrew = [
  { id: 1, name: 'Kasun Perera', phone: '+94 71 123 4567', vehicle: 'Motorcycle', status: 'available' },
  { id: 2, name: 'Nuwan Silva', phone: '+94 72 234 5678', vehicle: 'Bicycle', status: 'busy' },
  { id: 3, name: 'Chamara Weerasinghe', phone: '+94 77 345 6789', vehicle: 'Motorcycle', status: 'available' },
  { id: 4, name: 'Ruwan Jayasuriya', phone: '+94 78 456 7890', vehicle: 'Car', status: 'offline' },
  { id: 5, name: 'Tharindu Perera', phone: '+94 71 567 8901', vehicle: 'Motorcycle', status: 'available' },
  { id: 6, name: 'Sampath Kumara', phone: '+94 72 678 9012', vehicle: 'Bicycle', status: 'busy' }
];

// Custom styled step connector
const StyledConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.success.main,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.success.main,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

// Order status steps
const orderSteps = ['Pending', 'Confirmed', 'Preparing', 'Out for Delivery', 'Delivered'];

const getStatusStep = (status) => {
  switch (status) {
    case 'pending': return 0;
    case 'confirmed': return 1;
    case 'preparing': return 2;
    case 'out_for_delivery': return 3;
    case 'delivered': return 4;
    default: return 0;
  }
};

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [openAssignDialog, setOpenAssignDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  
  // Table pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  // Filter state
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');
  const [dateRange, setDateRange] = useState('today');
  
  // Action menu
  const [anchorEl, setAnchorEl] = useState(null);
  const [actionOrder, setActionOrder] = useState(null);
  
  // Assign crew state
  const [selectedCrew, setSelectedCrew] = useState('');
  const [crewList] = useState(mockCrew);

  // Load orders
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setOrders(mockOrders);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter orders based on search and filters
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.delivery_address.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesPayment = paymentFilter === 'all' || order.payment_status === paymentFilter;
    
    // Date filtering logic
    let matchesDate = true;
    if (dateRange === 'today') {
      const today = new Date().toDateString();
      matchesDate = new Date(order.created_at).toDateString() === today;
    } else if (dateRange === 'yesterday') {
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      matchesDate = new Date(order.created_at).toDateString() === yesterday;
    } else if (dateRange === 'week') {
      const weekAgo = new Date(Date.now() - 7 * 86400000);
      matchesDate = new Date(order.created_at) >= weekAgo;
    }
    
    return matchesSearch && matchesStatus && matchesPayment && matchesDate;
  });

  // Pagination
  const paginatedOrders = filteredOrders.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // Handlers
  const handleCancelOrder = (orderId) => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status: 'cancelled', payment_status: 'refunded' } : order
      ));
      setSnackbar({
        open: true,
        message: 'Order cancelled successfully',
        severity: 'success'
      });
    }
    handleMenuClose();
  };

  const handleUpdateStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    setSnackbar({
      open: true,
      message: `Order status updated to ${newStatus.replace('_', ' ')}`,
      severity: 'success'
    });
    handleMenuClose();
  };

  const handleAssignCrew = (orderId) => {
    if (!selectedCrew) {
      setSnackbar({
        open: true,
        message: 'Please select a delivery crew',
        severity: 'error'
      });
      return;
    }
    
    const crew = crewList.find(c => c.id === parseInt(selectedCrew));
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, assigned_crew: crew.name } : order
    ));
    setSnackbar({
      open: true,
      message: `Order assigned to ${crew.name}`,
      severity: 'success'
    });
    setOpenAssignDialog(false);
    setSelectedCrew('');
    handleMenuClose();
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setOpenDetailsDialog(true);
    handleMenuClose();
  };

  const handleMenuOpen = (event, order) => {
    setAnchorEl(event.currentTarget);
    setActionOrder(order);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setActionOrder(null);
  };

  // Helper functions
  const getStatusChip = (status) => {
    const statusConfig = {
      pending: { color: 'warning', icon: <PendingIcon />, label: 'Pending' },
      confirmed: { color: 'info', icon: <CheckCircleIcon />, label: 'Confirmed' },
      preparing: { color: 'primary', icon: <RestaurantIcon />, label: 'Preparing' },
      out_for_delivery: { color: 'secondary', icon: <ShippingIcon />, label: 'Out for Delivery' },
      delivered: { color: 'success', icon: <DoneAllIcon />, label: 'Delivered' },
      cancelled: { color: 'error', icon: <CancelIcon />, label: 'Cancelled' }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    
    return (
      <Chip
        label={config.label}
        size="small"
        icon={config.icon}
        sx={{
          bgcolor: `${config.color}.lighter`,
          color: `${config.color}.dark`,
          '& .MuiChip-icon': { color: `${config.color}.dark` }
        }}
      />
    );
  };

  const getPaymentChip = (status) => {
    return status === 'paid' ? (
      <Chip
        label="Paid"
        size="small"
        color="success"
        variant="outlined"
      />
    ) : status === 'refunded' ? (
      <Chip
        label="Refunded"
        size="small"
        color="error"
        variant="outlined"
      />
    ) : (
      <Chip
        label="Unpaid"
        size="small"
        color="warning"
        variant="outlined"
      />
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
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
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    preparing: orders.filter(o => ['confirmed', 'preparing'].includes(o.status)).length,
    outForDelivery: orders.filter(o => o.status === 'out_for_delivery').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length,
    totalRevenue: orders.reduce((sum, o) => sum + (o.status !== 'cancelled' ? o.total : 0), 0),
    todayOrders: orders.filter(o => new Date(o.created_at).toDateString() === new Date().toDateString()).length
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
            📦 Order Management
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Track, manage, and update all orders across the platform
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<ReceiptIcon />}
          size="large"
        >
          Export Orders
        </Button>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={2.4}>
          <MainCard>
            <Stack spacing={1}>
              <Typography color="text.secondary" variant="body2">Total Orders</Typography>
              <Typography variant="h4">{stats.total}</Typography>
            </Stack>
          </MainCard>
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <MainCard>
            <Stack spacing={1}>
              <Typography color="text.secondary" variant="body2">Today's Orders</Typography>
              <Typography variant="h4" color="info.main">{stats.todayOrders}</Typography>
            </Stack>
          </MainCard>
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <MainCard>
            <Stack spacing={1}>
              <Typography color="text.secondary" variant="body2">Pending</Typography>
              <Typography variant="h4" color="warning.main">{stats.pending}</Typography>
            </Stack>
          </MainCard>
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <MainCard>
            <Stack spacing={1}>
              <Typography color="text.secondary" variant="body2">In Progress</Typography>
              <Typography variant="h4" color="primary.main">{stats.preparing}</Typography>
            </Stack>
          </MainCard>
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <MainCard>
            <Stack spacing={1}>
              <Typography color="text.secondary" variant="body2">Revenue</Typography>
              <Typography variant="h4" color="success.main">{formatCurrency(stats.totalRevenue)}</Typography>
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
              placeholder="Search by order ID, customer, restaurant..."
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
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="confirmed">Confirmed</MenuItem>
                <MenuItem value="preparing">Preparing</MenuItem>
                <MenuItem value="out_for_delivery">Out for Delivery</MenuItem>
                <MenuItem value="delivered">Delivered</MenuItem>
                <MenuItem value="cancelled">Cancelled</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel>Payment</InputLabel>
              <Select
                value={paymentFilter}
                label="Payment"
                onChange={(e) => setPaymentFilter(e.target.value)}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="paid">Paid</MenuItem>
                <MenuItem value="unpaid">Unpaid</MenuItem>
                <MenuItem value="refunded">Refunded</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel>Date Range</InputLabel>
              <Select
                value={dateRange}
                label="Date Range"
                onChange={(e) => setDateRange(e.target.value)}
              >
                <MenuItem value="all">All Time</MenuItem>
                <MenuItem value="today">Today</MenuItem>
                <MenuItem value="yesterday">Yesterday</MenuItem>
                <MenuItem value="week">Last 7 Days</MenuItem>
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
                setPaymentFilter('all');
                setDateRange('today');
              }}
            >
              Reset Filters
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Orders Table */}
      <MainCard content={false}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Restaurant</TableCell>
                <TableCell>Items</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Payment</TableCell>
                <TableCell>Delivery Crew</TableCell>
                <TableCell>Time</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedOrders.map((order) => (
                <TableRow key={order.id} hover>
                  <TableCell>
                    <Typography variant="subtitle2">{order.id}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {formatDate(order.created_at)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.light' }}>
                        <PersonIcon fontSize="small" />
                      </Avatar>
                      <Box>
                        <Typography variant="body2">{order.customer.name}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {order.customer.phone}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Avatar sx={{ width: 32, height: 32, bgcolor: 'warning.light' }}>
                        <RestaurantIcon fontSize="small" />
                      </Avatar>
                      <Typography variant="body2">{order.restaurant.name}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Tooltip title={order.items.map(item => `${item.quantity}x ${item.name}`).join('\n')}>
                      <Typography variant="body2">
                        {order.items.length} item{order.items.length > 1 ? 's' : ''}
                      </Typography>
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" color="primary.main">
                      {formatCurrency(order.total)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {getStatusChip(order.status)}
                  </TableCell>
                  <TableCell>
                    {getPaymentChip(order.payment_status)}
                  </TableCell>
                  <TableCell>
                    {order.assigned_crew ? (
                      <Chip
                        label={order.assigned_crew}
                        size="small"
                        icon={<DeliveryIcon />}
                        variant="outlined"
                      />
                    ) : (
                      <Chip
                        label="Unassigned"
                        size="small"
                        variant="outlined"
                        sx={{ color: 'text.secondary' }}
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    <Tooltip title={`Est: ${new Date(order.estimated_delivery).toLocaleTimeString()}`}>
                      <Typography variant="caption">
                        {formatDate(order.created_at)}
                      </Typography>
                    </Tooltip>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      size="small"
                      onClick={(e) => handleMenuOpen(e, order)}
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
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={filteredOrders.length}
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
        <MenuItem onClick={() => handleViewDetails(actionOrder)}>
          <ListItemIcon>
            <VisibilityIcon fontSize="small" />
          </ListItemIcon>
          View Details
        </MenuItem>
        
        {actionOrder?.status !== 'cancelled' && actionOrder?.status !== 'delivered' && (
          <MenuItem onClick={() => {
            setSelectedOrder(actionOrder);
            setOpenAssignDialog(true);
            handleMenuClose();
          }}>
            <ListItemIcon>
              <AssignmentIcon fontSize="small" />
            </ListItemIcon>
            Assign Crew
          </MenuItem>
        )}
        
        <Divider />
        
        {actionOrder?.status === 'pending' && (
          <MenuItem onClick={() => handleUpdateStatus(actionOrder.id, 'confirmed')}>
            <ListItemIcon>
              <CheckCircleIcon fontSize="small" color="info" />
            </ListItemIcon>
            Confirm Order
          </MenuItem>
        )}
        
        {actionOrder?.status === 'confirmed' && (
          <MenuItem onClick={() => handleUpdateStatus(actionOrder.id, 'preparing')}>
            <ListItemIcon>
              <RestaurantIcon fontSize="small" color="primary" />
            </ListItemIcon>
            Start Preparing
          </MenuItem>
        )}
        
        {actionOrder?.status === 'preparing' && (
          <MenuItem onClick={() => handleUpdateStatus(actionOrder.id, 'out_for_delivery')}>
            <ListItemIcon>
              <ShippingIcon fontSize="small" color="secondary" />
            </ListItemIcon>
            Out for Delivery
          </MenuItem>
        )}
        
        {actionOrder?.status === 'out_for_delivery' && (
          <MenuItem onClick={() => handleUpdateStatus(actionOrder.id, 'delivered')}>
            <ListItemIcon>
              <DoneAllIcon fontSize="small" color="success" />
            </ListItemIcon>
            Mark as Delivered
          </MenuItem>
        )}
        
        {actionOrder?.status !== 'cancelled' && actionOrder?.status !== 'delivered' && (
          <MenuItem onClick={() => handleCancelOrder(actionOrder.id)} sx={{ color: 'error.main' }}>
            <ListItemIcon>
              <CancelIcon fontSize="small" color="error" />
            </ListItemIcon>
            Cancel Order
          </MenuItem>
        )}
      </Menu>

      {/* Order Details Dialog */}
      <Dialog open={openDetailsDialog} onClose={() => setOpenDetailsDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Typography variant="h5">Order Details - {selectedOrder?.id}</Typography>
        </DialogTitle>
        <DialogContent dividers>
          {selectedOrder && (
            <Grid container spacing={3}>
              {/* Order Status Stepper */}
              <Grid item xs={12}>
                <Stepper
                  activeStep={getStatusStep(selectedOrder.status)}
                  alternativeLabel
                  connector={<StyledConnector />}
                >
                  {orderSteps.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Grid>

              {/* Customer Information */}
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" gutterBottom>
                  Customer Information
                </Typography>
                <Card variant="outlined">
                  <CardContent>
                    <Stack spacing={1}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <PersonIcon color="primary" />
                        <Typography>{selectedOrder.customer.name}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <PhoneIcon color="primary" />
                        <Typography>{selectedOrder.customer.phone}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LocationIcon color="primary" />
                        <Typography>{selectedOrder.delivery_address}</Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>

              {/* Restaurant Information */}
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" gutterBottom>
                  Restaurant Information
                </Typography>
                <Card variant="outlined">
                  <CardContent>
                    <Stack spacing={1}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <RestaurantIcon color="warning" />
                        <Typography>{selectedOrder.restaurant.name}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <PhoneIcon color="warning" />
                        <Typography>{selectedOrder.restaurant.phone}</Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>

              {/* Order Items */}
              <Grid item xs={12}>
                <Typography variant="subtitle2" gutterBottom>
                  Order Items
                </Typography>
                <Card variant="outlined">
                  <CardContent>
                    <TableContainer>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>Item</TableCell>
                            <TableCell align="right">Qty</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="right">Total</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {selectedOrder.items.map((item, index) => (
                            <TableRow key={index}>
                              <TableCell>{item.name}</TableCell>
                              <TableCell align="right">{item.quantity}</TableCell>
                              <TableCell align="right">{formatCurrency(item.price)}</TableCell>
                              <TableCell align="right">{formatCurrency(item.price * item.quantity)}</TableCell>
                            </TableRow>
                          ))}
                          <TableRow>
                            <TableCell colSpan={3} align="right">
                              <Typography variant="subtitle2">Subtotal</Typography>
                            </TableCell>
                            <TableCell align="right">{formatCurrency(selectedOrder.subtotal)}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell colSpan={3} align="right">
                              <Typography variant="subtitle2">Delivery Fee</Typography>
                            </TableCell>
                            <TableCell align="right">{formatCurrency(selectedOrder.delivery_fee)}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell colSpan={3} align="right">
                              <Typography variant="h6">Total</Typography>
                            </TableCell>
                            <TableCell align="right">
                              <Typography variant="h6" color="primary.main">
                                {formatCurrency(selectedOrder.total)}
                              </Typography>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </CardContent>
                </Card>
              </Grid>

              {/* Payment & Delivery Information */}
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" gutterBottom>
                  Payment Information
                </Typography>
                <Card variant="outlined">
                  <CardContent>
                    <Stack spacing={1}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography>Payment Method:</Typography>
                        <Typography textTransform="capitalize">{selectedOrder.payment_method}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography>Payment Status:</Typography>
                        {getPaymentChip(selectedOrder.payment_status)}
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" gutterBottom>
                  Delivery Information
                </Typography>
                <Card variant="outlined">
                  <CardContent>
                    <Stack spacing={1}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography>Assigned Crew:</Typography>
                        <Typography>{selectedOrder.assigned_crew || 'Not assigned'}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography>Estimated Delivery:</Typography>
                        <Typography>{new Date(selectedOrder.estimated_delivery).toLocaleString()}</Typography>
                      </Box>
                      {selectedOrder.special_instructions && (
                        <Box>
                          <Typography variant="caption" color="text.secondary">
                            Special Instructions:
                          </Typography>
                          <Typography>{selectedOrder.special_instructions}</Typography>
                        </Box>
                      )}
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDetailsDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Assign Crew Dialog */}
      <Dialog open={openAssignDialog} onClose={() => setOpenAssignDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Typography variant="h5">Assign Delivery Crew</Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>
                Order: {selectedOrder?.id}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Select Crew Member</InputLabel>
                <Select
                  value={selectedCrew}
                  label="Select Crew Member"
                  onChange={(e) => setSelectedCrew(e.target.value)}
                >
                  {crewList.filter(crew => crew.status === 'available').map((crew) => (
                    <MenuItem key={crew.id} value={crew.id}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <DeliveryIcon fontSize="small" />
                        <Typography>{crew.name}</Typography>
                        <Chip
                          label={crew.vehicle}
                          size="small"
                          variant="outlined"
                          sx={{ ml: 1 }}
                        />
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAssignDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={() => handleAssignCrew(selectedOrder?.id)}
          >
            Assign Crew
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