import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const login = async (email, password) => {
try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
    return response.data;
} catch (error) {
    throw new Error(error.response?.data?.message || 'An error occurred during login');
}
};

export const signup = async (username, email, password) => {
  const response = await axios.post(`${API_BASE_URL}/auth/signup`, { username, email, password });
  return response.data;
};
