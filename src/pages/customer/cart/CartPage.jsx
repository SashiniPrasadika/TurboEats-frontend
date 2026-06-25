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
  Snackbar
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
  ChevronRight as ChevronRightIcon
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
  dateJoined: '2024-01-15'
};

export default function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(mockUser);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editForm, setEditForm] = useState(user);
  const [notifications, setNotifications] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleSaveProfile = () => {
    setUser(editForm);
    setEditDialogOpen(false);
    setSnackbar({
      open: true,
      message: 'Profile updated successfully',
      severity: 'success'
    });
  };

  const handleLogout = () => {
    // Add logout logic here
    navigate('/login');
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

      <Container maxWidth="md" sx={{ py: 4 }}>
        {/* Profile Header */}
        <Paper sx={{ p: 3, mb: 3, textAlign: 'center' }}>
          <Avatar
            sx={{
              width: 100,
              height: 100,
              mx: 'auto',
              mb: 2,
              bgcolor: 'primary.main',
              fontSize: '2.5rem'
            }}
          >
            {user.firstName.charAt(0)}{user.lastName.charAt(0)}
          </Avatar>
          
          <Typography variant="h5" gutterBottom>
            {user.firstName} {user.lastName}
          </Typography>
          
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {user.email} • {user.phone}
          </Typography>
          
          <Typography variant="caption" color="text.secondary">
            Member since {new Date(user.dateJoined).toLocaleDateString()}
          </Typography>

          <Button
            variant="outlined"
            startIcon={<EditIcon />}
            onClick={() => setEditDialogOpen(true)}
            sx={{ mt: 2 }}
          >
            Edit Profile
          </Button>
        </Paper>

        {/* Menu Items */}
        <Paper sx={{ mb: 3 }}>
          <List>
            <ListItemButton component={Link} to="/orders">
              <ListItemIcon>
                <OrdersIcon />
              </ListItemIcon>
              <ListItemText primary="My Orders" secondary="View your order history" />
              <ChevronRightIcon color="action" />
            </ListItemButton>

            <Divider />

            <ListItemButton component={Link} to="/address-book">
              <ListItemIcon>
                <LocationIcon />
              </ListItemIcon>
              <ListItemText primary="Address Book" secondary="Manage your delivery addresses" />
              <ChevronRightIcon color="action" />
            </ListItemButton>

            <Divider />

            <ListItemButton component={Link} to="/payment-methods">
              <ListItemIcon>
                <PaymentIcon />
              </ListItemIcon>
              <ListItemText primary="Payment Methods" secondary="Manage your payment options" />
              <ChevronRightIcon color="action" />
            </ListItemButton>

            <Divider />

            <ListItemButton component={Link} to="/favorites">
              <ListItemIcon>
                <FavoriteIcon />
              </ListItemIcon>
              <ListItemText primary="Favorites" secondary="Your favorite restaurants and items" />
              <ChevronRightIcon color="action" />
            </ListItemButton>
          </List>
        </Paper>

        {/* Settings */}
        <Paper sx={{ mb: 3 }}>
          <List>
            <ListItem>
              <ListItemIcon>
                <NotificationsIcon />
              </ListItemIcon>
              <ListItemText primary="Push Notifications" secondary="Receive order updates" />
              <Switch
                edge="end"
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
              />
            </ListItem>

            <Divider />

            <ListItemButton component={Link} to="/security">
              <ListItemIcon>
                <SecurityIcon />
              </ListItemIcon>
              <ListItemText primary="Security" secondary="Password and account security" />
              <ChevronRightIcon color="action" />
            </ListItemButton>

            <Divider />

            <ListItemButton component={Link} to="/help">
              <ListItemIcon>
                <HelpIcon />
              </ListItemIcon>
              <ListItemText primary="Help & Support" secondary="FAQs and contact support" />
              <ChevronRightIcon color="action" />
            </ListItemButton>
          </List>
        </Paper>

        {/* Logout Button */}
        <Button
          fullWidth
          variant="outlined"
          color="error"
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
          sx={{ mb: 3 }}
        >
          Logout
        </Button>
      </Container>

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
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveProfile}>
            Save Changes
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