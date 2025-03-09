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
    token: localStorage.getItem('token'),
    username: '',
    userId: localStorage.getItem('userId'), // 初次渲染時從本地存儲讀取 userId
  });

  // 监听本地存储的 userId，并在 AuthProvider 初始化时同步 authState
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId && authState.userId !== storedUserId) {
      setAuthState((prev) => ({ ...prev, userId: storedUserId }));
    }
  }, []);

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
        userId,
      });
      console.log('Updated auth state:', authState);
      console.log('Token after login:', localStorage.getItem('token'));
      console.log('Token being used:', token);
      console.log('Navigating to myProfile');
      navigate('/users/member/myProfile');
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');

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
