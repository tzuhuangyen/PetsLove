import { backendUrl } from '../../../config.js';
import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { Nav, Row, Col } from 'react-bootstrap';
import { useCart } from './Context/CartContext.jsx';
import { useAuth } from './Context/AuthContext.jsx';
import ProductCard from '../pages/component/ProductCard.jsx';
import FilterCategory from '../pages/component/FilterCategory.jsx';
import FilterFavorites from '../pages/component/FilterFavorites.jsx';
import SearchBox from '../pages/component/SearchBox.jsx';
import Loading from './component/Loading';

const Shop = () => {
  //filter
  const [productTypes, setProductTypes] = useState([]);
  //add to cart dispatch function [state, dispatch] = useReducer(cartReducer, { cartList: [] });
  //取得原始資料
  const [initData, setInitData] = useState([]);
  //未登入前的localstorage cart
  const [isLoading, setIsLoading] = useState(false);
  const isLoadingRef = useRef(false);

  //get all products data
  useEffect(() => {
    const getAllData = async () => {
      setIsLoading(true);
      isLoadingRef.current = true;
      try {
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
      } finally {
        setIsLoading(false);
      }
    };
    getAllData();
  }, []);

  //元件渲染
  return (
    <div>
      <Loading isLoading={isLoading} />
      <h1 className='mt-5 mb-4 text-center'>products List</h1>

      <Container fluid='md'>
        <Row className='row'>
          <Col className='col-lg-3'>
            <FilterCategory
              setProductTypes={setProductTypes}
              initData={initData}
            />
            <FilterFavorites
              setProductTypes={setProductTypes}
              initData={initData}
            />{' '}
            {/* 添加收藏过滤 */}
            <SearchBox initData={initData} setProductTypes={setProductTypes} />
          </Col>
          <Col className='col-lg-9 p-0 '>
            {' '}
            <ProductCard productTypes={productTypes} />
          </Col>
        </Row>
        <Nav aria-label='...'>
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
        </Nav>
      </Container>
    </div>
  );
};

export default Shop;
