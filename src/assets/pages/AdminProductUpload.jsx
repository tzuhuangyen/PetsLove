import { backendUrl } from '../../../config.js';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';
import ProductTable from './component/ProductTable';
import { IoCloudUploadOutline } from 'react-icons/io5';
import Swal from 'sweetalert2';
// const MySwal = withReactContent(Swal);
// MySwal.fire({
//   title: <p>Hello World</p>,
//   didOpen: () => {
//     // `MySwal` is a subclass of `Swal` with all the same instance & static methods
//     MySwal.showLoading();
//   },
// }).then(() => {
//   return MySwal.fire(<p>Shorthand works too</p>);
// });

function AdminProductUpload() {
  // const [file, setFile] = useState(null); // 追加 file 状态来存储选择的文件
  const [image, setImage] = useState(null);
  const [allImage, setAllImage] = useState(null);
  const [productName, setProductName] = useState('');
  const [type, setType] = useState('');
  const [order, setOrder] = useState('');
  const [price, setPrice] = useState('');
  //handle upload
  const uploadImage = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('image', image);
    formData.append('productName', productName);
    formData.append('type', type);
    formData.append('order', order);
    formData.append('price', price);
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
      getAllImage();
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };
  //get all image products
  const getAllImage = () => {
    axios
      .get(`${backendUrl}/api/admin/products`)
      .then((res) => {
        console.log('All images:', res.data);
        setAllImage(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAllImage();
  }, []);

  return (
    <Col md={9}>
      <Form onSubmit={uploadImage}>
        <h1 className='text-center mb-5'>Add Product</h1>
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
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Type</Form.Label>
          <Form.Control
            type='text'
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Order</Form.Label>
          <Form.Control
            type='text'
            value={order}
            onChange={(e) => setOrder(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Price</Form.Label>
          <Form.Control
            type='text'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
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
