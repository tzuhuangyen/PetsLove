import React, { createContext, useState, useContext, useEffect } from 'react';

export const AuthContext = createContext();
export const userAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: Boolean(localStorage.getItem('token')),
    user: null,
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthState((prevState) => ({
        ...prevState,
        isAuthenticated: true,
      }));
    }
  }, []);

  const login = (user) => {
    localStorage.setItem('token', user.token);
    setAuthState({ isAuthenticated: true, user });
    window.location.href = '/PetsLove/users/member/myProfile';
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuthState({ isAuthenticated: false, user: null });
    // 清除 localStorage 中的所有數據
    localStorage.clear();
    window.location.href = '/PetsLove/users/login';
  };
  return (
    <AuthContext.Provider value={{ authState, setAuthState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
