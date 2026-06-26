// src/pages/customer/restaurants/RestaurantList.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Typography, Grid, Card, CardContent, CardMedia,
  Chip, Skeleton, InputBase, Paper, Stack,
} from '@mui/material';
import { Search as SearchIcon, Star as StarIcon } from '@mui/icons-material';
import { getRestaurants } from '../../../api/restaurants';

const CATS = [
  { label: 'All',     value: '' },
  { label: '🍕 Pizza',    value: 'pizza' },
  { label: '🍔 Burgers',  value: 'burgers' },
  { label: '🍗 Chicken',  value: 'chicken' },
  { label: '🍛 Rice',     value: 'rice' },
  { label: '🍱 Sushi',    value: 'sushi' },
  { label: '🥪 Sandwiches', value: 'sandwiches' },
];

export default function RestaurantList() {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('');

  useEffect(() => {
    getRestaurants()
      .then((r) => setRestaurants(r.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = restaurants.filter((r) => {
    const matchCat = !cat || (r.categories || []).includes(cat);
    const q = search.toLowerCase();
    return matchCat && (!q || r.name.toLowerCase().includes(q) || r.cuisine.toLowerCase().includes(q));
  });

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', px: 3, py: 4 }}>
      <Typography variant="h4" fontWeight={800} mb={0.5}>All Restaurants</Typography>
      <Typography color="text.secondary" mb={3}>{filtered.length} restaurants available</Typography>

      {/* Search */}
      <Paper
        sx={{
          display: 'flex', alignItems: 'center', px: 2, py: 0.8, mb: 3,
          maxWidth: 480, border: '1.5px solid', borderColor: 'divider', boxShadow: 'none',
        }}
      >
        <SearchIcon sx={{ color: 'text.secondary', mr: 1, fontSize: 20 }} />
        <InputBase
          placeholder="Search restaurants or cuisine..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ flex: 1, fontSize: 14 }}
        />
      </Paper>

      {/* Category chips */}
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 4 }}>
        {CATS.map((c) => (
          <Chip
            key={c.value}
            label={c.label}
            onClick={() => setCat(c.value)}
            variant={cat === c.value ? 'filled' : 'outlined'}
            color={cat === c.value ? 'primary' : 'default'}
            sx={{ fontWeight: 600, cursor: 'pointer', height: 34 }}
          />
        ))}
      </Box>

      {loading ? (
        <Grid container spacing={2.5}>
          {[...Array(6)].map((_, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Skeleton variant="rectangular" height={180} sx={{ borderRadius: 2 }} />
              <Skeleton height={24} width="60%" sx={{ mt: 1 }} />
            </Grid>
          ))}
        </Grid>
      ) : filtered.length === 0 ? (
        <Box textAlign="center" py={10}>
          <Typography fontSize={56} mb={2}>🍽️</Typography>
          <Typography variant="h6" fontWeight={700}>No results found</Typography>
          <Typography color="text.secondary">Try clearing your filters.</Typography>
        </Box>
      ) : (
        <Grid container spacing={2.5}>
          {filtered.map((r) => (
            <Grid item xs={12} sm={6} md={4} key={r.id}>
              <Card
                sx={{
                  cursor: 'pointer',
                  transition: 'all 0.25s',
                  '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 12px 40px rgba(26,26,46,0.14)' },
                }}
                onClick={() => navigate(`/restaurants/${r.id}`)}
              >
                <Box sx={{ height: 180, bgcolor: 'grey.100', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {r.image ? (
                    <CardMedia component="img" image={r.image} alt={r.name} sx={{ height: 180, width: '100%', objectFit: 'cover' }} />
                  ) : (
                    <Typography fontSize={72}>🍽️</Typography>
                  )}
                  {!r.isOpen && (
                    <Box sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Chip label="Closed" color="error" />
                    </Box>
                  )}
                </Box>
                <CardContent>
                  <Typography fontWeight={700} fontSize={15} mb={0.3}>{r.name}</Typography>
                  <Typography variant="body2" color="text.secondary" fontSize={13} mb={1.5}>{r.cuisine}</Typography>
                  <Stack direction="row" spacing={2} flexWrap="wrap" alignItems="center">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.4 }}>
                      <StarIcon sx={{ fontSize: 14, color: 'warning.main' }} />
                      <Typography variant="caption" fontWeight={700}>{r.rating}</Typography>
                    </Box>
                    <Typography variant="caption" color="text.secondary">🕐 {r.deliveryTime}</Typography>
                    <Typography variant="caption" color="text.secondary">🛵 LKR {r.deliveryFee}</Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
