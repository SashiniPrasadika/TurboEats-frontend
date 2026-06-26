// src/api/users.js
import api from './apiClient';
export const getAllUsers = () => api.get('/users');
export const getDashboardStats = () => api.get('/users/dashboard-stats');
export const updateUser = (id, data) => api.put(`/users/${id}`, data);
export const toggleUserStatus = (id) => api.put(`/users/${id}/toggle-status`);
