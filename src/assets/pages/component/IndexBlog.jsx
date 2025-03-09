import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import footprint from '/images/footprint.png';

//articles
import blog1 from '/images/blog1.jpg';
import blog2 from '/images/blog2.jpg';
import blog3 from '/images/blog3.jpg';
import { Container, Row, Col, Card, Nav, Button } from 'react-bootstrap';

const articles = [
  {
    id: 'article1',
    img: blog1,
    date: 'Feb 05, 2024',
    author: 'Darren Brownbill',
    title: 'Top 5 benefits of indestructible dog toys',
    tags: '#dogs #toys',
    description:
      "Whether your pup chews through their toys out of boredom, or they’re simply just an aggressive chewer, you’re likely getting tired of having to replace their toys so often. If you’ve tried everything to curb your canine's destructive habits …",
  },
  {
    id: 'article2',
    img: blog2,
    date: 'Dec 04, 2023',
    author: 'Darren Brownbill',
    title: '4 things to look out for when shopping for dog treats',
    tags: '#treats',
    description:
      'If you’re a dog owner, then you’ll know that having a plentiful supply of treats is essential. Whether you use them for reward-based training, or simply as a snack to tide your dog over from breakfast to dinner, it’s important to make sure that you’re always stocked up.',
  },
  {
    id: 'article3',
    img: blog3,
    date: 'Nov 10, 2023',
    author: 'Darren Brownbill',
    title: '3 easy ways to have a pet-friendly Christmas',
    tags: '#Christmas #pet-friendly',
    description:
      'With Halloween and Bonfire night done and dusted, it’s time to start thinking about Christmas. Whether you’re a Christmas fanatic or the C-word is banned in your home until – at least – the 1st of December, it definitely doesn’t hurt to start thinking about your plans.',
  },
];

function IndexBlog() {
  return (
    <>
      <section className='indexBlog mt-4  d-md-block pb-md-8'>
        <Container className=' pb-4'>
          <h2 className='text-center pt-md-8'>
            <span>
              <img src={footprint} alt='footprint' />
            </span>
            Facts & Fun
            <span>
              <img src={footprint} alt='footprint' />
            </span>
          </h2>
          {articles.map((article) => (
            <Card className=' shadow-sm p-3 mb-5 bg-body rounded'>
              <Row>
                <Col md={4} sm={12}>
                  <Card.Img
                    src={article.img}
                    className='img-fluid'
                    alt={article.title}
                  />
                </Col>
                <Col md={8} sm={12}>
                  <Card.Body>
                    <span className='card-text text-muted'>
                      {article.author} - {article.date}{' '}
                    </span>
                    <Card.Title>{article.title} </Card.Title>

                    <Card.Text className=' mb-1'>
                      <small className='text-muted'>{article.tags}</small>
                      <p className='card-text lh-sm'>{article.description}</p>
                    </Card.Text>

                    <Nav.Link
                      className='text-end mt-2'
                      eventKey={2}
                      as={Link}
                      to={`/blog/articles/${article.id}`}
                    >
                      <Button className='readMoreBtn p-2'> Read More</Button>
                    </Nav.Link>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          ))}
        </Container>
      </section>
    </>
  );
}

export default IndexBlog;
