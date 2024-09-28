import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Row, Col } from 'react-bootstrap';
import product1 from '/public/images/proddetail-7.jpg';
import product2 from '/public/images/proddetail-9.jpg';
import product3 from '/public/images/proddetail-10.jpg';

const favoProducts = [
  {
    id: 1,
    title: 'Product 1',
    description: 'This is a description for Product 1.',
    imgSrc: product1,
  },
  {
    id: 2,
    title: 'Product 2',
    description: 'This is a description for Product 2.',
    imgSrc: product2,
  },
  {
    id: 3,
    title: 'Product 3',
    description: 'This is a description for Product 3.',
    imgSrc: product3,
  },
];

function MemberWishlist() {
  return (
    <>
      <h1>Wishlist</h1>
      <Row>
        {favoProducts.map((product) => (
          <Col md={4} key={product.id}>
            <Card className='mb-4 h-100 d-flex flex-column'>
              <Card.Img
                variant='top'
                src={product.imgSrc}
                className='img-fluid'
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <Card.Body className='d-flex flex-column'>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text className='flex-grow-1'>
                  {product.description}
                </Card.Text>
                <Button variant='primary'>Add to Card</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}
export default MemberWishlist;
