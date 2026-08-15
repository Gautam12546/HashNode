import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../api/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      loadUser();
    } else {
      setLoading(false);
    }
  }, []);

  const loadUser = async () => {
    try {
      const response = await api.get('/api/auth/me');
      setUser(response.data);
      setError(null);
    } catch (err) {
      localStorage.removeItem('token');
      setUser(null);
      setError(err.response?.data?.message || 'Failed to load user');
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    try {
      const response = await api.post('/api/auth/register', { name, email, password });
      const { token, ...userData } = response.data;
      localStorage.setItem('token', token);
      setUser(userData);
      setError(null);
      return { success: true };
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      return { success: false, error: err.response?.data?.message };
    }
  };

  const login = async (email, password) => {
    try {
      const response = await api.post('/api/auth/login', { email, password });
      const { token, ...userData } = response.data;
      localStorage.setItem('token', token);
      setUser(userData);
      setError(null);
      return { success: true };
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      return { success: false, error: err.response?.data?.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setError(null);
  };

  const updateUser = (updatedData) => {
    setUser((prev) => ({ ...prev, ...updatedData }));
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, register, login, logout, loadUser, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);