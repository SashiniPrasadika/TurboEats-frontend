// src/routes/index.jsx
import { createBrowserRouter } from 'react-router-dom';
import MainRoutes from './MainRoutes';
import LoginRoutes from './LoginRoutes';

const router = createBrowserRouter([MainRoutes, LoginRoutes], {
  basename: '/',
});
export default router;
