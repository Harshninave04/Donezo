import { createContext, useContext, useState, useEffect } from 'react';
import { login as authLogin, signup as authSignup } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on initial load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Fetch user details using the token (optional)
      setUser({ token });
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (email, password) => {
    const data = await authLogin(email, password);
    localStorage.setItem('token', data.token);
    setUser({ token: data.token });
  };

  // Signup function
  const signup = async (username, email, password) => {
    const data = await authSignup(username, email, password);
    localStorage.setItem('token', data.token);
    setUser({ token: data.token });
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
