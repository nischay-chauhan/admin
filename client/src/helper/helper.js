import axios from 'axios';
import { toast } from 'react-hot-toast';

export const API_BASE_URL = 'http://localhost:3001/api';

export const login = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, userData);
    toast.success('Login successful');
    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    toast.error('Login failed'); 
    throw new Error('Login failed'); 
  }
};

export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, userData);
    toast.success('Registration successful');
    return response.data;
  } catch (error) {
    console.error('Registration failed:', error);
    toast.error('Registration failed'); 
    throw new Error('Registration failed');
  }
};

export const getAdminProfile = async (token) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/admin/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching admin profile:', error);
      throw new Error('Error fetching admin profile');
    }
  };
  
export const getUserProfile = async (token) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw new Error('Error fetching user profile');
    }
  };

export const updateUserProfile = async (userData, token) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/update-profile`, userData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Profile updated successfully');
      return response.data;
    } catch (error) {
      console.error('Error updating user profile:', error);
      toast.error('Error updating user profile'); 
      throw new Error('Error updating user profile');
    }
  };

export const getAllUsers = async (token) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/admin/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching all users:', error);
      throw new Error('Error fetching all users');
    }
  };

  export const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${API_BASE_URL}/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/';  
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };