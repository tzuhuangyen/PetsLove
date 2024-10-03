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

  useEffect(() => {
    console.log('Updated cartItems:', cartItems);
  }, [cartItems]);
  // const toggleFavorite = (productId) => {
  //   const updatedFavorites = [...favorites];
  //   const index = updatedFavorites.indexOf(productId);

  //   if (index !== -1) {
  //     updatedFavorites.splice(index, 1);
  //   } else {
  //     updatedFavorites.push(productId);
  //   }

  //   setFavorites(updatedFavorites);
  //   localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  // };

  const toggleFavorite = (productId) => {
    setFavorites((prevFavorites) => {
      const isFavorite = prevFavorites.includes(productId);
      const updatedFavorites = isFavorite
        ? prevFavorites.filter((id) => id !== productId)
        : [...prevFavorites, productId];

      // 保存到 localStorage 由 useEffect 负责
      return updatedFavorites;
    });
  };
  return (
    <CartContext.Provider
      value={{ cartItems, setCartItems, favorites, toggleFavorite }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
