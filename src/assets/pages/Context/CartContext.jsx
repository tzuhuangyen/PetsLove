import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocalStorage } from '../useLocalStorage';
//建立購物車共用的環境
//product page's cart component
//cart navbar component
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [localCart, setLocalCart] = useLocalStorage('LocalstorageCart', []);

  // const getLocalCart = localStorage.setItem(
  //   'updatedLocalstorageCart',
  //   JSON.stringify(cart)
  // );

  // useEffect(() => {
  //   setCart(getLocalCart);
  // }, []); // 仅在 setCart 函数发生变化时执行 useEffect

  // useEffect(() => {
  //   localStorage.setItem('updatedLocalstorageCart', JSON.stringify(cart));
  // }, [cart]);

  return (
    <CartContext.Provider value={{ localCart, setLocalCart }}>
      {children}
    </CartContext.Provider>
  );
};
// Custom hook to use the cart context
export const useCart = () => useContext(CartContext);
