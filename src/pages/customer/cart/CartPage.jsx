// src/pages/customer/cart/CartPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Typography, Grid, Card, CardContent, Button, TextField, Divider,
  IconButton, Alert, Paper, Chip, Stack
} from '@mui/material';
import { Add, Remove, Delete, ShoppingBag, LocalOffer } from '@mui/icons-material';

const INITIAL_CART = [
  { id: 'mi1', name: 'Pepperoni Pizza', price: 1800, qty: 1, restaurant: 'Pizza Hut', image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=80' },
  { id: 'mi4', name: 'Garlic Bread', price: 450, qty: 2, restaurant: 'Pizza Hut', image: 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?w=80' },
  { id: 'mi5', name: 'Pepsi 500ml', price: 200, qty: 2, restaurant: 'Pizza Hut', image: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=80' },
];

export default function CartPage() {
  const navigate = useNavigate();
  const [cart, setCart] = useState(INITIAL_CART);
  const [promo, setPromo] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');

  const updateQty = (id, delta) => {
    setCart(c => c.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i));
  };
  const removeItem = (id) => setCart(c => c.filter(i => i.id !== id));

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const delivery = cart.length ? 150 : 0;
  const service = Math.round(subtotal * 0.05);
  const discount = promoApplied ? Math.round(subtotal * 0.2) : 0;
  const total = subtotal + delivery + service - discount;

  const applyPromo = () => {
    if (promo.toUpperCase() === 'WELCOME20') { setPromoApplied(true); setPromoError(''); }
    else { setPromoError('Invalid promo code.'); setPromoApplied(false); }
  };

  if (cart.length === 0) return (
    <Box textAlign="center" py={12} px={3}>
      <Typography fontSize={64} mb={2}>🛒</Typography>
      <Typography variant="h5" fontWeight={700} mb={1}>Your cart is empty</Typography>
      <Typography color="text.secondary" mb={3}>Add items from a restaurant to get started.</Typography>
      <Button variant="contained" onClick={() => navigate('/restaurants')} size="large">Browse Restaurants</Button>
    </Box>
  );

  return (
    <Box sx={{ maxWidth: 960, mx: 'auto', px: 3, py: 4 }}>
      <Typography variant="h4" fontWeight={800} mb={3}>Your Cart</Typography>
      <Grid container spacing={3}>
        {/* Items */}
        <Grid item xs={12} md={7}>
          <Card>
            <CardContent sx={{ p: 0 }}>
              <Box sx={{ px: 2.5, py: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
                <Typography fontWeight={700} fontSize={15}>🛒 {cart[0]?.restaurant}</Typography>
              </Box>
              {cart.map((item, idx) => (
                <Box key={item.id}>
                  <Box sx={{ px: 2.5, py: 2, display: 'flex', gap: 2, alignItems: 'center' }}>
                    {item.image && <Box component="img" src={item.image} alt={item.name} sx={{ width: 56, height: 56, borderRadius: 2, objectFit: 'cover', flexShrink: 0 }} />}
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography fontWeight={600} fontSize={14} mb={0.3}>{item.name}</Typography>
                      <Typography variant="caption" color="text.secondary">LKR {item.price.toLocaleString()} each</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <IconButton size="small" onClick={() => updateQty(item.id, -1)} sx={{ border: '1.5px solid', borderColor: 'divider', width: 28, height: 28 }}><Remove sx={{ fontSize: 14 }} /></IconButton>
                      <Typography fontWeight={700} minWidth={20} textAlign="center">{item.qty}</Typography>
                      <IconButton size="small" onClick={() => updateQty(item.id, 1)} sx={{ border: '1.5px solid', borderColor: 'divider', width: 28, height: 28 }}><Add sx={{ fontSize: 14 }} /></IconButton>
                    </Box>
                    <Typography fontWeight={700} minWidth={80} textAlign="right" fontSize={14}>
                      LKR {(item.price * item.qty).toLocaleString()}
                    </Typography>
                    <IconButton size="small" onClick={() => removeItem(item.id)} sx={{ color: 'error.main' }}><Delete sx={{ fontSize: 18 }} /></IconButton>
                  </Box>
                  {idx < cart.length - 1 && <Divider />}
                </Box>
              ))}
            </CardContent>
          </Card>

          {/* Delivery address */}
          <Card sx={{ mt: 2 }}>
            <CardContent>
              <Typography fontWeight={700} mb={1.5}>📍 Delivery Address</Typography>
              <TextField fullWidth size="small" defaultValue="Kalutara, Western Province" label="Deliver to" />
            </CardContent>
          </Card>
        </Grid>

        {/* Summary */}
        <Grid item xs={12} md={5}>
          <Card sx={{ position: { md: 'sticky' }, top: 80 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography fontWeight={700} fontSize={16} mb={2.5}>Order Summary</Typography>

              {/* Promo */}
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <TextField size="small" fullWidth placeholder="Promo code (WELCOME20)" value={promo} onChange={e => setPromo(e.target.value.toUpperCase())} error={Boolean(promoError)}
                  InputProps={{ startAdornment: <LocalOffer sx={{ fontSize: 16, color: 'text.secondary', mr: 0.5 }} /> }} />
                <Button variant="outlined" onClick={applyPromo} sx={{ whiteSpace: 'nowrap', minWidth: 70 }}>Apply</Button>
              </Box>
              {promoError && <Alert severity="error" sx={{ mb: 1.5, py: 0 }}>{promoError}</Alert>}
              {promoApplied && <Alert severity="success" sx={{ mb: 1.5, py: 0 }}>🎉 20% discount applied!</Alert>}

              <Stack spacing={1.2} mb={2}>
                {[
                  ['Subtotal', `LKR ${subtotal.toLocaleString()}`],
                  ['Delivery fee', `LKR ${delivery.toLocaleString()}`],
                  ['Service charge (5%)', `LKR ${service.toLocaleString()}`],
                  ...(promoApplied ? [['Promo (WELCOME20)', `-LKR ${discount.toLocaleString()}`, true]] : []),
                ].map(([label, val, isDiscount]) => (
                  <Box key={label} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color={isDiscount ? 'success.main' : 'text.secondary'}>{label}</Typography>
                    <Typography variant="body2" fontWeight={600} color={isDiscount ? 'success.main' : 'text.primary'}>{val}</Typography>
                  </Box>
                ))}
              </Stack>

              <Divider sx={{ mb: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2.5 }}>
                <Typography fontWeight={700} fontSize={16}>Total</Typography>
                <Typography fontWeight={800} fontSize={17} color="primary.main">LKR {total.toLocaleString()}</Typography>
              </Box>

              <Button variant="contained" fullWidth size="large" startIcon={<ShoppingBag />}
                onClick={() => navigate('/orders')}
                sx={{ py: 1.5, fontWeight: 700, fontSize: 15, borderRadius: 3 }}>
                Place Order
              </Button>
              <Typography variant="caption" color="text.secondary" display="block" textAlign="center" mt={1.5}>
                🔒 Secure checkout · Cash on delivery available
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
