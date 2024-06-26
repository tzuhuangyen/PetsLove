import React from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import { TiEdit } from 'react-icons/ti';
import { MdDeleteForever } from 'react-icons/md';

import { backendUrl } from '../../../../config';
function ProductTable({ allImage }) {
  //handleEditProduct
  // const handleEditProduct = async (productId) => {
  //   try {
  //     const updatedProduct = await axios.patch(
  //       `${backendUrl}/api/admin/products/updateProduct/${productId}`,
  //       {
  //         productName: 'NewName',
  //         type: 'NewType',
  //         order: 'NewOrder',
  //         price: 'NewPrice',
  //       }
  //     );
  //     console.log('Product updated successfully:', updatedProduct.data);
  //   } catch (error) {
  //     console.error('Error updating product:', error);
  //   }
  // };
  // const handleEditClick = ({ productId }) => {
  //   // Navigate to AdminProductUpdate page with the productId
  //   // Example URL: /adminProductUpdate/:productId
  //   // Replace '/adminProductUpdate' with your actual route path
  //   // You may also need to pass additional parameters if required
  //   // For example, you can use template literals to generate dynamic URLs
  //   window.location.href = `/admin/products/updatedProduct/${productId}`;
  // };

  const handleDelete = async (product) => {
    try {
      //呼叫 onDelete 函式，將 id 作為參數傳遞
      // 在前端執行刪除操作
      onDelete(product._id);
      // 印出產品的 ID
      console.log('Product ID:', product._id);
      // 向後端發送刪除請求
      await axios.delete(
        `${backendUrl}/api/admin/products/deleteProduct/${product._id}`
      );
    } catch (error) {
      console.error('Error deleting product:', error);
    }
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
                      src={`${backendUrl}/admin/products/${product.image}`}
                      alt={`Product ${index + 1}`}
                      style={{ height: '100px', width: '100px' }}
                    />
                  </td>
                  <td>{product.productName}</td>
                  <td>{product.type}</td>
                  <td>{product.order}</td>
                  <td>{product.price}</td>
                  <td>
                    <Button>
                      <a href='/admin/products/updatedProduct'>
                        {' '}
                        <TiEdit />
                      </a>
                    </Button>
                    <Button onClick={() => handleDelete({ product, onDelete })}>
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
