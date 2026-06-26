// src/api/restaurants.js
import api from './apiClient';
export const getRestaurants = (params) => api.get('/restaurants', { params });
export const getRestaurant = (id) => api.get(`/restaurants/${id}`);
export const getMenuItems = (id) => api.get(`/restaurants/${id}/menu`);
export const createRestaurant = (data) => api.post('/restaurants', data);
export const updateRestaurant = (id, data) => api.put(`/restaurants/${id}`, data);
export const deleteRestaurant = (id) => api.delete(`/restaurants/${id}`);
export const addMenuItem = (restaurantId, data) => api.post(`/restaurants/${restaurantId}/menu`, data);
export const updateMenuItem = (restaurantId, itemId, data) => api.put(`/restaurants/${restaurantId}/menu/${itemId}`, data);
export const deleteMenuItem = (restaurantId, itemId) => api.delete(`/restaurants/${restaurantId}/menu/${itemId}`);
