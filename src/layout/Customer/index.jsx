// src/layout/Customer/index.jsx
import { useState } from 'react';
import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom';
import {
  AppBar, Toolbar, Box, Typography, IconButton, Badge, Button,
  Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText,
  Avatar, Menu, MenuItem, Divider, useMediaQuery, useTheme,
} from '@mui/material';
import {
  ShoppingCart as CartIcon,
  Menu as MenuIcon,
  Home as HomeIcon,
  Restaurant as RestaurantIcon,
  Favorite as FavIcon,
  ShoppingBag as OrdersIcon,
  Person as PersonIcon,
  Security as SecurityIcon,
  Logout as LogoutIcon,
  Dashboard as DashboardIcon,
} from '@mui/icons-material';
import { AuthProvider, useAuth } from '../../contexts/AuthContext';

const NAV_LINKS = [
  { label: 'Home',        path: '/',            icon: <HomeIcon /> },
  { label: 'Restaurants', path: '/restaurants', icon: <RestaurantIcon /> },
  { label: 'Favorites',   path: '/favorites',   icon: <FavIcon /> },
  { label: 'Orders',      path: '/orders',      icon: <OrdersIcon /> },
];

function NavContent() {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const cartCount = 3;

  const handleLogout = () => {
    setAnchorEl(null);
    logout();
    navigate('/login');
  };

  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{ bgcolor: 'background.paper', borderBottom: '1px solid', borderColor: 'divider' }}
      >
        <Toolbar sx={{ gap: 1 }}>
          {isMobile && (
            <IconButton onClick={() => setDrawerOpen(true)} size="small">
              <MenuIcon />
            </IconButton>
          )}

          <Typography
            component={Link}
            to="/"
            sx={{
              fontWeight: 800, fontSize: 22, mr: 2,
              background: 'linear-gradient(135deg,#FF4B2B,#FF416C)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            🍔 TurboEats
          </Typography>

          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              {NAV_LINKS.map((l) => (
                <Button
                  key={l.path}
                  component={Link}
                  to={l.path}
                  sx={{
                    color: isActive(l.path) ? 'primary.main' : 'text.secondary',
                    fontWeight: isActive(l.path) ? 700 : 500,
                    fontSize: 14,
                  }}
                >
                  {l.label}
                </Button>
              ))}
            </Box>
          )}

          <Box sx={{ flex: 1 }} />

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton component={Link} to="/cart">
              <Badge badgeContent={cartCount} color="error">
                <CartIcon />
              </Badge>
            </IconButton>

            {user ? (
              <>
                <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                  <Avatar
                    sx={{
                      width: 34, height: 34, fontSize: 14, fontWeight: 700,
                      background: 'linear-gradient(135deg,#FF4B2B,#FF416C)',
                    }}
                  >
                    {user.firstName?.[0]}{user.lastName?.[0]}
                  </Avatar>
                </IconButton>

                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={() => setAnchorEl(null)}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  PaperProps={{ sx: { mt: 1, minWidth: 210, borderRadius: 2 } }}
                >
                  <Box sx={{ px: 2, py: 1.5 }}>
                    <Typography fontWeight={700}>{user.firstName} {user.lastName}</Typography>
                    <Typography variant="body2" color="text.secondary">{user.email}</Typography>
                  </Box>
                  <Divider />
                  {isAdmin && (
                    <MenuItem onClick={() => { navigate('/dashboard'); setAnchorEl(null); }}>
                      <ListItemIcon><DashboardIcon fontSize="small" /></ListItemIcon>
                      Admin Dashboard
                    </MenuItem>
                  )}
                  <MenuItem onClick={() => { navigate('/profile'); setAnchorEl(null); }}>
                    <ListItemIcon><PersonIcon fontSize="small" /></ListItemIcon>
                    Profile
                  </MenuItem>
                  <MenuItem onClick={() => { navigate('/security'); setAnchorEl(null); }}>
                    <ListItemIcon><SecurityIcon fontSize="small" /></ListItemIcon>
                    Security
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
                    <ListItemIcon><LogoutIcon fontSize="small" color="error" /></ListItemIcon>
                    Log Out
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button variant="contained" component={Link} to="/login" size="small">
                Sign In
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile drawer */}
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 260, pt: 2 }}>
          <Typography
            sx={{
              px: 2.5, fontWeight: 800, fontSize: 20, mb: 2,
              background: 'linear-gradient(135deg,#FF4B2B,#FF416C)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            🍔 TurboEats
          </Typography>
          <List>
            {NAV_LINKS.map((l) => (
              <ListItem key={l.path} disablePadding>
                <ListItemButton
                  component={Link}
                  to={l.path}
                  selected={isActive(l.path)}
                  onClick={() => setDrawerOpen(false)}
                >
                  <ListItemIcon>{l.icon}</ListItemIcon>
                  <ListItemText primary={l.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          {user && (
            <>
              <Divider sx={{ my: 1 }} />
              <List>
                {isAdmin && (
                  <ListItem disablePadding>
                    <ListItemButton component={Link} to="/dashboard" onClick={() => setDrawerOpen(false)}>
                      <ListItemIcon><DashboardIcon /></ListItemIcon>
                      <ListItemText primary="Admin Dashboard" />
                    </ListItemButton>
                  </ListItem>
                )}
                <ListItem disablePadding>
                  <ListItemButton onClick={() => { handleLogout(); setDrawerOpen(false); }} sx={{ color: 'error.main' }}>
                    <ListItemIcon><LogoutIcon color="error" /></ListItemIcon>
                    <ListItemText primary="Log Out" />
                  </ListItemButton>
                </ListItem>
              </List>
            </>
          )}
        </Box>
      </Drawer>

      <Box component="main" sx={{ minHeight: 'calc(100vh - 64px)', bgcolor: 'background.default' }}>
        <Outlet />
      </Box>
    </>
  );
}

export default function CustomerLayout() {
  return (
    <AuthProvider>
      <NavContent />
    </AuthProvider>
  );
}
