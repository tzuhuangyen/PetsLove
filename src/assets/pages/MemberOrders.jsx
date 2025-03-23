import React, { useState, useEffect } from 'react';
import {
  Tab,
  Nav,
  Modal,
  Button,
  Table,
  Container,
  Spinner,
} from 'react-bootstrap';
import { CiShoppingCart } from 'react-icons/ci';
import { ImSad } from 'react-icons/im';
import { MdOutlineRateReview } from 'react-icons/md';
import { useLocation, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { backendUrl } from '../../../config.js';

export const MemberOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [activeTab, setActiveTab] = useState('all'); // 預設顯示所有訂單
  const [searchParams] = useSearchParams();
  const location = useLocation();
  // v Check for URL parameters or state for active tab
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (
      tabParam &&
      ['all', 'processing', 'shipped', 'review', 'return'].includes(tabParam)
    ) {
      setActiveTab(tabParam);
    }

    // If coming from checkout with location state
    if (location.state && location.state.highlightOrderId) {
      setActiveTab('processing');
    }
  }, [searchParams, location]);

  // v Fetch all orders when component mounts
  useEffect(() => {
    try {
      console.log('Fetching orders...');

      fetchOrders();
    } catch (err) {
      console.error('Error fetching orders::', err);
      setError('Failed to load your orders. Please try again later.');
      setLoading(false);
    }
  }, []);

  const fetchOrders = async () => {
    try {
      console.log('Fetching orders...');
      setLoading(true);
      setError(null);

      // Get JWT from localStorage or AuthContext
      const token = localStorage.getItem('token');
      console.log('Token:', token);

      // Make API request with authentication
      const response = await axios.get(
        `${backendUrl}/api/users/member/getUserAllOrders`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('API response:', response.data);
      setOrders(response.data.orders || []);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError('Failed to load your orders. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleTabSelect = (tabName) => {
    setActiveTab(tabName);
  };

  const openOrderDetails = (order) => {
    console.log('Opening order details:', order);
    setSelectedOrder(order || null);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  // Filter orders based on their status
  const getFilteredOrders = (status) => {
    if (status === 'all') return orders;

    // Handle different status values (normalized to lowercase for consistency)
    return orders.filter((order) => {
      const orderStatus = (order.status || order.state || '').toLowerCase();
      return orderStatus === status.toLowerCase();
    });
  };
  // Render order table with filtered data
  const OrderTable = ({ status }) => {
    const filteredOrders = getFilteredOrders(status);
    console.log('Rendering OrderTable for status:', status);

    if (loading) {
      console.log('Loading:', loading);

      return (
        <div className='text-center p-5'>
          <Spinner animation='border' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </Spinner>
          <p className='mt-3'>Loading your orders...</p>
        </div>
      );
    }

    if (error) {
      console.log('Error:', error);

      return <div className='alert alert-danger'>{error}</div>;
    }

    if (filteredOrders.length === 0) {
      console.log('Orders:', orders);

      return (
        <div className='text-center p-4'>
          <ImSad size={30} className='mb-2' />
          <p>No orders found in this category</p>
          <CiShoppingCart size={25} />
        </div>
      );
    }

    return (
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Status</th>
            <th>Total</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.status}</td>
              <td>${parseFloat(order.total).toFixed(2)}</td>
              <td>{order.date}</td>
              <td>
                <Button
                  variant='outline-primary'
                  className='me-2'
                  onClick={() => openOrderDetails(order)}
                >
                  Details
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };
  console.log('MemberOrders组件开始渲染'); // 添加调试信息
  // 先渲染一个简单的组件，测试路由是否正常工作
  // return (
  //   <div className='container mt-5 p-4 border'>
  //     <h2 className='text-center mb-4'>MY ORDERS - 测试页面</h2>
  //     <p>如果您看到此消息，说明路由工作正常！</p>
  //     <Button onClick={() => alert('按钮点击测试')}>测试按钮</Button>
  //   </div>
  // );
  return (
    <div className='container mt-5'>
      <h2 className='text-center mb-4'>My Orders</h2>

      <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
        <Nav variant='tabs' className='mb-4'>
          <Nav.Item>
            <Nav.Link eventKey='all'>All Orders</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey='processing'>Processing</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey='shipped'>Shipped</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey='delivered'>Delivered</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey='return'>Returns</Nav.Link>
          </Nav.Item>
        </Nav>

        <Tab.Content>
          <Tab.Pane eventKey='all'>
            <OrderTable status='all' />
          </Tab.Pane>
          <Tab.Pane eventKey='processing'>
            <OrderTable status='processing' />
          </Tab.Pane>
          <Tab.Pane eventKey='shipped'>
            <OrderTable status='shipped' />
          </Tab.Pane>
          <Tab.Pane eventKey='delivered'>
            <OrderTable status='delivered' />
          </Tab.Pane>
          <Tab.Pane eventKey='return'>
            <OrderTable status='return' />
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>

      {/* Modal for order details */}
      <Modal show={showModal} onHide={closeModal} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedOrder
              ? `Order Details #${selectedOrder.id}`
              : 'Order Details'}{' '}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrder ? (
            <>
              <p>
                <strong>Order Date:</strong> {selectedOrder.date || 'N/A'}
              </p>
              <p>
                <strong>Status:</strong> {selectedOrder.status || 'N/A'}
              </p>
              <p>
                <strong>Total Amount:</strong> $
                {selectedOrder.total
                  ? parseFloat(selectedOrder.total).toFixed(2)
                  : '0.00'}
              </p>

              <h5 className='mt-4'>Order Items</h5>
              {/* Here you would display the order items, which would come from your API */}
              <p>Items would be listed here...</p>

              <h5 className='mt-4'>Shipping Information</h5>
              <p>Shipping details would be shown here...</p>
            </>
          ) : (
            <p>No order details available.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={closeModal}>
            Close
          </Button>
          {selectedOrder?.status.toLowerCase() === 'shipped' && (
            <Button variant='success'>Track Shipment</Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );

  // const openModal = () => {
  //   setShowModal(true);
  // };
};
