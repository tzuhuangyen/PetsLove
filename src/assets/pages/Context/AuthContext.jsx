import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { backendUrl } from '../../../../config';
import { useCartManager } from '../component/useCartManager';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    token: null,
    username: '',
  });

  const login = async ({ username, password }) => {
    console.log('Login attempt with:', username, password);

    try {
      const response = await axios.post(`${backendUrl}/api/users/login`, {
        username,
        password,
      });
      console.log('Login response:', response.data);
      //generate token and store it in local storage
      const { token, loggedInUsername, userId } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('username', loggedInUsername);
      localStorage.setItem('userId', userId);

      // 更新 authState
      setAuthState({
        isAuthenticated: true,
        token,
        username: loggedInUsername, // 将用户名存储到 authState 中
      });
      console.log('Token after login:', localStorage.getItem('token'));
      console.log('Token being used:', token);
      console.log('Navigating to myProfile');
      navigate('/users/member/myProfile');
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

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setAuthState({ isAuthenticated: false, token: null, username: '' });
    navigate('/users/login');
  };

  return (
    <AuthContext.Provider value={{ authState, setAuthState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
