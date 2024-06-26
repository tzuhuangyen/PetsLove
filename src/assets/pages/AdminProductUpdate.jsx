import React, { useState } from 'react';
// import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

//in ProductTable click edit btn link to here
//edit product form same as add product form
//how to connect same information to edit?
function AdminProductUpdate() {
  const [productName, setProductName] = useState();
  const [type, setType] = useState();
  const [order, setOrder] = useState();
  const [price, setPrice] = useState();

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const updatedProduct = {
  //     ...product,
  //     productName: productName,
  //     type: type,
  //     order: order,
  //     price: price,
  //   };
  //   onUpdate(updatedProduct);
  // };

  return (
    <div>
      <h1>AdminProductUpdate</h1>

      <Form>
        <Form.Group controlId='productName'>
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            type='text'
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder='Enter product name'
          />
        </Form.Group>
        <Form.Group controlId='type'>
          <Form.Label>Type</Form.Label>
          <Form.Control
            type='text'
            value={type}
            onChange={(e) => setType(e.target.value)}
            placeholder='Enter product type'
          />
        </Form.Group>
        <Form.Group controlId='order'>
          <Form.Label>Order</Form.Label>
          <Form.Control
            type='text'
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            placeholder='Enter product order'
          />
        </Form.Group>
        <Form.Group controlId='price'>
          <Form.Label>Price</Form.Label>
          <Form.Control
            type='text'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder='Enter product price'
          />
        </Form.Group>
        <Button variant='primary' type='submit'>
          Update Product
        </Button>
      </Form>
    </div>
  );
}

export default AdminProductUpdate;
