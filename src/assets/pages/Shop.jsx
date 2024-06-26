import { backendUrl } from '../../../config.js';
console.log('Backend URL:', backendUrl); // 確認 backendUrl 正確
import axios from 'axios';
import React from 'react';

import { useState, useEffect, useReducer, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';

import {
  showAddToCartAlert,
  showRemoveFromCartAlert,
  showConfirmationAlert,
} from '../../swal.js';
import { CiShoppingCart } from 'react-icons/ci';
import { MdFavoriteBorder } from 'react-icons/md';
import { FaSearch } from 'react-icons/fa';
import { GiChickenOven } from 'react-icons/gi';
import { LuBeef } from 'react-icons/lu';
import { GiDuck } from 'react-icons/gi';
import { IoMdHeart } from 'react-icons/io';
import { IoMdHeartEmpty } from 'react-icons/io';

import Container from 'react-bootstrap/Container';
import Loading from './component/Loading';
// import { CartContext } from './Context/CartContext.jsx';
import { useCart } from './Context/CartContext.jsx';

//Debounce function
function debounce(func, wait) {
  let timeout; // 設置計時器A variable to hold a reference to the timeout ID
  // Return a new function that encapsulates the debounced behavior
  return function (...args) {
    const context = this; // Preserve the context in which the function was called
    clearTimeout(timeout); // Clear the previous timeout, if there is one
    //等候時間到 Call the original function ('func') with the correct context ('this') and arguments ('args') after the 'wait' period
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}

const Shop = () => {
  //add to cart dispatch function [state, dispatch] = useReducer(cartReducer, { cartList: [] });
  //取得原始資料
  const [initData, setInitData] = useState([]);
  //filter
  const [productTypes, setProductTypes] = useState([]);
  //search
  const [text, setText] = useState('');

  //toggleFavorite function
  const [favorites, setFavorites] = useState([]);
  const [isFilteringFavorites, setIsFilteringFavorites] = useState(false);

  //未登入前的localstorage cart
  const [isLoading, setIsLoading] = useState(false);
  const isLoadingRef = useRef(false);
  //共用購物車狀態
  const [addItemToCart, setAddItemToCart] = useState([]);
  const token = localStorage.getItem('token');
  const { localCart, setLocalCart } = useCart();

  //get all products data
  const getAllData = async () => {
    try {
      isLoadingRef.current = true;
      setIsLoading(true);
      const response = await axios.get(`${backendUrl}/api/admin/products`);
      console.log('All products Data:', response.data);
      setInitData(response.data.data);
      setProductTypes(response.data.data); // 初始化时展示所有商品
      setTimeout(() => {
        isLoadingRef.current = false;
        setIsLoading(false);
      }, 500);
    } catch (error) {
      console.error('Error fetching products:', error);
      console.dir('Error fetching products:', error);
      console.error(
        'Error details:',
        error.response ? error.response.data : error.message
      );

      // 在這裡添加任何你想要處理錯誤的代碼，例如顯示錯誤提示給用戶或者重試請求等。
    }
  };
  useEffect(() => {
    getAllData();
  }, []);
  //component create products card
  const ProductCard = ({ productTypes }) => {
    if (!Array.isArray(productTypes)) {
      return <p>No products found.</p>; // 或者其他處理方式
    }
    return (
      <>
        {' '}
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
                <img
                  src={`${backendUrl}/adminProducts/${productType.image}`}
                  className='card-img-top object-fit product-img'
                  alt={productType.productName}
                />
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
  };
  //add item to localstorage
  const addItemToLocalstorage = (product) => {
    let localstorageCart = Array.isArray(localCart) ? [...localCart] : [];

    // 检查购物车中是否已存在该商品
    const existingItemIndex = localstorageCart.findIndex(
      (item) => item._id === product._id
    );
    if (existingItemIndex !== -1) {
      // 如果商品已存在，则将其数量属性加一
      localstorageCart[existingItemIndex] = {
        ...localstorageCart[existingItemIndex],
        quantity: localstorageCart[existingItemIndex].quantity + 1,
      };
    } else {
      // or Add to favorites
      localstorageCart.push({ ...product, quantity: 1 });
    }
    // 将更新后的购物车数组存回本地存储
    localStorage.setItem('cart', JSON.stringify(localstorageCart));
    setLocalCart(localstorageCart);
    showAddToCartAlert(product.productName);
    console.log('add item to Localstorage:', localstorageCart);
  };
  const handleAddToCart = (product) => {
    addItemToLocalstorage(product);
    // addItemToServerCart(product._id, 1);
  };

  //get login user cartItem from db
  useEffect(() => {
    const getLoginUserCartItems = async () => {
      try {
        if (token) {
          const response = await axios.get(
            `${backendUrl}/api/users/member/cart`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          console.log('All CartItems:', response.data);
          setLocalCart(response.data.cart);
        }
      } catch (error) {
        console.error('Error fetching cartItems:', error);
        console.error(
          'Error details:',
          error.response ? error.response.data : error.message
        );
      }
    };
    getLoginUserCartItems();
  }, [token]);

  //登入用戶加入購物車到server數據庫
  //当用户决定要结账或者在进行特定操作时，系统会提示用户登录或注册。
  //如果用户选择登录或注册，系统会验证用户的身份并将用户导向登录页面。
  //在用户成功登录后，前端应用会检查本地存储中是否有购物车数据。
  //如果有，前端会将本地存储中的购物车数据发送到后端，后端会根据用户的身份信息（如用户 ID）来获取数据库中该用户的购物车数据。
  const addItemToServerCart = async (productId, quantity) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/users/member/cart`,
        { productId, quantity },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log('Item added to cart:', response.data);
      setAddItemToCart(response.data.cart);
    } catch (error) {
      console.error('Error adding item to cart:', error);
      console.error(
        'Error details:',
        error.response ? error.response.data : error.message
      );
    }
  };
  // Combined function to handle adding item to both local storage and server cart

  // add item to favorite function
  const toggleFavorite = (productId) => {
    const updatedFavorites = [...favorites];
    const index = updatedFavorites.indexOf(productId);

    // if item is already in the favorites array. Remove from favorites
    if (index !== -1) {
      updatedFavorites.splice(index, 1);
    } else {
      // or Add to favorites
      updatedFavorites.push(productId);
    }
    //update state
    setFavorites(updatedFavorites);
    //update local storage
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    console.log('Updated Favorites:', updatedFavorites);
    // If we are currently filtering by favorites, update the productTypes state as well
    if (isFilteringFavorites) {
      const favoriteProducts = initData.filter((product) =>
        updatedFavorites.includes(product._id)
      );
      setProductTypes(favoriteProducts);
    }
  };

  //handle filter by order type click
  const handleFilters = (type) => {
    if (initData && initData.length > 0) {
      let filteredTypes;

      if (type !== '') {
        filteredTypes = initData.filter(
          (productType) =>
            productType.order === type || productType.type === type
        );
      } else {
        // 如果类型为空，则重置为初始数据
        setProductTypes(initData); // 重置为所有商品
        return;
      }
      //排序邏輯，默認降序排序
      filteredTypes.sort((a, b) => b.price - a.price);

      setProductTypes(filteredTypes);
      console.log('filteredTypes', filteredTypes);
    }
  };
  //handle sort by price
  const handleSortPrice = (sortOrder) => {
    console.log(`Selected sort order: ${sortOrder}`);

    let sortedProducts = [...productTypes];
    // Check the selected sort order and sort the products accordingly
    if (sortOrder === 'asc') {
      sortedProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (sortOrder === 'desc') {
      sortedProducts.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    }
    console.log(`Sorted Products: `, sortedProducts);

    // Update the productTypes state with the sorted products
    setProductTypes(sortedProducts);
  };

  //component filter component
  const FilterCategory = () => {
    return (
      <>
        {' '}
        <div className='filterbtns mb-4 '>
          <ul className='typeBtns categoryGroup mb-4'>
            <li
              className='categoryGroup-item'
              id='reset'
              onClick={() => handleFilters('')}
            >
              All products
            </li>
            <li
              className='categoryGroup-item'
              id='filter-preOrder'
              onClick={() => handleFilters('pre-order')}
            >
              pre-order
            </li>
            <li
              id='filter-inStock'
              className='categoryGroup-item '
              onClick={() => handleFilters('in-stock')}
            >
              in-stock
            </li>
            <li
              className='categoryGroup-item'
              id='filter-customized'
              onClick={() => handleFilters('customize')}
            >
              customize
            </li>
            <li
              className='categoryGroup-item'
              id='filter-chicken'
              onClick={() => handleFilters('chicken')}
            >
              <GiChickenOven />
              chicken
            </li>
            <li
              className='categoryGroup-item'
              id='filter-beef'
              onClick={() => handleFilters('beef')}
            >
              <LuBeef />
              beef
            </li>
            <li
              className='categoryGroup-item'
              id='filter-duck'
              onClick={() => handleFilters('Duck')}
            >
              <GiDuck />
              Duck
            </li>
          </ul>
          {/* Sort dropdown */}
          <div className=' sortBtn mb-4'>
            <label htmlFor='sortSelect'>Sort:</label>
            <select
              id='sortSelect'
              className='filterSelect'
              onChange={(e) => handleSortPrice(e.target.value)}
            >
              <option value=''>Select Sort Order</option>

              <option value='desc'>High to Low</option>
              <option value='asc'>Low to High</option>
            </select>
          </div>
          {/* filter favorite */}
          <button
            id='filter-favorite'
            className='filterFavoBtn'
            onClick={() => filterFavorites()}
          >
            show my Favorite
            <MdFavoriteBorder />
          </button>
        </div>
      </>
    );
  };
  // Debounced search handler that will be called after a delay when the user is typing
  const debouncedSearchHandler = debounce(() => {
    if (text.length >= 2) {
      setIsSearching(false);
      performSearch(); // Call the search function here
    }
  }, 300);

  // Perform the search based on the current text
  const performSearch = () => {
    const searchProducts = initData.filter(
      (product) =>
        product.productName.toLowerCase().includes(text.toLowerCase()) ||
        product.type.toLowerCase().includes(text.toLowerCase())
    );
    setProductTypes(searchProducts);
    setText(''); // Clear the search input by setting the text state to an empty string
  };
  //component search box component
  const SearchBox = ({ initData, setProductTypes }) => {
    const [isSearching, setIsSearching] = useState(false);
    const inputRef = useRef(null); // Create a ref for the input element

    // search handler
    const handleInputChange = (event) => {
      const value = event.target.value;
      setText(value);
      setIsSearching(true);
    };

    // Click handler for the search button
    const handleSearchClick = () => {
      performSearch();
      setText(''); // Clear the search input
    };

    // useEffect hook to maintain input focus
    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, [productTypes]);

    // useEffect to handle debounced search
    useEffect(() => {
      if (isSearching) {
        debouncedSearchHandler(text);
      }
      // Note: Since debouncedSearchHandler is a debounced function, it doesn't need to be a dependency of this useEffect
    }, [isSearching, debouncedSearchHandler]);

    return (
      <>
        <form className='mb-3 searchForm d-flex'>
          <label htmlFor='search' className='visually-hidden'></label>
          <input
            ref={inputRef} // Attach the ref to the input element
            id='search'
            type='search'
            className='form-control'
            value={text}
            onChange={handleInputChange}
            placeholder='Search for products'
          />
          <button
            className='searchBtn'
            type='button'
            onClick={handleSearchClick}
          >
            <FaSearch />
          </button>
        </form>
      </>
    );
  };

  // get favorites data and load the favorites from local storage when the component mounts.
  useEffect(() => {
    // Load favorites & cart from local storage
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);
  // filter favorite function
  const filterFavorites = () => {
    const favoriteProducts = initData.filter((product) => {
      return favorites.includes(product._id); // 使用 product._id
    });
    setProductTypes(favoriteProducts);
    console.log(favoriteProducts);
    setIsFilteringFavorites(true); // Set flag to true when filtering by favorites
  };

  //元件渲染
  return (
    <div>
      <Loading isLoading={isLoading} />
      <h1 className='mt-5 mb-4 text-center'>products List</h1>

      <Container fluid='md'>
        <div className='row'>
          <div className='col-lg-3'>
            <FilterCategory
              handleFilters={handleFilters}
              handleSortPrice={handleSortPrice}
            />
            <SearchBox initData={initData} setProductTypes={setProductTypes} />
          </div>
          <div className='col-lg-9 p-0 '>
            {' '}
            <ProductCard productTypes={productTypes} />
          </div>
        </div>
        <nav aria-label='...'>
          <ul className='pagination justify-content-center my-5'>
            <li className='page-item active' aria-current='page'>
              <span className='page-link'>1</span>
            </li>
            <li className='page-item'>
              <a className='page-link' href='#'>
                2
              </a>
            </li>
            <li className='page-item'>
              <a className='page-link' href='#'>
                3
              </a>
            </li>
          </ul>
        </nav>
      </Container>
    </div>
  );
};

export default Shop;
