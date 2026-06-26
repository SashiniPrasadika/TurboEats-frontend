// src/pages/auth/Register.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Card, CardContent, Typography, TextField, Button, Alert, Grid } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', phone: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    if (form.password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    setError(''); setLoading(true);
    try {
      await register(form);
      navigate('/');
    } catch (err) {
      setError(err?.message || 'Registration failed.');
    } finally { setLoading(false); }
  };

  return (
    <Card sx={{ width: '100%', maxWidth: 460, borderRadius: 3, boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}>
      <CardContent sx={{ p: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography sx={{ fontSize: 40, mb: 1 }}>🍔</Typography>
          <Typography variant="h5" fontWeight={800}>Create your account</Typography>
          <Typography variant="body2" color="text.secondary">Join TurboEats and order in minutes</Typography>
        </Box>

        {error && <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>{error}</Alert>}

        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            <TextField name="firstName" label="First name" value={form.firstName} onChange={handleChange} required fullWidth size="small" />
            <TextField name="lastName" label="Last name" value={form.lastName} onChange={handleChange} required fullWidth size="small" />
          </Box>
          <TextField name="email" label="Email address" type="email" value={form.email} onChange={handleChange} required fullWidth size="small" />
          <TextField name="phone" label="Phone number" value={form.phone} onChange={handleChange} fullWidth size="small" placeholder="+94 77 123 4567" />
          <TextField name="password" label="Password" type="password" value={form.password} onChange={handleChange} required fullWidth size="small" helperText="At least 6 characters" />

          <Button type="submit" variant="contained" fullWidth size="large" disabled={loading}
            sx={{ mt: 0.5, py: 1.4, fontWeight: 700, fontSize: 15 }}>
            {loading ? 'Creating account…' : 'Create Account'}
          </Button>
        </Box>

        <Typography variant="body2" textAlign="center" sx={{ mt: 3, color: 'text.secondary' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#FF4B2B', fontWeight: 700 }}>Sign in</Link>
        </Typography>
      </CardContent>
    </Card>
  );
}
