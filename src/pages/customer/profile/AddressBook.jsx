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
  Avatar,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  Snackbar,
  Alert
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Home as HomeIcon,
  Work as WorkIcon,
  LocationOn as LocationIcon,
  Verified as VerifiedIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

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

export default function AddressBook() {
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState(mockAddresses);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  
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
    setOpenDialog(true);
  };

  const handleEditAddress = (address) => {
    setEditingAddress(address);
    setAddressForm(address);
    setOpenDialog(true);
  };

  const handleSaveAddress = () => {
    if (editingAddress) {
      setAddresses(addresses.map(addr => 
        addr.id === editingAddress.id ? { ...addressForm, id: addr.id } : addr
      ));
      setSnackbar({ open: true, message: 'Address updated successfully', severity: 'success' });
    } else {
      const newAddress = { ...addressForm, id: addresses.length + 1 };
      setAddresses([...addresses, newAddress]);
      setSnackbar({ open: true, message: 'Address added successfully', severity: 'success' });
    }
    setOpenDialog(false);
  };

  const handleDeleteAddress = (id) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      setAddresses(addresses.filter(addr => addr.id !== id));
      setSnackbar({ open: true, message: 'Address deleted successfully', severity: 'success' });
    }
  };

  const handleSetDefault = (id) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })));
    setSnackbar({ open: true, message: 'Default address updated', severity: 'success' });
  };

  const getAddressIcon = (type) => {
    switch(type) {
      case 'home': return <HomeIcon />;
      case 'work': return <WorkIcon />;
      default: return <LocationIcon />;
    }
  };

  return (
    <Box sx={{ bgcolor: '#f8f9fa', minHeight: '100vh' }}>
      <AppBar position="sticky" color="default" elevation={1} sx={{ bgcolor: 'white' }}>
        <Toolbar>
          <IconButton edge="start" onClick={() => navigate(-1)} sx={{ mr: 2 }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Address Book</Typography>
          <Button color="primary" onClick={handleAddAddress} startIcon={<AddIcon />}>
            Add New
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ py: 4 }}>
        <Grid container spacing={3}>
          {addresses.map((address) => (
            <Grid item xs={12} key={address.id}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ bgcolor: 'primary.lighter', color: 'primary.main' }}>
                        {getAddressIcon(address.type)}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle1">
                          {address.label}
                          {address.isDefault && (
                            <Chip label="Default" size="small" color="primary" sx={{ ml: 1 }} />
                          )}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" textTransform="capitalize">
                          {address.type}
                        </Typography>
                      </Box>
                    </Box>
                    <Box>
                      <IconButton size="small" onClick={() => handleEditAddress(address)}>
                        <EditIcon />
                      </IconButton>
                      {!address.isDefault && (
                        <IconButton size="small" color="error" onClick={() => handleDeleteAddress(address.id)}>
                          <DeleteIcon />
                        </IconButton>
                      )}
                    </Box>
                  </Box>

                  <Typography variant="body2" paragraph>
                    {address.addressLine1}<br />
                    {address.addressLine2}<br />
                    {address.city}, {address.district} - {address.postalCode}
                  </Typography>

                  {address.instructions && (
                    <Chip label={`Note: ${address.instructions}`} size="small" variant="outlined" />
                  )}

                  {!address.isDefault && (
                    <Button size="small" sx={{ mt: 1 }} onClick={() => handleSetDefault(address.id)}>
                      Set as Default
                    </Button>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editingAddress ? 'Edit Address' : 'Add New Address'}</DialogTitle>
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
                value={addressForm.label}
                onChange={(e) => setAddressForm({ ...addressForm, label: e.target.value })}
                placeholder="e.g., Home, Office"
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
                value={addressForm.instructions}
                onChange={(e) => setAddressForm({ ...addressForm, instructions: e.target.value })}
                placeholder="e.g., Ring doorbell twice"
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
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveAddress}>
            {editingAddress ? 'Update' : 'Save'} Address
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
}