import { useState, useEffect } from 'react';
import {
  Grid,
  Typography,
  Box,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Chip,
  Avatar,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  Tooltip,
  Paper,
  FormControl,
  InputLabel,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  LinearProgress,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Tabs,
  Tab,
  Switch,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
  Rating,
  TextareaAutosize
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Restaurant as RestaurantIcon,
  LocationOn as LocationIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  AccessTime as TimeIcon,
  AttachMoney as MoneyIcon,
  Block as BlockIcon,
  CheckCircle as CheckCircleIcon,
  MoreVert as MoreVertIcon,
  Refresh as RefreshIcon,
  FilterList as FilterIcon,
  Person as PersonIcon,
  Campaign as CampaignIcon,
  Image as ImageIcon,
  Announcement as AnnouncementIcon,
  Discount as DiscountIcon,
  Event as EventIcon,
  Visibility as VisibilityIcon,
  Schedule as ScheduleIcon,
  Publish as PublishIcon,
  Save as SaveIcon,
  Preview as PreviewIcon,
  Upload as UploadIcon,
  Link as LinkIcon,
  CalendarToday as CalendarIcon,
  Category as CategoryIcon,
  CardGiftcard as CardGiftcardIcon,
  DeliveryDining as DeliveryIcon
} from '@mui/icons-material';
import MainCard from 'components/MainCard';

