// src/routes/MainRoutes.jsx
import { lazy, Suspense } from 'react';
import DashboardLayout from '../layout/Dashboard';
import CustomerLayout from '../layout/Customer';

const DashboardDefault    = lazy(() => import('../pages/dashboard/default'));
const DashboardOrders     = lazy(() => import('../pages/dashboard/orders'));
const DashboardRestaurants = lazy(() => import('../pages/dashboard/restaurants'));
const DashboardUsers      = lazy(() => import('../pages/dashboard/users'));

const HomePage            = lazy(() => import('../pages/customer/home/HomePage'));
const RestaurantList      = lazy(() => import('../pages/customer/restaurants/RestaurantList'));
const RestaurantDetails   = lazy(() => import('../pages/customer/restaurants/RestaurantDetails'));
const CartPage            = lazy(() => import('../pages/customer/cart/CartPage'));
const OrdersPage          = lazy(() => import('../pages/customer/orders/OrdersPage'));
const FavoritesPage       = lazy(() => import('../pages/customer/favorites/FavoritesPage'));
const ProfilePage         = lazy(() => import('../pages/customer/profile/ProfilePage'));
const SecurityPage        = lazy(() => import('../pages/customer/security/SecurityPage'));

const S = ({ children }) => <Suspense fallback={null}>{children}</Suspense>;

export default {
  path: '/',
  children: [
    {
      path: 'dashboard',
      element: <DashboardLayout />,
      children: [
        { index: true,              element: <S><DashboardDefault /></S> },
        { path: 'orders',           element: <S><DashboardOrders /></S> },
        { path: 'restaurants',      element: <S><DashboardRestaurants /></S> },
        { path: 'users',            element: <S><DashboardUsers /></S> },
      ],
    },
    {
      path: '/',
      element: <CustomerLayout />,
      children: [
        { index: true,                    element: <S><HomePage /></S> },
        { path: 'restaurants',            element: <S><RestaurantList /></S> },
        { path: 'restaurants/:id',        element: <S><RestaurantDetails /></S> },
        { path: 'cart',                   element: <S><CartPage /></S> },
        { path: 'orders',                 element: <S><OrdersPage /></S> },
        { path: 'favorites',              element: <S><FavoritesPage /></S> },
        { path: 'profile',                element: <S><ProfilePage /></S> },
        { path: 'security',               element: <S><SecurityPage /></S> },
      ],
    },
  ],
};
