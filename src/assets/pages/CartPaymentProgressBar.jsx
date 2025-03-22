import React, { useState, useEffect, useContext, useCallback } from 'react';
import {
  BrowserRouter as Router,
  useNavigate,
  useLocation,
  Link,
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
  Spinner,
} from 'react-bootstrap';

import {
  BsTrash,
  BsHeart,
  BsArrowClockwise,
  BsPlusCircle,
  BsDashCircle,
} from 'react-icons/bs';
import {
  FaRegCheckCircle,
  FaCheckCircle,
  FaShieldAlt,
  FaBolt,
  FaLock,
  FaTimes,
  FaSync,
} from 'react-icons/fa';

import { backendUrl } from '../../../config.js';
import { useProgress } from './Context/ProgressContext';
import Confetti from 'react-confetti';
import { useCart } from './Context/CartContext.jsx';
import { useAuth } from './Context/AuthContext.jsx';
import EditAdd from './component/EditAdd';
import { useCartManager } from './component/useCartManager.jsx';

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

//會員購物車頁面
export const MemberCart = () => {
  const location = useLocation();
  const { handleNextStep } = useProgress();
  const navigate = useNavigate();

  // 引入 useCartManager 鉤子
  const { updateCartItemQuantity } = useCartManager();

  // Use cart context
  const {
    cartItems,
    setCartItems,
    removeFromCart,
    syncCartWithServer,
    verifyCartWithServer,
    isUpdating,
    updateError,
    lastSyncTime,
  } = useCart();

  const { authState } = useAuth();
  const steps = ['Cart', 'Order Summary', 'Payment', 'Finalization'];
  const currentStep = 0;
  const [failedImages, setFailedImages] = useState({});
  const [actionStatus, setActionStatus] = useState({
    action: null,
    success: false,
    message: '',
    timestamp: null,
  });

  // 當用戶點擊增加按鈕時
  const handleIncreaseQuantity = (itemId, currentQuantity) => {
    console.log(
      `Increasing quantity for item ${itemId} from ${currentQuantity} to ${
        currentQuantity + 1
      }`
    );
    console.log(
      `Increasing quantity for item ${itemId} from ${currentQuantity} to ${
        currentQuantity + 1
      }`
    );
    updateCartItemQuantity(itemId, currentQuantity + 1);
  };

  // 當用戶點擊減少按鈕時
  const handleDecreaseQuantity = (itemId, currentQuantity) => {
    if (currentQuantity > 1) {
      console.log(
        `Decreasing quantity for item ${itemId} from ${currentQuantity} to ${
          currentQuantity - 1
        }`
      );
      console.log(
        `Decreasing quantity for item ${itemId} from ${currentQuantity} to ${
          currentQuantity - 1
        }`
      );
      updateCartItemQuantity(itemId, currentQuantity - 1);
    }
  };

  // Handle quantity change
  const handleQtyChange = async (id, quantity) => {
    if (quantity < 1) {
      quantity = 1;
    }

    console.log(`MemberCart: Changing quantity for item ${id} to ${quantity}`);
    setActionStatus({
      action: 'update',
      success: false,
      message: `Updating quantity...`,
      timestamp: new Date().toISOString(),
    });
    try {
      // 使用新的 updateCartItemQuantity 函數
      await updateCartItemQuantity(id, quantity);

      setActionStatus({
        action: 'update',
        success: true,
        message: `Quantity updated successfully`,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error('MemberCart: Error updating quantity:', error);
      setActionStatus({
        action: 'update',
        success: false,
        message: `Error: ${error.message}`,
        timestamp: new Date().toISOString(),
      });
      // Verify cart to ensure consistency
      if (authState.isAuthenticated) {
        await verifyCartWithServer();
      }
    }
    // Clear success message after 2 seconds
    setTimeout(() => {
      setActionStatus((prev) => {
        if (prev.action === 'update') {
          return { action: null, success: false, message: '', timestamp: null };
        }
        return prev;
      });
    }, 2000);
  };

  // Handle delete item
  const handleDelete = async (itemId) => {
    console.log('MemberCart: Deleting item with id:', itemId);
    console.log(
      'MemberCart: Cart items before deletion:',
      JSON.stringify(cartItems)
    );

    setActionStatus({
      action: 'delete',
      success: false,
      message: `Removing item from cart...`,
      timestamp: new Date().toISOString(),
    });

    try {
      // Call the removeFromCart function from CartContext
      // This will handle both local state update and server sync
      const result = await removeFromCart(itemId);

      if (result.success) {
        setActionStatus({
          action: 'delete',
          success: true,
          message: `Item removed successfully`,
          timestamp: new Date().toISOString(),
        });
      } else {
        setActionStatus({
          action: 'delete',
          success: false,
          message: `Failed to remove item: ${result.error}`,
          timestamp: new Date().toISOString(),
        });
      }
    } catch (error) {
      console.error('MemberCart: Error removing item:', error);
      setActionStatus({
        action: 'delete',
        success: false,
        message: `Error: ${error.message}`,
        timestamp: new Date().toISOString(),
      });
    }

    // Clear success message after 2 seconds
    setTimeout(() => {
      setActionStatus((prev) => {
        if (prev.action === 'delete') {
          return { action: null, success: false, message: '', timestamp: null };
        }
        return prev;
      });
    }, 2000);
  };
  // Check user is login or not
  const handleCheckout = async () => {
    console.log('MemberCart: Is Authenticated:', authState.isAuthenticated);
    if (authState.isAuthenticated) {
      // Ensure cart is synced with server before checkout
      setActionStatus({
        action: 'checkout',
        success: false,
        message: `Syncing cart with server before checkout...`,
        timestamp: new Date().toISOString(),
      });

      try {
        const result = await syncCartWithServer('both');
        if (!result.success) {
          throw new Error(`Failed to sync cart: ${syncResult.error}`);
        }
        if (result.success) {
          navigate('/users/member/order-summary');
        } else {
          setActionStatus({
            action: 'checkout',
            success: false,
            message: `Failed to sync cart: ${result.error}`,
            timestamp: new Date().toISOString(),
          });
        }
      } catch (error) {
        console.error('MemberCart: Error during checkout:', error);
        setActionStatus({
          action: 'checkout',
          success: false,
          message: `Error during checkout: ${error.message}`,
          timestamp: new Date().toISOString(),
        });
      }
    } else {
      console.log('MemberCart: Navigating to Login page');
      navigate('/users/login');
    }
  };

  // Helper function to handle image errors
  const handleImageError = (itemId) => {
    setFailedImages((prev) => ({
      ...prev,
      [itemId]: true,
    }));
  };

  // Helper function to get product image URL
  const getProductImageUrl = (item) => {
    if (!item) {
      console.log('MemberCart: No item provided to getProductImageUrl');
      return '/images/footprint.png';
    }

    // Use productId if available, otherwise fall back to _id
    const productId = item.productId || item._id;

    if (!productId) {
      console.log('MemberCart: No productId found for item');
      return '/images/footprint.png';
    }

    const imageUrl = `${backendUrl}/api/admin/products/image/${productId}`;
    return imageUrl;
  };

  const totalAmount =
    cartItems?.reduce((acc, item) => acc + item.price * item.quantity, 0) || 0;

  // Function to manually refresh cart from server
  const refreshCart = async () => {
    setActionStatus({
      action: 'refresh',
      success: false,
      message: 'Refreshing cart from server...',
      timestamp: new Date().toISOString(),
    });

    try {
      const result = await syncCartWithServer('pull');

      if (result.success) {
        setActionStatus({
          action: 'refresh',
          success: true,
          message: 'Cart refreshed successfully',
          timestamp: new Date().toISOString(),
        });
      } else {
        setActionStatus({
          action: 'refresh',
          success: false,
          message: `Failed to refresh cart: ${result.error}`,
          timestamp: new Date().toISOString(),
        });
      }
    } catch (error) {
      console.error('MemberCart: Error refreshing cart:', error);
      setActionStatus({
        action: 'refresh',
        success: false,
        message: `Error refreshing cart: ${error.message}`,
        timestamp: new Date().toISOString(),
      });
    }

    // Clear success message after 2 seconds
    setTimeout(() => {
      setActionStatus((prev) => {
        if (prev.action === 'refresh') {
          return { action: null, success: false, message: '', timestamp: null };
        }
        return prev;
      });
    }, 2000);
  };

  // Clear success message after 2 seconds
  setTimeout(() => {
    setActionStatus((prev) => {
      if (prev.action === 'push') {
        return { action: null, success: false, message: '', timestamp: null };
      }
      return prev;
    });
  }, 2000);

  // Function to manually push cart to server
  const pushCartToServer = async () => {
    setActionStatus({
      action: 'push',
      success: false,
      message: 'Pushing cart to server...',
      timestamp: new Date().toISOString(),
    });

    console.log(
      'MemberCart: Starting push to server with cart items:',
      JSON.stringify(cartItems)
    );

    try {
      // First verify what's currently on the server
      console.log('MemberCart: Verifying current server state before push...');
      const verifyResult = await verifyCartWithServer();
      console.log('MemberCart: Server verification result:', verifyResult);

      // Now push the updated cart
      const result = await syncCartWithServer('push');
      console.log('MemberCart: Push to server result:', result);

      if (result.success) {
        // Verify again to make sure changes were applied
        console.log('MemberCart: Verifying server state after push...');
        const afterPushVerify = await verifyCartWithServer();
        console.log('MemberCart: Server state after push:', afterPushVerify);

        setActionStatus({
          action: 'push',
          success: true,
          message: 'Cart pushed to server successfully',
          timestamp: new Date().toISOString(),
        });
      } else {
        setActionStatus({
          action: 'push',
          success: false,
          message: `Failed to push cart: ${result.error}`,
          timestamp: new Date().toISOString(),
        });
      }
    } catch (error) {
      console.error('MemberCart: Error pushing cart to server:', error);
      setActionStatus({
        action: 'push',
        success: false,
        message: `Error pushing cart: ${error.message}`,
        timestamp: new Date().toISOString(),
      });
    }

    // Clear success message after 2 seconds
    setTimeout(() => {
      setActionStatus((prev) => {
        if (prev.action === 'push') {
          return { action: null, success: false, message: '', timestamp: null };
        }
        return prev;
      });
    }, 2000);
  };
  return (
    <div>
      <h2 className='mb-4'>Shopping Cart</h2>

      {/* Status indicators */}
      {isUpdating && (
        <Alert variant='info' className='mb-3 d-flex align-items-center'>
          <Spinner animation='border' size='sm' className='me-2' />
          <span>Updating cart...</span>
        </Alert>
      )}

      {updateError && (
        <Alert variant='danger' className='mb-3'>
          {updateError}
        </Alert>
      )}

      {actionStatus.message && (
        <Alert
          variant={actionStatus.success ? 'success' : 'info'}
          className='mb-3'
        >
          {actionStatus.message}
        </Alert>
      )}

      {/* Sync controls */}
      {authState.isAuthenticated && (
        <div className='mb-3'>
          <Button
            variant='outline-primary'
            size='sm'
            onClick={refreshCart}
            className='me-2'
            disabled={isUpdating || actionStatus.action !== null}
          >
            <BsArrowClockwise className='me-1' /> Pull from Server
          </Button>
          <Button
            variant='outline-primary'
            size='sm'
            onClick={pushCartToServer}
            className='me-2'
            disabled={isUpdating || actionStatus.action !== null}
          >
            <FaSync className='me-1' /> Push to Server
          </Button>
          {lastSyncTime && (
            <small className='d-block text-muted mt-1'>
              Last sync: {new Date(lastSyncTime).toLocaleTimeString()}
            </small>
          )}
        </div>
      )}

      {cartItems.length === 0 ? (
        <div className='text-center my-5'>
          <p className='mb-4'>Your cart is empty</p>
          <Button variant='primary' as={Link} to='/products'>
            Continue Shopping
          </Button>
        </div>
      ) : (
        <>
          {cartItems.map((item) => (
            <Card className='mb-3' key={item._id || item.productId}>
              <Card.Body>
                <Row className='d-flex align-items-center'>
                  <Col md={2}>
                    {failedImages[item._id] ? (
                      <img
                        src='/images/Logo.png'
                        alt={item.productName || 'Product'}
                        style={{
                          maxHeight: '100px',
                          maxWidth: '100%',
                          objectFit: 'contain',
                        }}
                      />
                    ) : (
                      <img
                        src={getProductImageUrl(item)}
                        alt={item.productName || 'Product'}
                        style={{
                          maxHeight: '100px',
                          maxWidth: '100%',
                          objectFit: 'contain',
                        }}
                        onError={() => handleImageError(item._id)}
                      />
                    )}
                  </Col>
                  <Col md={3}>
                    <Card.Title>{item.productName}</Card.Title>
                    <Card.Text>${item.price}</Card.Text>
                  </Col>
                  <Col md={3}>
                    <InputGroup className='d-flex justify-content-center align-items-center'>
                      <Button
                        variant='outline-secondary'
                        onClick={() =>
                          handleDecreaseQuantity(
                            item._id || item.productId,
                            item.quantity
                          )
                        }
                        disabled={
                          item.quantity <= 1 ||
                          isUpdating ||
                          actionStatus.action === 'update'
                        }
                      >
                        <BsDashCircle />
                      </Button>
                      <div className='quantity-display p-2'>
                        {item.quantity}
                      </div>

                      <Button
                        variant='outline-secondary'
                        onClick={() =>
                          handleIncreaseQuantity(
                            item._id || item.productId,
                            item.quantity
                          )
                        }
                        disabled={
                          isUpdating || actionStatus.action === 'update'
                        }
                      >
                        <BsPlusCircle />
                      </Button>
                    </InputGroup>
                  </Col>
                  <Col md={2}>
                    <Card.Text>
                      ${(item.price * item.quantity).toFixed(2)}
                    </Card.Text>
                  </Col>
                  <Col md={1}>
                    <Button
                      variant='link'
                      onClick={() => handleDelete(item._id)}
                      disabled={isUpdating || actionStatus.action === 'delete'}
                    >
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
            <Row className='d-flex align-items-center'>
              <Col md={4}>
                <h5 className='mb-0'>Total Amount</h5>
              </Col>
              <Col md={5} className='text-end pe-5'>
                <h5 className='mb-0'>${totalAmount.toFixed(2)}</h5>
              </Col>
              <Col md={3}>
                <Button
                  onClick={handleCheckout}
                  variant='primary'
                  className='readMoreBtn p-2 fs-6 w-100'
                  disabled={
                    isUpdating ||
                    actionStatus.action !== null ||
                    cartItems.length === 0
                  }
                >
                  {isUpdating || actionStatus.action === 'checkout'
                    ? 'Processing...'
                    : 'Checkout'}
                </Button>
              </Col>
            </Row>
          </Card>
        </>
      )}
    </div>
  );
};

// The rest of the components remain unchanged
// 付款詳情頁面組件
export const PaymentDetails = () => {
  const [cardInfo, setCardInfo] = useState({
    cardNumber: '',
    name: '',
    expiry: '',
    cvv: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const { handleNextStep } = useProgress();
  const { cartItems, clearCart } = useCart(); // 添加 clearCart 功能
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCardInfo({ ...cardInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(cardInfo);
    // 在這裡處理信用卡支付邏輯
    setIsSubmitting(true);
    setError(null);

    try {
      console.log('Creating order with items:', cartItems);
      // 從本地存儲獲取用戶令牌
      const decodedToken = jwt_decode(token); // You'll need to import jwt_decode
      const userId = decodedToken.id; // Adjust this based on your token structure

      // 準備訂單數據
      const orderData = {
        userId: userId, // Add this line to include the user ID
        items: cartItems.map((item) => ({
          productId: item._id || item.productId,
          productName: item.productName,
          price: item.price,
          quantity: item.quantity,
        })),
        paymentMethod: 'credit_card',
        paymentDetails: {
          cardNumber: cardInfo.cardNumber.replace(/\s/g, '').slice(-4), // 只保存最後4位數字，保護信用卡信息
          cardHolderName: cardInfo.name,
          expiryDate: cardInfo.expiry,
        },
        totalAmount: cartItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ),
        status: 'pending',
      };
      console.log('Sending order data:', orderData);

      // 發送訂單創建請求
      const response = await axios.post(
        `${backendUrl}/api/users/member/orders`,
        orderData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log('Order created successfully:', response.data);

      // 成功創建訂單後清空購物車
      if (clearCart) {
        await clearCart();
      } else {
        console.warn('clearCart function not available in CartContext');
      }

      // 導航到支付安全頁面並傳遞訂單ID
      handleNextStep();
      navigate(
        `/users/member/order-PaymentSecurity?orderId=${response.data.orderId}`
      );
    } catch (error) {
      console.error('Error creating order:', error);
      setError(
        error.response?.data?.message ||
          error.message ||
          'Failed to create order'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {error && (
        <Alert variant='danger' className='mb-3'>
          {error}
        </Alert>
      )}
      <Card className='p-4'>
        <Form onSubmit={handleSubmit}>
          <Form.Group className='mb-3' controlId='formCardNumber'>
            <Form.Label>Card Number</Form.Label>
            <Form.Control
              type='text'
              placeholder='1234 5678 9012 3456'
              name='cardNumber'
              value={cardInfo.cardNumber}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='formCardName'>
            <Form.Label>Cardholder Name</Form.Label>
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
                <Form.Label>Expiry Date</Form.Label>
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
            required
          />
          <div className='text-center'>
            <Button
              variant='primary'
              className='order-btn'
              type='submit'
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Processing...' : 'Place an Order'}
            </Button>
          </div>
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

{
  /* 訂單詳情頁面組件 */
}
export const OrderSummary = () => {
  const { handleNextStep } = useProgress();
  const navigate = useNavigate();
  const { cartItems } = useCart(); // Add this line to access cart items
  const [isEditing, setIsEditing] = useState(false);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Extract order ID from URL query params
  const orderId = new URLSearchParams(location.search).get('orderId');
  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) {
        setLoading(false);
        return; // Will use cart context instead
      }

      try {
        // Fetch order details from backend
        const response = await axios.get(
          `${backendUrl}/api/users/member/getUserOrders/${orderId}`
        );
        setOrder(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching order:', err);
        setError('Failed to load order details');
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  // Use either the fetched order items or fall back to cart items
  const orderItems = order?.items || cartItems;
  // Calculate total amount from cart items
  const totalAmount =
    order?.totalAmount ||
    orderItems?.reduce((acc, item) => acc + item.price * item.quantity, 0) ||
    0;

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const goToNextStep = () => {
    handleNextStep();
    navigate('/users/member/order-payment');
  };

  if (loading) {
    return (
      <Container className='text-center mt-5'>
        <Spinner animation='border' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </Spinner>
      </Container>
    );
  }
  if (error) {
    return (
      <Container className='mt-5'>
        <Alert variant='danger'>{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className='order-summary mt-5'>
      <h2 className='text-center mb-4'>Order summary</h2>
      <Row className='mb-3'>
        <Col md={12}>
          <div className='order-section'>
            <div className='order-title d-flex align-items-center justify-content-between'>
              {' '}
              <h4>
                <span className='me-2'>
                  <FaRegCheckCircle />
                </span>
                Delivery
              </h4>
              <Button
                variant='link'
                className='edit-btn'
                onClick={handleEditClick}
              >
                editing
              </Button>
            </div>
            <EditAdd isEditing={isEditing} setIsEditing={setIsEditing} />
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
              {orderItems.length > 0 ? (
                orderItems.map((item) => (
                  <ListGroup.Item key={item._id || item.productId}>
                    {item.quantity} x {item.productName}{' '}
                    <span className='price'>
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </ListGroup.Item>
                ))
              ) : (
                <ListGroup.Item>No items in order</ListGroup.Item>
              )}
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
        <h3 className='text-center mt-4 mb-4'>
          Total amount: ${totalAmount.toFixed(2)}
        </h3>
      </Row>
      <PaymentDetails />
    </Container>
  );
};

//付款後安全驗證頁面組件
export const PaymentSecurity = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { handleNextStep } = useProgress();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 從 URL 獲取訂單 ID
  const orderId = new URLSearchParams(location.search).get('orderId');

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!orderId) {
        setError('No order ID found');
        setLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          `${backendUrl}/api/users/member/getUserOrders/${orderId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setOrder(response.data.order);
        setLoading(false);

        // 模擬付款處理，3秒後自動進入下一步
        setTimeout(async () => {
          try {
            await updateOrderStatus(orderId, 'paid');
          } catch (error) {
            console.error('Error updating order status:', error);
            // Still navigate even if update fails
            handleNextStep();
            navigate(`/users/member/order-finalization?orderId=${orderId}`);
          }
        }, 3000);
      } catch (err) {
        console.error('Error fetching order:', err);
        setError('Failed to load order details');
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId, navigate, handleNextStep]);

  // 更新訂單狀態並導航到最終完成頁面
  const updateOrderStatus = async (orderId, status) => {
    console.log(`Updating order ${orderId} status to ${status}`);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch(
        `${backendUrl}/api/users/member/orders/${orderId}/status`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log('Status update response:', response.data);

      handleNextStep();
      navigate(`/users/member/order-finalization?orderId=${orderId}`);
    } catch (error) {
      console.error('Error updating order status:', error);
      // 即使更新狀態失敗，也繼續導航
      handleNextStep();
      navigate(`/users/member/order-finalization?orderId=${orderId}`);
    }
  };

  const goToNextStep = () => {
    if (orderId) {
      updateOrderStatus(orderId, 'paid');
    } else {
      handleNextStep();
      navigate('/users/member/order-finalization');
    }
  };

  if (loading) {
    return (
      <Container className='text-center mt-5'>
        <Spinner animation='border' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </Spinner>
      </Container>
    );
  }
  if (error) {
    return (
      <Container className='mt-5'>
        <Alert variant='danger'>{error}</Alert>
        <div className='text-center mt-3'>
          <Button onClick={() => navigate('/users/member/myOrders')}>
            查看我的訂單
          </Button>
        </div>
      </Container>
    );
  }

  // 格式化日期
  const formattedDate = new Date().toISOString();
  const totalAmount = order?.totalAmount || 0;

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
                <span>{formattedDate}</span>
              </div>
              <div className='d-flex justify-content-between'>
                <span>Total</span>
                <span>${totalAmount.toFixed(2)}</span>
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
      <div className='text-center mt-3'>
        <Button className='btn-secondary' onClick={goToNextStep}>
          Skip Payment Verification (For Testing)
        </Button>
      </div>
    </Container>
  );
};

export const Finalization = () => {
  const [showConfetti, setShowConfetti] = useState(true);
  const location = useLocation();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  // 從 URL 獲取訂單 ID
  const orderId = new URLSearchParams(location.search).get('orderId');

  // 獲取訂單詳情
  useEffect(() => {
    // 5秒後停止動畫
    const confettiTimer = setTimeout(() => setShowConfetti(false), 5000);

    // 獲取訂單詳情
    const fetchOrder = async () => {
      if (orderId) {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get(
            `${backendUrl}/api/users/member/getUserOrders/${orderId}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          setOrder(response.data);
        } catch (err) {
          console.error('Error fetching order details:', err);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchOrder();

    return () => clearTimeout(confettiTimer);
  }, [orderId]);

  return (
    <Container className='mt-5'>
      {showConfetti && <Confetti />}

      <Card className='text-center p-4'>
        <Card.Body>
          <FaCheckCircle size={50} color='green' />
          <Card.Title className='mt-3'>
            Dear customer, thank you for your order!
          </Card.Title>
          <Card.Text>
            {orderId ? (
              <>
                Your order #{orderId.substring(0, 8)} has been successfully
                placed.
                <br />
                <Link
                  to={`/users/member/myOrders?highlight=${orderId}`}
                  className='mt-4'
                >
                  View order
                </Link>
              </>
            ) : (
              <>
                Your order has been successfully placed.
                <br />
                <Link to='/users/member/myOrders' className='mt-4'>
                  View all orders
                </Link>
              </>
            )}
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
            we does not store card data, the security of transactions is our
            priority, which is why we use the 3D Secure system.
          </p>
        </Col>
      </Row>
    </Container>
  );
};
