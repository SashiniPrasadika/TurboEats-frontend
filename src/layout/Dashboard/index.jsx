// src/layout/Dashboard/index.jsx
import { useState } from 'react';
import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom';
import {
  Box, Drawer, AppBar, Toolbar, Typography, List, ListItem,
  ListItemButton, ListItemIcon, ListItemText, Avatar, Divider,
  IconButton, useMediaQuery, useTheme, Tooltip, Chip,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Restaurant as RestaurantIcon,
  ShoppingBag as OrdersIcon,
  People as UsersIcon,
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  Logout as LogoutIcon,
  Home as HomeIcon,
} from '@mui/icons-material';
import { AuthProvider, useAuth } from '../../contexts/AuthContext';

const DRAWER_WIDTH = 260;

const NAV_ITEMS = [
  { label: 'Overview',    path: '/dashboard',              icon: <DashboardIcon /> },
  { label: 'Orders',      path: '/dashboard/orders',       icon: <OrdersIcon /> },
  { label: 'Restaurants', path: '/dashboard/restaurants',  icon: <RestaurantIcon /> },
  { label: 'Users',       path: '/dashboard/users',        icon: <UsersIcon /> },
];

function SidebarContent({ collapsed, onClose }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => { logout(); navigate('/login'); };
  const isActive = (path) => location.pathname === path;

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#1a1a2e' }}>
      {/* Logo */}
      <Box sx={{ p: 2.5, display: 'flex', alignItems: 'center', gap: 1.5, minHeight: 64 }}>
        <Typography sx={{ fontSize: 26, lineHeight: 1 }}>🍔</Typography>
        {!collapsed && (
          <Box>
            <Typography sx={{ fontWeight: 800, color: '#fff', fontSize: 17, lineHeight: 1.1 }}>
              TurboEats
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.35)', fontSize: 10, fontWeight: 700, letterSpacing: 1 }}>
              ADMIN PANEL
            </Typography>
          </Box>
        )}
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)' }} />

      {/* Nav items */}
      <List sx={{ flex: 1, px: 1.5, py: 1.5 }}>
        {NAV_ITEMS.map((item) => {
          const active = isActive(item.path);
          return (
            <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
              <Tooltip title={collapsed ? item.label : ''} placement="right">
                <ListItemButton
                  component={Link}
                  to={item.path}
                  onClick={onClose}
                  sx={{
                    borderRadius: 2,
                    minHeight: 44,
                    justifyContent: collapsed ? 'center' : 'flex-start',
                    px: 1.5,
                    bgcolor: active ? 'rgba(255,75,43,0.18)' : 'transparent',
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.07)' },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: collapsed ? 0 : 38,
                      color: active ? '#FF6B4A' : 'rgba(255,255,255,0.5)',
                      justifyContent: 'center',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  {!collapsed && (
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{
                        fontWeight: active ? 700 : 500,
                        fontSize: 14,
                        color: active ? '#fff' : 'rgba(255,255,255,0.65)',
                      }}
                    />
                  )}
                </ListItemButton>
              </Tooltip>
            </ListItem>
          );
        })}
      </List>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)' }} />

      {/* Bottom actions */}
      <Box sx={{ p: 1.5 }}>
        <Tooltip title={collapsed ? 'Customer View' : ''} placement="right">
          <ListItemButton
            component={Link}
            to="/"
            sx={{
              borderRadius: 2, mb: 0.5,
              color: 'rgba(255,255,255,0.5)',
              '&:hover': { color: '#fff', bgcolor: 'rgba(255,255,255,0.07)' },
            }}
          >
            <ListItemIcon sx={{ minWidth: collapsed ? 0 : 38, color: 'inherit', justifyContent: 'center' }}>
              <HomeIcon />
            </ListItemIcon>
            {!collapsed && (
              <ListItemText primary="Customer View" primaryTypographyProps={{ fontSize: 13 }} />
            )}
          </ListItemButton>
        </Tooltip>

        <Tooltip title={collapsed ? 'Log Out' : ''} placement="right">
          <ListItemButton
            onClick={handleLogout}
            sx={{
              borderRadius: 2,
              color: 'rgba(255,75,43,0.7)',
              '&:hover': { color: '#FF4B2B', bgcolor: 'rgba(255,75,43,0.08)' },
            }}
          >
            <ListItemIcon sx={{ minWidth: collapsed ? 0 : 38, color: 'inherit', justifyContent: 'center' }}>
              <LogoutIcon />
            </ListItemIcon>
            {!collapsed && (
              <ListItemText primary="Log Out" primaryTypographyProps={{ fontSize: 13 }} />
            )}
          </ListItemButton>
        </Tooltip>

        {!collapsed && user && (
          <Box
            sx={{
              mt: 1.5, p: 1.5, borderRadius: 2,
              bgcolor: 'rgba(255,255,255,0.05)',
              display: 'flex', gap: 1.5, alignItems: 'center',
            }}
          >
            <Avatar
              sx={{
                width: 34, height: 34, fontSize: 13, fontWeight: 700, flexShrink: 0,
                background: 'linear-gradient(135deg,#FF4B2B,#FF416C)',
              }}
            >
              {user.firstName?.[0]}{user.lastName?.[0]}
            </Avatar>
            <Box sx={{ overflow: 'hidden' }}>
              <Typography
                sx={{
                  color: '#fff', fontWeight: 700, fontSize: 13, lineHeight: 1.3,
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                }}
              >
                {user.firstName} {user.lastName}
              </Typography>
              <Chip
                label="Admin"
                size="small"
                sx={{ height: 16, fontSize: 10, fontWeight: 700, mt: 0.3, bgcolor: 'rgba(255,75,43,0.2)', color: '#FF6B4A' }}
              />
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}

function DashboardContent() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const drawerW = collapsed ? 72 : DRAWER_WIDTH;

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Desktop sidebar */}
      {!isMobile && (
        <Box sx={{ width: drawerW, flexShrink: 0, transition: 'width 0.25s', position: 'relative' }}>
          <Box
            sx={{
              position: 'fixed', top: 0, left: 0, bottom: 0,
              width: drawerW, transition: 'width 0.25s', zIndex: 100, overflow: 'hidden',
            }}
          >
            <SidebarContent collapsed={collapsed} onClose={undefined} />
          </Box>

          {/* Collapse toggle */}
          <IconButton
            onClick={() => setCollapsed((c) => !c)}
            size="small"
            sx={{
              position: 'fixed',
              top: 20,
              left: drawerW - 14,
              transition: 'left 0.25s',
              zIndex: 200,
              width: 28, height: 28,
              bgcolor: '#FF4B2B', color: '#fff',
              boxShadow: 3,
              '&:hover': { bgcolor: '#e0391a' },
            }}
          >
            <ChevronLeftIcon
              sx={{
                fontSize: 16,
                transform: collapsed ? 'rotate(180deg)' : 'none',
                transition: 'transform 0.25s',
              }}
            />
          </IconButton>
        </Box>
      )}

      {/* Mobile drawer */}
      {isMobile && (
        <Drawer
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          PaperProps={{ sx: { width: DRAWER_WIDTH } }}
        >
          <SidebarContent collapsed={false} onClose={() => setMobileOpen(false)} />
        </Drawer>
      )}

      {/* Main content */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {isMobile && (
          <AppBar position="sticky" elevation={0} sx={{ bgcolor: '#1a1a2e' }}>
            <Toolbar>
              <IconButton onClick={() => setMobileOpen(true)} sx={{ color: '#fff', mr: 1 }}>
                <MenuIcon />
              </IconButton>
              <Typography sx={{ fontWeight: 800, color: '#fff' }}>🍔 TurboEats Admin</Typography>
            </Toolbar>
          </AppBar>
        )}
        <Box sx={{ flex: 1, bgcolor: 'background.default', overflow: 'auto' }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

export default function DashboardLayout() {
  return (
    <AuthProvider>
      <DashboardContent />
    </AuthProvider>
  );
}
