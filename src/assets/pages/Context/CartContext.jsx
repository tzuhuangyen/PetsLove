import React, { createContext, useContext, useEffect } from 'react';
import { useLocalStorage } from '../useLocalStorage';
//建立購物車共用的環境
//product page's cart component
//cart navbar component
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useLocalStorage('cartItems', []);
  // Effect to sync local storage cart with context after login
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cartItems') || '[]');
    setCartItems(storedCart);
  }, [setCartItems]);

  return (
    <CartContext.Provider value={{ cartItems, setCartItems }}>
      {children}
    </CartContext.Provider>
  );
};
// Custom hook to use the cart context
export const useCart = () => useContext(CartContext);
