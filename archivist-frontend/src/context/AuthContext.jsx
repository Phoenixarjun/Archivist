import React, { createContext, useState, useContext, useEffect } from 'react';
import apiClient from '../utils/apiClient';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: localStorage.getItem('token') || null,
    isAuthenticated: !!localStorage.getItem('token'),
    loading: true,
    user: null,
  });

  const loadUser = async () => {
    if (localStorage.token) {
      try {
        const res = await apiClient.get('/auth/me'); 
        setAuthState({
          token: localStorage.getItem('token'),
          isAuthenticated: true,
          loading: false,
          user: res.data,
        });
      } catch (err) {
        console.error(err);
        logout();
      }
    } else {
      setAuthState({ token: null, isAuthenticated: false, loading: false, user: null });
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const login = async (email, password) => {
    const body = { username: email, password };
    try {
      const res = await apiClient.post('/auth/login', body);
      localStorage.setItem('token', res.data.accessToken);
      await loadUser();
      return res;
    } catch (err) {
      console.error(err.response.data);
      throw err;
    }
  };

  const register = async (userData) => {
    try {
      const res = await apiClient.post('/auth/register', userData);
      // Optionally log the user in directly after registration
      return res;
    } catch (err) {
      console.error(err.response.data);
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuthState({
      token: null,
      isAuthenticated: false,
      loading: false,
      user: null,
    });
  };

  const value = { ...authState, login, register, logout, loadUser };

  return <AuthContext.Provider value={value}>{!authState.loading && children}</AuthContext.Provider>;
};