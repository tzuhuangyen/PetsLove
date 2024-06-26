import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
  useLocation,
  Link,
  Navigate,
} from 'react-router-dom';

import axios from 'axios';
import {
  Container,
  Nav,
  Row,
  Col,
  ListGroup,
  Card,
  Form,
  Button,
  Image,
  InputGroup,
  FormControl,
  Alert,
} from 'react-bootstrap';

import { BsTrash, BsHeart } from 'react-icons/bs';
import {
  FaRegCheckCircle,
  FaCheckCircle,
  FaShieldAlt,
  FaBolt,
  FaLock,
  FaTimes,
} from 'react-icons/fa';

import { backendUrl } from '../../../config.js';
import { useProgress } from './Context/ProgressContext';
import Confetti from 'react-confetti';
import { useCart } from './Context/CartContext.jsx';
import { useAuth } from './Context/AuthContext.jsx';
//訂單付款進度條
export const ProgressBar = ({ steps, currentStep }) => {
  return (
    <div className='progress-bar'>
      {steps.map((step, index) => (
        <div
          key={index}
          className={`progress-step ${index <= currentStep ? 'completed' : ''}`}
        >
          <div className='progress-line'></div>
          <div className='progress-circle'></div>
          <div
            className={`progress-label ${
              index === currentStep ? 'active' : ''
            }`}
          >
            {step}
          </div>
        </div>
      ))}
    </div>
  );
};
// 購物車列表組件
/**
 * The `MemberCart` component represents the shopping cart page for a logged-in user.
 * It fetches the user's cart items from the backend, displays them, and allows the user to update quantities and remove items.
 * The component also handles the checkout process, navigating the user to the order summary page if they are logged in, or the login page if they are not.
 */
/**
 * The `PaymentDetails` component represents the payment details page of the checkout process.
 * It allows the user to enter their credit card information, which is then processed for the payment.
 * The component uses the `useProgress` hook to handle the progress of the checkout process, and navigates the user to the next step (order finalization) when the payment details are submitted.
 */
