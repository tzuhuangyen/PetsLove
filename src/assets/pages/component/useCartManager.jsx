import React, { useEffect } from 'react';
import { backendUrl } from '../../../../config.js';
import axios from 'axios';
import { useCart } from '../Context/CartContext.jsx';
import { useAuth } from '../Context/AuthContext.jsx';
import { showAddToCartAlert } from '../../../swal.js';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export const useCartManager = () => {
  const { cartItems = [], setCartItems } = useCart() || {
    cartItem: [],
    setCartItems: () => {},
  };
  const { authState } = useAuth();
  const token = authState.token;
  const navigate = useNavigate();

  useEffect(() => {
    if (!authState.userId) {
      console.log('Waiting for userId to be available...');
    }
  }, [authState.userId]);

  const handleAddToCart = async (item) => {
    console.log('Item to add:', item);
    if (!item._id || !item.productName || !item.price) {
      console.error('Invalid item data:', item);
      return;
    }
    // 检查用户是否已登录
    if (!authState.userId) {
      console.error('Cannot add item to cart: userId is not available.');
      navigate('/users/login'); // 如果未登入，引導用戶到登入頁面
      return; // 停止執行
    }
    try {
      console.log('User authenticated, adding to server cart...');
      const cartResponse = await addItemToServerCart(item);
      if (cartResponse && cartResponse.items) {
        console.log('Added to Server cart:', cartResponse);
        setCartItems(cartResponse.items); // 更新购物车项
        localStorage.setItem('cartItems', JSON.stringify(cartResponse.items));
        showAddToCartAlert(item.productName);
      } else {
        console.log('No response from server cart'); // 如果 response 為 null
      }
    } catch (error) {
      console.error('Error adding item to server cart:', error.message);
    }
  };

  const addItemToServerCart = async (item) => {
    if (!token || !item._id || !item.productName || !item.price) {
      console.error('Invalid item data:', item);
      return null;
    }

    try {
      const response = await axios.get(`${backendUrl}/api/users/member/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // 如果购物车存在，则更新
      if (
        response.status === 200 &&
        response.data.cart &&
        response.data.cart.items
      ) {
        return await updateServerCart(response.data.cart.items, item); // 返回更新后的购物车
      } else {
        // 如果购物车不存在，则创建新的购物车
        console.log('Cart not found. Creating a new cart.');
        return await createServerCart(item); // 返回新创建的购物车
      }
    } catch (error) {
      console.error('Error adding item to server cart:', error.message);
      // 如果獲取購物車時出現404錯誤，直接創建新的購物車
      if (error.response && error.response.status === 404) {
        console.log('Cart not found (404). Creating a new cart.');
        return await createServerCart(item); // 直接創建新購物車
      }
      return null;
    }
  };

  // 1-2如果用户没有购物车记录，则返回创建一个新的购物车。
  const createServerCart = async (item) => {
    try {
      const { userId } = authState || {};
      if (!userId) {
        console.error('No userId available, cannot create cart.');
        return null; // 返回空
      }
      // 確認在發送請求前 userId 不是 null
      console.log('Creating cart for userId:', authState.userId);
      // 添加一個額外的console來檢查請求體的結構
      const requestBody = {
        userId: authState.userId,
        items: [
          {
            productId: item._id,
            productName: item.productName,
            quantity: item.quantity || 1,
            price: item.price,
            image: item.image,
          },
        ],
      };
      console.log('Request body about to be sent:', {
        userId: authState.userId, // 應該是非空的 userId
        items: [
          {
            productId: item._id,
            productName: item.productName,
            quantity: item.quantity || 1,
            price: item.price,
            image: item.image,
          },
        ],
      });
      console.log('API endpoint:', `${backendUrl}/api/users/member/cart`);
      console.log('Authorization token:', token);

      const response = await axios.post(
        `${backendUrl}/api/users/member/cart`,
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Request body:', {
        userId: authState.userId, // 確認發送請求時的 userId

        items: [
          {
            productId: item._id,
            productName: item.productName,
            quantity: item.quantity || 1,
            price: item.price,
            image: item.image,
          },
        ],
      });
      console.log('Server response status:', response.status);

      console.log('Server cart created successfully:', response.data);

      if (response.data) {
        console.log('Server cart created successfully:', response.data);

        let cartItems;
        if (response.data.data && response.data.data.cart) {
          // 如果響應格式是 { success: true, data: { cart: { items: [...] } } }
          cartItems = response.data.data.cart.items;
          console.log('Cart items from response.data.data.cart:', cartItems);
        } else if (response.data.cart && response.data.cart.items) {
          // 如果響應格式是 { cart: { items: [...] } }
          cartItems = response.data.cart.items;
          console.log('Cart items from response.data.cart:', cartItems);
        } else if (response.data.items) {
          // 如果響應格式是 { items: [...] }
          cartItems = response.data.items;
          console.log('Cart items from response.data:', cartItems);
        }
        if (cartItems) {
          // 更新本地存儲和狀態
          localStorage.setItem('cartItems', JSON.stringify(cartItems));
          setCartItems(cartItems);
          return { items: cartItems };
        } else {
          console.error('Response data missing items array:', response.data);
          return null;
        }
      } else {
        console.error('Empty response data from server');
        return null;
      }
    } catch (error) {
      console.error('Error creating cart on server:');

      if (error.response) {
        // 服務器回應了請求，但返回了錯誤狀態碼
        console.error(
          'Server responded with error status:',
          error.response.status
        );
        console.error('Error response data:', error.response.data);
        console.error('Error response headers:', error.response.headers);
      } else if (error.request) {
        // 請求已發送但沒有收到回應
        console.error('No response received from server:', error.request);
      } else {
        // 設置請求時發生錯誤
        console.error('Error message:', error.message);
      }
      console.error('Error config:', error.config);

      return null;
    }
  };

  const updateServerCart = async (cartItems, item) => {
    try {
      // Check if the item already exists in the cart
      const existingItemIndex = cartItems.findIndex(
        (cartItem) => cartItem.productId === item._id
      );

      let updatedItems;

      if (existingItemIndex !== -1) {
        // If item exists, increase quantity
        updatedItems = cartItems.map((cartItem, index) => {
          if (index === existingItemIndex) {
            return { ...cartItem, quantity: cartItem.quantity + 1 };
          }
          return cartItem;
        });
      } else {
        // If item doesn't exist, add it
        updatedItems = [
          ...cartItems,
          {
            productId: item._id,
            productName: item.productName,
            quantity: 1,
            price: item.price,
            image: item.image,
          },
        ];
      }

      const response = await axios.put(
        `${backendUrl}/api/users/member/cart`,
        { userId: authState.userId, items: updatedItems },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log('Server cart updated successfully.', response.data);

      // 處理不同的響應格式
      let cartItems;
      if (response.data.data && response.data.data.cart) {
        // 如果響應格式是 { success: true, data: { cart: { items: [...] } } }
        cartItems = response.data.data.cart.items;
      } else if (response.data.cart && response.data.cart.items) {
        // 如果響應格式是 { cart: { items: [...] } }
        cartItems = response.data.cart.items;
      } else if (response.data.items) {
        // 如果響應格式是 { items: [...] }
        cartItems = response.data.items;
      }

      if (cartItems) {
        // 更新本地存儲和狀態
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        setCartItems(cartItems);
        return { items: cartItems };
      } else {
        console.error('Response data missing items array:', response.data);
        return null;
      }
    } catch (error) {
      console.error(
        'Error updating server cart:',
        error.response?.data || error.message
      );
      return null;
    }
  };
  // Add a function to load cart from server
  const loadCartFromServer = async (cartItems, item) => {
    if (!authState.isAuthenticated || !token) {
      console.log('User not authenticated, cannot load cart');
      return;
    }

    try {
      const response = await axios.get(`${backendUrl}/api/users/member/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (
        response.status === 200 &&
        response.data.cart &&
        response.data.cart.items
      ) {
        console.log('Loaded cart from server:', response.data.cart.items);
        setCartItems(response.data.cart.items);
        localStorage.setItem(
          'cartItems',
          JSON.stringify(response.data.cart.items)
        );
      }
    } catch (error) {
      console.error('Error loading cart from server:', error.message);
      if (error.response && error.response.status === 404) {
        console.log('No cart found on server');
        // Clear local cart if server has no cart
        setCartItems([]);
        localStorage.setItem('cartItems', JSON.stringify([]));
      }
    }
  };
  // 添加刪除購物車項目的函數
  const handleDeleteCartItem = async (itemId) => {
    try {
      if (!authState.isAuthenticated || !token) {
        console.error('User not authenticated, cannot delete cart item');
        return;
      }

      console.log('Deleting item with id:', itemId);

      // 先從本地購物車中刪除
      const updatedCartItems = cartItems.filter(
        (item) => item.productId !== itemId && item._id !== itemId
      );

      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
      setCartItems(updatedCartItems);

      // 然後從服務器購物車中刪除
      try {
        // 注意：這裡的 API 路徑應該與後端一致
        // 根據您的後端代碼，刪除購物車項目的 API 路徑應該是 /api/users/member/cart/{id}
        const response = await axios.delete(
          `${backendUrl}/api/users/member/cart/${itemId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log('Item deleted from server cart:', response.data);
      } catch (error) {
        console.error('Error deleting item from server cart:', error.message);
        if (error.response) {
          console.error('Server error response:', error.response.data);
        }
      }
    } catch (error) {
      console.error('Error in handleDeleteCartItem:', error);
    }
  };
  return {
    handleAddToCart,
    loadCartFromServer,
  };
};
