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
  TablePagination
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  AdminPanelSettings as AdminIcon,
  Restaurant as RestaurantIcon,
  PersonOutline as CustomerIcon,
  Block as BlockIcon,
  CheckCircle as ActiveIcon,
  MoreVert as MoreVertIcon,
  Refresh as RefreshIcon,
  FilterList as FilterIcon
} from '@mui/icons-material';
import MainCard from 'components/MainCard';

// Mock data matching your backend entity
const mockUsers = [
  {
    id: 1,
    email: 'john.doe@example.com',
    first_name: 'John',
    last_name: 'Doe',
    phone_number: '+94 77 123 4567',
    user_type: 'admin',
    is_active: true,
    created_at: '2024-01-15T10:30:00Z',
    updated_at: '2024-03-10T14:20:00Z'
  },
  {
    id: 2,
    email: 'jane.smith@example.com',
    first_name: 'Jane',
    last_name: 'Smith',
    phone_number: '+94 77 234 5678',
    user_type: 'restaurant_owner',
    is_active: true,
    created_at: '2024-02-20T09:15:00Z',
    updated_at: '2024-03-09T11:30:00Z'
  },
  {
    id: 3,
    email: 'bob.johnson@example.com',
    first_name: 'Bob',
    last_name: 'Johnson',
    phone_number: '+94 77 345 6789',
    user_type: 'customer',
    is_active: false,
    created_at: '2024-01-10T16:45:00Z',
    updated_at: '2024-03-08T10:10:00Z'
  },
  {
    id: 4,
    email: 'alice.williams@example.com',
    first_name: 'Alice',
    last_name: 'Williams',
    phone_number: '+94 77 456 7890',
    user_type: 'restaurant_owner',
    is_active: true,
    created_at: '2023-12-05T13:20:00Z',
    updated_at: '2024-03-07T15:40:00Z'
  },
  {
    id: 5,
    email: 'charlie.brown@example.com',
    first_name: 'Charlie',
    last_name: 'Brown',
    phone_number: '+94 77 567 8901',
    user_type: 'customer',
    is_active: true,
    created_at: '2024-03-01T11:00:00Z',
    updated_at: '2024-03-01T11:00:00Z'
  }
];

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  
  // Table pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  
  // Filter state
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Action menu
  const [anchorEl, setAnchorEl] = useState(null);
  const [actionUser, setActionUser] = useState(null);

  // Load users
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setUsers(mockUsers);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter users based on search and filters
  const filteredUsers = users.filter(user => {
    const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
    const matchesSearch = 
      fullName.includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.user_type.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = roleFilter === 'all' || user.user_type === roleFilter;
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'active' && user.is_active) ||
      (statusFilter === 'inactive' && !user.is_active);
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  // Pagination
  const paginatedUsers = filteredUsers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // Handlers
  const handleDelete = (userId) => {
    if (window.confirm('Are you sure you want to deactivate this user?')) {
      setUsers(users.map(user => 
        user.id === userId ? { ...user, is_active: false } : user
      ));
      setSnackbar({
        open: true,
        message: 'User deactivated successfully',
        severity: 'success'
      });
    }
    handleMenuClose();
  };

  const handleActivate = (userId) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, is_active: true } : user
    ));
    setSnackbar({
      open: true,
      message: 'User activated successfully',
      severity: 'success'
    });
    handleMenuClose();
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setOpenDialog(true);
    handleMenuClose();
  };

  const handleAdd = () => {
    setSelectedUser(null);
    setOpenDialog(true);
  };

  const handleMenuOpen = (event, user) => {
    setAnchorEl(event.currentTarget);
    setActionUser(user);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setActionUser(null);
  };

  // Helper functions
  const getFullName = (user) => `${user.first_name} ${user.last_name}`;
  
  const getInitials = (user) => {
    return `${user.first_name.charAt(0)}${user.last_name.charAt(0)}`;
  };

  const getStatusChip = (isActive) => {
    return isActive ? (
      <Chip
        label="Active"
        size="small"
        icon={<ActiveIcon />}
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

  const getRoleChip = (role) => {
    switch (role) {
      case 'admin':
        return (
          <Chip
            label="Admin"
            size="small"
            icon={<AdminIcon />}
            sx={{
              bgcolor: 'error.lighter',
              color: 'error.dark',
              '& .MuiChip-icon': { color: 'error.dark' }
            }}
          />
        );
      case 'restaurant_owner':
        return (
          <Chip
            label="Restaurant Owner"
            size="small"
            icon={<RestaurantIcon />}
            sx={{
              bgcolor: 'warning.lighter',
              color: 'warning.dark',
              '& .MuiChip-icon': { color: 'warning.dark' }
            }}
          />
        );
      default:
        return (
          <Chip
            label="Customer"
            size="small"
            icon={<CustomerIcon />}
            sx={{
              bgcolor: 'primary.lighter',
              color: 'primary.dark',
              '& .MuiChip-icon': { color: 'primary.dark' }
            }}
          />
        );
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Stats
  const stats = {
    total: users.length,
    active: users.filter(u => u.is_active).length,
    inactive: users.filter(u => !u.is_active).length,
    admins: users.filter(u => u.user_type === 'admin').length,
    owners: users.filter(u => u.user_type === 'restaurant_owner').length,
    customers: users.filter(u => u.user_type === 'customer').length
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            👥 User Management
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage users, roles, and account status
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAdd}
          size="large"
        >
          Add New User
        </Button>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={2}>
          <MainCard>
            <Stack spacing={1}>
              <Typography color="text.secondary" variant="body2">Total Users</Typography>
              <Typography variant="h4">{stats.total}</Typography>
            </Stack>
          </MainCard>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <MainCard>
            <Stack spacing={1}>
              <Typography color="text.secondary" variant="body2">Active</Typography>
              <Typography variant="h4" color="success.main">{stats.active}</Typography>
            </Stack>
          </MainCard>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <MainCard>
            <Stack spacing={1}>
              <Typography color="text.secondary" variant="body2">Inactive</Typography>
              <Typography variant="h4" color="error.main">{stats.inactive}</Typography>
            </Stack>
          </MainCard>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <MainCard>
            <Stack spacing={1}>
              <Typography color="text.secondary" variant="body2">Admins</Typography>
              <Typography variant="h4" color="error.main">{stats.admins}</Typography>
            </Stack>
          </MainCard>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <MainCard>
            <Stack spacing={1}>
              <Typography color="text.secondary" variant="body2">Restaurant Owners</Typography>
              <Typography variant="h4" color="warning.main">{stats.owners}</Typography>
            </Stack>
          </MainCard>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <MainCard>
            <Stack spacing={1}>
              <Typography color="text.secondary" variant="body2">Customers</Typography>
              <Typography variant="h4" color="primary.main">{stats.customers}</Typography>
            </Stack>
          </MainCard>
        </Grid>
      </Grid>

      {/* Filters */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              size="small"
              placeholder="Search by name, email, phone..."
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
          <Grid item xs={12} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>User Type</InputLabel>
              <Select
                value={roleFilter}
                label="User Type"
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                <MenuItem value="all">All Types</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="restaurant_owner">Restaurant Owner</MenuItem>
                <MenuItem value="customer">Customer</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
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
            <Button
              fullWidth
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={() => {
                setSearchTerm('');
                setRoleFilter('all');
                setStatusFilter('all');
              }}
            >
              Reset
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Users Table */}
      <MainCard content={false}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell>Contact</TableCell>
                <TableCell>User Type</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Joined</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedUsers.map((user) => (
                <TableRow key={user.id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar
                        sx={{
                          bgcolor: user.is_active ? 'primary.main' : 'grey.400',
                          width: 40,
                          height: 40
                        }}
                      >
                        {getInitials(user)}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle2">
                          {getFullName(user)}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          ID: {user.id}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Stack spacing={0.5}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <EmailIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                        <Typography variant="body2">{user.email}</Typography>
                      </Box>
                      {user.phone_number && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <PhoneIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                          <Typography variant="body2">{user.phone_number}</Typography>
                        </Box>
                      )}
                    </Stack>
                  </TableCell>
                  <TableCell>
                    {getRoleChip(user.user_type)}
                  </TableCell>
                  <TableCell>
                    {getStatusChip(user.is_active)}
                  </TableCell>
                  <TableCell>
                    <Tooltip title={new Date(user.created_at).toLocaleString()}>
                      <Typography variant="body2">
                        {formatDate(user.created_at)}
                      </Typography>
                    </Tooltip>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      size="small"
                      onClick={(e) => handleMenuOpen(e, user)}
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
          count={filteredUsers.length}
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
        <MenuItem onClick={() => handleEdit(actionUser)}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          Edit User
        </MenuItem>
        <Divider />
        {actionUser?.is_active ? (
          <MenuItem onClick={() => handleDelete(actionUser.id)} sx={{ color: 'error.main' }}>
            <ListItemIcon>
              <BlockIcon fontSize="small" color="error" />
            </ListItemIcon>
            Deactivate
          </MenuItem>
        ) : (
          <MenuItem onClick={() => handleActivate(actionUser.id)} sx={{ color: 'success.main' }}>
            <ListItemIcon>
              <ActiveIcon fontSize="small" color="success" />
            </ListItemIcon>
            Activate
          </MenuItem>
        )}
      </Menu>

      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Typography variant="h5">
            {selectedUser ? 'Edit User' : 'Add New User'}
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="First Name"
                defaultValue={selectedUser?.first_name || ''}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Last Name"
                defaultValue={selectedUser?.last_name || ''}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                defaultValue={selectedUser?.email || ''}
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
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                defaultValue={selectedUser?.phone_number || ''}
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
              <FormControl fullWidth required>
                <InputLabel>User Type</InputLabel>
                <Select
                  defaultValue={selectedUser?.user_type || 'customer'}
                  label="User Type"
                >
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="restaurant_owner">Restaurant Owner</MenuItem>
                  <MenuItem value="customer">Customer</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  defaultValue={selectedUser?.is_active ? 'active' : 'inactive'}
                  label="Status"
                >
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
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
                message: selectedUser ? 'User updated successfully' : 'User added successfully',
                severity: 'success'
              });
            }}
          >
            {selectedUser ? 'Update' : 'Create'}
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