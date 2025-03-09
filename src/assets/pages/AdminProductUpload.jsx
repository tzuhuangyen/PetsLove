import { backendUrl } from '../../../config.js';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Col, Form, Button } from 'react-bootstrap';
import ProductTable from './component/ProductTable';
import { IoCloudUploadOutline } from 'react-icons/io5';
import Swal from 'sweetalert2';

function AdminProductUpload() {
  // const [file, setFile] = useState(null); // 追加 file 状态来存储选择的文件
  const [image, setImage] = useState(null);
  const [allImage, setAllImage] = useState(null);
  // const [productName, setProductName] = useState('');
  // const [type, setType] = useState('');
  // const [order, setOrder] = useState('');
  // const [price, setPrice] = useState('');
  const [newProductData, setNewProductData] = useState({
    productName: '',
    type: '',
    order: '',
    price: '',
    is_enabled: 1,
  });

  const handleChange = (e) => {
    // console.log(e.target);
    const { value, name } = e.target;
    if (name === 'price') {
      setNewProductData({ ...newProductData, [name]: Number(value) });
    } else if (name === 'is_enabled') {
      setNewProductData({
        ...newProductData,
        [name]: e.target.checked ? 1 : 0,
      });
    } else {
      setNewProductData({ ...newProductData, [name]: value });
    }
  };

  //handle upload
  const uploadImage = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('image', image);
    Object.keys(newProductData).forEach((key) => {
      formData.append(key, newProductData[key]);
    });
    console.log('FormData:', formData);

    try {
      const result = await axios.post(
        `${backendUrl}/api/admin/products/uploadProduct`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log('Upload result:', result.data);
      getAllProductInfo();
      Swal.fire('Success', 'Product uploaded successfully', 'success');
    } catch (error) {
      console.error('Error uploading image:', error);
      Swal.fire('Error', 'Failed to upload product', 'error');
    }
  };
  //get all image products
  const getAllProductInfo = () => {
    axios
      .get(`${backendUrl}/api/admin/products`)
      .then((res) => {
        console.log('All Product Info:', res.data);
        setAllImage(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAllProductInfo();
  }, []);

  return (
    <Col md={9}>
      <Form onSubmit={uploadImage}>
        <h1 className='text-center mb-5'>Admin Product Upload </h1>
        {/* <pre>{JSON.stringify(newProductData)}</pre> */}
        <input
          type='file'
          className='form-control'
          accept='image/*'
          onChange={(e) => setImage(e.target.files[0])}
        />
        <Form.Group>
          <Form.Label>product Name</Form.Label>
          <Form.Control
            type='text'
            name='productName'
            value={newProductData.productName}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Type</Form.Label>
          <Form.Control
            type='text'
            name='type'
            value={newProductData.type}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Order</Form.Label>
          <Form.Control
            type='text'
            name='order'
            value={newProductData.order}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Price</Form.Label>
          <Form.Control
            type='text'
            name='price'
            value={newProductData.price}
            onChange={handleChange}
          />
          <div className='form-check mt-2 mb-2'>
            <label className='w-100 form-check-label' htmlFor='is_enabled'>
              active
              <input
                type='checkbox'
                id='is_enabled'
                name='is_enabled'
                className='form-check-input'
                onChange={handleChange}
                checked={newProductData.is_enabled === 1}
              />
            </label>
          </div>
        </Form.Group>
        <Button type='submit'>
          <IoCloudUploadOutline />
        </Button>
      </Form>
      <ProductTable allImage={allImage} />
    </Col>
  );
}

export default AdminProductUpload;
