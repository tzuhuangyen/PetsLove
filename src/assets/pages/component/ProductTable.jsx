import React, { useEffect } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import { TiEdit } from 'react-icons/ti';
import { MdDeleteForever } from 'react-icons/md';

import { backendUrl } from '../../../../config';
import { Link } from 'react-router-dom';

function ProductTable({ allImage, onProductUpdated }) {
  // Add debugging to see what data we're working with
  useEffect(() => {
    console.log('ProductTable rendered with allImage:', allImage);
    if (allImage && allImage.length > 0) {
      console.log('First product:', allImage[0]);
    }
  }, [allImage]);

  const handleEditClick = ({ productId }) => {
    // Navigate to AdminProductUpdate page with the productId
    // Example URL: /adminProductUpdate/:productId
    // Replace '/adminProductUpdate' with your actual route path
    // You may also need to pass additional parameters if required
    // For example, you can use template literals to generate dynamic URLs
    window.location.href = `/admin/products/updatedProduct/${productId}`;
  };

  // Add useEffect for debugging
  useEffect(() => {
    console.log('ProductTable rendered with allImage:', allImage);
    if (allImage && allImage.length > 0) {
      console.log('First product:', allImage[0]);
    }
  }, [allImage]);

  const handleDelete = async (productData) => {
    try {
      console.log('Product ID:', productData.product._id);

      // 向後端發送刪除請求
      await axios.delete(
        `${backendUrl}/api/admin/products/deleteProduct/${productData.product._id}`
      );
      window.location.reload();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };
  // 添加防止圖片緩存的函數
  const getImageUrl = (productId) => {
    const timestamp = new Date().getTime();
    return `${backendUrl}/api/admin/products/image/${productId}?_t=${timestamp}`;
  };
  return (
    <>
      <div>
        <div className='imageGrid'></div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Type</th>
              <th>Order</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allImage &&
              allImage.map((product, index) => (
                <tr key={product._id} className='image__item'>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={getImageUrl(product._id)}
                      alt={`Product ${index + 1}`}
                      style={{ height: '100px', width: '100px' }}
                    />
                  </td>
                  <td>{product.productName}</td>
                  <td>{product.type}</td>
                  <td>{product.order}</td>
                  <td>{product.price}</td>
                  <td>
                    <Button
                      as={Link}
                      to={`/admin/products/updatedProduct/${product._id}`}
                      className='me-2'
                    >
                      <TiEdit />
                    </Button>
                    <Button onClick={() => handleDelete({ product })}>
                      <MdDeleteForever />
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default ProductTable;
