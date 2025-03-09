import React, { useState, createContext, useContext } from 'react';
//建立共用的環境
export const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState({
    name: 'User',
    profilePicture: 'user.jpg',
  });

  return (
    <UserContext.Provider value={{ username, setUsername }}>
      {children}
    </UserContext.Provider>
  );
};
export function useUserContext() {
  return useContext(UserContext);
}
