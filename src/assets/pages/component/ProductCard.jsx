import React, { useState, useEffect } from 'react';
import { backendUrl } from '../../../../config.js';
import { Link } from 'react-router-dom';
import { CiShoppingCart } from 'react-icons/ci';
import { IoMdHeart, IoMdHeartEmpty } from 'react-icons/io';
import { useAuth } from '../Context/AuthContext.jsx';
import { useCart } from '../Context/CartContext.jsx';
import { useCartManager } from '../component/useCartManager';

//component create products card
export default function ProductCard({ productTypes }) {
  //toggleFavorite function
  const { toggleFavorite, favorites, cartItems, setCartItems } = useCart();
  const { authState } = useAuth();
  const { addItemToLocalstorage } = useCartManager();
  const { addItemToServerCart } = useCartManager();
  useEffect(() => {
    console.log('Updated cartItems:', cartItems); // 每次 cartItems 更新时触发
  }, [cartItems]);

  //user not login's localstorage cart
  const handleAddToCart = async (item) => {
    console.log('Item to add:', item);
    if (!item._id || !item.productName || !item.price) {
      console.error('Invalid item data:', item);
      return;
    }
    if (!authState.isAuthenticated) {
      // 用戶未登入，添加到本地存儲
      addItemToLocalstorage(item);
      console.log('Item added to local storage:', item);
    } else {
      try {
        console.log('User authenticated, adding to server cart...');

        const response = await addItemToServerCart(item);
        if (response && response.data) {
          console.log('Added to Server cart:', response.data);
        } else {
          console.log('No response from server cart'); // 如果 response 為 null
        }
      } catch (error) {
        console.error(
          'Error adding item to server cart:',
          error.response ? error.response.data : error.message
        );
      }
    }
  };

  return (
    <>
      <ul className='d-flex flex-wrap'>
        {productTypes.map((productType) => (
          <li key={productType._id} className=' card shadow-sm product-card'>
            <div
              className='favorited'
              onClick={() => toggleFavorite(productType._id)}
            >
              {/* Add onClick event to toggle favorite status/color */}
              {favorites.includes(productType._id) ? (
                <IoMdHeart color='purple' />
              ) : (
                <IoMdHeartEmpty />
              )}
            </div>

            <Link to={`/shop/product/${productType._id}`}>
              {productType.image ? (
                <img
                  src={`${backendUrl}/adminProducts/${productType.image}`}
                  className='card-img-top object-fit product-img'
                  alt={productType.name} // 添加 alt 属性用于无障碍访问
                />
              ) : (
                <p>No image available</p> // 或者你可以显示一个默认图片
              )}
            </Link>
            <div className='card-body'>
              <p className='card-title'>
                {productType.productName}
                <span className='card-text float-end'>
                  ${productType.price}
                </span>
              </p>
              <div className='d-flex justify-content-between align-end mb-3'>
                <p className='card-text'>Type: {productType.type}</p>
                <span className='card-text'>{productType.order}</span>
              </div>
              <div className='btns cardBtns'>
                {/* <button className='moreBtn'>More</button> */}
                <button
                  type='button'
                  className=' btnCart'
                  onClick={() => handleAddToCart(productType)}
                >
                  <CiShoppingCart />
                </button>
              </div>
            </div>
          </li>
        ))}{' '}
      </ul>
    </>
  );
}
