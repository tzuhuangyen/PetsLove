import { backendUrl } from '../../../config.js';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Col, Form, Button, Row, Card } from 'react-bootstrap';
import { IoCloudUploadOutline } from 'react-icons/io5';
import { IoArrowBackOutline } from 'react-icons/io5';
import Swal from 'sweetalert2';
//in ProductTable click edit btn link to here
//edit product form same as add product form
//how to connect same information to edit?
function AdminProductUpdate() {
  const { productId } = useParams(); // 從 URL 獲取產品 ID
  const navigate = useNavigate(); // 用於導航
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [error, setError] = useState(null);

  const [productData, setProductData] = useState({
    productName: '',
    type: '',
    order: '',
    price: '',
    is_enabled: 1,
  });
  // 獲取產品資料
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${backendUrl}/api/admin/products/${productId}`
        );
        console.log('Product data:', response.data);

        if (response.data && response.data.data) {
          const product = response.data.data;
          setProductData({
            productName: product.productName || '',
            type: product.type || '',
            order: product.order || '',
            price: product.price || 0,
            is_enabled:
              product.is_enabled !== undefined ? product.is_enabled : 1,
          });

          // 設置當前圖片 URL
          setCurrentImage(
            `${backendUrl}/api/admin/products/image/${productId}`
          );
        }
      } catch (error) {
        console.error('Error fetching product data:', error);
        Swal.fire('Error', 'Failed to load product data', 'error');
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProductData();
    }
  }, [productId]);

  const handleChange = (e) => {
    const { value, name } = e.target;
    if (name === 'price') {
      setProductData({ ...productData, [name]: Number(value) });
    } else if (name === 'is_enabled') {
      setProductData({
        ...productData,
        [name]: e.target.checked ? 1 : 0,
      });
    } else {
      setProductData({ ...productData, [name]: value });
    }
  };
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      // 如果只更新產品資訊而不更新圖片
      if (!image) {
        console.log('Updating product without image:', productData);
        const response = await axios.patch(
          `${backendUrl}/api/admin/products/updateProduct/${productId}`,
          productData
        );

        console.log('Update response:', response.data);
        Swal.fire('Success', 'Product updated successfully', 'success');
        navigate('/admin/products'); // 更新成功後返回產品列表
        return;
      }

      // 如果也要更新圖片
      const formData = new FormData();
      formData.append('image', image);

      // 添加其他產品資料到 formData
      Object.keys(productData).forEach((key) => {
        formData.append(key, productData[key]);
      });
      console.log('Updating product with image:', {
        productId,
        productData,
        imageFile: image.name,
      });
      const response = await axios.patch(
        `${backendUrl}/api/admin/products/updateProduct/${productId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('Update response:', response.data);
      Swal.fire('Success', 'Product updated successfully', 'success');
      navigate('/admin/products'); // 更新成功後返回產品列表
    } catch (error) {
      console.error('Error updating product:', error);
      const errorMessage =
        error.response?.data?.error ||
        error.response?.data?.message ||
        error.message;

      setError('Failed to update product: ' + errorMessage);

      Swal.fire('Error', 'Failed to update product', 'error');
    }
  };

  const handleCancel = () => {
    navigate('/admin/products'); // 取消編輯返回產品列表
  };

  if (loading) {
    return <div className='text-center'>Loading product data...</div>;
  }

  return (
    <Col md={9}>
      <Row className='mb-4'>
        <Col>
          <Button variant='outline-secondary' onClick={handleCancel}>
            <IoArrowBackOutline /> Back to Products
          </Button>
        </Col>
      </Row>
      {error && (
        <Alert variant='danger' className='mb-4'>
          {error}
        </Alert>
      )}
      <Row>
        <Col md={8}>
          <Form onSubmit={handleUpdate}>
            <h1 className='text-center mb-5'>Update Product</h1>

            <Form.Group className='mb-3'>
              <Form.Label>Current Image</Form.Label>
              <div>
                {currentImage && (
                  <img
                    src={currentImage}
                    alt='Current product'
                    style={{
                      height: '150px',
                      width: '150px',
                      objectFit: 'cover',
                    }}
                    onError={(e) => {
                      e.target.src =
                        'https://via.placeholder.com/150?text=No+Image';
                    }}
                  />
                )}
              </div>
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label>Upload New Image (optional)</Form.Label>
              <Form.Control
                type='file'
                accept='image/*'
                onChange={handleImageChange}
              />
              {image && (
                <small className='text-success'>
                  New image selected: {image.name}
                </small>
              )}
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type='text'
                name='productName'
                value={productData.productName}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label>Type</Form.Label>
              <Form.Control
                type='text'
                name='type'
                value={productData.type}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label>Order</Form.Label>
              <Form.Control
                type='text'
                name='order'
                value={productData.order}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                name='price'
                value={productData.price}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Check
                type='checkbox'
                id='is_enabled'
                name='is_enabled'
                label='Active'
                checked={productData.is_enabled === 1}
                onChange={handleChange}
              />
            </Form.Group>

            <div className='d-flex justify-content-between'>
              <Button variant='primary' type='submit'>
                <IoCloudUploadOutline /> Update Product
              </Button>
              <Button variant='outline-secondary' onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </Form>
        </Col>

        <Col md={4}>
          <Card>
            <Card.Header>Product Preview</Card.Header>
            <Card.Body>
              <div className='text-center mb-3'>
                {currentImage && (
                  <img
                    src={currentImage}
                    alt='Product preview'
                    style={{ maxWidth: '100%', height: 'auto' }}
                    onError={(e) => {
                      e.target.src =
                        'https://via.placeholder.com/200?text=No+Image';
                    }}
                  />
                )}
              </div>
              <h5>{productData.productName}</h5>
              <p>
                <strong>Type:</strong> {productData.type}
              </p>
              <p>
                <strong>Order:</strong> {productData.order}
              </p>
              <p>
                <strong>Price:</strong> ${productData.price}
              </p>
              <p>
                <strong>Status:</strong>{' '}
                {productData.is_enabled === 1 ? 'Active' : 'Inactive'}
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Col>
  );
}

export default AdminProductUpdate;
