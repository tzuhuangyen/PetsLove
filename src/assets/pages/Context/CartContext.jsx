import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext.jsx';
import axios from 'axios';
import { backendUrl } from '../../../../config.js';

// Create cart context environment for shared cart functionality
// Used by product page's cart component and cart navbar component
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState(null);
  const [lastSyncTime, setLastSyncTime] = useState(null);
  const { authState } = useAuth();

  // Use localStorage to store favorites items
  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = localStorage.getItem('favorites');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  // Sync favorites to localStorage when they change
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Load cart items from localStorage on initial load
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCart);
    console.log('CartContext: Loaded cart from localStorage:', storedCart);
  }, []);

  // Fetch cart from server when user is authenticated
  useEffect(() => {
    const fetchCartFromServer = async () => {
      if (authState.isAuthenticated && authState.token) {
        try {
          console.log('CartContext: Fetching cart from server...');
          setIsUpdating(true);

          const response = await axios.get(
            `${backendUrl}/api/users/member/cart`,
            {
              headers: { Authorization: `Bearer ${authState.token}` },
              timeout: 10000, // Add timeout to prevent hanging requests
            }
          );

          if (
            response.status === 200 &&
            response.data.cart &&
            response.data.cart.items
          ) {
            const serverItems = response.data.cart.items.map((item) => ({
              ...item,
              _id: item._id || item.productId,
              productId: item.productId || item._id,
              quantity: item.quantity || 1,
              price: item.price || 0,
              productName: item.productName || 'Unknown Product',
            }));

            console.log('CartContext: Loaded cart from server:', serverItems);
            setCartItems(serverItems);
            localStorage.setItem('cartItems', JSON.stringify(serverItems));
            setLastSyncTime(new Date().toISOString());
          }
          setIsUpdating(false);
          setUpdateError(null);
        } catch (error) {
          setIsUpdating(false);
          setUpdateError(`Error loading cart: ${error.message}`);
          console.error(
            'CartContext: Error loading cart from server:',
            error.message
          );

          if (error.response && error.response.status === 404) {
            // No cart found on server, but that's okay
            console.log('CartContext: No cart found on server');
          }
        }
      }
    };

    fetchCartFromServer();
  }, [authState.isAuthenticated, authState.token]);

  // Update localStorage whenever cartItems changes
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    console.log('CartContext: Updated cartItems in localStorage:', cartItems);
  }, [cartItems]);

  // Function to update cart on server
  const updateCartOnServer = async (updatedCartItems) => {
    if (!authState.isAuthenticated || !authState.token) {
      console.log(
        "CartContext: Not authenticated, can't update cart on server"
      );
      return { success: false, error: 'Not authenticated' };
    }

    try {
      console.log('CartContext: Updating cart on server:', updatedCartItems);
      setIsUpdating(true);
      setUpdateError(null);

      const response = await axios.put(
        `${backendUrl}/api/users/member/cart`,
        { items: updatedCartItems },
        {
          headers: { Authorization: `Bearer ${authState.token}` },
          timeout: 10000,
        }
      );

      console.log(
        'CartContext: Server response for cart update:',
        response.data
      );
      setIsUpdating(false);
      setLastSyncTime(new Date().toISOString());

      if (response.data && response.data.success) {
        return { success: true };
      } else {
        const errorMsg =
          response.data?.message || 'Server returned unsuccessful response';
        setUpdateError(errorMsg);
        return { success: false, error: errorMsg };
      }
    } catch (error) {
      console.error('CartContext: Failed to update cart on server:', error);
      setIsUpdating(false);
      setUpdateError(error.message);
      return { success: false, error: error.message };
    }
  };

  // Function to add item to cart
  const addToCart = async (product, quantity = 1) => {
    if (!product) {
      console.error('CartContext: Cannot add undefined product to cart');
      return { success: false, error: 'Invalid product' };
    }

    console.log('CartContext: Adding to cart:', product, 'quantity:', quantity);

    // Ensure product has required fields
    const productToAdd = {
      ...product,
      _id: product._id || product.productId,
      productId: product.productId || product._id,
      quantity: quantity,
      price: product.price || 0,
      productName: product.productName || 'Unknown Product',
    };

    const existingItemIndex = cartItems.findIndex(
      (item) =>
        item._id === productToAdd._id || item.productId === productToAdd._id
    );

    let newCartItems;

    if (existingItemIndex >= 0) {
      // Update existing item
      newCartItems = cartItems.map((item, index) =>
        index === existingItemIndex
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      // Add new item
      newCartItems = [...cartItems, productToAdd];
    }

    // Update local state first for immediate UI feedback
    setCartItems(newCartItems);

    // Then update server if authenticated
    if (authState.isAuthenticated) {
      return await updateCartOnServer(newCartItems);
    }

    return { success: true };
  };

  // Function to update item quantity
  const updateCartItemQuantity = async (itemId, quantity) => {
    console.log(
      'CartContext: Updating quantity for item:',
      itemId,
      'to:',
      quantity
    );

    if (quantity < 1) quantity = 1;

    const updatedCartItems = cartItems.map((item) =>
      item._id === itemId || item.productId === itemId
        ? { ...item, quantity }
        : item
    );

    // Update local state first
    setCartItems(updatedCartItems);

    // Then update server if authenticated
    if (authState.isAuthenticated) {
      return await updateCartOnServer(updatedCartItems);
    }

    return { success: true };
  };

  // Function to remove item from cart
  const removeFromCart = async (itemId) => {
    console.log('CartContext: Removing item from cart:', itemId);

    try {
      // Update local state first for immediate UI feedback
      const updatedCartItems = cartItems.filter(
        (item) => item._id !== itemId && item.productId !== itemId
      );
      setCartItems(updatedCartItems);
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));

      // Then delete from server if authenticated
      if (authState.isAuthenticated && authState.token) {
        // Add debugging information
        console.log(`CartContext: Current itemId for deletion: ${itemId}`);
        console.log(`CartContext: Cart items before deletion:`, cartItems);

        // Find the item to delete to get more information
        const itemToDelete = cartItems.find(
          (item) => item._id === itemId || item.productId === itemId
        );

        console.log(`CartContext: Item to delete:`, itemToDelete);

        // Try both productId and _id for deletion
        const idToUse = itemToDelete?.productId || itemId;
        console.log(`CartContext: Using ID for deletion: ${idToUse}`);

        setIsUpdating(true);

        try {
          // First try with the DELETE endpoint
          console.log(
            `CartContext: Sending DELETE request to ${backendUrl}/api/users/member/cart/${idToUse}`
          );

          const response = await axios.delete(
            `${backendUrl}/api/users/member/cart/${idToUse}`,
            {
              headers: {
                Authorization: `Bearer ${authState.token}`,
                'Content-Type': 'application/json',
              },
              timeout: 10000,
            }
          );

          console.log(
            'CartContext: Server response for delete:',
            response.data
          );
          setIsUpdating(false);
          setLastSyncTime(new Date().toISOString());

          if (response.data && response.data.success) {
            return { success: true };
          } else {
            const errorMsg =
              response.data?.message || 'Server returned unsuccessful response';
            setUpdateError(errorMsg);
            console.error('CartContext: Delete error:', errorMsg);
            return { success: false, error: errorMsg };
          }
        } catch (deleteError) {
          console.error('CartContext: DELETE request failed:', deleteError);

          // If DELETE fails, fall back to PUT method to update the entire cart
          console.log('CartContext: Falling back to PUT method to update cart');

          try {
            const putResponse = await axios.put(
              `${backendUrl}/api/users/member/cart`,
              { items: updatedCartItems },
              {
                headers: {
                  Authorization: `Bearer ${authState.token}`,
                  'Content-Type': 'application/json',
                },
                timeout: 10000,
              }
            );

            console.log(
              'CartContext: Server response for PUT fallback:',
              putResponse.data
            );
            setIsUpdating(false);
            setLastSyncTime(new Date().toISOString());

            if (putResponse.data && putResponse.data.cart) {
              return { success: true };
            } else {
              throw new Error('PUT fallback also failed');
            }
          } catch (putError) {
            console.error('CartContext: PUT fallback also failed:', putError);
            throw putError;
          }
        }
      }

      return { success: true };
    } catch (error) {
      console.error('CartContext: Failed to remove item from cart:', error);
      console.error('CartContext: Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      setIsUpdating(false);
      setUpdateError(error.message);
      return { success: false, error: error.message };
    }
  };

  // Modify the verifyCartWithServer function to respect local deletions
  // Update verifyCartWithServer to handle deleted items correctly
  const verifyCartWithServer = async () => {
    if (!authState.isAuthenticated || !authState.token) {
      return { success: false, error: 'Not authenticated' };
    }

    try {
      console.log('CartContext: Verifying cart with server...');
      setIsUpdating(true);

      const response = await axios.get(`${backendUrl}/api/users/member/cart`, {
        headers: { Authorization: `Bearer ${authState.token}` },
        timeout: 10000,
      });

      const serverCartItems = response.data.cart?.items || [];
      console.log('CartContext: Server cart state:', serverCartItems);

      // Process server items to ensure consistent format
      const processedServerItems = serverCartItems.map((item) => ({
        ...item,
        _id: item._id || item.productId,
        productId: item.productId || item._id,
        quantity: item.quantity || 1,
        price: item.price || 0,
        productName: item.productName || 'Unknown Product',
      }));

      // Compare with local state - more comprehensive check
      const localItemIds = new Set(cartItems.map((item) => item._id));
      const serverItemIds = new Set(
        processedServerItems.map((item) => item._id)
      );

      // Check if there are items on the server that we've deleted locally
      const itemsToDelete = [...serverItemIds].filter(
        (id) => !localItemIds.has(id)
      );

      console.log('CartContext: Cart verification:', {
        itemsToDelete,
        localItems: cartItems.length,
        serverItems: processedServerItems.length,
      });

      // If we've deleted items locally that still exist on server,
      // delete them individually from the server
      if (itemsToDelete.length > 0) {
        console.log(
          'CartContext: Found items on server that were deleted locally'
        );

        for (const itemId of itemsToDelete) {
          console.log(`CartContext: Deleting item ${itemId} from server`);
          try {
            await axios.delete(
              `${backendUrl}/api/users/member/cart/${itemId}`,
              {
                headers: { Authorization: `Bearer ${authState.token}` },
                timeout: 10000,
              }
            );
          } catch (deleteError) {
            console.error(
              `CartContext: Error deleting item ${itemId}:`,
              deleteError
            );
          }
        }
      }

      setIsUpdating(false);
      setLastSyncTime(new Date().toISOString());

      return {
        success: true,
        itemsMatch: itemsToDelete.length === 0,
        serverItems: processedServerItems,
      };
    } catch (error) {
      console.error('CartContext: Failed to verify cart with server:', error);
      setIsUpdating(false);
      setUpdateError(error.message);
      return { success: false, error: error.message };
    }
  };
  // Modify the syncCartWithServer function to prioritize local state for deletions
  const syncCartWithServer = async (direction = 'both') => {
    if (!authState.isAuthenticated || !authState.token) {
      console.log(
        "CartContext: Not authenticated, can't sync cart with server"
      );
      return { success: false, error: 'Not authenticated' };
    }

    try {
      console.log(`CartContext: Syncing cart (${direction})...`);
      console.log(
        `CartContext: Current cart items before sync:`,
        JSON.stringify(cartItems)
      );
      setIsUpdating(true);

      // For push or both, prioritize pushing first to ensure deletions are applied
      if (direction === 'push' || direction === 'both') {
        // Push to server
        console.log(
          'CartContext: Pushing cart to server with items:',
          JSON.stringify(cartItems)
        );

        const requestPayload = { items: cartItems };
        console.log(
          'CartContext: Request payload for push:',
          JSON.stringify(requestPayload)
        );

        const pushResponse = await axios.put(
          `${backendUrl}/api/users/member/cart`,
          requestPayload,
          {
            headers: {
              Authorization: `Bearer ${authState.token}`,
              'Content-Type': 'application/json',
            },
            timeout: 10000,
          }
        );

        console.log(
          'CartContext: Server response for push:',
          pushResponse.data
        );
      }

      // Only pull from server if explicitly requested and not after a push
      // This prevents overwriting our local deletions
      if (
        direction === 'pull' ||
        (direction === 'both' && cartItems.length === 0)
      ) {
        // Pull from server
        console.log('CartContext: Pulling cart from server...');
        const response = await axios.get(
          `${backendUrl}/api/users/member/cart`,
          {
            headers: { Authorization: `Bearer ${authState.token}` },
            timeout: 10000,
          }
        );

        console.log('CartContext: Server response for pull:', response.data);

        if (response.data.cart?.items) {
          const serverItems = response.data.cart.items.map((item) => ({
            ...item,
            _id: item._id || item.productId,
            productId: item.productId || item._id,
            quantity: item.quantity || 1,
            price: item.price || 0,
            productName: item.productName || 'Unknown Product',
          }));

          setCartItems(serverItems);
          localStorage.setItem('cartItems', JSON.stringify(serverItems));
          console.log('CartContext: Pulled cart from server:', serverItems);
        }
      }

      setIsUpdating(false);
      setUpdateError(null);
      setLastSyncTime(new Date().toISOString());

      return { success: true };
    } catch (error) {
      console.error('CartContext: Failed to sync cart with server:', error);
      console.error('CartContext: Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      setIsUpdating(false);
      setUpdateError(error.message);
      return { success: false, error: error.message };
    }
  };
  // Function to clear cart
  const clearCart = async () => {
    console.log('CartContext: Clearing cart');
    try {
      setIsUpdating(true);

      if (authState.isAuthenticated) {
        // 如果已登錄，則清空伺服器上的購物車
        const token = localStorage.getItem('token');
        await axios.delete(`${backendUrl}/api/cart`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      // 清空本地購物車
      setCartItems([]);
      localStorage.setItem('cartItems', JSON.stringify([]));

      setIsUpdating(false);
      return { success: true };
    } catch (error) {
      console.error('Error clearing cart:', error);
      setUpdateError(`Failed to clear cart: ${error.message}`);
      setIsUpdating(false);
      return { success: false, error: error.message };
    }
  };

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
      value={{
        cartItems,
        setCartItems,
        favorites,
        toggleFavorite,
        addToCart,
        updateCartItemQuantity,
        removeFromCart,
        updateCartOnServer,
        verifyCartWithServer,
        syncCartWithServer,
        clearCart,
        isUpdating,
        updateError,
        lastSyncTime,
        token: authState.token,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
