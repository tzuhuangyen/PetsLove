import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { GrFavorite } from 'react-icons/gr';
import { CiShoppingCart } from 'react-icons/ci';
import ProductOtherDetailOther from '../pages/component/ProductOtherDetailOther';
import CustomersAlsoViewed from '../pages/component/CustomersAlsoViewed';
import { backendUrl } from '../../../config.js';
import Loading from '../pages/component/Loading';

function ProductDetail() {
  const [product, setProduct] = useState(null);
  const { productId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const isLoadingRef = useRef(false);

  // Make sure productId is a string
  if (typeof productId !== 'string') {
    return <div>Invalid product ID</div>;
  }

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        isLoadingRef.current = true;
        setIsLoading(true);
        const response = await axios.get(
          `${backendUrl}/api/admin/products/${productId}`
        );
        console.log('fetch Product:', response.data.data);
        setProduct(response.data.data); // 设置商品信息
        setTimeout(() => {
          isLoadingRef.current = false;
          setIsLoading(false);
        }, 500);
      } catch (err) {
        // 將錯誤捕獲到的錯誤設置為 error 狀態

        console.error('Error fetching product:', err);
        console.log(err);
      }
    };

    fetchProduct();
  }, [productId]);
  console.log('Product:', product);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Loading isLoading={isLoading} />

      <section className='product-detail'>
        <div className='container-md'>
          <div className='row'>
            {/* <!-- 產品照片 --> */}
            <div className='col-12 col-md-6'>
              <img
                className='product-detail-img card-img-top'
                src={`${backendUrl}/adminProducts/${product.image}`} // 修正图片的 src 属性
                alt={product.productName}
              />
            </div>
            {/* <!-- 產品概況 --> */}
            <div className='col-12 col-md-6'>
              <div className='card-body text-start'>
                <h2 className='card-title'>{product.productName}</h2>
                <div>
                  <div className='mb-2'>
                    <div className='ratings'>
                      <div className='empty_star'>★★★★★</div>
                      <div className='full_star'>★★★★★</div>
                    </div>
                  </div>
                  <div className='d-flex justify-content-between align-items-center mb-4'>
                    <h4>stock:{product.order}</h4>
                    <h3 className='price fs-3'>${product.price}</h3>
                  </div>
                </div>

                <ul className='card-text text-start'>
                  <li>100% 新鮮合格鴨氣管</li>
                  <li>適合寵物訓練獎勵及零食</li>
                  <li>
                    純手工製品，每批的外觀、大小、厚度、顏色無法一致為正常現象（圖片為實品僅供參考
                  </li>
                </ul>
                <div className='mt-4 d-flex justify-content-between align-items-center'>
                  <button type='button' className=' ProductDetailAdd-btn'>
                    ADD TO CART
                    <CiShoppingCart />
                  </button>
                  <span className='ProductDetailAdd-like-btn'>
                    {' '}
                    <GrFavorite />
                  </span>
                </div>
              </div>
            </div>
            <div className='col-12 col-md-6 mb-5 mt-md-4'>
              <div className='card-body'>
                <h3 className='card-title text-center border-bottom mb-1'>
                  產品內容
                </h3>
                <p>
                  。100% 新鮮合格鴨氣管 。適合寵物訓練獎勵及零食
                  。純手工製品，每批的外觀、大小、厚度、顏色無法一致為正常現象（圖片為實品僅供參考
                </p>
              </div>
            </div>
            {/* <!-- 營養標籤 --> */}
            <div className='col-12 col-md-6 mb-4 my-md-5 mt-md-5'>
              <div className='card nutrition text-center mb-2'>
                <div className='card-body'>
                  <h3 className='card-title mb-3'>營養標示</h3>

                  <h6 className='card-subtitle mb-2 text-muted'>
                    每一份量50g
                    <br />
                    本包裝含1份
                  </h6>
                  <ul className='card-text list-unstyled fs-4 px-3'>
                    <li className='d-flex justify-content-between'>
                      <p>脂肪</p>
                      <p>5%以上</p>
                    </li>
                    <li className='d-flex justify-content-between'>
                      <p>纖維</p>
                      <p>5%以上</p>
                    </li>
                    <li className='d-flex justify-content-between'>
                      <p>蛋白質</p>
                      <p>50%以上</p>
                    </li>
                    <li className='d-flex justify-content-between'>
                      <p>水份</p>
                      <p>50%以上</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- 商品規格內頁 --> */}
          <div className='row productOtherDetailOther'>
            <ProductOtherDetailOther />
          </div>
        </div>
      </section>
      {/* <!-- 其他主子也ㄇ --> */}
      <CustomersAlsoViewed />
    </>
  );
}

export default ProductDetail;
