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
  FormControlLabel,
  Switch,
  Snackbar,
  Alert,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  CreditCard as CreditCardIcon,
  Verified as VerifiedIcon,
  Edit as EditIcon,
  Payment as PaymentIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

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
  },
  {
    id: 3,
    type: 'card',
    cardType: 'amex',
    last4: '1234',
    expiryDate: '10/26',
    cardHolderName: 'John Doe',
    isDefault: false
  }
];

export default function PaymentMethods() {
  const navigate = useNavigate();
  const [paymentMethods, setPaymentMethods] = useState(mockPaymentMethods);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingPayment, setEditingPayment] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  
  const [paymentForm, setPaymentForm] = useState({
    cardNumber: '',
    cardHolderName: '',
    expiryDate: '',
    cvv: '',
    isDefault: false
  });

  const handleAddPayment = () => {
    setEditingPayment(null);
    setPaymentForm({
      cardNumber: '',
      cardHolderName: '',
      expiryDate: '',
      cvv: '',
      isDefault: false
    });
    setOpenDialog(true);
  };

  const handleEditPayment = (payment) => {
    setEditingPayment(payment);
    // For demo, we don't populate full card number
    setPaymentForm({
      cardNumber: `**** **** **** ${payment.last4}`,
      cardHolderName: payment.cardHolderName,
      expiryDate: payment.expiryDate,
      cvv: '***',
      isDefault: payment.isDefault
    });
    setOpenDialog(true);
  };

  const handleSavePayment = () => {
    if (editingPayment) {
      // Update existing payment method
      setPaymentMethods(paymentMethods.map(p => 
        p.id === editingPayment.id ? { 
          ...p, 
          cardHolderName: paymentForm.cardHolderName,
          expiryDate: paymentForm.expiryDate,
          isDefault: paymentForm.isDefault 
        } : p
      ));
      setSnackbar({ open: true, message: 'Payment method updated successfully', severity: 'success' });
    } else {
      // Add new payment method
      const last4 = paymentForm.cardNumber.slice(-4);
      const newPayment = {
        id: paymentMethods.length + 1,
        type: 'card',
        cardType: 'visa', // You can detect card type from number
        last4: last4,
        expiryDate: paymentForm.expiryDate,
        cardHolderName: paymentForm.cardHolderName,
        isDefault: paymentForm.isDefault
      };
      
      if (paymentForm.isDefault) {
        setPaymentMethods(paymentMethods.map(p => ({ ...p, isDefault: false })));
      }
      
      setPaymentMethods([...paymentMethods, newPayment]);
      setSnackbar({ open: true, message: 'Payment method added successfully', severity: 'success' });
    }
    setOpenDialog(false);
  };

  const handleDeletePayment = (id) => {
    if (window.confirm('Are you sure you want to delete this payment method?')) {
      setPaymentMethods(paymentMethods.filter(p => p.id !== id));
      setSnackbar({ open: true, message: 'Payment method deleted successfully', severity: 'success' });
    }
  };

  const handleSetDefault = (id) => {
    setPaymentMethods(paymentMethods.map(p => ({
      ...p,
      isDefault: p.id === id
    })));
    setSnackbar({ open: true, message: 'Default payment method updated', severity: 'success' });
  };

  const getCardIcon = (cardType) => {
    switch(cardType) {
      case 'visa':
        return '💳 Visa';
      case 'mastercard':
        return '💳 Mastercard';
      case 'amex':
        return '💳 American Express';
      default:
        return '💳 Card';
    }
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
            Payment Methods
          </Typography>
          <Button 
            color="primary" 
            onClick={handleAddPayment} 
            startIcon={<AddIcon />}
            variant="contained"
            size="small"
          >
            Add New
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ py: 4 }}>
        {/* Info Card */}
        <Paper sx={{ p: 3, mb: 3, bgcolor: 'primary.lighter' }}>
          <Typography variant="body2" color="primary.dark">
            Your payment methods are securely stored. We use industry-standard encryption to protect your information.
          </Typography>
        </Paper>

        {/* Payment Methods List */}
        <Grid container spacing={3}>
          {paymentMethods.map((payment) => (
            <Grid item xs={12} key={payment.id}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ bgcolor: 'primary.lighter', color: 'primary.main' }}>
                        <PaymentIcon />
                      </Avatar>
                      <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="subtitle1">
                            {getCardIcon(payment.cardType)} •••• {payment.last4}
                          </Typography>
                          {payment.isDefault && (
                            <Chip
                              label="Default"
                              size="small"
                              color="primary"
                              icon={<VerifiedIcon />}
                            />
                          )}
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                          Expires {payment.expiryDate} • {payment.cardHolderName}
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Box>
                      {!payment.isDefault && (
                        <>
                          <Button 
                            size="small" 
                            onClick={() => handleEditPayment(payment)}
                            sx={{ mr: 1 }}
                          >
                            Edit
                          </Button>
                          <IconButton 
                            size="small" 
                            color="error" 
                            onClick={() => handleDeletePayment(payment.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </>
                      )}
                      {!payment.isDefault && (
                        <Button 
                          size="small" 
                          variant="outlined" 
                          onClick={() => handleSetDefault(payment.id)}
                          sx={{ ml: 1 }}
                        >
                          Set Default
                        </Button>
                      )}
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Add Payment Method Dialog */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>
            {editingPayment ? 'Edit Payment Method' : 'Add Payment Method'}
          </DialogTitle>
          <DialogContent dividers>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Card Number"
                  placeholder="1234 5678 9012 3456"
                  value={paymentForm.cardNumber}
                  onChange={(e) => setPaymentForm({ ...paymentForm, cardNumber: e.target.value })}
                  disabled={editingPayment}
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
                  placeholder="123"
                  type="password"
                  value={paymentForm.cvv}
                  onChange={(e) => setPaymentForm({ ...paymentForm, cvv: e.target.value })}
                  disabled={editingPayment}
                />
              </Grid>
              
              <Grid item xs={12}>
                <Divider sx={{ my: 1 }} />
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
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button variant="contained" onClick={handleSavePayment}>
              {editingPayment ? 'Update' : 'Add'} Payment Method
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
      </Container>
    </Box>
  );
}