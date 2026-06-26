// src/routes/LoginRoutes.jsx
import { lazy, Suspense } from 'react';
import AuthLayout from '../layout/Auth';
const LoginPage = lazy(() => import('../pages/auth/Login'));
const RegisterPage = lazy(() => import('../pages/auth/Register'));

export default {
  path: '/',
  element: <AuthLayout />,
  children: [
    { path: 'login', element: <Suspense fallback={null}><LoginPage /></Suspense> },
    { path: 'register', element: <Suspense fallback={null}><RegisterPage /></Suspense> },
  ],
};
