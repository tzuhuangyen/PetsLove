import { backendUrl } from '../../../config.js';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table, Button } from 'react-bootstrap';
import { FiEdit2 } from 'react-icons/fi';
import { MdOutlineDeleteForever } from 'react-icons/md';
import { useOutletContext } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ProductTable from './component/ProductTable';
import { Nav, Row, Col } from 'react-bootstrap';

function AdminProducts() {
  const [allImage, setAllImage] = useState(null);

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
    <>
      <Row>
        <Col md={8}>
          <h1> Product List</h1>
          <ProductTable allImage={allImage} />
        </Col>
        <Col md={2} className='mt-3'>
          <Link
            as={Link}
            to='/admin/products/uploadProduct'
            className='btn btn-primary'
          >
            Add new product
          </Link>
        </Col>
      </Row>
    </>
  );
}

export default AdminProducts;
