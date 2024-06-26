import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { Container, Nav, Row, Col } from 'react-bootstrap';

function AdminIndex() {
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();

  return (
    <div>
      <Container fluid>
        <Row className='p-4'>
          <Col md={2}>
            <Nav className='flex-column'>
              <Nav.Item>
                <Link
                  to='/admin/products'
                  className={
                    location.pathname === '/admin/products'
                      ? 'nav-link active'
                      : 'nav-link'
                  }
                  style={{ color: 'black' }}
                >
                  Products
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link
                  style={{ color: 'black' }}
                  to='/admin/orders'
                  className={
                    location.pathname === '/admin/orders'
                      ? 'nav-link active'
                      : 'nav-link'
                  }
                >
                  Orders
                </Link>
              </Nav.Item>

              <Nav.Item>
                <Link
                  to='/admin/analysis'
                  className={
                    location.pathname === '/admin/analysis'
                      ? 'nav-link active'
                      : 'nav-link'
                  }
                  style={{ color: 'black' }}
                >
                  AdminAnalysis
                </Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col md={10}>
            {' '}
            <Outlet />
          </Col>

          {/* context= {test} */}
        </Row>
      </Container>
    </div>
  );
}

export default AdminIndex;
