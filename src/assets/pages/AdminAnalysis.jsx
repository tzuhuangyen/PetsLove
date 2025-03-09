import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from 'chart.js';

// 注册所需的组件
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const AdminAnalysis = () => {
  // 模拟数据
  const orderData = [
    { id: 1, product: 'product A', amount: 100, date: '2024-09-01' },
    { id: 2, product: 'product B', amount: 200, date: '2024-09-02' },
    { id: 3, product: 'product C', amount: 150, date: '2024-09-03' },
    { id: 4, product: 'product D', amount: 300, date: '2024-09-04' },
  ];

  const salesData = {
    labels: ['Jan', 'Feb', 'Mar', 'April', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue',
        data: [1000, 1200, 800, 1500, 2000, 2500],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const orderChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'April', 'May', 'Jun'],
    datasets: [
      {
        label: 'Orders',
        data: [5, 10, 15, 8, 12, 18],
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <Container fluid>
      <h1 className='mt-4'>Dashboard</h1>
      <Row>
        <Col md={6}>
          <Card className='mb-4'>
            <Card.Body>
              <Card.Title>Sales Analysis Chart</Card.Title>
              <Line data={salesData} options={{ responsive: true }} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className='mb-4'>
            <Card.Body>
              <Card.Title>Order Quantity Analysis Chart"</Card.Title>
              <Bar data={orderChartData} options={{ responsive: true }} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Card className='mt-4'>
        <Card.Body>
          <Card.Title>orderData</Card.Title>
          <ul>
            {orderData.map((order) => (
              <li key={order.id}>
                {order.product} - ${order.amount} - {order.date}
              </li>
            ))}
          </ul>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AdminAnalysis;
