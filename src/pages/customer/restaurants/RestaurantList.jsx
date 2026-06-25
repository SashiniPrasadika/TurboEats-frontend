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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Checkbox,
  FormGroup,
  FormControlLabel,
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
  FavoriteBorder as FavoriteBorderIcon,
  FilterList as FilterIcon,
  Sort as SortIcon
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import MainCard from 'components/MainCard';

// Mock data for all restaurants
const allRestaurants = [
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
    isFavorite: false,
    categories: ['Pizza', 'Italian'],
    priceRange: '$$',
    address: 'Colombo 03'
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
    isFavorite: true,
    categories: ['Fast Food', 'Chicken'],
    priceRange: '$$',
    address: 'Colombo 02'
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
    isFavorite: false,
    categories: ['Fast Food', 'Burgers'],
    priceRange: '$$',
    address: 'Colombo 04'
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
    isFavorite: false,
    categories: ['Fast Food', 'Burgers'],
    priceRange: '$$',
    address: 'Colombo 07'
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
    isFavorite: false,
    categories: ['Healthy', 'Sandwiches'],
    priceRange: '$',
    address: 'Colombo 05'
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
    isFavorite: false,
    categories: ['Pizza', 'Italian'],
    priceRange: '$$',
    address: 'Colombo 06'
  },
  {
    id: 7,
    name: 'Taco Bell',
    image: 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=500',
    cuisine: 'Mexican • Fast Food',
    rating: 4.2,
    deliveryTime: '25-35 min',
    deliveryFee: 120,
    minOrder: 400,
    isOpen: true,
    isFavorite: false,
    categories: ['Mexican', 'Fast Food'],
    priceRange: '$',
    address: 'Colombo 03'
  },
  {
    id: 8,
    name: 'Starbucks',
    image: 'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?w=500',
    cuisine: 'Coffee • Beverages',
    rating: 4.9,
    deliveryTime: '15-25 min',
    deliveryFee: 80,
    minOrder: 300,
    isOpen: true,
    isFavorite: true,
    categories: ['Coffee', 'Beverages'],
    priceRange: '$$$',
    address: 'Colombo 03'
  }
];

// Cuisine categories for filter
const cuisineCategories = [
  'Pizza', 'Italian', 'Fast Food', 'Chicken', 'Burgers', 
  'Healthy', 'Sandwiches', 'Mexican', 'Coffee', 'Beverages'
];

