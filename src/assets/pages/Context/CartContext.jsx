import React, { createContext, useState, useContext, useEffect } from 'react';
import { useLocalStorage } from '../useLocalStorage';
//建立購物車共用的環境
//product page's cart component
//cart navbar component
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  //use localstorage to store Favorites items
  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = localStorage.getItem('favorites');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  // use useEffect async favorites to localStorage
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (productId) => {
    setFavorites((prevFavorites) => {
      const isFavorite = prevFavorites.includes(productId);
      return isFavorite
        ? prevFavorites.filter((id) => id !== productId)
        : [...prevFavorites, productId];
    });
  };

  useEffect(() => {
    console.log('Updated cartItems:', cartItems);
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{ cartItems, setCartItems, favorites, toggleFavorite }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
