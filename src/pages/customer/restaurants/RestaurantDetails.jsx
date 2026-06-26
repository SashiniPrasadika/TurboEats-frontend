// src/pages/customer/restaurants/RestaurantDetails.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box, Typography, Button, Grid, Card, CardContent, CardMedia, Chip,
  Skeleton, Divider, IconButton, Snackbar, Alert, Paper
} from '@mui/material';
import { ArrowBack, Add as AddIcon, Star as StarIcon, AccessTime, DeliveryDining, ShoppingCart } from '@mui/icons-material';
import { getRestaurant } from '../../../api/restaurants';

export default function RestaurantDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [snack, setSnack] = useState('');
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    getRestaurant(id).then(r => {
      setRestaurant(r.data);
      if (r.data.menu?.length) setActiveSection(r.data.menu[0].category || 'All');
    }).catch(() => navigate('/restaurants')).finally(() => setLoading(false));
  }, [id]);

  const addToCart = (item) => {
    setCart(c => {
      const ex = c.find(x => x.id === item.id);
      if (ex) return c.map(x => x.id === item.id ? { ...x, qty: x.qty + 1 } : x);
      return [...c, { ...item, qty: 1 }];
    });
    setSnack(`${item.name} added to cart!`);
  };

  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  // Group menu by category
  const menuByCategory = restaurant?.menu?.reduce((acc, item) => {
    const cat = item.category || 'Other';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {}) || {};

  if (loading) return (
    <Box sx={{ maxWidth: 1100, mx: 'auto', p: 3 }}>
      <Skeleton variant="rectangular" height={260} sx={{ borderRadius: 3, mb: 3 }} />
      <Grid container spacing={2}>
        {[...Array(4)].map((_, i) => <Grid item xs={12} sm={6} key={i}><Skeleton height={120} sx={{ borderRadius: 2 }} /></Grid>)}
      </Grid>
    </Box>
  );

  return (
    <Box>
      {/* Hero header */}
      <Box sx={{ position: 'relative', height: 260, overflow: 'hidden', bgcolor: 'grey.200', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 100 }}>
        {restaurant?.image
          ? <Box component="img" src={restaurant.image} alt={restaurant.name} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          : <span>🍽️</span>
        }
        <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%)' }} />
        <Button startIcon={<ArrowBack />} onClick={() => navigate(-1)}
          sx={{ position: 'absolute', top: 16, left: 16, bgcolor: 'rgba(255,255,255,0.95)', color: 'text.primary', fontWeight: 600, '&:hover': { bgcolor: '#fff' } }}>
          Back
        </Button>
        <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, p: 3 }}>
          <Typography variant="h4" fontWeight={800} color="#fff" mb={1}>{restaurant?.name}</Typography>
          <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'rgba(255,255,255,0.9)' }}>
              <StarIcon sx={{ fontSize: 16, color: '#fbbf24' }} /><Typography variant="body2">{restaurant?.rating} ({restaurant?.totalReviews} reviews)</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'rgba(255,255,255,0.9)' }}>
              <AccessTime sx={{ fontSize: 16 }} /><Typography variant="body2">{restaurant?.deliveryTime}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'rgba(255,255,255,0.9)' }}>
              <DeliveryDining sx={{ fontSize: 16 }} /><Typography variant="body2">LKR {restaurant?.deliveryFee} delivery</Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box sx={{ maxWidth: 1100, mx: 'auto', px: { xs: 2, md: 3 }, py: 3 }}>
        {/* Category tabs */}
        {Object.keys(menuByCategory).length > 1 && (
          <Box sx={{ display: 'flex', gap: 1, mb: 3, overflowX: 'auto', pb: 0.5, '&::-webkit-scrollbar': { display: 'none' } }}>
            {Object.keys(menuByCategory).map(cat => (
              <Chip key={cat} label={cat} onClick={() => setActiveSection(cat)}
                variant={activeSection === cat ? 'filled' : 'outlined'} color={activeSection === cat ? 'primary' : 'default'}
                sx={{ cursor: 'pointer', flexShrink: 0, fontWeight: 600 }} />
            ))}
          </Box>
        )}

        {/* Menu sections */}
        {Object.entries(menuByCategory).map(([category, items]) => (
          <Box key={category} mb={4}>
            <Typography variant="h6" fontWeight={700} mb={2} pb={1} sx={{ borderBottom: '2px solid', borderColor: 'divider' }}>{category}</Typography>
            <Grid container spacing={2}>
              {items.map(item => (
                <Grid item xs={12} sm={6} key={item.id}>
                  <Card variant="outlined" sx={{ display: 'flex', gap: 1.5, p: 1.5, transition: 'box-shadow 0.2s', '&:hover': { boxShadow: 2 }, alignItems: 'flex-start' }}>
                    {item.image && (
                      <Box component="img" src={item.image} alt={item.name}
                        sx={{ width: 76, height: 76, borderRadius: 2, objectFit: 'cover', flexShrink: 0 }} />
                    )}
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography fontWeight={600} fontSize={14} mb={0.4}>{item.name}</Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1, lineHeight: 1.4 }}>{item.description}</Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography fontWeight={700} color="primary.main" fontSize={15}>LKR {item.price.toLocaleString()}</Typography>
                        <IconButton size="small" onClick={() => addToCart(item)}
                          sx={{ bgcolor: 'primary.main', color: '#fff', width: 30, height: 30, '&:hover': { bgcolor: 'primary.dark', transform: 'scale(1.1)' } }}>
                          <AddIcon sx={{ fontSize: 18 }} />
                        </IconButton>
                      </Box>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        ))}
      </Box>

      {/* Floating cart bar */}
      {cartCount > 0 && (
        <Box sx={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 1000 }}>
          <Button variant="contained" size="large" startIcon={<ShoppingCart />}
            onClick={() => navigate('/cart')}
            sx={{ px: 4, py: 1.5, fontWeight: 700, fontSize: 15, borderRadius: 4, boxShadow: '0 8px 32px rgba(255,75,43,0.4)', whiteSpace: 'nowrap', gap: 2 }}>
            View Cart ({cartCount} items) · LKR {cartTotal.toLocaleString()}
          </Button>
        </Box>
      )}

      <Snackbar open={Boolean(snack)} autoHideDuration={2000} onClose={() => setSnack('')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert severity="success" variant="filled" onClose={() => setSnack('')}>{snack}</Alert>
      </Snackbar>
    </Box>
  );
}
