import React from 'react';
import { backendUrl } from '../../../../config.js';
import axios from 'axios';
import { useCart } from '../Context/CartContext.jsx';
import { useAuth } from '../Context/AuthContext.jsx';
import { showAddToCartAlert } from '../../../swal.js';
import { useCallback } from 'react';

const updateServerCart = async (cartItems) => {
  try {
    const response = await axios.put(
      `${backendUrl}/api/users/member/cart`,
      { userId: authState.userId, items: cartItems },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log('Server cart updated successfully.', response.data);
  } catch (error) {
    console.error('Error updating server cart:', error);
    if (error.response) {
      // 伺服器返回的錯誤
      console.error('Server response:', error.response.data);
      console.error('Error status:', error.response.status);
    } else if (error.request) {
      // 請求已發送但沒有收到回應
      console.error('No response received:', error.request);
    } else {
      // 其他錯誤
      console.error('Error message:', error.message);
    }
  }
};

export const useCartManager = () => {
  const { cartItem = [], setCartItems } = useCart() || {
    cartItem: [],
    setCartItems: () => {},
  };
  const { authState = { isAuthenticated: false } } = useAuth();

  const token = authState.token;

  const addItemToLocalstorage = (item) => {
    const localstorageCart =
      JSON.parse(localStorage.getItem('cartItems')) || [];
    const existingItem = localstorageCart.find(
      (cartItem) => cartItem._id === item._id
    );

    if (existingItem) {
      existingItem.quantity = (existingItem.quantity || 0) + 1;
      console.log('Item quantity updated in localstorage:', existingItem);
    } else {
      localstorageCart.push({ ...item, quantity: 1 });
      console.log('Item being added in localstorage:', item);
      console.log('Current cart items:', localstorageCart);
    }

    localStorage.setItem('cartItems', JSON.stringify(localstorageCart));
    setCartItems([...localstorageCart]);
    console.log('Updated cart items in localstorage:', localstorageCart);

    showAddToCartAlert(item.productName);
  };

  const addItemToServerCart = async (item) => {
    console.log('Request body:', {
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
    console.log('Token sent to server:', token);

    if (!token) return;
    if (!item._id || !item.productName || !item.price) {
      console.error('Invalid item data:', item);
      return null;
    }
    try {
      const response = await axios.post(
        `${backendUrl}/api/users/member/cart`,
        {
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
      console.log('Added item to server cart:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error adding item to server cart:', error.response);
      return null;
    }
  };

  const fetchUserCartFromServer = async () => {
    try {
      console.log('Fetching cart with token:', token);

      const response = await axios.get(`${backendUrl}/api/users/member/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (
        response.status === 200 &&
        (!response.data.cart || response.data.cart.items.length === 0)
      ) {
        console.log('User does not have a cart yet.');
        return []; // 返回一個空的購物車陣列
      }
      console.log('fetch User Cart From Server:', response.data);
      return response.data.cart.items;
    } catch (error) {
      if (error.response) {
        // 伺服器返回的錯誤
        if (error.response.status === 404) {
          console.log('404, No cart found for this user.');
          return await createServerCart([]); // 返回空的購物車陣列
        }
        console.error(
          'Error fetching user cart from server:',
          error.response.data
        );
      } else {
        console.error('Error fetching user cart from server:', error.message);
      }
      return null;
    }
  };

  // 1-2如果用户没有购物车记录，则返回创建一个新的购物车。
  const createServerCart = async (cartItems) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/users/member/cart`,
        { items: cartItems },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log('Server cart created successfully:', response.data);
      return response.data; // 返回创建的新购物车数据
    } catch (error) {
      console.error('Error updating cart on server:', error);
    }
  };

  const mergeCarts = (serverCart, localCart) => {
    const mergedCart = [...serverCart]; // 假设服务器购物车数据结构正确
    localCart.forEach((localItem) => {
      if (
        !serverCart.find(
          (serverItem) => serverItem.productId === localItem.productId
        )
      ) {
        const { productId, productName, quantity, price, image } = localItem;
        if (!productId || !productName || !quantity || !price) {
          console.error('Invalid item data:', localItem);
          return; // 忽略無效項目
        }

        mergedCart.push(localItem); // 将本地购物车中没有的商品添加到服务器购物车
      }
    });
    return mergedCart;
  };

  const syncUserCartWithServer = useCallback(async () => {
    if (authState.isAuthenticated && token) {
      try {
        const localCart = JSON.parse(localStorage.getItem('cartItems')) || [];
        let serverCart = await fetchUserCartFromServer();
        if (!serverCart || serverCart.length === 0) {
          await createServerCart(localCart);
          serverCart = await fetchUserCartFromServer();
        }

        if (JSON.stringify(localCart) !== JSON.stringify(serverCart)) {
          const mergedCart = mergeCarts(serverCart, localCart);
          await updateServerCart(mergedCart);
          setCartItems(mergedCart);
          localStorage.removeItem('cartItems'); // 清空本地存儲
        } else {
          console.log('Local cart is already in sync with server.');
        }
      } catch (error) {
        console.error('Error syncing user cart with server:', error);
      }
    }
  }, [
    authState.isAuthenticated,
    token,
    fetchUserCartFromServer,
    updateServerCart,
    createServerCart,
  ]);

  return {
    updateServerCart,
    addItemToLocalstorage,
    addItemToServerCart,
    fetchUserCartFromServer,
    syncUserCartWithServer,
    mergeCarts,
  };
};
