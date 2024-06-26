import React, { createContext, useState, useContext, useEffect } from 'react';

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: Boolean(localStorage.getItem('token')),
    user: null,
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Implement a way to validate the token and fetch user info
      // For now, just setting isAuthenticated to true
      setAuthState((prevState) => ({
        ...prevState,
        isAuthenticated: true,
      }));
    }
    console.log('Authentication state changed: ', authState.isAuthenticated);
  }, [authState.isAuthenticated]);

  const login = (user) => {
    localStorage.setItem('token', user.token);
    setAuthState({ isAuthenticated: true, user });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuthState({ isAuthenticated: false, user: null });
    window.location.href = '/user/login';
  };
  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
