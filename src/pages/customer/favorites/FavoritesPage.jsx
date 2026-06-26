// src/pages/customer/favorites/FavoritesPage.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Grid, Card, CardContent, CardMedia, Chip, Skeleton, Button } from '@mui/material';
import { Star as StarIcon } from '@mui/icons-material';
import { getFavorites } from '../../../api/favorites';

const MOCK_FAVS = [
  { id: 'r2', name: 'KFC', cuisine: 'Fast Food · Chicken', rating: 4.6, deliveryTime: '20-30 min', deliveryFee: 120, isOpen: true, image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=500' },
  { id: 'r5', name: 'Rice & Carry', cuisine: 'Sri Lankan · Rice & Curry', rating: 4.9, deliveryTime: '20-30 min', deliveryFee: 80, isOpen: true, image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500' },
];

export default function FavoritesPage() {
  const navigate = useNavigate();
  const [favs, setFavs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFavorites().then(r => setFavs(r.data?.length ? r.data : MOCK_FAVS)).catch(() => setFavs(MOCK_FAVS)).finally(() => setLoading(false));
  }, []);

  return (
    <Box sx={{ maxWidth: 1100, mx: 'auto', px: 3, py: 4 }}>
      <Typography variant="h4" fontWeight={800} mb={3}>❤️ Saved Restaurants</Typography>
      {loading ? (
        <Grid container spacing={2.5}>{[...Array(4)].map((_, i) => <Grid item xs={12} sm={6} md={4} key={i}><Skeleton height={260} sx={{ borderRadius: 2 }} /></Grid>)}</Grid>
      ) : favs.length === 0 ? (
        <Box textAlign="center" py={10}>
          <Typography fontSize={64} mb={2}>🤍</Typography>
          <Typography variant="h6" fontWeight={700} mb={1}>Nothing saved yet</Typography>
          <Typography color="text.secondary" mb={3}>Tap the heart on a restaurant to save it here.</Typography>
          <Button variant="contained" onClick={() => navigate('/restaurants')}>Browse Restaurants</Button>
        </Box>
      ) : (
        <Grid container spacing={2.5}>
          {favs.map(r => (
            <Grid item xs={12} sm={6} md={4} key={r.id}>
              <Card sx={{ cursor: 'pointer', transition: 'all 0.25s', '&:hover': { transform: 'translateY(-4px)', boxShadow: 4 } }} onClick={() => navigate(`/restaurants/${r.id}`)}>
                <Box sx={{ height: 170, overflow: 'hidden', bgcolor: 'grey.100' }}>
                  {r.image ? <Box component="img" src={r.image} alt={r.name} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 64 }}>🍽️</Box>}
                </Box>
                <CardContent>
                  <Typography fontWeight={700} mb={0.3}>{r.name}</Typography>
                  <Typography variant="body2" color="text.secondary" mb={1}>{r.cuisine}</Typography>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.4 }}><StarIcon sx={{ fontSize: 14, color: 'warning.main' }} /><Typography variant="caption" fontWeight={700}>{r.rating}</Typography></Box>
                    <Typography variant="caption" color="text.secondary">🕐 {r.deliveryTime}</Typography>
                    <Typography variant="caption" color="text.secondary">🛵 LKR {r.deliveryFee}</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
