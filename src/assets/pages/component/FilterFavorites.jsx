import React from 'react';
import { useCart } from '../../pages/Context/CartContext';
import { MdFavoriteBorder } from 'react-icons/md';

const FilterFavorites = ({ setProductTypes, initData }) => {
  const { favorites } = useCart();

  const filterFavorites = () => {
    if (favorites.length > 0) {
      const favoriteProducts = initData.filter((product) =>
        favorites.includes(product._id)
      );
      setProductTypes(favoriteProducts);
    } else {
      setProductTypes(initData); // 如果没有收藏任何商品，显示所有商品
    }
  };

  return (
    <div className='filterFavorites'>
      {/* filter favorite */}
      <button
        id='filter-favorite'
        className='filterFavoBtn btn-secondary mb-2'
        onClick={filterFavorites}
      >
        show my Favorite
        <MdFavoriteBorder />
      </button>
    </div>
  );
};

export default FilterFavorites;
