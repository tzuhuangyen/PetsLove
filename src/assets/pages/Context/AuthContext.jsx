import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { backendUrl } from '../../../../config';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [authState, setAuthState] = useState({
    isAuthenticated: Boolean(localStorage.getItem('token')),
    token: localStorage.getItem('token') || null,
    username: localStorage.getItem('username') || null,
  });

  const login = async ({ username, password }) => {
    console.log('Login attempt with:', username, password);
    try {
      const response = await axios.post(`${backendUrl}/api/users/login`, {
        username,
        password,
      });
      console.log('Login response:', response.data);
      const { token, loggedInUsername } = response.data;
      console.log('loggedInUsername:', loggedInUsername);

      if (token) {
        localStorage.setItem('token', token);
        localStorage.setItem('username', loggedInUsername);
        // 更新 authState
        setAuthState({
          isAuthenticated: true,
          token,
          username: loggedInUsername, // 将用户名存储到 authState 中
        });

        console.log('Navigating to myProfile');
        navigate('/users/member/myProfile');
      } else {
        console.error('No token received from login response.');
      }
    } catch (error) {
      if (error.response) {
        console.error('Login error (response):', error.response.data);
      } else if (error.request) {
        console.error('Login error (request):', error.request);
      } else {
        console.error('Login error:', error.message);
      }
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');
    console.log('Stored username:', storedUsername);
    if (storedToken && storedUsername) {
      setAuthState({
        isAuthenticated: true,
        token: storedToken,
        username: storedUsername,
      });
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('Navigating to myProfile');
    setAuthState({ isAuthenticated: false, user: null, token: null });
    navigate('/users/login');
  };

  return (
    <AuthContext.Provider value={{ authState, setAuthState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