export default function RestaurantList() {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [cartCount, setCartCount] = useState(3);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [sortBy, setSortBy] = useState('rating');
  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 3]);
  const [deliveryFee, setDeliveryFee] = useState(200);
  const [showOpenOnly, setShowOpenOnly] = useState(false);

  // Handle favorite toggle
  const toggleFavorite = (restaurantId) => {
    setFavorites(prev => 
      prev.includes(restaurantId) 
        ? prev.filter(id => id !== restaurantId)
        : [...prev, restaurantId]
    );
  };

  // Filter and sort restaurants
  const filteredRestaurants = allRestaurants
    .filter(restaurant => {
      // Search filter
      const matchesSearch = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase()) ||
        restaurant.address.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Cuisine filter
      const matchesCuisine = selectedCuisines.length === 0 || 
        restaurant.categories.some(cat => selectedCuisines.includes(cat));
      
      // Price range filter (converting $ to number)
      const priceValue = restaurant.priceRange.length;
      const matchesPrice = priceValue >= priceRange[0] && priceValue <= priceRange[1];
      
      // Delivery fee filter
      const matchesDelivery = restaurant.deliveryFee <= deliveryFee;
      
      // Open now filter
      const matchesOpen = !showOpenOnly || restaurant.isOpen;
      
      return matchesSearch && matchesCuisine && matchesPrice && matchesDelivery && matchesOpen;
    })
    .sort((a, b) => {
      switch(sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'deliveryTime':
          return parseInt(a.deliveryTime) - parseInt(b.deliveryTime);
        case 'deliveryFee':
          return a.deliveryFee - b.deliveryFee;
        case 'minOrder':
          return a.minOrder - b.minOrder;
        default:
          return 0;
      }
    });

  const handleCuisineChange = (cuisine) => {
    setSelectedCuisines(prev =>
      prev.includes(cuisine)
        ? prev.filter(c => c !== cuisine)
        : [...prev, cuisine]
    );
  };

  return (
    <Box sx={{ bgcolor: '#f8f9fa', minHeight: '100vh' }}>
      {/* Header */}
      <AppBar position="sticky" color="default" elevation={1} sx={{ bgcolor: 'white' }}>
        <Toolbar>
          <IconButton
            edge="start"
            onClick={() => navigate('/')}
            sx={{ mr: 2 }}
          >
            <RestaurantIcon />
          </IconButton>
          
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

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Header with search and filter */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" component="h1">
            Restaurants Near You
          </Typography>
          <Button
            variant="outlined"
            startIcon={<FilterIcon />}
            onClick={() => setFilterDrawerOpen(true)}
          >
            Filters
          </Button>
        </Box>

        {/* Search Bar */}
        <Paper sx={{ p: 1, mb: 4 }}>
          <TextField
            fullWidth
            placeholder="Search restaurants by name, cuisine, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <FormControl variant="standard" sx={{ minWidth: 120 }}>
                    <Select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      disableUnderline
                    >
                      <MenuItem value="rating">Top Rated</MenuItem>
                      <MenuItem value="deliveryTime">Fastest Delivery</MenuItem>
                      <MenuItem value="deliveryFee">Lowest Delivery Fee</MenuItem>
                      <MenuItem value="minOrder">Min. Order</MenuItem>
                    </Select>
                  </FormControl>
                </InputAdornment>
              ),
              sx: { '& fieldset': { border: 'none' } }
            }}
          />
        </Paper>

        {/* Results count */}
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {filteredRestaurants.length} restaurants found
        </Typography>

        {/* Restaurant Grid */}
        <Grid container spacing={3}>
          {filteredRestaurants.map((restaurant) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={restaurant.id}>
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
                  height="140"
                  image={restaurant.image}
                  alt={restaurant.name}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                    <Typography variant="h6" component="div" noWrap>
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

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <StarIcon sx={{ fontSize: 16, color: 'warning.main', mr: 0.5 }} />
                      <Typography variant="body2">{restaurant.rating}</Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {restaurant.priceRange}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <DeliveryIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                    <Typography variant="caption">
                      LKR {restaurant.deliveryFee} delivery • {restaurant.deliveryTime}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Chip
                      label={restaurant.isOpen ? 'Open' : 'Closed'}
                      size="small"
                      color={restaurant.isOpen ? 'success' : 'error'}
                    />
                    <Typography variant="caption" color="primary.main">
                      Min. LKR {restaurant.minOrder}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Filter Drawer */}
        <Drawer
          anchor="right"
          open={filterDrawerOpen}
          onClose={() => setFilterDrawerOpen(false)}
        >
          <Box sx={{ width: 300, p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6">Filters</Typography>
              <IconButton onClick={() => setFilterDrawerOpen(false)}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Divider sx={{ mb: 3 }} />

            {/* Open Now Filter */}
            <Typography variant="subtitle2" gutterBottom>
              Open Now
            </Typography>
            <FormControlLabel
              control={
                <Checkbox
                  checked={showOpenOnly}
                  onChange={(e) => setShowOpenOnly(e.target.checked)}
                />
              }
              label="Show open restaurants only"
              sx={{ mb: 3 }}
            />

            {/* Cuisine Filter */}
            <Typography variant="subtitle2" gutterBottom>
              Cuisine
            </Typography>
            <FormGroup sx={{ mb: 3 }}>
              {cuisineCategories.map((cuisine) => (
                <FormControlLabel
                  key={cuisine}
                  control={
                    <Checkbox
                      checked={selectedCuisines.includes(cuisine)}
                      onChange={() => handleCuisineChange(cuisine)}
                      size="small"
                    />
                  }
                  label={cuisine}
                />
              ))}
            </FormGroup>

            {/* Price Range Filter */}
            <Typography variant="subtitle2" gutterBottom>
              Price Range
            </Typography>
            <Box sx={{ px: 1, mb: 3 }}>
              <Slider
                value={priceRange}
                onChange={(e, newValue) => setPriceRange(newValue)}
                valueLabelDisplay="auto"
                step={1}
                marks={[
                  { value: 1, label: '$' },
                  { value: 2, label: '$$' },
                  { value: 3, label: '$$$' }
                ]}
                min={1}
                max={3}
              />
            </Box>

            {/* Max Delivery Fee */}
            <Typography variant="subtitle2" gutterBottom>
              Max Delivery Fee: LKR {deliveryFee}
            </Typography>
            <Slider
              value={deliveryFee}
              onChange={(e, newValue) => setDeliveryFee(newValue)}
              valueLabelDisplay="auto"
              step={10}
              min={0}
              max={300}
              sx={{ mb: 3 }}
            />

            <Button
              fullWidth
              variant="contained"
              onClick={() => setFilterDrawerOpen(false)}
            >
              Apply Filters
            </Button>
          </Box>
        </Drawer>
      </Container>
    </Box>
  );
}