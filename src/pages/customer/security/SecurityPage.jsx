// src/pages/customer/security/SecurityPage.jsx
import { useState } from 'react';
import { Box, Typography, Card, CardContent, TextField, Button, Alert, Snackbar, Divider, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff, Lock as LockIcon } from '@mui/icons-material';
import { changePassword } from '../../../api/auth';

export default function SecurityPage() {
  const [form, setForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [show, setShow] = useState({ cur: false, new: false, con: false });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [snack, setSnack] = useState('');

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    if (form.newPassword.length < 6) { setError('New password must be at least 6 characters.'); return; }
    if (form.newPassword !== form.confirmPassword) { setError('New passwords do not match.'); return; }
    setError(''); setLoading(true);
    try {
      await changePassword({ currentPassword: form.currentPassword, newPassword: form.newPassword });
      setSnack('Password changed successfully!');
      setForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) { setError(err?.message || 'Failed to change password.'); }
    finally { setLoading(false); }
  };

  const pwField = (name, label, showKey) => ({
    name, label, type: show[showKey] ? 'text' : 'password', value: form[name], onChange: handleChange,
    fullWidth: true, size: 'small',
    InputProps: { endAdornment: <InputAdornment position="end"><IconButton size="small" onClick={() => setShow(s => ({ ...s, [showKey]: !s[showKey] }))}>{show[showKey] ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}</IconButton></InputAdornment> },
  });

  return (
    <Box sx={{ maxWidth: 560, mx: 'auto', px: 3, py: 4 }}>
      <Typography variant="h4" fontWeight={800} mb={3}>Security</Typography>

      <Card>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5 }}>
            <LockIcon color="primary" />
            <Typography variant="h6" fontWeight={700}>Change Password</Typography>
          </Box>
          <Divider sx={{ mb: 3 }} />

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField {...pwField('currentPassword', 'Current Password', 'cur')} required />
            <TextField {...pwField('newPassword', 'New Password', 'new')} required helperText="At least 6 characters" />
            <TextField {...pwField('confirmPassword', 'Confirm New Password', 'con')} required />
            <Button type="submit" variant="contained" size="large" disabled={loading} sx={{ mt: 1, py: 1.3, fontWeight: 700 }}>
              {loading ? 'Updating…' : 'Update Password'}
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Snackbar open={Boolean(snack)} autoHideDuration={3000} onClose={() => setSnack('')} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert severity="success" variant="filled">{snack}</Alert>
      </Snackbar>
    </Box>
  );
}
