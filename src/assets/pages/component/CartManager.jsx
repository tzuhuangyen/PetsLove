import { backendUrl } from '../../../../config.js';
import axios from 'axios';
import { useCart } from '../Context/CartContext.jsx';
import { useAuth } from '../Context/AuthContext.jsx';
import { showAddToCartAlert } from '../../../swal.js';
// CartManager 作為一個 React 組件
const CartManager = () => {
  const { setCartItems } = useCart();
  const { token, authState } = useAuth();

  // 將之前的功能搬進來
  const addItemToLocalstorage = (item) => {
    const localstorageCart =
      JSON.parse(localStorage.getItem('cartItems')) || [];
    const existingItem = localstorageCart.find(
      (cartItem) => cartItem._id === item._id
    );

    if (existingItem) {
      existingItem.quantity = (existingItem.quantity || 0) + 1;
    } else {
      localstorageCart.push({ ...item, quantity: 1 });
      console.log('Item being added in localstorage:', item);
      console.log('Current cart items:', localstorageCart);
    }

    localStorage.setItem('cartItems', JSON.stringify(localstorageCart));
    setCartItems(localstorageCart);
    showAddToCartAlert(item.productName);
  };

  const addItemToServerCart = async (item) => {
    if (!token) return;
    console.log('Token:', token); // 检查 token 是否有效
    if (!item._id || !item.productName || !item.price) {
      console.error('Invalid item data:', item);
      return;
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
      console.error('Error adding item to server cart:', error);
    }
  };

  const fetchUserCartFromServer = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/users/member/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const dataCartItems = response.data.cart?.items || [];
      return dataCartItems;
    } catch (error) {
      console.error('Error fetching user cart from server:', error);
      return [];
    }
  };

  const mergeCarts = (serverCart, localCart) => {
    const mergedCart = new Map();
    serverCart.items.forEach((item) => {
      mergedCart.set(item.productId.toString(), item);
    });
    localCart.forEach((item) => {
      if (mergedCart.has(item.productId.toString())) {
        const existingItem = mergedCart.get(item.productId.toString());
        existingItem.quantity += item.quantity;
      } else {
        mergedCart.set(item.productId.toString(), { ...item });
      }
    });
    return Array.from(mergedCart.values());
  };

  const syncUserCartWithServer = async () => {
    if (authState.isAuthenticated && token) {
      try {
        const localCart = JSON.parse(localStorage.getItem('cartItems')) || [];
        const serverCart = await fetchUserCartFromServer();

        const mergedCart = mergeCarts(serverCart, localCart);
        setCartItems(mergedCart);
        await updateServerCart(mergedCart);
        localStorage.removeItem('cartItems'); // 清空本地存儲
      } catch (error) {
        console.error('Error syncing user cart with server:', error);
      }
    }
  };

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
    }
  };

  // 根據需要可以返回其他東西，或不返回
  return {
    updateServerCart,
    addItemToLocalstorage,
    addItemToServerCart,
    fetchUserCartFromServer,
    syncUserCartWithServer,
    mergeCarts,
  };
};

export const useCartManager = () => {
  const cartManager = CartManager();
  return cartManager;
};
