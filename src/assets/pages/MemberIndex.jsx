import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Outlet, useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import Logout from '../pages/component/Logout';
import { useContext } from 'react'; // 导入 useContext
import { AuthContext } from '../pages/Context/AuthContext'; // 导入 AuthContext

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

function MemberIndex() {
  console.log('MemberIndex组件正在渲染');
  const navigate = useNavigate();
  const location = useLocation(); // 添加这行
  const { authState } = useContext(AuthContext); // 获取 authState
  console.log('当前路径:', location.pathname); // 添加这行，检查当前路径

  // 在组件加载时检查用户是否已登录
  useEffect(() => {
    if (!authState.isAuthenticated) {
      console.log('User is not authenticated, redirecting to login'); // Debug line
      // 如果未登录，重定向到登录页面
      navigate('/users/login');
    }
  }, [authState.isAuthenticated, navigate]);

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
