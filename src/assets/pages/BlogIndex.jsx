import React from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Image, Button } from 'react-bootstrap';
import IndexBlog from './component/IndexBlog';
import BlogTopPicks from './BlogTopPicks';
import BlogIndexSidebar from './BlogIndexSidebar';
import BlogMemes from './BlogMemes';

const BlogIndex = () => {
  return (
    <>
      <Container fluid='md blogArticles'>
        <Row className='mb-4'>
          {/* main article area */}
          <Col xs={12} md={9}>
            <Outlet />
            <BlogMemes />
            <IndexBlog />
          </Col>

          {/* blog index sidebar area */}
          <Col sm={12} md={3} className='mt-5 '>
            <BlogIndexSidebar />
          </Col>
          {/* 新闻列表展示 */}
          {/* <Col xs={12} md={9}>
            <section className='indexBlog mt-4 d-md-block pb-md-8'>
              <div className='container pb-4'>
                {news.length > 0 ? (
                  news.map((item, id) => (
                    <div
                      className='card shadow-sm p-3 mb-5 bg-body rounded'
                      key={id}
                    >
                      <div className='row'>
                        <div className='col-md-4 col-12'>
                          <h5 className='card-title'>
                            {item.title || 'No title available'}
                          </h5>
                          <p>{item.author}</p>
                          <span className='card-text text-muted'>
                            {item.publish_date || 'Unknown date'}
                          </span>
                          <img
                            src={item.image || '/path/to/placeholder.png'}
                            className='img-fluid'
                            alt={item.title || 'Article Image'}
                          />
                        </div>
                        <div className='col-md-8 col-12'>
                          <div className='card-body'>
                            <p className='card-text lh-sm'>
                              {item.summary || 'No summary available'}
                            </p>
                            <p>{item.text}</p>
                            <p>{item.url}</p>
                            <Nav.Link
                              className='text-end mt-2'
                              href={item.url || '#'}
                              target='_blank'
                              rel='noopener noreferrer'
                            >
                              <Button className='readMoreBtn p-2'>
                                {' '}
                                Read More
                              </Button>
                            </Nav.Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No news available</p>
                )}
              </div>
            </section>
          </Col> */}
        </Row>
        {/* BlogTopPicks */}
        <Row className='mb-4'>
          <h3 className='mb-3'>Our Top Picks for Pets Treats</h3>
          <BlogTopPicks />
        </Row>
      </Container>
    </>
  );
};

export default BlogIndex;
