// src/pages/customer/home/HomePage.jsx
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Box, Typography, Button, Grid, Card, CardMedia, CardContent,
  Chip, Skeleton, InputBase, Paper, Stack,
} from '@mui/material';
import { Search as SearchIcon, Star as StarIcon } from '@mui/icons-material';
import { getRestaurants } from '../../../api/restaurants';

const CATEGORIES = [
  { label: 'All',         value: '',           emoji: '🍽️' },
  { label: 'Pizza',       value: 'pizza',       emoji: '🍕' },
  { label: 'Burgers',     value: 'burgers',     emoji: '🍔' },
  { label: 'Chicken',     value: 'chicken',     emoji: '🍗' },
  { label: 'Rice & Curry',value: 'rice',        emoji: '🍛' },
  { label: 'Sushi',       value: 'sushi',       emoji: '🍱' },
  { label: 'Sandwiches',  value: 'sandwiches',  emoji: '🥪' },
];

const STATS = [
  { num: '200+',   label: 'Restaurants' },
  { num: '28 min', label: 'Avg delivery' },
  { num: '50k+',   label: 'Happy customers' },
  { num: '4.8 ⭐', label: 'App rating' },
];

const RESTAURANT_EMOJI = {
  pizza: '🍕', chicken: '🍗', burgers: '🍔', rice: '🍛', sushi: '🍱', sandwiches: '🥪',
};

function getEmoji(r) {
  for (const cat of (r.categories || [])) {
    if (RESTAURANT_EMOJI[cat]) return RESTAURANT_EMOJI[cat];
  }
  return '🍽️';
}

