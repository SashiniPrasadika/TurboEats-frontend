// src/pages/dashboard/restaurants.jsx
import { useState, useEffect } from 'react';
import {
  Box, Typography, Card, CardContent, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Chip, Button, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField, Grid, IconButton, Switch, Skeleton, Alert, InputAdornment
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, Search as SearchIcon } from '@mui/icons-material';
import { getRestaurants, createRestaurant, updateRestaurant, deleteRestaurant } from '../../api/restaurants';

const EMPTY = { name: '', cuisine: '', description: '', address: '', phone: '', email: '', deliveryFee: 150, minOrder: 500, deliveryTime: '30-40 min', openingHours: '9:00 AM - 10:00 PM' };

export default function RestaurantsAdmin() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [dialog, setDialog] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [snack, setSnack] = useState('');

  useEffect(() => {
    getRestaurants().then(r => setRestaurants(r.data || [])).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const openCreate = () => { setForm(EMPTY); setEditing(null); setDialog(true); };
  const openEdit = (r) => { setForm(r); setEditing(r.id); setDialog(true); };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editing) {
        const res = await updateRestaurant(editing, form);
        setRestaurants(rs => rs.map(r => r.id === editing ? res.data : r));
        setSnack('Restaurant updated!');
      } else {
        const res = await createRestaurant(form);
        setRestaurants(rs => [...rs, res.data]);
        setSnack('Restaurant created!');
      }
      setDialog(false);
    } catch (err) { setSnack(err?.message || 'Error saving restaurant'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Deactivate this restaurant?')) return;
    try {
      await deleteRestaurant(id);
      setRestaurants(rs => rs.filter(r => r.id !== id));
      setSnack('Restaurant deactivated.');
    } catch { setSnack('Failed to delete.'); }
  };

  const handleToggle = async (r) => {
    try {
      const res = await updateRestaurant(r.id, { isOpen: !r.isOpen });
      setRestaurants(rs => rs.map(x => x.id === r.id ? { ...x, isOpen: !r.isOpen } : x));
    } catch {}
  };

  const filtered = restaurants.filter(r => !search || r.name.toLowerCase().includes(search.toLowerCase()) || r.cuisine.toLowerCase().includes(search.toLowerCase()));

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3, flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h4" fontWeight={800} mb={0.5}>Restaurants</Typography>
          <Typography color="text.secondary">Manage restaurant partners on the platform.</Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} onClick={openCreate}>Add Restaurant</Button>
      </Box>

      {snack && <Alert severity="success" onClose={() => setSnack('')} sx={{ mb: 2 }}>{snack}</Alert>}

      <TextField size="small" placeholder="Search restaurants…" value={search} onChange={e => setSearch(e.target.value)} sx={{ mb: 3, minWidth: 280 }}
        InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: 18 }} /></InputAdornment> }} />

      <Card>
        <TableContainer>
          <Table>
            <TableHead sx={{ bgcolor: 'grey.50' }}>
              <TableRow>
                {['Name', 'Cuisine', 'Rating', 'Delivery Fee', 'Open?', 'Actions'].map(h => (
                  <TableCell key={h} sx={{ fontWeight: 700, color: 'text.secondary', fontSize: 12 }}>{h.toUpperCase()}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? [...Array(5)].map((_, i) => (
                <TableRow key={i}>{[...Array(6)].map((_, j) => <TableCell key={j}><Skeleton /></TableCell>)}</TableRow>
              )) : filtered.map(r => (
                <TableRow key={r.id} hover>
                  <TableCell sx={{ fontWeight: 600 }}>{r.name}</TableCell>
                  <TableCell sx={{ color: 'text.secondary', fontSize: 13 }}>{r.cuisine}</TableCell>
                  <TableCell>⭐ {r.rating}</TableCell>
                  <TableCell>LKR {r.deliveryFee}</TableCell>
                  <TableCell>
                    <Switch checked={r.isOpen} onChange={() => handleToggle(r)} color="success" size="small" />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                      <IconButton size="small" onClick={() => openEdit(r)} color="primary"><EditIcon fontSize="small" /></IconButton>
                      <IconButton size="small" onClick={() => handleDelete(r.id)} color="error"><DeleteIcon fontSize="small" /></IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
              {!loading && filtered.length === 0 && (
                <TableRow><TableCell colSpan={6} align="center" sx={{ py: 5, color: 'text.secondary' }}>No restaurants found.</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Create/Edit dialog */}
      <Dialog open={dialog} onClose={() => setDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle fontWeight={700}>{editing ? 'Edit Restaurant' : 'Add New Restaurant'}</DialogTitle>
        <DialogContent sx={{ pt: '16px !important' }}>
          <Grid container spacing={2}>
            {[['name', 'Restaurant Name', 12], ['cuisine', 'Cuisine Type', 12], ['description', 'Description', 12], ['address', 'Address', 12], ['phone', 'Phone', 6], ['email', 'Email', 6], ['deliveryFee', 'Delivery Fee (LKR)', 6], ['minOrder', 'Min Order (LKR)', 6], ['deliveryTime', 'Delivery Time', 6], ['openingHours', 'Opening Hours', 6]].map(([field, label, xs]) => (
              <Grid item xs={xs} key={field}>
                <TextField label={label} value={form[field] || ''} onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
                  fullWidth size="small" multiline={field === 'description'} rows={field === 'description' ? 2 : 1} />
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave} disabled={saving}>{saving ? 'Saving…' : editing ? 'Update' : 'Create'}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
