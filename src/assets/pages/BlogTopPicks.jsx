import React from 'react';
import { Col, Card, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import topick1 from '/images/type1.png';
import topick2 from '/images/type2.png';
import topick3 from '/images/type6.png';

const topPicks = [
  {
    id: 'topick1',
    title: 'Chewy Beef Bites',
    text: "These bite-sized treats are perfect for training and rewarding your pet. Made from high-quality beef, they're both delicious and nutritious.",
    imageSrc: topick1,
  },
  {
    id: 'topick2',
    title: 'Crunchy Bone Treats',
    text: 'Packed with flavor, these bone-shaped treats are perfect for keeping your dog entertained while supporting dental health.',
    imageSrc: topick2,
  },
  {
    id: 'topick3',
    title: 'Carrot and Chicken Twist',
    text: 'A healthy mix of vegetables and beef in thin strips, these treats are ideal for light snacking.',
    imageSrc: topick3,
  },
];

const BlogTopPicks = () => {
  return (
    <>
      {topPicks.map((product) => (
        <Col
          className='d-flex flex-column'
          key={product.id}
          xs={12}
          sm={6}
          md={4}
        >
          <Card className='flex-grow-1 d-flex flex-column h-100'>
            <Card.Img
              src={product.imageSrc}
              className='fixed-img-height card-img-top'
              alt={product.title}
            />
            <Card.Body className='d-flex flex-column flex-grow-1'>
              <Card.Title className='fs-4 '>{product.title}</Card.Title>
              <Card.Text className='flex-grow-1 mt-2'>{product.text}</Card.Text>
              <Button variant='primary' className='mt-2'>
                more
              </Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </>
  );
};

export default BlogTopPicks;
