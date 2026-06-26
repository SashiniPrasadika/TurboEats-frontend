// src/api/favorites.js
import api from './apiClient';
export const getFavorites = () => api.get('/favorites');
export const addFavorite = (restaurantId) => api.post('/favorites', { restaurantId });
export const removeFavorite = (restaurantId) => api.delete(`/favorites/${restaurantId}`);
