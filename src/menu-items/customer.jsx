import {
  Home as HomeIcon,
  Restaurant as RestaurantIcon,
  ShoppingCart as CartIcon,
  Receipt as OrdersIcon,
  Person as ProfileIcon,
  Favorite as FavoriteIcon,
  Security as SecurityIcon
} from '@mui/icons-material';

const customer = {
  id: 'customer-group',
  title: 'Customer Portal',
  type: 'group',
  children: [
    {
      id: 'home',
      title: 'Home',
      type: 'item',
      url: '/app/home',
      icon: HomeIcon,
      breadcrumbs: true
    },
    {
      id: 'restaurants',
      title: 'Restaurants',
      type: 'item',
      url: '/app/restaurants',
      icon: RestaurantIcon,
      breadcrumbs: true
    },
    {
      id: 'cart',
      title: 'Cart',
      type: 'item',
      url: '/app/cart',
      icon: CartIcon,
      breadcrumbs: true
    },
    {
      id: 'orders',
      title: 'My Orders',
      type: 'item',
      url: '/app/orders',
      icon: OrdersIcon,
      breadcrumbs: true
    },
    {
      id: 'favorites',
      title: 'Favorites',
      type: 'item',
      url: '/app/favorites',
      icon: FavoriteIcon,
      breadcrumbs: true
    },
    {
      id: 'profile',
      title: 'Profile',
      type: 'item',
      url: '/app/profile',
      icon: ProfileIcon,
      breadcrumbs: true
    },
    {
      id: 'security',
      title: 'Security',
      type: 'item',
      url: '/app/security',
      icon: SecurityIcon,
      breadcrumbs: true
    }
  ]
};

export default customer;