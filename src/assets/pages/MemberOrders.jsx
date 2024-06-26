import React, { useState } from 'react';
import { Tab, Nav, Modal, Button, Table, Container } from 'react-bootstrap';
import { CiShoppingCart } from 'react-icons/ci';
import { ImSad } from 'react-icons/im';
import { MdOutlineRateReview } from 'react-icons/md';

//test orders list
const OrdersPage = () => {
  const orders = [
    {
      id: 1,
      date: '2024-06-15',
      state: 'Delivered',
      total: 100.0,
      status: 'shipped',
    },
    {
      id: 2,
      date: '2024-06-16',
      state: 'Processing',
      total: 150.0,
      status: 'processing',
    },
  ];

  const renderOrders = () => {
    return orders.map((order) => (
      <tr key={order.id}>
        <td>{order.id}</td>
        <td>{order.state}</td>
        <td>${order.total.toFixed(2)}</td> <td>{order.date}</td>
        <td>
          {order.status === 'shipped' ? (
            <Button variant='success'>Review</Button>
          ) : (
            <Button variant='info'>Track</Button>
          )}
        </td>
      </tr>
    ));
  };

  return (
    <Container className='mt-5'>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>State</th>
            <th>Total</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{renderOrders()}</tbody>
      </Table>
    </Container>
  );
};

export const MemberOrders = () => {
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState('all'); // 預設顯示所有訂單
  const handleTabSelect = (tabName) => {
    setActiveTab(tabName);
  };
  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <div>
      {' '}
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
              <Nav.Link eventKey='review'>Review</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey='return'>Return</Nav.Link>
            </Nav.Item>
          </Nav>

          <Tab.Content>
            <Tab.Pane eventKey='all'>
              <OrdersPage />{' '}
            </Tab.Pane>
            <Tab.Pane eventKey='processing'>
              <h4>Processing Orders</h4>
              <p>
                <ImSad /> it is empty here
                <CiShoppingCart />
              </p>
              {/* Placeholder content for processing orders */}
            </Tab.Pane>
            <Tab.Pane eventKey='shipped'>
              <h3>Shipped Orders</h3>

              {/* Placeholder content for shipped orders */}
            </Tab.Pane>
            <Tab.Pane eventKey='review'>
              <h3>Review Orders</h3>{' '}
              <p>
                <ImSad /> it is empty here
                <MdOutlineRateReview />
              </p>
              {/* Placeholder content for review orders */}
            </Tab.Pane>
            <Tab.Pane eventKey='return'>
              <h3>Return Orders</h3>{' '}
              <p>
                <ImSad /> it is empty here
                <CiShoppingCart />
              </p>
              {/* Placeholder content for return orders */}
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>

        {/* Modal for displaying details */}
        <Modal show={showModal} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Order Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* Replace with actual order details */}
            <p>Order ID: 123456</p>
            <p>Order Date: 2024-06-15</p>
            <p>Total Amount: $100.00</p>
            <p>Status: Processing</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={closeModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};
