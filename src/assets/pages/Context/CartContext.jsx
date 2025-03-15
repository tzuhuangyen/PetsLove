import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext.jsx';
import axios from 'axios';
import { backendUrl } from '../../../../config.js';

import { useLocalStorage } from '../useLocalStorage';
//建立購物車共用的環境
//product page's cart component
//cart navbar component
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { authState } = useAuth();

  //use localstorage to store Favorites items
  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = localStorage.getItem('favorites');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  // use useEffect async favorites to localStorage
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Load cart items from localStorage on initial load
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCart);
  }, []);

  // Fetch cart from server when user is authenticated
  useEffect(() => {
    const fetchCartFromServer = async () => {
      if (authState.isAuthenticated && authState.token) {
        try {
          const response = await axios.get(
            `${backendUrl}/api/users/member/cart`,
            {
              headers: { Authorization: `Bearer ${authState.token}` },
            }
          );

          if (
            response.status === 200 &&
            response.data.cart &&
            response.data.cart.items
          ) {
            console.log(
              'Loaded cart from server in CartContext:',
              response.data.cart.items
            );
            setCartItems(response.data.cart.items);
            localStorage.setItem(
              'cartItems',
              JSON.stringify(response.data.cart.items)
            );
          }
        } catch (error) {
          console.error(
            'Error loading cart from server in CartContext:',
            error.message
          );
          if (error.response && error.response.status === 404) {
            // No cart found on server, but that's okay
            console.log('No cart found on server in CartContext');
          }
        }
      }
    };

    fetchCartFromServer();
  }, [authState.isAuthenticated, authState.token]);

  // Update localStorage whenever cartItems changes
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    console.log('Updated cartItems in context:', cartItems);
  }, [cartItems]);

  const toggleFavorite = (productId) => {
    setFavorites((prevFavorites) => {
      const isFavorite = prevFavorites.includes(productId);
      return isFavorite
        ? prevFavorites.filter((id) => id !== productId)
        : [...prevFavorites, productId];
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
