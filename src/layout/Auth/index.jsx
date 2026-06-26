// src/layout/Auth/index.jsx
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import { AuthProvider } from '../../contexts/AuthContext';

export default function AuthLayout() {
  return (
    <AuthProvider>
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg,#1a1a2e 0%,#16213e 50%,#0f3460 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2,
        }}
      >
        <Outlet />
      </Box>
    </AuthProvider>
  );
}
