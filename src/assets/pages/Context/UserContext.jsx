import React, { useState, createContext, useContext } from 'react';
//建立共用的環境
export const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState(null);
  console.log('UserProvider value:', { username, setUsername });

  return (
    <UserContext.Provider value={{ username, setUsername }}>
      {children}
    </UserContext.Provider>
  );
};
