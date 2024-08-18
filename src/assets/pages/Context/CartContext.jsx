import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { useLocalStorage } from '../useLocalStorage';
//建立購物車共用的環境
//product page's cart component
//cart navbar component
export const CartContext = createContext({});

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useLocalStorage('cartItems', []);

  // Effect to sync local storage cart with context after login
  // 每次 cartItems 改變時同步更新 LocalStorage
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <CartContext.Provider value={{ cartItems, setCartItems }}>
      {children}
    </CartContext.Provider>
  );
};
