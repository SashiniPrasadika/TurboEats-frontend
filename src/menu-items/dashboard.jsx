import { 
  DashboardOutlined,
  UserOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  FileTextOutlined 
} from '@ant-design/icons';

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'Admin-group',
  title: 'Admin',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Admin Dashboard',
      type: 'item',
      url: '/dashboard/default',
      icon: DashboardOutlined,
      breadcrumbs: true
    },
    {
      id: 'users',
      title: 'Users Management',
      type: 'item',
      url: '/users',
      icon: UserOutlined,
      breadcrumbs: true
    },
    {
      id: 'restaurants',
      title: 'Restaurants Management',
      type: 'item',
      url: '/restaurants',
      icon: ShopOutlined,
      breadcrumbs: true
    },
    {
      id: 'orders',
      title: 'Orders Management',
      type: 'item',
      url: '/orders',
      icon: ShoppingCartOutlined,
      breadcrumbs: true
    },
    {
      id: 'content',
      title: 'Content Management',
      type: 'item',
      url: '/content',
      icon: FileTextOutlined,
      breadcrumbs: true
    }
  ]
};

export default dashboard;