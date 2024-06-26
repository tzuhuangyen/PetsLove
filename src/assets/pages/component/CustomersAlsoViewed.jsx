import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // 导入 Link 组件
import axios from 'axios';

import { backendUrl } from '../../../../config';
import { CiShoppingCart } from 'react-icons/ci';

import otherProduct1 from '../../../../public/images/otherProduct1.jpeg';
import otherProduct2 from '../../../../public/images/otherProduct2.jpeg';
import otherProduct3 from '../../../../public/images/otherProduct3.jpeg';
import otherProduct4 from '../../../../public/images/otherProduct4.jpeg';
import Accordion from 'react-bootstrap/Accordion';

const CustomersAlsoViewedProducts = [
  {
    id: '6637f74d92b70cb81e648b52',
    image: otherProduct1,
    name: 'chicken',
    order: 'pre-order',
    price: 55,
  },
  {
    id: '663cafe5b8338b5f9445cf12',
    image: otherProduct2,
    name: 'veg',
    order: 'in-stock',
    price: 20,
  },
  {
    id: '663745474450242335ab6f1b',
    image: otherProduct3,
    name: 'pork2',
    order: 'customize',
    price: 10,
  },
  {
    id: '663744654450242335ab6f14',
    image: otherProduct4,
    name: 'chicken',
    order: 'customize',
    price: 20,
  },
  // Add more products as needed
];

export const CustomersAlsoViewed = () => {
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [product, setProduct] = useState(null);

  const handleProductClick = async (productId) => {
    console.log('Clicked product ID:', productId);
    setSelectedProductId(productId);
    try {
      // 发送请求获取商品数据
      const response = await axios.get(
        `${backendUrl}/api/admin/products/${productId}`
      );
      console.log('Product data:', response.data);
      setProduct(response.data);
      // 在这里处理返回的商品数据，可以将其保存到状态中或者进行其他操作
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };

  const ProductCard = ({ products }) => {
    return (
      <>
        {products.map((data) => (
          <div className='col-12 col-lg-3'>
            <div key={data.id} className='card shadow-sm product-card'>
              <Link
                to={`/shop/product/${data.id}`}
                className='type-card-hover'
                onClick={() => handleProductClick(data.id)}
              >
                <div>
                  {' '}
                  <img
                    src={data.image}
                    className='card-img-top object-fit product-img'
                    alt={data.name}
                  />
                  <p className='card-title mt-2 fs-4 ps-3'>{data.name}</p>
                </div>
              </Link>
              <div className='card-body d-flex justify-content-between align-items-center'>
                <div className='price-wrapper d-flex flex-column'>
                  <p className='card-text float-end'>${data.price}</p>
                  <p>{data.order}</p>
                </div>

                <button
                  type='button'
                  className=' btnCart'
                  // onClick={() => {
                  //   dispatch({
                  //     type: 'ADD_TO_CART',
                  //     payload: { ...productType, quantity: 1 },
                  //   });
                  // }}
                >
                  <CiShoppingCart />
                </button>
              </div>
            </div>
          </div>
        ))}
      </>
    );
  };

  return (
    <>
      {' '}
      <section className='customers-also-viewed my-5'>
        <div className='container-md'>
          <h3 className='text-center mb-5'>Customers Also Viewed</h3>
          <div className='row text-dark'>
            <ProductCard products={CustomersAlsoViewedProducts} />
          </div>
        </div>
      </section>
    </>
  );
};
export default CustomersAlsoViewed;
