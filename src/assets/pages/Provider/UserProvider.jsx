import React, { useState, createContext } from 'react';

const UserContext = createContext(null);

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  console.log('UserProvider value:', { user, setUser });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
export default UserProvider;
