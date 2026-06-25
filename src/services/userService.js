// src/services/userService.js
import apiClient from '../api/apiClient';
import User from '../models/User';

class UserService {
  // Get all users (your backend returns at /user)
  async getAllUsers(params = {}) {
    try {
      const data = await apiClient.get('/user', { params });
      // Expect an array; return mapped User objects
      return Array.isArray(data) ? User.createUserList(data) : [];
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }

  async getUserById(id) {
    try {
      const data = await apiClient.get(`/user/${id}`);
      return User.fromAPI(data);
    } catch (error) {
      console.error(`Error fetching user ${id}:`, error);
      throw error;
    }
  }

  async createUser(userData) {
    try {
      const user = new User(userData);
      if (!user.isValid()) throw new Error('Invalid user data');
      const data = await apiClient.post('/user', user.toJSON());
      return User.fromAPI(data);
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  async updateUser(id, userData) {
    try {
      const data = await apiClient.put(`/user/${id}`, userData);
      return User.fromAPI(data);
    } catch (error) {
      console.error(`Error updating user ${id}:`, error);
      throw error;
    }
  }

  async deleteUser(id) {
    try {
      const data = await apiClient.delete(`/user/${id}`);
      return data;
    } catch (error) {
      console.error(`Error deleting user ${id}:`, error);
      throw error;
    }
  }

  async searchUsers(query, filters = {}) {
    try {
      const params = { q: query, ...filters };
      const data = await apiClient.get('/user/search', { params });
      return Array.isArray(data) ? User.createUserList(data) : [];
    } catch (error) {
      console.error('Error searching users:', error);
      throw error;
    }
  }
}

export default new UserService();
