// src/api/cart.js
import api from './apiClient';
export const getCart = () => api.get('/cart');
export const addToCart = (data) => api.post('/cart', data);
export const updateCartItem = (itemId, qty) => api.put(`/cart/${itemId}`, { qty });
export const clearCart = () => api.delete('/cart');

// src/api/favorites.js — bundled here for convenience
// Use named re-export pattern

// src/api/users.js
// export const ... (see userService.js)
