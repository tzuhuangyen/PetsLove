import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Table } from 'react-bootstrap';

const AdminOrders = () => {
  // Simulated order data with multiple items
  const [orders, setOrders] = useState([
    {
      id: 1,
      items: [
        {
          product: 'Product A',
          quantity: 2,
          amount: 100,
          details: 'Details about Product A',
          image: 'https://via.placeholder.com/100',
        },
        {
          product: 'Product B',
          quantity: 1,
          amount: 50,
          details: 'Details about Product B',
          image: 'https://via.placeholder.com/100',
        },
      ],
      status: 'Processing',
      paymentMethod: 'Cash on Delivery',
      date: '2024-09-01',
    },
    {
      id: 2,
      items: [
        {
          product: 'Product C',
          quantity: 1,
          amount: 200,
          details: 'Details about Product C',
          image: 'https://via.placeholder.com/100',
        },
      ],
      status: 'Paid',
      paymentMethod: 'Online Payment',
      date: '2024-09-02',
    },
    {
      id: 3,
      items: [
        {
          product: 'Product D',
          quantity: 3,
          amount: 150,
          details: 'Details about Product D',
          image: 'https://via.placeholder.com/100',
        },
      ],
      status: 'Cancelled',
      paymentMethod: 'Cash on Delivery',
      date: '2024-09-03',
    },
    {
      id: 4,
      items: [
        {
          product: 'Product E',
          quantity: 1,
          amount: 300,
          details: 'Details about Product E',
          image: 'https://via.placeholder.com/100',
        },
        {
          product: 'Product F',
          quantity: 2,
          amount: 100,
          details: 'Details about Product F',
          image: 'https://via.placeholder.com/100',
        },
      ],
      status: 'Processing',
      paymentMethod: 'Online Payment',
      date: '2024-09-04',
    },
  ]);

  const [filteredOrders, setFilteredOrders] = useState(orders);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [cancelledOrder, setCancelledOrder] = useState(null); // Track the cancelled order

  // Cancel order function
  const handleCancelOrder = (id) => {
    const updatedOrders = orders.map((order) =>
      order.id === id ? { ...order, status: 'Cancelled' } : order
    );
    setOrders(updatedOrders);
    setFilteredOrders(updatedOrders);
    setCancelledOrder(id); // Set the cancelled order ID
  };

  // Restore order function
  const handleRestoreOrder = (id) => {
    const updatedOrders = orders.map((order) =>
      order.id === id ? { ...order, status: 'Processing' } : order
    );
    setOrders(updatedOrders);
    setFilteredOrders(updatedOrders);
    setCancelledOrder(null); // Clear the cancelled order ID
  };

  // Filter orders by status
  const handleFilter = (status) => {
    if (status === 'All') {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(orders.filter((order) => order.status === status));
    }
  };

  // Order status color mapping
  const getStatusColor = (status) => {
    switch (status) {
      case 'Processing':
        return 'warning';
      case 'Paid':
        return 'success';
      case 'Cancelled':
        return 'danger';
      default:
        return 'secondary';
    }
  };

  // View order details
  const handleViewDetails = (order) => {
    setSelectedOrder(order);
  };

  return (
    <Container fluid>
      <h1 className='mt-4'>All Orders</h1>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Order List</Card.Title>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Status</th>
                    <th>Payment Method</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order.id} onClick={() => handleViewDetails(order)}>
                      <td>{order.id}</td>
                      <td>
                        <span
                          className={`badge bg-${getStatusColor(order.status)}`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td>{order.paymentMethod}</td>
                      <td>{order.date}</td>
                      <td>
                        {order.status === 'Cancelled' ? (
                          <Button
                            variant='success'
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRestoreOrder(order.id);
                            }}
                          >
                            Restore Order
                          </Button>
                        ) : (
                          <Button
                            variant='danger'
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCancelOrder(order.id);
                            }}
                          >
                            Cancel Order
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>

          {/* Order details */}
          {selectedOrder && (
            <Card className='mt-4'>
              <Card.Body>
                <Card.Title>Order Details</Card.Title>
                <p>
                  <strong>Order Number:</strong> {selectedOrder.id}
                </p>
                <p>
                  <strong>Order Date:</strong> {selectedOrder.date}
                </p>
                <p>
                  <strong>Payment Method:</strong> {selectedOrder.paymentMethod}
                </p>
                {selectedOrder.items.map((item, index) => (
                  <div
                    key={index}
                    className='mb-2'
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.product}
                      style={{ width: '100px', marginRight: '10px' }}
                    />
                    <div style={{ flex: 1 }}>
                      <strong>{item.product}</strong> - ${item.amount} x{' '}
                      {item.quantity}
                    </div>
                    <Button
                      variant='info'
                      size='sm'
                      onClick={() => alert(item.details)}
                    >
                      View Details
                    </Button>
                  </div>
                ))}
                <Button
                  variant='secondary'
                  onClick={() => setSelectedOrder(null)}
                >
                  Close
                </Button>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default AdminOrders;
