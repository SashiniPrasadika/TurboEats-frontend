import { useState } from 'react';
import {
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Paper,
  TextField,
  InputAdornment,
  IconButton,
  Divider,
  Alert,
  Snackbar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Switch,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  Chip
} from '@mui/material';
import {
  Lock as LockIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  CheckCircle as CheckCircleIcon,
  Security as SecurityIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  VerifiedUser as VerifiedUserIcon
} from '@mui/icons-material';
import MainCard from 'components/MainCard';

export default function SecurityPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [changePasswordDialog, setChangePasswordDialog] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [phoneVerification] = useState({
    phone: '+94 77 123 4567',
    isVerified: true
  });

  const [emailVerification] = useState({
    email: 'john.doe@example.com',
    isVerified: true
  });

  const handleChangePassword = () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setSnackbar({
        open: true,
        message: 'New passwords do not match',
        severity: 'error'
      });
      return;
    }
    
    setChangePasswordDialog(false);
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setSnackbar({
      open: true,
      message: 'Password changed successfully',
      severity: 'success'
    });
  };

  const handleToggleTwoFactor = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
    setSnackbar({
      open: true,
      message: twoFactorEnabled ? 'Two-factor authentication disabled' : 'Two-factor authentication enabled',
      severity: 'success'
    });
  };

  const getPasswordStrength = (password) => {
    if (!password) return { score: 0, label: 'No password', color: 'default' };
    
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    
    const strengthMap = {
      0: { label: 'Very Weak', color: 'error' },
      1: { label: 'Weak', color: 'error' },
      2: { label: 'Fair', color: 'warning' },
      3: { label: 'Good', color: 'info' },
      4: { label: 'Strong', color: 'success' },
      5: { label: 'Very Strong', color: 'success' }
    };
    
    return strengthMap[score] || strengthMap[0];
  };

  const passwordStrength = getPasswordStrength(passwordForm.newPassword);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        🔒 Security Settings
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Manage your password and security preferences to keep your account safe
      </Typography>

      <Grid container spacing={3}>
        {/* Password Section */}
        <Grid item xs={12} md={6}>
          <MainCard title="Password">
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary" paragraph>
                Last changed: 30 days ago
              </Typography>
              <Button 
                variant="contained" 
                onClick={() => setChangePasswordDialog(true)}
                fullWidth
              >
                Change Password
              </Button>
            </Box>
            
            <Divider sx={{ my: 2 }} />
            
            <Typography variant="subtitle2" gutterBottom>
              Password Requirements
            </Typography>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Typography variant="caption" color="text.secondary">
                  ✓ At least 8 characters
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption" color="text.secondary">
                  ✓ One uppercase letter
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption" color="text.secondary">
                  ✓ One lowercase letter
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption" color="text.secondary">
                  ✓ One number
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption" color="text.secondary">
                  ✓ One special character
                </Typography>
              </Grid>
            </Grid>
          </MainCard>
        </Grid>

        {/* Two-Factor Authentication */}
        <Grid item xs={12} md={6}>
          <MainCard title="Two-Factor Authentication">
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Box>
                <Typography variant="body2">
                  Add an extra layer of security
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Protect your account with 2FA
                </Typography>
              </Box>
              <Switch
                checked={twoFactorEnabled}
                onChange={handleToggleTwoFactor}
                color="primary"
              />
            </Box>
            
            {twoFactorEnabled && (
              <Alert severity="success" sx={{ mt: 2 }}>
                Two-factor authentication is enabled. Your account is more secure.
              </Alert>
            )}
          </MainCard>
        </Grid>

        {/* Verification Methods */}
        <Grid item xs={12} md={6}>
          <MainCard title="Verification Methods">
            <List>
              <ListItem>
                <ListItemIcon>
                  <PhoneIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Phone Number"
                  secondary={phoneVerification.phone}
                />
                <Chip
                  label="Verified"
                  size="small"
                  color="success"
                  icon={<CheckCircleIcon />}
                />
              </ListItem>
              
              <Divider />
              
              <ListItem>
                <ListItemIcon>
                  <EmailIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Email Address"
                  secondary={emailVerification.email}
                />
                <Chip
                  label="Verified"
                  size="small"
                  color="success"
                  icon={<CheckCircleIcon />}
                />
              </ListItem>
            </List>
          </MainCard>
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12} md={6}>
          <MainCard title="Recent Security Activity">
            <List>
              <ListItem>
                <ListItemIcon>
                  <VerifiedUserIcon color="success" />
                </ListItemIcon>
                <ListItemText
                  primary="Successful login"
                  secondary="Chrome on Windows • 2 hours ago"
                />
              </ListItem>
              
              <ListItem>
                <ListItemIcon>
                  <LockIcon color="warning" />
                </ListItemIcon>
                <ListItemText
                  primary="Password changed"
                  secondary="30 days ago"
                />
              </ListItem>
              
              <ListItem>
                <ListItemIcon>
                  <PhoneIcon color="info" />
                </ListItemIcon>
                <ListItemText
                  primary="Phone number verified"
                  secondary="45 days ago"
                />
              </ListItem>
            </List>
          </MainCard>
        </Grid>
      </Grid>

      {/* Change Password Dialog */}
      <Dialog open={changePasswordDialog} onClose={() => setChangePasswordDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={3}>
            <TextField
              fullWidth
              label="Current Password"
              type={showPassword ? 'text' : 'password'}
              value={passwordForm.currentPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label="New Password"
              type={showNewPassword ? 'text' : 'password'}
              value={passwordForm.newPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowNewPassword(!showNewPassword)} edge="end">
                      {showNewPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {passwordForm.newPassword && (
              <Box>
                <Typography variant="body2" gutterBottom>
                  Password Strength: <Chip 
                    label={passwordStrength.label} 
                    size="small" 
                    color={passwordStrength.color}
                  />
                </Typography>
              </Box>
            )}

            <TextField
              fullWidth
              label="Confirm New Password"
              type={showConfirmPassword ? 'text' : 'password'}
              value={passwordForm.confirmPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                      {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {passwordForm.newPassword && passwordForm.confirmPassword && 
             passwordForm.newPassword !== passwordForm.confirmPassword && (
              <Alert severity="error">Passwords do not match</Alert>
            )}

            <Alert severity="info">
              After changing your password, you'll be logged out of all devices except this one.
            </Alert>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setChangePasswordDialog(false)}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={handleChangePassword}
            disabled={!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword}
          >
            Change Password
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}