export const MemberCart = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  //get Login User CartItems from db
  const [cartItems, setCartItems] = useState([]);
  const location = useLocation();
  const { handleNextStep } = useProgress();
  const navigate = useNavigate();
  //display localstorage cart items
  const { localCart, setLocalCart } = useCart(); // Use cart context
  const { authState } = useAuth();
  const steps = ['Cart', 'Order Summary', 'Payment', 'Finalization'];
  const currentStep = 0;

  const goToNextStep = () => {
    const { handleNextStep } = useProgress();
    handleNextStep();
    navigate('/users/member/order-summary');
  };
  useEffect(() => {
    getAllCartItems();
  }, [token]);

  const handleQtyChange = async (id, quantity) => {
    if (quantity < 1) {
      quantity = 1; // 確保數量至少為1
    }
    // Update quantity in the local state
    const updatedCartItems = localCart.map((item) =>
      item._id === id ? { ...item, quantity: quantity } : item
    );
    setLocalCart(updatedCartItems);
    // try {
    //   await axios.patch(
    //     `${backendUrl}/api/users/member/cart/${id}`,
    //     { quantity: quantity },
    //     {
    //       headers: { Authorization: `Bearer ${token}` },
    //     }
    //   );
    //   console.log('Quantity updated');
    // } catch (error) {
    //   console.error('Error updating quantity:', error);
    // }
  };

  const handleDelete = (_id) => {
    console.log('Deleting item with id:', _id);
    const updateDeleteItem = localCart.filter((item) => item._id !== _id);
    setLocalCart(updateDeleteItem);
    console.log('Cart after deletion:', updateDeleteItem);
  };

  const totalAmount = localCart?.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  //check user is login or not
  const handleCheckout = () => {
    console.log('Is Authenticated:', authState.isAuthenticated);
    if (authState.isAuthenticated) {
      navigate('/users/member/order-summary');
    } else {
      console.log('Navigating to Login page');
      // window.location.href = 'MERN-petslove/users/login';

      navigate('/users/login');
    }
  };

  //get login user's cart from db
  const getAllCartItems = async () => {
    try {
      if (token) {
        const response = await axios.get(
          `${backendUrl}/api/users/member/cart`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        // console.log('User Id:', response.data.cart.userId.username);
        console.log('get user All db CartItems:', response.data.cart?.items);
        setCartItems(response.data.cart?.items);
      }
    } catch (error) {
      console.error('Error fetching db cartItems:', error);
      console.dir('Error fetching db cartItems:', error);
      console.error(
        'Error details:',
        error.response ? error.response.data : error.message
      );
    }
  };
  return (
    <div>
      <h2 className='mb-4'>Shopping Cart</h2>
      {localCart?.map((item) => (
        <Card className='mb-3' key={item._id}>
          <Card.Body>
            <Row className='d-flex align-items-center'>
              <Col md={2}>
                <Image
                  src={`${backendUrl}/adminProducts/${item.image}`}
                  fluid
                  style={{ maxHeight: '100px' }}
                  alt={item.productName}
                />
              </Col>
              <Col md={3}>
                <Card.Title>{item.productName}</Card.Title>
                <Card.Text>${item.price}</Card.Text>
              </Col>
              <Col md={2}>
                <Form.Control
                  type='number'
                  value={item.quantity}
                  onChange={(e) =>
                    handleQtyChange(item._id, parseInt(e.target.value))
                  }
                  min='1'
                />
              </Col>
              <Col md={2}>
                <Card.Text>${item.price * item.quantity}</Card.Text>
              </Col>
              <Col md={1}>
                <Button variant='link' onClick={() => handleDelete(item._id)}>
                  <BsTrash />
                </Button>
              </Col>
              <Col md={1}>
                <Button variant='link'>
                  <BsHeart />
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ))}
      <Card className='p-3'>
        <Row
          className='d-flex
      align-items-center'
        >
          <Col md={4}>Total Amount</Col>
          <Col md={5} className='text-end pe-5'>
            ${totalAmount}
          </Col>
          <Col md={3}>
            <Nav.Link to='#' className='text-end mt-2' eventKey={2}>
              <Button
                onClick={handleCheckout}
                variant='primary'
                className='readMoreBtn p-2 fs-6'
              >
                CheckOut
              </Button>
            </Nav.Link>
          </Col>
        </Row>
      </Card>
    </div>
  );
};
// 付款詳情頁面組件
export const PaymentDetails = () => {
  const [cardInfo, setCardInfo] = useState({
    cardNumber: '',
    name: '',
    expiry: '',
    cvv: '',
  });
  const { handleNextStep } = useProgress();

  const navigate = useNavigate();

  const goToNextStep = () => {
    handleNextStep();
    navigate('/users/member/order-finalization');
  };

  const handleChange = (e) => {
    setCardInfo({ ...cardInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(cardInfo);
    // 在這裡處理信用卡支付邏輯
  };

  return (
    <div>
      {' '}
      <Card className='p-4'>
        <Form onSubmit={handleSubmit}>
          <Form.Group className='mb-3' controlId='formCardNumber'>
            <Form.Label>Card number</Form.Label>
            <Form.Control
              type='text'
              placeholder='Card number'
              name='cardNumber'
              value={cardInfo.cardNumber}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='formCardName'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Name'
              name='name'
              value={cardInfo.name}
              onChange={handleChange}
            />
          </Form.Group>

          <Row>
            <Col>
              <Form.Group className='mb-3' controlId='formCardExpiry'>
                <Form.Label>expired</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='MM/YY'
                  name='expiry'
                  value={cardInfo.expiry}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className='mb-3' controlId='formCardCVV'>
                <Form.Label>CVV</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='CVV'
                  name='cvv'
                  value={cardInfo.cvv}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Check
            type='checkbox'
            label='By submitting the order, I accept the General Terms of Use.'
            className='mb-3 fs-6 '
          />
          <Nav.Link
            className='mt-2 text-center'
            eventKey={2}
            as={Link}
            to='/users/member/order-PaymentSecurity'
          >
            <Button
              variant='primary'
              className='order-btn'
              onClick={goToNextStep}
            >
              place an order
            </Button>
          </Nav.Link>
        </Form>
      </Card>
    </div>
  );
};
export const CouponCode = () => {
  const [coupon, setCoupon] = useState('');
  const [message, setMessage] = useState('');

  const handleApply = () => {
    // 在这里处理应用优惠券的逻辑
    setMessage('1 coupon(s) have been used');
  };

  return (
    <div>
      <Form.Group>
        <div className='d-flex align-items-baseline justify-content-between'>
          <Form.Label className='mt-4'>Coupon Code</Form.Label>
          <Form.Text className='text-muted'>
            <a href='#'>My Coupons</a>
          </Form.Text>
        </div>

        <InputGroup>
          <FormControl
            type='text'
            placeholder='Enter coupon code'
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
          />
          <Button variant='outline-primary' onClick={handleApply}>
            Apply
          </Button>
        </InputGroup>
      </Form.Group>
      {message && <p>{message}</p>}
    </div>
  );
};

// 訂單詳情頁面組件
export const OrderSummary = () => {
  const { handleNextStep } = useProgress();
  const navigate = useNavigate();

  const goToNextStep = () => {
    handleNextStep();
    navigate('/users/member/order-payment');
  };
  return (
    <Container className='order-summary mt-5'>
      <h2 className='text-center mb-4'>Order summary</h2>
      <Row className='mb-3'>
        <Col md={4}>
          <div className='order-section'>
            <div className='order-title d-flex align-items-center justify-content-between'>
              {' '}
              <h4>
                <span className='me-2'>
                  <FaRegCheckCircle />
                </span>
                Delivery
              </h4>
              <Button variant='link' className='edit-btn'>
                editing
              </Button>
            </div>

            <p className='fw-bold mb-3'>
              Personal collection at collection points
            </p>
            <p>easybox Bp. II district Budagyongye</p>
            <p>Budagyongye Szilágyi Erzsébet fasor 121 Bp, 1026</p>
          </div>
        </Col>
        <Col md={4}>
          <div className='order-section'>
            <div className='order-title d-flex align-items-center justify-content-between'>
              {' '}
              <h4>
                <span className='me-2'>
                  <FaRegCheckCircle />
                </span>
                Invoicing
              </h4>
              <Button variant='link' className='edit-btn'>
                editing
              </Button>
            </div>

            <p className='fw-bold mb-3'>Private person</p>
            <p>TZU HUANG YEN - 36730912912</p>
            <p>
              Postal code: , Budapest, II. district, Budapest, Gyergyó u. 4a
            </p>
            <p>yan0912@hotmail.com</p>
          </div>
        </Col>
        <Col md={4}>
          <div className='order-section'>
            <div className='order-title d-flex align-items-center justify-content-between'>
              {' '}
              <h4>
                <span className='me-2'>
                  <FaRegCheckCircle />
                </span>
                Payment
              </h4>
              <Button variant='link' className='edit-btn'>
                editing
              </Button>
            </div>

            <p className='fw-bold mb-3'>Online bank card payment</p>
            <p>
              After sending the order, you will be redirected to the payment
              page to enter your card details. Please note that your bank may
              send an SMS code to confirm the purchase (the interface may differ
              from bank to bank).
            </p>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className='order-details'>
            <div className='order-title d-flex align-items-center justify-content-between mb-4'>
              {' '}
              <h4>
                <span className='me-2'>
                  <FaRegCheckCircle />
                </span>
                Pets Love order
              </h4>
              <span className=' fw-lighter'>
                Expected time of collection: tomorrow, after 10:00
              </span>
            </div>

            <ListGroup>
              <ListGroup.Item>
                1 x Head & Shoulders Citrus Fresh Shampoo, 540 ml{' '}
                <span className='price'>HUF 2,887</span>
              </ListGroup.Item>
              <ListGroup.Item>
                1 x Power Caps Color washing capsules, 44 washes{' '}
                <span className='price'>HUF 5,299</span>
              </ListGroup.Item>
            </ListGroup>
            <div className='total mt-3'>
              <div className='total-title d-flex justify-content-between align-items-center '>
                {' '}
                <p>Delivery and cash on delivery costs: </p>
                <span className='free'>FREE</span>
              </div>
            </div>
            <CouponCode />
          </div>
        </Col>
        <h3 className='text-center mt-4 mb-4'>Total amount: HUF 8,186</h3>
      </Row>
      <PaymentDetails />
    </Container>
  );
};
//付款後安全驗證頁面組件
export const PaymentSecurity = () => {
  const navigate = useNavigate();
  const { handleNextStep } = useProgress();

  const goToNextStep = () => {
    handleNextStep();
    navigate('/users/member/order-finalization');
  };
  return (
    <Container className='mt-5'>
      <Card className='p-4'>
        <Row className='mb-4'>
          <Col>
            {' '}
            <p className='text-center mb-3'>
              Please wait for this window to close automatically.
            </p>
            <Alert variant='secondary' className='text-center'>
              <strong>Payment security</strong>
            </Alert>
          </Col>
        </Row>
        <Row className='mb-4'>
          <Col>
            <div className='d-flex justify-content-between align-items-center'>
              <div className='d-flex align-items-center'>
                <img
                  src='https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg' // Replace with VISA logo URL
                  alt='Visa Logo'
                  width='50'
                  className='me-3'
                />
                <h5 className='mb-0'>Payment request sent</h5>
              </div>
              <FaTimes />
            </div>
          </Col>
        </Row>
        <Row className='mb-4'>
          <Col>
            <p>
              We've sent you a payment request. Go to the Wise app on your
              registered device to approve it.
            </p>
          </Col>
        </Row>
        <Row className='mb-4'>
          <Col>
            <Card
              className='p-3'
              style={{ backgroundColor: '#f7f7f7', borderRadius: '8px' }}
            >
              <h5 className='mb-4 fw-bold'>
                <strong>Pet's Love</strong>
              </h5>
              <div className='d-flex justify-content-between mb-3'>
                <span>Date</span>
                <span>2024-05-31T18:05:40.964Z</span>
              </div>
              <div className='d-flex justify-content-between'>
                <span>Total</span>
                <span>Ft 8,186.00</span>
              </div>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col className='text-center'>
            <Button variant='danger' size='lg'>
              Cancel
            </Button>
          </Col>
        </Row>
      </Card>
      <Nav.Link
        className='mt-2 text-center'
        eventKey={2}
        as={Link}
        to='/users/member/order-finalization'
      >
        <Button className=' text-mute' onClick={goToNextStep}>
          test to order-finalization
        </Button>
      </Nav.Link>
    </Container>
  );
};
export const Finalization = () => {
  const [showConfetti, setShowConfetti] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 5000); // 5秒后停止动画
    return () => clearTimeout(timer);
  }, []);

  return (
    <Container className='mt-5'>
      {showConfetti && <Confetti />}

      <Card className='text-center p-4'>
        <Card.Body>
          <FaCheckCircle size={50} color='green' />
          <Card.Title className='mt-3'>
            Dear tzu yen, thank you for your order!
          </Card.Title>
          <Card.Text>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus,
            obcaecati.{' '}
            <Link to='/users/member/myOrders' className='mt-4'>
              View order
            </Link>
          </Card.Text>
        </Card.Body>
      </Card>

      <hr />

      <h5 className='text-center mb-4'>
        Activate the service to experience the experience of one-click payment
        or refund within 30 minutes!
      </h5>

      <div className='text-center mb-4'>
        <Button variant='primary' size='lg'>
          Save card
        </Button>
        <p className='mt-2'>
          By saving the card, you accept the{' '}
          <a href='#'>general conditions of use of the service</a>
        </p>
      </div>

      <Row className='text-center'>
        <Col md={4}>
          <FaShieldAlt size={50} />
          <h6 className='mt-2'>Secure transactions</h6>
          <p>
            Transactions are secured by an encrypted numerical code linked to
            the bank/credit card.
          </p>
        </Col>
        <Col md={4}>
          <FaBolt size={50} />
          <h6 className='mt-2'>Simple and fast</h6>
          <p>
            Save your card and enjoy the fastest payment experience with just
            one click. Pay with the saved card and you will get the money back
            within 30 minutes, when the order is returned.
          </p>
        </Col>
        <Col md={4}>
          <FaLock size={50} />
          <h6 className='mt-2'>For maximum security</h6>
          <p>
            eMAG does not store card data, the security of transactions is our
            priority, which is why we use the 3D Secure system.
          </p>
        </Col>
      </Row>
    </Container>
  );
};
