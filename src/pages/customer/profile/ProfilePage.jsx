// src/pages/customer/profile/ProfilePage.jsx
import { useState } from 'react';
import { Box, Typography, Card, CardContent, Avatar, Button, TextField, Grid, Divider, Alert, Snackbar } from '@mui/material';
import { Edit as EditIcon, Save as SaveIcon } from '@mui/icons-material';
import { useAuth } from '../../../contexts/AuthContext';

export default function ProfilePage() {
  const { user, updateUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ firstName: user?.firstName || '', lastName: user?.lastName || '', phone: user?.phone || '', address: user?.address || '' });
  const [saving, setSaving] = useState(false);
  const [snack, setSnack] = useState('');
  const [error, setError] = useState('');

  const handleSave = async () => {
    setSaving(true); setError('');
    try {
      await updateUser(form);
      setSnack('Profile updated successfully!');
      setEditing(false);
    } catch { setError('Failed to update profile.'); }
    finally { setSaving(false); }
  };

  const initials = `${user?.firstName?.[0] || ''}${user?.lastName?.[0] || ''}`;

  return (
    <Box sx={{ maxWidth: 700, mx: 'auto', px: 3, py: 4 }}>
      <Typography variant="h4" fontWeight={800} mb={3}>My Profile</Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 3 }}>
            <Avatar sx={{ width: 72, height: 72, background: 'linear-gradient(135deg,#FF4B2B,#FF416C)', fontSize: 24, fontWeight: 800 }}>{initials}</Avatar>
            <Box>
              <Typography variant="h5" fontWeight={700}>{user?.firstName} {user?.lastName}</Typography>
              <Typography color="text.secondary">{user?.email}</Typography>
              <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'capitalize' }}>Role: {user?.role}</Typography>
            </Box>
            <Box sx={{ ml: 'auto' }}>
              {!editing ? (
                <Button startIcon={<EditIcon />} variant="outlined" onClick={() => setEditing(true)}>Edit</Button>
              ) : (
                <Button startIcon={<SaveIcon />} variant="contained" onClick={handleSave} disabled={saving}>
                  {saving ? 'Saving…' : 'Save'}
                </Button>
              )}
            </Box>
          </Box>

          {/* Stats */}
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1px', bgcolor: 'divider', borderRadius: 2, overflow: 'hidden', mb: 3 }}>
            {[['14', 'Orders'], ['5', 'Saved'], ['LKR 28k', 'Total Spent']].map(([num, label]) => (
              <Box key={label} sx={{ bgcolor: 'background.paper', p: 2, textAlign: 'center' }}>
                <Typography fontWeight={800} fontSize={20} color="primary.main">{num}</Typography>
                <Typography variant="caption" color="text.secondary">{label}</Typography>
              </Box>
            ))}
          </Box>

          <Divider sx={{ mb: 3 }} />

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <Grid container spacing={2}>
            {[['firstName', 'First Name'], ['lastName', 'Last Name'], ['phone', 'Phone Number'], ['address', 'Delivery Address']].map(([field, label]) => (
              <Grid item xs={12} sm={field === 'address' ? 12 : 6} key={field}>
                <TextField label={label} value={form[field]} fullWidth size="small" disabled={!editing}
                  onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))} />
              </Grid>
            ))}
            <Grid item xs={12}>
              <TextField label="Email" value={user?.email || ''} fullWidth size="small" disabled helperText="Email cannot be changed" />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Snackbar open={Boolean(snack)} autoHideDuration={3000} onClose={() => setSnack('')} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert severity="success" variant="filled">{snack}</Alert>
      </Snackbar>
    </Box>
  );
}
