// src/pages/auth/Login.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Card, CardContent, Typography, TextField, Button, Alert, Divider, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      const user = await login(form.email, form.password);
      navigate(user.role === 'admin' ? '/dashboard' : '/');
    } catch (err) {
      setError(err?.message || 'Login failed. Please check your credentials.');
    } finally { setLoading(false); }
  };

  const fillDemo = (role) => {
    if (role === 'admin') setForm({ email: 'admin@turboeats.lk', password: 'admin123' });
    else setForm({ email: 'sashini@student.kdu.ac.lk', password: 'password123' });
  };

  return (
    <Card sx={{ width: '100%', maxWidth: 420, borderRadius: 3, boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}>
      <CardContent sx={{ p: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography sx={{ fontSize: 40, mb: 1 }}>🍔</Typography>
          <Typography variant="h5" fontWeight={800} sx={{ mb: 0.5 }}>Welcome back!</Typography>
          <Typography variant="body2" color="text.secondary">Sign in to your TurboEats account</Typography>
        </Box>

        {error && <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>{error}</Alert>}

        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            name="email" label="Email address" type="email" value={form.email}
            onChange={handleChange} required fullWidth size="small"
          />
          <TextField
            name="password" label="Password" type={showPw ? 'text' : 'password'}
            value={form.password} onChange={handleChange} required fullWidth size="small"
            InputProps={{ endAdornment: (
              <InputAdornment position="end">
                <IconButton size="small" onClick={() => setShowPw(s => !s)}>
                  {showPw ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                </IconButton>
              </InputAdornment>
            )}}
          />

          <Button type="submit" variant="contained" fullWidth size="large" disabled={loading}
            sx={{ mt: 0.5, py: 1.4, fontWeight: 700, fontSize: 15 }}>
            {loading ? 'Signing in…' : 'Sign In'}
          </Button>
        </Box>

        <Divider sx={{ my: 2.5 }}>
          <Typography variant="caption" color="text.secondary">Quick demo</Typography>
        </Divider>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button variant="outlined" size="small" fullWidth onClick={() => fillDemo('admin')} sx={{ fontSize: 12 }}>
            Admin
          </Button>
          <Button variant="outlined" size="small" fullWidth onClick={() => fillDemo('customer')} sx={{ fontSize: 12 }}>
            Customer
          </Button>
        </Box>

        <Typography variant="body2" textAlign="center" sx={{ mt: 3, color: 'text.secondary' }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: '#FF4B2B', fontWeight: 700 }}>Sign up</Link>
        </Typography>
      </CardContent>
    </Card>
  );
}
