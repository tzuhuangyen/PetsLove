import React, { useState } from 'react';
import { Tab, Nav, Modal, Button, Table, Container } from 'react-bootstrap';
import { CiShoppingCart } from 'react-icons/ci';
import { ImSad } from 'react-icons/im';
import { MdOutlineRateReview } from 'react-icons/md';

//test orders list
const OrdersPage = () => {
  const allOrders = [
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
      state: 'shipped',
      total: 150.0,
      status: 'processing',
    },
    {
      id: 3,
      date: '2024-08-16',
      state: 'processing',
      total: 150.0,
      status: 'processing',
    },
  ];

  const renderAllOrders = () => {
    return allOrders.map((order) => (
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
        <tbody>{renderAllOrders()}</tbody>
      </Table>
    </Container>
  );
};
const ProcessOrdersPage = () => {
  const processOrders = [
    {
      id: 1,
      date: '2024-06-15',
      state: 'Processing',
      total: 100.0,
      status: 'processing',
    },
  ];

  const renderProcessOrders = () => {
    return processOrders.map((order) => (
      <tr key={order.id}>
        <td>{order.id}</td>
        <td>{order.state}</td>
        <td>${order.total.toFixed(2)}</td> <td>{order.date}</td>
        <td>
          {order.status === 'shipped' ? (
            <Button variant='success'>Track</Button>
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
        <tbody>{renderProcessOrders()}</tbody>
      </Table>
    </Container>
  );
};
const ShippedOrdersPage = () => {
  const shippedOrders = [
    {
      id: 1,
      date: '2024-06-15',
      state: 'Shipped',
      total: 100.0,
      status: 'Shipped',
    },
  ];

  const renderShippedOrders = () => {
    return shippedOrders.map((order) => (
      <tr key={order.id}>
        <td>{order.id}</td>
        <td>{order.state}</td>
        <td>${order.total.toFixed(2)}</td> <td>{order.date}</td>
        <td>
          <Button variant='success'>Track</Button>
          {/* {order.status === 'shipped' ? (
            <Button variant='success'>Track</Button>
          ) : (
            <Button variant='info'>Review</Button>
          )} */}
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
        <tbody>{renderShippedOrders()}</tbody>
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
                <ProcessOrdersPage />
                <ImSad /> it is empty here
                <CiShoppingCart />
              </p>
              {/* Placeholder content for processing orders */}
            </Tab.Pane>
            <Tab.Pane eventKey='shipped'>
              <ShippedOrdersPage />
              {/* Placeholder content for shipped orders */}
            </Tab.Pane>
            <Tab.Pane eventKey='review'>
              <p>
                <ImSad /> it is empty here
                <MdOutlineRateReview />
              </p>
              {/* Placeholder content for review orders */}
            </Tab.Pane>
            <Tab.Pane eventKey='return'>
              <p>
                it is empty here
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