function RestaurantCard({ restaurant }) {
  const navigate = useNavigate();
  return (
    <Card
      sx={{
        height: '100%', cursor: 'pointer',
        transition: 'all 0.25s',
        '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 12px 40px rgba(26,26,46,0.16)' },
      }}
      onClick={() => navigate(`/restaurants/${restaurant.id}`)}
    >
      <Box
        sx={{
          height: 180, position: 'relative', overflow: 'hidden',
          bgcolor: 'grey.100', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        {restaurant.image ? (
          <CardMedia
            component="img"
            image={restaurant.image}
            alt={restaurant.name}
            sx={{ height: 180, width: '100%', objectFit: 'cover' }}
          />
        ) : (
          <Typography fontSize={72}>{getEmoji(restaurant)}</Typography>
        )}
        {!restaurant.isOpen && (
          <Box
            sx={{
              position: 'absolute', inset: 0,
              bgcolor: 'rgba(0,0,0,0.45)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <Chip label="Closed" color="error" sx={{ fontWeight: 700 }} />
          </Box>
        )}
      </Box>

      <CardContent sx={{ pb: '12px !important' }}>
        <Typography variant="h6" fontWeight={700} fontSize={15} mb={0.4}>
          {restaurant.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" fontSize={13} mb={1.5}>
          {restaurant.cuisine}
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, mb: 1.5, flexWrap: 'wrap', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.4 }}>
            <StarIcon sx={{ fontSize: 14, color: 'warning.main' }} />
            <Typography variant="caption" fontWeight={700}>{restaurant.rating}</Typography>
          </Box>
          <Typography variant="caption" color="text.secondary">🕐 {restaurant.deliveryTime}</Typography>
          <Typography variant="caption" color="text.secondary">🛵 LKR {restaurant.deliveryFee}</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
          <Chip
            label={restaurant.isOpen ? 'Open' : 'Closed'}
            size="small"
            color={restaurant.isOpen ? 'success' : 'error'}
            variant="outlined"
            sx={{ height: 20, fontSize: 11 }}
          />
          {restaurant.totalReviews > 300 && (
            <Chip label="🔥 Popular" size="small" color="warning" variant="outlined" sx={{ height: 20, fontSize: 11 }} />
          )}
        </Box>
      </CardContent>
    </Card>
  );
}

export default function HomePage() {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeCat, setActiveCat] = useState('');

  useEffect(() => {
    getRestaurants()
      .then((res) => setRestaurants(res.data || []))
      .catch(() => setRestaurants([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = restaurants.filter((r) => {
    const matchCat = !activeCat || (r.categories || []).includes(activeCat);
    const q = search.toLowerCase();
    const matchSearch = !q || r.name.toLowerCase().includes(q) || r.cuisine.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  return (
    <Box>
      {/* ── Hero ── */}
      <Box
        sx={{
          background: 'linear-gradient(135deg,#1a1a2e 0%,#16213e 60%,#0f3460 100%)',
          py: { xs: 6, md: 9 }, px: 3, textAlign: 'center',
          position: 'relative', overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse at 70% 50%,rgba(255,75,43,0.15) 0%,transparent 60%)',
            pointerEvents: 'none',
          }}
        />
        <Box sx={{ position: 'relative', maxWidth: 640, mx: 'auto' }}>
          <Chip
            label="⚡ 30-min delivery guarantee"
            variant="outlined"
            sx={{ color: '#ff7c66', borderColor: 'rgba(255,75,43,0.4)', mb: 2.5, fontWeight: 600 }}
          />

          <Typography
            variant="h2"
            sx={{
              color: '#fff', fontWeight: 800,
              fontSize: { xs: 28, md: 46 },
              lineHeight: 1.1, mb: 2, letterSpacing: -1,
            }}
          >
            Food you love,{' '}
            <Box
              component="span"
              sx={{
                background: 'linear-gradient(135deg,#FF4B2B,#FF8C00)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              delivered fast
            </Box>
          </Typography>

          <Typography sx={{ color: 'rgba(255,255,255,0.65)', fontSize: 17, mb: 4, lineHeight: 1.6 }}>
            Sri Lanka's fastest food delivery. 200+ restaurants across Colombo.
          </Typography>

          {/* Search */}
          <Paper
            sx={{
              display: 'flex', maxWidth: 520, mx: 'auto', mb: 4,
              borderRadius: 2, overflow: 'hidden',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
            }}
          >
            <InputBase
              placeholder="Pasta, burgers, rice & curry..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ flex: 1, px: 2.5, py: 1.5, fontSize: 15 }}
            />
            <Button
              variant="contained"
              disableElevation
              sx={{ px: 3, borderRadius: 0, fontWeight: 700, fontSize: 15 }}
              onClick={() => navigate('/restaurants')}
            >
              <SearchIcon sx={{ mr: 0.5, fontSize: 18 }} /> Find Food
            </Button>
          </Paper>

          {/* Stats */}
          <Stack direction="row" spacing={4} justifyContent="center" flexWrap="wrap">
            {STATS.map((s) => (
              <Box key={s.label} textAlign="center">
                <Typography sx={{ fontWeight: 800, color: '#fff', fontSize: 20 }}>{s.num}</Typography>
                <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, mt: 0.3 }}>{s.label}</Typography>
              </Box>
            ))}
          </Stack>
        </Box>
      </Box>

      {/* ── Categories ── */}
      <Box sx={{ maxWidth: 1200, mx: 'auto', px: 3, mt: 5 }}>
        <Typography variant="h5" fontWeight={700} mb={2}>What are you craving?</Typography>
        <Box sx={{ display: 'flex', gap: 1.5, overflowX: 'auto', pb: 1, '&::-webkit-scrollbar': { display: 'none' } }}>
          {CATEGORIES.map((cat) => (
            <Chip
              key={cat.value}
              label={`${cat.emoji} ${cat.label}`}
              onClick={() => setActiveCat(cat.value)}
              variant={activeCat === cat.value ? 'filled' : 'outlined'}
              color={activeCat === cat.value ? 'primary' : 'default'}
              sx={{ fontWeight: 600, flexShrink: 0, cursor: 'pointer', fontSize: 13, height: 36 }}
            />
          ))}
        </Box>
      </Box>

      {/* ── Promo banner ── */}
      <Box sx={{ maxWidth: 1200, mx: 'auto', px: 3, mt: 4 }}>
        <Box
          sx={{
            background: 'linear-gradient(135deg,#FF4B2B 0%,#FF8C00 100%)',
            borderRadius: 3, p: { xs: 3, md: 4 },
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            flexWrap: 'wrap', gap: 2,
          }}
        >
          <Box>
            <Typography variant="h5" fontWeight={800} color="#fff" mb={0.5}>
              🎉 First order? You're in luck.
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.85)', fontSize: 15 }}>
              Get 20% off your first delivery — no minimum order required.
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
            <Box
              sx={{
                border: '2px dashed rgba(255,255,255,0.5)', borderRadius: 2,
                px: 2.5, py: 1.2, bgcolor: 'rgba(255,255,255,0.1)',
              }}
            >
              <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: 18, letterSpacing: 2 }}>
                WELCOME20
              </Typography>
            </Box>
            <Button
              variant="contained"
              onClick={() => navigate('/restaurants')}
              sx={{ bgcolor: '#fff !important', color: '#FF4B2B', fontWeight: 700, '&:hover': { bgcolor: '#f5f5f5 !important' } }}
            >
              Order Now
            </Button>
          </Box>
        </Box>
      </Box>

      {/* ── Restaurant grid ── */}
      <Box sx={{ maxWidth: 1200, mx: 'auto', px: 3, mt: 5, pb: 6 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" fontWeight={700}>
            {search || activeCat ? 'Search Results' : 'Top picks near you'}
          </Typography>
          <Button component={Link} to="/restaurants" sx={{ fontWeight: 600, color: 'primary.main' }}>
            See all →
          </Button>
        </Box>

        {loading ? (
          <Grid container spacing={2.5}>
            {[...Array(6)].map((_, i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <Skeleton variant="rectangular" height={180} sx={{ borderRadius: 2, mb: 1 }} />
                <Skeleton height={20} width="60%" />
                <Skeleton height={16} width="40%" />
              </Grid>
            ))}
          </Grid>
        ) : filtered.length === 0 ? (
          <Box textAlign="center" py={8}>
            <Typography fontSize={48} mb={1}>🍽️</Typography>
            <Typography variant="h6" fontWeight={600}>No restaurants found</Typography>
            <Typography color="text.secondary">Try a different search or category.</Typography>
          </Box>
        ) : (
          <Grid container spacing={2.5}>
            {filtered.map((r) => (
              <Grid item xs={12} sm={6} md={4} key={r.id}>
                <RestaurantCard restaurant={r} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
}
