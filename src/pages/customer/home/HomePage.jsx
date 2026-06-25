import { useState, useEffect } from 'react';
import {
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Chip,
  Avatar,
  Stack,
  Rating,
  Paper,
  Container,
  AppBar,
  Toolbar,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Search as SearchIcon,
  LocationOn as LocationIcon,
  Restaurant as RestaurantIcon,
  DeliveryDining as DeliveryIcon,
  AccessTime as TimeIcon,
  Star as StarIcon,
  ShoppingCart as CartIcon,
  Person as PersonIcon,
  Menu as MenuIcon,
  Close as CloseIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import MainCard from 'components/MainCard';

// Mock data for featured restaurants
const featuredRestaurants = [
  {
    id: 1,
    name: 'Pizza Hut',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500',
    cuisine: 'Italian • Pizza',
    rating: 4.8,
    deliveryTime: '25-35 min',
    deliveryFee: 150,
    minOrder: 500,
    isOpen: true,
    isFavorite: false
  },
  {
    id: 2,
    name: 'KFC',
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=500',
    cuisine: 'Fast Food • Chicken',
    rating: 4.6,
    deliveryTime: '20-30 min',
    deliveryFee: 120,
    minOrder: 400,
    isOpen: true,
    isFavorite: true
  },
  {
    id: 3,
    name: 'Burger King',
    image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=500',
    cuisine: 'Fast Food • Burgers',
    rating: 4.5,
    deliveryTime: '25-35 min',
    deliveryFee: 130,
    minOrder: 450,
    isOpen: true,
    isFavorite: false
  },
  {
    id: 4,
    name: 'McDonald\'s',
    image: 'https://images.unsplash.com/photo-1551782450-17144efb9c50?w=500',
    cuisine: 'Fast Food • Burgers',
    rating: 4.7,
    deliveryTime: '20-30 min',
    deliveryFee: 140,
    minOrder: 500,
    isOpen: true,
    isFavorite: false
  },
  {
    id: 5,
    name: 'Subway',
    image: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?w=500',
    cuisine: 'Healthy • Sandwiches',
    rating: 4.4,
    deliveryTime: '20-30 min',
    deliveryFee: 100,
    minOrder: 350,
    isOpen: false,
    isFavorite: false
  },
  {
    id: 6,
    name: 'Dominos Pizza',
    image: 'https://images.unsplash.com/photo-1594007654729-407eedc4be65?w=500',
    cuisine: 'Italian • Pizza',
    rating: 4.3,
    deliveryTime: '30-40 min',
    deliveryFee: 150,
    minOrder: 500,
    isOpen: true,
    isFavorite: false
  }
];

// Mock data for food categories
const categories = [
  { id: 1, name: 'Pizza', icon: '🍕' },
  { id: 2, name: 'Burgers', icon: '🍔' },
  { id: 3, name: 'Chicken', icon: '🍗' },
  { id: 4, name: 'Sandwiches', icon: '🥪' },
  { id: 5, name: 'Salads', icon: '🥗' },
  { id: 6, name: 'Desserts', icon: '🍰' },
  { id: 7, name: 'Drinks', icon: '🥤' },
  { id: 8, name: 'Asian', icon: '🍜' }
];

export default function HomePage() {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [cartCount, setCartCount] = useState(3);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle favorite toggle
  const toggleFavorite = (restaurantId) => {
    setFavorites(prev => 
      prev.includes(restaurantId) 
        ? prev.filter(id => id !== restaurantId)
        : [...prev, restaurantId]
    );
  };

  // Filter restaurants based on search
  const filteredRestaurants = featuredRestaurants.filter(restaurant =>
    restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ bgcolor: '#f8f9fa', minHeight: '100vh' }}>
      {/* Header */}
      <AppBar position="sticky" color="default" elevation={1} sx={{ bgcolor: 'white' }}>
        <Toolbar>
          {isMobile && (
            <IconButton
              edge="start"
              onClick={() => setMobileMenuOpen(true)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          
          <Typography variant="h5" component={Link} to="/" sx={{ 
            flexGrow: 1, 
            textDecoration: 'none',
            color: 'primary.main',
            fontWeight: 700
          }}>
            🍔 TurboEats
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton color="inherit" onClick={() => navigate('/cart')}>
              <Badge badgeContent={cartCount} color="primary">
                <CartIcon />
              </Badge>
            </IconButton>
            <IconButton color="inherit" onClick={() => navigate('/profile')}>
              <PersonIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Menu Drawer */}
      <Drawer
        anchor="left"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      >
        <Box sx={{ width: 280, p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">Menu</Typography>
            <IconButton onClick={() => setMobileMenuOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider />
          <List>
            <ListItem button component={Link} to="/">
              <ListItemIcon><RestaurantIcon /></ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button component={Link} to="/orders">
              <ListItemIcon><DeliveryIcon /></ListItemIcon>
              <ListItemText primary="My Orders" />
            </ListItem>
            <ListItem button component={Link} to="/favorites">
              <ListItemIcon><FavoriteIcon /></ListItemIcon>
              <ListItemText primary="Favorites" />
            </ListItem>
            <ListItem button component={Link} to="/profile">
              <ListItemIcon><PersonIcon /></ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Delivery Location */}
        <Paper sx={{ p: 2, mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
          <LocationIcon color="primary" />
          <Typography variant="body1">
            Deliver to: <strong>123, Galle Road, Colombo 03</strong>
          </Typography>
          <Button size="small" sx={{ ml: 'auto' }}>Change</Button>
        </Paper>

        {/* Hero Section */}
        <Box sx={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: 4,
          p: 6,
          mb: 4,
          color: 'white',
          textAlign: 'center'
        }}>
          <Typography variant="h3" gutterBottom>
            Hungry? We've got you covered!
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Order from the best restaurants in town
          </Typography>
          
          {/* Search Bar */}
          <Paper sx={{ p: 1, maxWidth: 600, mx: 'auto' }}>
            <TextField
              fullWidth
              placeholder="Search for restaurants or dishes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                sx: { '& fieldset': { border: 'none' } }
              }}
            />
          </Paper>
        </Box>

        {/* Categories */}
        <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
          Browse Categories
        </Typography>
        <Grid container spacing={2} sx={{ mb: 6 }}>
          {categories.map((category) => (
            <Grid item xs={6} sm={3} md={1.5} key={category.id}>
              <Paper
                elevation={2}
                sx={{
                  p: 2,
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: '0.3s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4
                  }
                }}
                onClick={() => navigate(`/category/${category.name.toLowerCase()}`)}
              >
                <Typography variant="h4" sx={{ mb: 1 }}>
                  {category.icon}
                </Typography>
                <Typography variant="body2">
                  {category.name}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Featured Restaurants */}
        <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
          Featured Restaurants
        </Typography>
        <Grid container spacing={3}>
          {filteredRestaurants.map((restaurant) => (
            <Grid item xs={12} sm={6} md={4} key={restaurant.id}>
              <Card sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                cursor: 'pointer',
                transition: '0.3s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4
                }
              }}
              onClick={() => navigate(`/restaurant/${restaurant.id}`)}
              >
                <CardMedia
                  component="img"
                  height="160"
                  image={restaurant.image}
                  alt={restaurant.name}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                    <Typography variant="h6" component="div">
                      {restaurant.name}
                    </Typography>
                    <IconButton 
                      size="small" 
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(restaurant.id);
                      }}
                    >
                      {favorites.includes(restaurant.id) ? (
                        <FavoriteIcon color="error" />
                      ) : (
                        <FavoriteBorderIcon />
                      )}
                    </IconButton>
                  </Box>

                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {restaurant.cuisine}
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <StarIcon sx={{ fontSize: 18, color: 'warning.main', mr: 0.5 }} />
                      <Typography variant="body2">{restaurant.rating}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <TimeIcon sx={{ fontSize: 18, color: 'text.secondary', mr: 0.5 }} />
                      <Typography variant="body2">{restaurant.deliveryTime}</Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Chip
                      label={restaurant.isOpen ? 'Open' : 'Closed'}
                      size="small"
                      color={restaurant.isOpen ? 'success' : 'error'}
                    />
                    <Typography variant="body2" color="primary.main">
                      Min. {restaurant.minOrder}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Promotional Banner */}
        <Paper sx={{ 
          mt: 6, 
          p: 4, 
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          color: 'white',
          borderRadius: 4,
          textAlign: 'center'
        }}>
          <Typography variant="h4" gutterBottom>
            First Order? Get 20% OFF!
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>
            Use code: WELCOME20 at checkout
          </Typography>
          <Button 
            variant="contained" 
            size="large"
            sx={{ 
              bgcolor: 'white', 
              color: 'primary.main',
              '&:hover': { bgcolor: 'grey.100' }
            }}
            onClick={() => navigate('/restaurants')}
          >
            Order Now
          </Button>
        </Paper>
      </Container>
    </Box>
  );
}