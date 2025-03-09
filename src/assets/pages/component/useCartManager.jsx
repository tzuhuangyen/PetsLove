import React, { useEffect } from 'react';
import { backendUrl } from '../../../../config.js';
import axios from 'axios';
import { useCart } from '../Context/CartContext.jsx';
import { useAuth } from '../Context/AuthContext.jsx';
import { showAddToCartAlert } from '../../../swal.js';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export const useCartManager = () => {
  const { cartItem = [], setCartItems } = useCart() || {
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
      if (cartResponse) {
        console.log('Added to Server cart:', cartResponse);
        setCartItems(cartResponse.items); // 更新购物车项
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

      const response = await axios.post(
        `${backendUrl}/api/users/member/cart`,
        {
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
        },
        { headers: { Authorization: `Bearer ${token}` } }
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
      console.log('Server cart created successfully:', response.data);
      return response.data; // 返回创建的新购物车数据
    } catch (error) {
      console.error(
        'Error creating cart on server:',
        error.response?.data || error.message
      );
      return null;
    }
  };

  const updateServerCart = async (cartItems, item) => {
    try {
      const updatedItems = cartItems.map((cartItem) => {
        if (cartItem.productId === item._id) {
          return { ...cartItem, quantity: cartItem.quantity + 1 }; // 增加数量
        }
        return cartItem;
      });

      const response = await axios.put(
        `${backendUrl}/api/users/member/cart`,
        { userId: authState.userId, items: updatedItems },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log('Server cart updated successfully.', response.data);
    } catch (error) {
      console.error(
        'Error updating server cart:',
        error.response?.data || error.message
      );
      return null;
    }
  };
  return {
    handleAddToCart,
  };
};
