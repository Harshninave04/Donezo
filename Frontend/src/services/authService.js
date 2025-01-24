import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
    return response.data;
  } catch (err) {
    if (err.response && err.response.data.message) {
      throw new Error(err.response.data.message); // Throw backend error message
    } else {
      throw new Error('Something went wrong. Please try again.');
    }
  }
};

export const signup = async (username, email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signup`, {
      username,
      email,
      password,
    });
    return response.data;
  } catch (err) {
    if (err.response && err.response.data.message) {
      throw new Error(err.response.data.message); // Throw backend error message
    } else {
      throw new Error('Something went wrong. Please try again.');
    }
  }
};
