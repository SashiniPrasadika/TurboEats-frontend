import { useState } from 'react';
import {
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  Button,
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
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  Tab,
  Tabs,
  TextField,
  InputAdornment,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Radio,
  RadioGroup,
  FormControlLabel
} from '@mui/material';
import {
  LocationOn as LocationIcon,
  Phone as PhoneIcon,
  AccessTime as TimeIcon,
  Star as StarIcon,
  ShoppingCart as CartIcon,
  Person as PersonIcon,
  ArrowBack as ArrowBackIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Info as InfoIcon
} from '@mui/icons-material';
import { useParams, useNavigate, Link } from 'react-router-dom';

// Mock menu data
const menuData = {
  popular: [
    { id: 1, name: 'Pepperoni Pizza', description: 'Classic pepperoni with mozzarella', price: 1850, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=200', category: 'Pizza' },
    { id: 2, name: 'Margherita Pizza', description: 'Fresh basil, mozzarella, tomato sauce', price: 1650, image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=200', category: 'Pizza' },
    { id: 3, name: 'Chicken Burger', description: 'Grilled chicken with lettuce and mayo', price: 1250, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200', category: 'Burgers' },
    { id: 4, name: 'French Fries', description: 'Crispy golden fries', price: 450, image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=200', category: 'Sides' }
  ],
  pizza: [
    { id: 5, name: 'Pepperoni Pizza', description: 'Classic pepperoni with mozzarella', price: 1850, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=200', category: 'Pizza' },
    { id: 6, name: 'Margherita Pizza', description: 'Fresh basil, mozzarella, tomato sauce', price: 1650, image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=200', category: 'Pizza' },
    { id: 7, name: 'BBQ Chicken Pizza', description: 'BBQ sauce, chicken, red onions', price: 1950, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200', category: 'Pizza' },
    { id: 8, name: 'Veggie Pizza', description: 'Bell peppers, olives, mushrooms, onions', price: 1750, image: 'https://images.unsplash.com/photo-1604917877934-07d8d248d396?w=200', category: 'Pizza' }
  ],
  burgers: [
    { id: 9, name: 'Chicken Burger', description: 'Grilled chicken with lettuce and mayo', price: 1250, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200', category: 'Burgers' },
    { id: 10, name: 'Beef Burger', description: 'Angus beef patty with cheese', price: 1450, image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=200', category: 'Burgers' },
    { id: 11, name: 'Double Cheese Burger', description: 'Double patty with extra cheese', price: 1850, image: 'https://images.unsplash.com/photo-1553979459-d2229b7a3e4c?w=200', category: 'Burgers' }
  ],
  sides: [
    { id: 12, name: 'French Fries', description: 'Crispy golden fries', price: 450, image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=200', category: 'Sides' },
    { id: 13, name: 'Onion Rings', description: 'Crispy battered onion rings', price: 550, image: 'https://images.unsplash.com/photo-1639024471283-03518883512d?w=200', category: 'Sides' },
    { id: 14, name: 'Garlic Bread', description: 'Toasted bread with garlic butter', price: 350, image: 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?w=200', category: 'Sides' }
  ],
  beverages: [
    { id: 15, name: 'Coca Cola', description: '330ml can', price: 250, image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=200', category: 'Beverages' },
    { id: 16, name: 'Pepsi', description: '330ml can', price: 250, image: 'https://images.unsplash.com/photo-1581636625402-29b2a704ef13?w=200', category: 'Beverages' },
    { id: 17, name: 'Sprite', description: '330ml can', price: 250, image: 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=200', category: 'Beverages' },
    { id: 18, name: 'Water', description: '500ml bottle', price: 150, image: 'https://images.unsplash.com/photo-1564419320467-6870c2894b0e?w=200', category: 'Beverages' }
  ]
};

// Restaurant details
const restaurantDetails = {
  id: 1,
  name: 'Pizza Hut',
  image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500',
  coverImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200',
  cuisine: 'Italian • Pizza',
  rating: 4.8,
  totalRatings: 1250,
  deliveryTime: '25-35 min',
  deliveryFee: 150,
  minOrder: 500,
  isOpen: true,
  isFavorite: false,
  address: '123, Galle Road, Colombo 03',
  phone: '+94 11 234 5678',
  hours: '10:00 AM - 11:00 PM',
  description: 'Experience the taste of Italy with our authentic pizzas made from fresh ingredients.',
  offers: [
    '20% off on first order',
    'Free delivery on orders above LKR 1000'
  ]
};

export default function RestaurantDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [cart, setCart] = useState({});
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const [openItemDialog, setOpenItemDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemQuantity, setItemQuantity] = useState(1);
  const [itemSpecialInstructions, setItemSpecialInstructions] = useState('');
  const [selectedOptions, setSelectedOptions] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [isFavorite, setIsFavorite] = useState(false);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleAddToCart = (item) => {
    setSelectedItem(item);
    setItemQuantity(1);
    setItemSpecialInstructions('');
    setSelectedOptions({});
    setOpenItemDialog(true);
  };

  const handleAddToCartConfirm = () => {
    const newCart = { ...cart };
    const cartItem = {
      ...selectedItem,
      quantity: itemQuantity,
      specialInstructions: itemSpecialInstructions,
      options: selectedOptions,
      totalPrice: selectedItem.price * itemQuantity
    };

    if (newCart[selectedItem.id]) {
      newCart[selectedItem.id].quantity += itemQuantity;
      newCart[selectedItem.id].totalPrice += selectedItem.price * itemQuantity;
    } else {
      newCart[selectedItem.id] = cartItem;
    }

    setCart(newCart);
    updateCartCount(newCart);
    setOpenItemDialog(false);
    setSnackbar({
      open: true,
      message: `${selectedItem.name} added to cart`,
      severity: 'success'
    });
  };

  const updateCartCount = (cart) => {
    const count = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
    const total = Object.values(cart).reduce((sum, item) => sum + item.totalPrice, 0);
    setCartCount(count);
    setCartTotal(total);
  };

  const getCurrentMenu = () => {
    switch(tabValue) {
      case 0: return menuData.popular;
      case 1: return menuData.pizza;
      case 2: return menuData.burgers;
      case 3: return menuData.sides;
      case 4: return menuData.beverages;
      default: return menuData.popular;
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
          
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
            {restaurantDetails.name}
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

      {/* Restaurant Cover */}
      <Box sx={{ position: 'relative', height: 200, overflow: 'hidden' }}>
        <img
          src={restaurantDetails.coverImage}
          alt={restaurantDetails.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <Box sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
          color: 'white',
          p: 3
        }}>
          <Container maxWidth="lg">
            <Typography variant="h4" gutterBottom>
              {restaurantDetails.name}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Chip
                label={restaurantDetails.isOpen ? 'Open' : 'Closed'}
                size="small"
                color={restaurantDetails.isOpen ? 'success' : 'error'}
              />
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <StarIcon sx={{ fontSize: 18, color: 'warning.main', mr: 0.5 }} />
                <Typography variant="body2">
                  {restaurantDetails.rating} ({restaurantDetails.totalRatings}+ ratings)
                </Typography>
              </Box>
            </Box>
          </Container>
        </Box>
      </Box>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Restaurant Info */}
        <Paper sx={{ p: 3, mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Typography variant="body1" paragraph>
                {restaurantDetails.description}
              </Typography>
              <Stack direction="row" spacing={2} flexWrap="wrap">
                <Chip
                  icon={<LocationIcon />}
                  label={restaurantDetails.address}
                  variant="outlined"
                />
                <Chip
                  icon={<PhoneIcon />}
                  label={restaurantDetails.phone}
                  variant="outlined"
                />
                <Chip
                  icon={<TimeIcon />}
                  label={restaurantDetails.hours}
                  variant="outlined"
                />
              </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ bgcolor: 'grey.50', p: 2, borderRadius: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Delivery Info
                </Typography>
                <Typography variant="body2" paragraph>
                  Delivery Fee: LKR {restaurantDetails.deliveryFee}<br />
                  Min. Order: LKR {restaurantDetails.minOrder}<br />
                  Est. Delivery: {restaurantDetails.deliveryTime}
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                  Offers
                </Typography>
                {restaurantDetails.offers.map((offer, index) => (
                  <Typography key={index} variant="body2" color="primary.main">
                    • {offer}
                  </Typography>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Menu Tabs */}
        <Paper sx={{ mb: 4 }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="Popular" />
            <Tab label="Pizza" />
            <Tab label="Burgers" />
            <Tab label="Sides" />
            <Tab label="Beverages" />
          </Tabs>
        </Paper>

        {/* Menu Items */}
        <Grid container spacing={3}>
          {getCurrentMenu().map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card sx={{ display: 'flex', height: '100%' }}>
                <CardMedia
                  component="img"
                  sx={{ width: 100, height: 100, objectFit: 'cover' }}
                  image={item.image}
                  alt={item.name}
                />
                <CardContent sx={{ flex: 1 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    {item.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                    {item.description}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                    <Typography variant="body2" fontWeight="bold" color="primary.main">
                      LKR {item.price}
                    </Typography>
                    <Button
                      size="small"
                      variant="outlined"
                      startIcon={<AddIcon />}
                      onClick={() => handleAddToCart(item)}
                    >
                      Add
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Floating Cart Button (mobile) */}
        {cartCount > 0 && (
          <Paper
            sx={{
              position: 'fixed',
              bottom: 20,
              left: 20,
              right: 20,
              p: 2,
              bgcolor: 'primary.main',
              color: 'white',
              borderRadius: 2,
              cursor: 'pointer',
              display: { md: 'none' }
            }}
            onClick={() => navigate('/cart')}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="body2">{cartCount} items</Typography>
                <Typography variant="h6">LKR {cartTotal}</Typography>
              </Box>
              <Button variant="contained" color="secondary" sx={{ color: 'white' }}>
                View Cart
              </Button>
            </Box>
          </Paper>
        )}
      </Container>

      {/* Add to Cart Dialog */}
      <Dialog open={openItemDialog} onClose={() => setOpenItemDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Typography variant="h6">{selectedItem?.name}</Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary" paragraph>
                {selectedItem?.description}
              </Typography>
            </Grid>
            
            {/* Quantity Selector */}
            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>
                Quantity
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <IconButton
                  size="small"
                  onClick={() => setItemQuantity(Math.max(1, itemQuantity - 1))}
                >
                  <RemoveIcon />
                </IconButton>
                <Typography variant="h6">{itemQuantity}</Typography>
                <IconButton
                  size="small"
                  onClick={() => setItemQuantity(itemQuantity + 1)}
                >
                  <AddIcon />
                </IconButton>
              </Box>
            </Grid>

            {/* Special Instructions */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={2}
                label="Special Instructions"
                placeholder="e.g., No onions, extra sauce..."
                value={itemSpecialInstructions}
                onChange={(e) => setItemSpecialInstructions(e.target.value)}
              />
            </Grid>

            {/* Price Summary */}
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="subtitle1">Total</Typography>
                <Typography variant="h6" color="primary.main">
                  LKR {selectedItem?.price * itemQuantity}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenItemDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAddToCartConfirm}>
            Add to Cart
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
    </Box>
  );
}