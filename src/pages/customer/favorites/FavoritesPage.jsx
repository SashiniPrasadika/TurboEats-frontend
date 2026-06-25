import { useState } from 'react';
import {
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  Button,
  Paper,
  Container,
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Chip,
  Rating,
  Stack,
  Divider,
  Alert,
  Snackbar
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Restaurant as RestaurantIcon,
  Delete as DeleteIcon,
  ShoppingCart as CartIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Mock favorites data
const mockFavorites = [
  {
    id: 1,
    name: 'Pizza Hut',
    cuisine: 'Italian • Pizza',
    rating: 4.8,
    deliveryTime: '25-35 min',
    deliveryFee: 150,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500',
    isFavorite: true
  },
  {
    id: 2,
    name: 'KFC',
    cuisine: 'Fast Food • Chicken',
    rating: 4.6,
    deliveryTime: '20-30 min',
    deliveryFee: 120,
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=500',
    isFavorite: true
  },
  {
    id: 3,
    name: 'Burger King',
    cuisine: 'Fast Food • Burgers',
    rating: 4.5,
    deliveryTime: '25-35 min',
    deliveryFee: 130,
    image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=500',
    isFavorite: true
  },
  {
    id: 4,
    name: 'Starbucks',
    cuisine: 'Coffee • Beverages',
    rating: 4.9,
    deliveryTime: '15-25 min',
    deliveryFee: 80,
    image: 'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?w=500',
    isFavorite: true
  }
];

export default function FavoritesPage() {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState(mockFavorites);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleRemoveFavorite = (restaurantId) => {
    setFavorites(favorites.filter(fav => fav.id !== restaurantId));
    setSnackbar({
      open: true,
      message: 'Removed from favorites',
      severity: 'success'
    });
  };

  const handleViewRestaurant = (restaurantId) => {
    navigate(`/restaurant/${restaurantId}`);
  };

  const handleAddToCart = (restaurantId) => {
    navigate(`/restaurant/${restaurantId}`);
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
            My Favorites
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {favorites.length === 0 ? (
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <FavoriteBorderIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No favorites yet
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Start adding your favorite restaurants to see them here
            </Typography>
            <Button variant="contained" onClick={() => navigate('/restaurants')}>
              Browse Restaurants
            </Button>
          </Paper>
        ) : (
          <Grid container spacing={3}>
            {favorites.map((restaurant) => (
              <Grid item xs={12} sm={6} md={4} key={restaurant.id}>
                <Card sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  position: 'relative'
                }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={restaurant.image}
                    alt={restaurant.name}
                    sx={{ objectFit: 'cover' }}
                  />
                  
                  <IconButton
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      bgcolor: 'white',
                      '&:hover': { bgcolor: 'white' }
                    }}
                    onClick={() => handleRemoveFavorite(restaurant.id)}
                  >
                    <FavoriteIcon color="error" />
                  </IconButton>

                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" gutterBottom>
                      {restaurant.name}
                    </Typography>
                    
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {restaurant.cuisine}
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Rating value={restaurant.rating} precision={0.1} readOnly size="small" />
                      <Typography variant="body2">{restaurant.rating}</Typography>
                    </Box>

                    <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                      <Chip
                        label={`${restaurant.deliveryTime}`}
                        size="small"
                        variant="outlined"
                      />
                      <Chip
                        label={`LKR ${restaurant.deliveryFee} delivery`}
                        size="small"
                        variant="outlined"
                      />
                    </Stack>

                    <Divider sx={{ my: 2 }} />

                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        fullWidth
                        variant="contained"
                        size="small"
                        startIcon={<CartIcon />}
                        onClick={() => handleAddToCart(restaurant.id)}
                      >
                        Order
                      </Button>
                      <Button
                        fullWidth
                        variant="outlined"
                        size="small"
                        onClick={() => handleViewRestaurant(restaurant.id)}
                      >
                        View
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

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