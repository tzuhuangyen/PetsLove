import React, { useState, useEffect } from 'react';
import { Tab, Nav, Modal, Button, Table, Container } from 'react-bootstrap';
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

  // Check for URL parameters or state for active tab
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

  // Fetch all orders when component mounts
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get JWT from localStorage or AuthContext
      const token = localStorage.getItem('jwt');

      // Make API request with authentication
      const response = await axios.get(
        `${backendUrl}/api/users/member/orders`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrders(response.data);
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
    setSelectedOrder(order);
    setShowModal(true);
  };

  // const openModal = () => {
  //   setShowModal(true);
  // };
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

    if (loading) {
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
      return <div className='alert alert-danger'>{error}</div>;
    }

    if (filteredOrders.length === 0) {
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
            <tr
              key={order.id}
              className={
                location.state?.highlightOrderId === order.id
                  ? 'table-primary'
                  : ''
              }
            >
              <td>{order.id}</td>
              <td>{order.state || order.status}</td>
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

                {(order.status === 'shipped' || order.state === 'Shipped') && (
                  <Button variant='success'>Track</Button>
                )}

                {(order.status === 'delivered' ||
                  order.state === 'Delivered') && (
                  <Button variant='info'>Review</Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };

  return (
    <div className='container mt-5'>
      <h2 className='text-center mb-4'>MY ORDERS</h2>

      <Tab.Container activeKey={activeTab} onSelect={handleTabSelect}>
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
          <Modal.Title>Order Details #{selectedOrder?.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrder && (
            <>
              <p>
                <strong>Order Date:</strong> {selectedOrder.date}
              </p>
              <p>
                <strong>Status:</strong> {selectedOrder.status}
              </p>
              <p>
                <strong>Total Amount:</strong> $
                {parseFloat(selectedOrder.total).toFixed(2)}
              </p>

              <h5 className='mt-4'>Order Items</h5>
              {/* Here you would display the order items, which would come from your API */}
              <p>Items would be listed here...</p>

              <h5 className='mt-4'>Shipping Information</h5>
              <p>Shipping details would be shown here...</p>
            </>
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
};
