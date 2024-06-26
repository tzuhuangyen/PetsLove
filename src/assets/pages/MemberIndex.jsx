import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Outlet, useLocation, Link } from 'react-router-dom';
import axios from 'axios';

import {
  Container,
  Row,
  Col,
  ListGroup,
  Card,
  Button,
  Image,
  Form,
} from 'react-bootstrap';
import Logout from '../pages/component/Logout';

function MemberIndex() {
  return (
    <Container fluid='md' className='mt-4'>
      <Row className='mb-4'>
        <Col md={3} className='mb-4'>
          <ListGroup>
            <Link to='/users/member/myProfile'>
              <ListGroup.Item action>My Profile</ListGroup.Item>
            </Link>
            <Link to='/users/member/myOrders'>
              <ListGroup.Item action> My Orders</ListGroup.Item>
            </Link>
            <Link to='/users/member/myWishlist'>
              <ListGroup.Item action>My Favorite</ListGroup.Item>
            </Link>{' '}
            <Logout />
          </ListGroup>
        </Col>
        <Col md={9}>
          <Outlet />
        </Col>
      </Row>
      <Row></Row>
    </Container>
  );
}
export default MemberIndex;
