// helpers/apiHelper.js
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