// Tab Panel Component
function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`content-tabpanel-${index}`}
      aria-labelledby={`content-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

// Mock data for promotions
const mockPromotions = [
  {
    id: 1,
    title: 'Weekend Special: 20% Off',
    description: 'Get 20% off on all orders above Rs. 1000 this weekend',
    type: 'discount',
    discount_type: 'percentage',
    discount_value: 20,
    min_order: 1000,
    max_discount: 500,
    code: 'WEEKEND20',
    image: null,
    status: 'active',
    start_date: '2024-03-20T00:00',
    end_date: '2024-03-24T23:59',
    applicable_restaurants: 'all',
    applicable_users: 'all',
    usage_limit: 1000,
    used_count: 245,
    created_at: '2024-03-15T10:30',
    created_by: 'Admin'
  },
  {
    id: 2,
    title: 'New User Welcome Offer',
    description: 'First order free delivery for new users',
    type: 'delivery',
    discount_type: 'free_delivery',
    code: 'WELCOME10',
    image: null,
    status: 'active',
    start_date: '2024-03-01T00:00',
    end_date: '2024-12-31T23:59',
    applicable_restaurants: 'all',
    applicable_users: 'new',
    usage_limit: 5000,
    used_count: 1234,
    created_at: '2024-03-01T09:00',
    created_by: 'Admin'
  },
  {
    id: 3,
    title: 'Pizza Hut Exclusive: Buy 1 Get 1',
    description: 'Buy any large pizza and get another large pizza free',
    type: 'bogo',
    discount_type: 'bogo',
    code: 'PIZZABOGO',
    image: null,
    status: 'active',
    start_date: '2024-03-15T00:00',
    end_date: '2024-03-30T23:59',
    applicable_restaurants: [1],
    applicable_users: 'all',
    usage_limit: 500,
    used_count: 89,
    created_at: '2024-03-14T14:20',
    created_by: 'Admin'
  },
  {
    id: 4,
    title: 'Free Drink with Combo',
    description: 'Get a free drink with any meal combo',
    type: 'gift',
    discount_type: 'free_item',
    code: 'FREEDRINK',
    image: null,
    status: 'scheduled',
    start_date: '2024-04-01T00:00',
    end_date: '2024-04-15T23:59',
    applicable_restaurants: [2, 3],
    applicable_users: 'all',
    usage_limit: 300,
    used_count: 0,
    created_at: '2024-03-16T11:45',
    created_by: 'Admin'
  },
  {
    id: 5,
    title: 'Flash Sale: 30% Off',
    description: '30% off on orders above Rs. 1500 - Limited time',
    type: 'flash_sale',
    discount_type: 'percentage',
    discount_value: 30,
    min_order: 1500,
    max_discount: 800,
    code: 'FLASH30',
    image: null,
    status: 'expired',
    start_date: '2024-03-10T00:00',
    end_date: '2024-03-12T23:59',
    applicable_restaurants: 'all',
    applicable_users: 'all',
    usage_limit: 200,
    used_count: 198,
    created_at: '2024-03-09T16:30',
    created_by: 'Admin'
  }
];

// Mock data for announcements
const mockAnnouncements = [
  {
    id: 1,
    title: 'Platform Maintenance',
    content: 'Scheduled maintenance on March 25th from 2 AM to 4 AM. The platform will be temporarily unavailable.',
    type: 'info',
    priority: 'high',
    audience: 'all',
    status: 'published',
    publish_date: '2024-03-18T09:00',
    created_at: '2024-03-17T15:30',
    created_by: 'Admin'
  },
  {
    id: 2,
    title: 'New Restaurants Added',
    content: 'We welcome 5 new restaurants to our platform! Check them out now.',
    type: 'success',
    priority: 'medium',
    audience: 'all',
    status: 'published',
    publish_date: '2024-03-15T10:00',
    created_at: '2024-03-14T11:20',
    created_by: 'Admin'
  },
  {
    id: 3,
    title: 'Delivery Partner Guidelines Update',
    content: 'Important updates to delivery partner guidelines effective April 1st.',
    type: 'warning',
    priority: 'high',
    audience: 'delivery',
    status: 'draft',
    publish_date: null,
    created_at: '2024-03-16T13:45',
    created_by: 'Admin'
  },
  {
    id: 4,
    title: 'Eid Special Offers Coming Soon',
    content: 'Get ready for exclusive Eid offers starting next week.',
    type: 'info',
    priority: 'low',
    audience: 'all',
    status: 'scheduled',
    publish_date: '2024-04-01T00:00',
    created_at: '2024-03-17T09:15',
    created_by: 'Admin'
  }
];

// Mock data for banners
const mockBanners = [
  {
    id: 1,
    title: 'Summer Special',
    subtitle: 'Get 20% off on all orders',
    image: null,
    link: '/promotions/summer',
    position: 'home_top',
    status: 'active',
    start_date: '2024-03-01T00:00',
    end_date: '2024-04-30T23:59',
    clicks: 1245,
    created_at: '2024-02-28T10:00'
  },
  {
    id: 2,
    title: 'New Restaurant Alert',
    subtitle: '5 new restaurants joined this week',
    image: null,
    link: '/restaurants/new',
    position: 'home_middle',
    status: 'active',
    start_date: '2024-03-15T00:00',
    end_date: '2024-03-30T23:59',
    clicks: 567,
    created_at: '2024-03-14T14:30'
  },
  {
    id: 3,
    title: 'Free Delivery Weekend',
    subtitle: 'Free delivery on all orders',
    image: null,
    link: '/promotions/free-delivery',
    position: 'app_popup',
    status: 'scheduled',
    start_date: '2024-03-22T00:00',
    end_date: '2024-03-24T23:59',
    clicks: 0,
    created_at: '2024-03-16T11:15'
  }
];

export default function ContentPage() {
  const [tabValue, setTabValue] = useState(0);
  
  // Promotions state
  const [promotions, setPromotions] = useState([]);
  const [filteredPromotions, setFilteredPromotions] = useState([]);
  
  // Announcements state
  const [announcements, setAnnouncements] = useState([]);
  const [filteredAnnouncements, setFilteredAnnouncements] = useState([]);
  
  // Banners state
  const [banners, setBanners] = useState([]);
  const [filteredBanners, setFilteredBanners] = useState([]);
  
  // Loading state
  const [loading, setLoading] = useState(true);
  
  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [promoFilter, setPromoFilter] = useState('all');
  const [announcementFilter, setAnnouncementFilter] = useState('all');
  const [bannerFilter, setBannerFilter] = useState('all');
  
  // Dialog states
  const [openPromoDialog, setOpenPromoDialog] = useState(false);
  const [openAnnouncementDialog, setOpenAnnouncementDialog] = useState(false);
  const [openBannerDialog, setOpenBannerDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  
  // Snackbar state
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  
  // Table pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  
  // Action menu
  const [anchorEl, setAnchorEl] = useState(null);
  const [actionItem, setActionItem] = useState(null);
  const [actionType, setActionType] = useState('');

  // Load data
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setPromotions(mockPromotions);
      setFilteredPromotions(mockPromotions);
      setAnnouncements(mockAnnouncements);
      setFilteredAnnouncements(mockAnnouncements);
      setBanners(mockBanners);
      setFilteredBanners(mockBanners);
      setLoading(false);
    }, 1000);
  }, []);

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setSearchTerm('');
    setPromoFilter('all');
    setAnnouncementFilter('all');
    setBannerFilter('all');
    setPage(0);
  };

  // Search and filter functions
  useEffect(() => {
    // Filter promotions
    if (tabValue === 0) {
      let filtered = promotions.filter(promo => 
        promo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        promo.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        promo.code.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      if (promoFilter !== 'all') {
        filtered = filtered.filter(promo => promo.status === promoFilter);
      }
      
      setFilteredPromotions(filtered);
    }
    
    // Filter announcements
    if (tabValue === 1) {
      let filtered = announcements.filter(ann => 
        ann.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ann.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      if (announcementFilter !== 'all') {
        filtered = filtered.filter(ann => ann.status === announcementFilter);
      }
      
      setFilteredAnnouncements(filtered);
    }
    
    // Filter banners
    if (tabValue === 2) {
      let filtered = banners.filter(banner => 
        banner.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        banner.subtitle.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      if (bannerFilter !== 'all') {
        filtered = filtered.filter(banner => banner.status === bannerFilter);
      }
      
      setFilteredBanners(filtered);
    }
  }, [searchTerm, promoFilter, announcementFilter, bannerFilter, promotions, announcements, banners, tabValue]);

  // Handlers
  const handleMenuOpen = (event, item, type) => {
    setAnchorEl(event.currentTarget);
    setActionItem(item);
    setActionType(type);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setActionItem(null);
    setActionType('');
  };

  const handleEdit = () => {
    setSelectedItem(actionItem);
    if (actionType === 'promotion') setOpenPromoDialog(true);
    if (actionType === 'announcement') setOpenAnnouncementDialog(true);
    if (actionType === 'banner') setOpenBannerDialog(true);
    handleMenuClose();
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete this ${actionType}?`)) {
      if (actionType === 'promotion') {
        setPromotions(promotions.filter(p => p.id !== actionItem.id));
      } else if (actionType === 'announcement') {
        setAnnouncements(announcements.filter(a => a.id !== actionItem.id));
      } else if (actionType === 'banner') {
        setBanners(banners.filter(b => b.id !== actionItem.id));
      }
      
      setSnackbar({
        open: true,
        message: `${actionType.charAt(0).toUpperCase() + actionType.slice(1)} deleted successfully`,
        severity: 'success'
      });
    }
    handleMenuClose();
  };

  const handleStatusChange = (item, type, newStatus) => {
    if (type === 'promotion') {
      setPromotions(promotions.map(p => 
        p.id === item.id ? { ...p, status: newStatus } : p
      ));
    } else if (type === 'announcement') {
      setAnnouncements(announcements.map(a => 
        a.id === item.id ? { ...a, status: newStatus } : a
      ));
    } else if (type === 'banner') {
      setBanners(banners.map(b => 
        b.id === item.id ? { ...b, status: newStatus } : b
      ));
    }
    
    setSnackbar({
      open: true,
      message: `Status updated to ${newStatus}`,
      severity: 'success'
    });
    handleMenuClose();
  };

  const handleAdd = () => {
    setSelectedItem(null);
    if (tabValue === 0) setOpenPromoDialog(true);
    if (tabValue === 1) setOpenAnnouncementDialog(true);
    if (tabValue === 2) setOpenBannerDialog(true);
  };

  // Helper functions
  const getStatusChip = (status) => {
    const statusConfig = {
      active: { color: 'success', label: 'Active' },
      inactive: { color: 'error', label: 'Inactive' },
      published: { color: 'success', label: 'Published' },
      draft: { color: 'default', label: 'Draft' },
      scheduled: { color: 'info', label: 'Scheduled' },
      expired: { color: 'warning', label: 'Expired' }
    };
    
    const config = statusConfig[status] || { color: 'default', label: status };
    
    return (
      <Chip
        label={config.label}
        size="small"
        color={config.color}
      />
    );
  };

  const getPromotionTypeIcon = (type) => {
    switch(type) {
      case 'discount':
      case 'flash_sale':
        return <DiscountIcon fontSize="small" />;
      case 'bogo':
        return <CampaignIcon fontSize="small" />;
      case 'delivery':
        return <DeliveryIcon fontSize="small" />;
      case 'gift':
        return <CardGiftcardIcon fontSize="small" />;
      default:
        return <CampaignIcon fontSize="small" />;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not set';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return 'Not set';
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <LinearProgress sx={{ width: 300 }} />
      </Box>
    );
  }

  // Pagination
  const getPaginatedData = () => {
    if (tabValue === 0) {
      return filteredPromotions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    } else if (tabValue === 1) {
      return filteredAnnouncements.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    } else {
      return filteredBanners.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    }
  };

  const getTotalCount = () => {
    if (tabValue === 0) return filteredPromotions.length;
    if (tabValue === 1) return filteredAnnouncements.length;
    return filteredBanners.length;
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            📢 Content Management
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage promotions, announcements, and banners across the platform
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAdd}
          size="large"
        >
          Create New
        </Button>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <MainCard>
            <Stack spacing={1}>
              <Typography color="text.secondary" variant="body2">Active Promotions</Typography>
              <Typography variant="h4" color="success.main">
                {promotions.filter(p => p.status === 'active').length}
              </Typography>
            </Stack>
          </MainCard>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MainCard>
            <Stack spacing={1}>
              <Typography color="text.secondary" variant="body2">Scheduled</Typography>
              <Typography variant="h4" color="info.main">
                {promotions.filter(p => p.status === 'scheduled').length +
                  announcements.filter(a => a.status === 'scheduled').length +
                  banners.filter(b => b.status === 'scheduled').length}
              </Typography>
            </Stack>
          </MainCard>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MainCard>
            <Stack spacing={1}>
              <Typography color="text.secondary" variant="body2">Drafts</Typography>
              <Typography variant="h4" color="warning.main">
                {announcements.filter(a => a.status === 'draft').length}
              </Typography>
            </Stack>
          </MainCard>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MainCard>
            <Stack spacing={1}>
              <Typography color="text.secondary" variant="body2">Total Campaigns</Typography>
              <Typography variant="h4">
                {promotions.length + announcements.length + banners.length}
              </Typography>
            </Stack>
          </MainCard>
        </Grid>
      </Grid>

      {/* Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab icon={<DiscountIcon />} label="Promotions" iconPosition="start" />
          <Tab icon={<AnnouncementIcon />} label="Announcements" iconPosition="start" />
          <Tab icon={<ImageIcon />} label="Banners" iconPosition="start" />
        </Tabs>
      </Paper>

      {/* Search and Filters */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              size="small"
              placeholder={
                tabValue === 0 ? "Search promotions by title, code..." :
                tabValue === 1 ? "Search announcements by title, content..." :
                "Search banners by title, subtitle..."
              }
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Status Filter</InputLabel>
              <Select
                value={
                  tabValue === 0 ? promoFilter :
                  tabValue === 1 ? announcementFilter :
                  bannerFilter
                }
                label="Status Filter"
                onChange={(e) => {
                  if (tabValue === 0) setPromoFilter(e.target.value);
                  if (tabValue === 1) setAnnouncementFilter(e.target.value);
                  if (tabValue === 2) setBannerFilter(e.target.value);
                }}
              >
                <MenuItem value="all">All Status</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
                <MenuItem value="published">Published</MenuItem>
                <MenuItem value="draft">Draft</MenuItem>
                <MenuItem value="scheduled">Scheduled</MenuItem>
                <MenuItem value="expired">Expired</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={() => {
                setSearchTerm('');
                setPromoFilter('all');
                setAnnouncementFilter('all');
                setBannerFilter('all');
              }}
            >
              Reset Filters
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Content Tables */}
      <MainCard content={false}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {/* Promotions Tab */}
                {tabValue === 0 && (
                  <>
                    <TableCell>Promotion</TableCell>
                    <TableCell>Code</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Discount</TableCell>
                    <TableCell>Valid Period</TableCell>
                    <TableCell>Usage</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </>
                )}
                
                {/* Announcements Tab */}
                {tabValue === 1 && (
                  <>
                    <TableCell>Title</TableCell>
                    <TableCell>Content</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Priority</TableCell>
                    <TableCell>Audience</TableCell>
                    <TableCell>Publish Date</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </>
                )}
                
                {/* Banners Tab */}
                {tabValue === 2 && (
                  <>
                    <TableCell>Banner</TableCell>
                    <TableCell>Position</TableCell>
                    <TableCell>Link</TableCell>
                    <TableCell>Valid Period</TableCell>
                    <TableCell>Clicks</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {getPaginatedData().map((item) => (
                <TableRow key={item.id} hover>
                  {/* Promotions Row */}
                  {tabValue === 0 && (
                    <>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar sx={{ bgcolor: 'primary.lighter', color: 'primary.main' }}>
                            {getPromotionTypeIcon(item.type)}
                          </Avatar>
                          <Box>
                            <Typography variant="subtitle2">{item.title}</Typography>
                            <Typography variant="caption" color="text.secondary">
                              {item.description.substring(0, 50)}...
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={item.code}
                          size="small"
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>
                        <Typography textTransform="capitalize">
                          {item.type.replace('_', ' ')}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {item.discount_type === 'percentage' && `${item.discount_value}%`}
                        {item.discount_type === 'free_delivery' && 'Free Delivery'}
                        {item.discount_type === 'bogo' && 'Buy 1 Get 1'}
                        {item.discount_type === 'free_item' && 'Free Item'}
                      </TableCell>
                      <TableCell>
                        <Tooltip title={`${formatDateTime(item.start_date)} - ${formatDateTime(item.end_date)}`}>
                          <Typography variant="caption">
                            {formatDate(item.start_date)} - {formatDate(item.end_date)}
                          </Typography>
                        </Tooltip>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {item.used_count}/{item.usage_limit}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {getStatusChip(item.status)}
                      </TableCell>
                    </>
                  )}
                  
                  {/* Announcements Row */}
                  {tabValue === 1 && (
                    <>
                      <TableCell>
                        <Typography variant="subtitle2">{item.title}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="caption">
                          {item.content.substring(0, 60)}...
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={item.type}
                          size="small"
                          color={
                            item.type === 'info' ? 'info' :
                            item.type === 'success' ? 'success' :
                            item.type === 'warning' ? 'warning' : 'default'
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={item.priority}
                          size="small"
                          color={
                            item.priority === 'high' ? 'error' :
                            item.priority === 'medium' ? 'warning' : 'info'
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <Typography textTransform="capitalize">
                          {item.audience}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {item.publish_date ? formatDate(item.publish_date) : 'Not scheduled'}
                      </TableCell>
                      <TableCell>
                        {getStatusChip(item.status)}
                      </TableCell>
                    </>
                  )}
                  
                  {/* Banners Row */}
                  {tabValue === 2 && (
                    <>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar
                            variant="rounded"
                            sx={{
                              width: 50,
                              height: 40,
                              bgcolor: 'grey.200',
                              color: 'text.secondary'
                            }}
                          >
                            <ImageIcon />
                          </Avatar>
                          <Box>
                            <Typography variant="subtitle2">{item.title}</Typography>
                            <Typography variant="caption" color="text.secondary">
                              {item.subtitle}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography textTransform="capitalize">
                          {item.position.replace('_', ' ')}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={item.link}
                          size="small"
                          icon={<LinkIcon />}
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="caption">
                          {formatDate(item.start_date)} - {formatDate(item.end_date)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {item.clicks.toLocaleString()}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {getStatusChip(item.status)}
                      </TableCell>
                    </>
                  )}
                  
                  <TableCell align="right">
                    <IconButton
                      size="small"
                      onClick={(e) => handleMenuOpen(
                        e,
                        item,
                        tabValue === 0 ? 'promotion' :
                        tabValue === 1 ? 'announcement' : 'banner'
                      )}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={getTotalCount()}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
        />
      </MainCard>

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEdit}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          Edit
        </MenuItem>
        <MenuItem onClick={() => handleStatusChange(actionItem, actionType, 'active')}>
          <ListItemIcon>
            <CheckCircleIcon fontSize="small" color="success" />
          </ListItemIcon>
          Set Active
        </MenuItem>
        <MenuItem onClick={() => handleStatusChange(actionItem, actionType, 'inactive')}>
          <ListItemIcon>
            <BlockIcon fontSize="small" color="error" />
          </ListItemIcon>
          Deactivate
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" color="error" />
          </ListItemIcon>
          Delete
        </MenuItem>
      </Menu>

      {/* Add/Edit Promotion Dialog */}
      <Dialog open={openPromoDialog} onClose={() => setOpenPromoDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Typography variant="h5">
            {selectedItem ? 'Edit Promotion' : 'Create New Promotion'}
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Promotion Title"
                defaultValue={selectedItem?.title || ''}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={2}
                defaultValue={selectedItem?.description || ''}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Promotion Type</InputLabel>
                <Select
                  defaultValue={selectedItem?.type || 'discount'}
                  label="Promotion Type"
                >
                  <MenuItem value="discount">Percentage Discount</MenuItem>
                  <MenuItem value="flash_sale">Flash Sale</MenuItem>
                  <MenuItem value="bogo">Buy One Get One</MenuItem>
                  <MenuItem value="delivery">Free Delivery</MenuItem>
                  <MenuItem value="gift">Free Gift</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Promo Code"
                defaultValue={selectedItem?.code || ''}
                required
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Discount Value"
                type="number"
                defaultValue={selectedItem?.discount_value || ''}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Minimum Order"
                type="number"
                defaultValue={selectedItem?.min_order || ''}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Max Discount"
                type="number"
                defaultValue={selectedItem?.max_discount || ''}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Start Date"
                type="datetime-local"
                defaultValue={selectedItem?.start_date || ''}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="End Date"
                type="datetime-local"
                defaultValue={selectedItem?.end_date || ''}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Usage Limit"
                type="number"
                defaultValue={selectedItem?.usage_limit || ''}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  defaultValue={selectedItem?.status || 'draft'}
                  label="Status"
                >
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                  <MenuItem value="scheduled">Scheduled</MenuItem>
                  <MenuItem value="draft">Draft</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPromoDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={() => {
              setOpenPromoDialog(false);
              setSnackbar({
                open: true,
                message: selectedItem ? 'Promotion updated successfully' : 'Promotion created successfully',
                severity: 'success'
              });
            }}
          >
            {selectedItem ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add/Edit Announcement Dialog */}
      <Dialog open={openAnnouncementDialog} onClose={() => setOpenAnnouncementDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Typography variant="h5">
            {selectedItem ? 'Edit Announcement' : 'Create New Announcement'}
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Announcement Title"
                defaultValue={selectedItem?.title || ''}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Content"
                multiline
                rows={4}
                defaultValue={selectedItem?.content || ''}
                required
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select
                  defaultValue={selectedItem?.type || 'info'}
                  label="Type"
                >
                  <MenuItem value="info">Information</MenuItem>
                  <MenuItem value="success">Success</MenuItem>
                  <MenuItem value="warning">Warning</MenuItem>
                  <MenuItem value="error">Error</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Priority</InputLabel>
                <Select
                  defaultValue={selectedItem?.priority || 'medium'}
                  label="Priority"
                >
                  <MenuItem value="high">High</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="low">Low</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Audience</InputLabel>
                <Select
                  defaultValue={selectedItem?.audience || 'all'}
                  label="Audience"
                >
                  <MenuItem value="all">All Users</MenuItem>
                  <MenuItem value="customers">Customers Only</MenuItem>
                  <MenuItem value="restaurants">Restaurants Only</MenuItem>
                  <MenuItem value="delivery">Delivery Partners</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Publish Date"
                type="datetime-local"
                defaultValue={selectedItem?.publish_date || ''}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  defaultValue={selectedItem?.status || 'draft'}
                  label="Status"
                >
                  <MenuItem value="published">Published</MenuItem>
                  <MenuItem value="draft">Draft</MenuItem>
                  <MenuItem value="scheduled">Scheduled</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAnnouncementDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={() => {
              setOpenAnnouncementDialog(false);
              setSnackbar({
                open: true,
                message: selectedItem ? 'Announcement updated successfully' : 'Announcement created successfully',
                severity: 'success'
              });
            }}
          >
            {selectedItem ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add/Edit Banner Dialog */}
      <Dialog open={openBannerDialog} onClose={() => setOpenBannerDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Typography variant="h5">
            {selectedItem ? 'Edit Banner' : 'Create New Banner'}
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box sx={{ border: '2px dashed #ccc', borderRadius: 2, p: 3, textAlign: 'center' }}>
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="banner-image-upload"
                  type="file"
                />
                <label htmlFor="banner-image-upload">
                  <Button
                    variant="outlined"
                    component="span"
                    startIcon={<UploadIcon />}
                  >
                    Upload Banner Image
                  </Button>
                </label>
                <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                  Recommended size: 1200x400px
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Banner Title"
                defaultValue={selectedItem?.title || ''}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Subtitle"
                defaultValue={selectedItem?.subtitle || ''}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Link URL"
                defaultValue={selectedItem?.link || ''}
                placeholder="/promotions/summer"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Position</InputLabel>
                <Select
                  defaultValue={selectedItem?.position || 'home_top'}
                  label="Position"
                >
                  <MenuItem value="home_top">Home Page - Top</MenuItem>
                  <MenuItem value="home_middle">Home Page - Middle</MenuItem>
                  <MenuItem value="home_bottom">Home Page - Bottom</MenuItem>
                  <MenuItem value="app_popup">App Popup</MenuItem>
                  <MenuItem value="restaurant_page">Restaurant Page</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  defaultValue={selectedItem?.status || 'draft'}
                  label="Status"
                >
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                  <MenuItem value="scheduled">Scheduled</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Start Date"
                type="datetime-local"
                defaultValue={selectedItem?.start_date || ''}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="End Date"
                type="datetime-local"
                defaultValue={selectedItem?.end_date || ''}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenBannerDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={() => {
              setOpenBannerDialog(false);
              setSnackbar({
                open: true,
                message: selectedItem ? 'Banner updated successfully' : 'Banner created successfully',
                severity: 'success'
              });
            }}
          >
            {selectedItem ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}