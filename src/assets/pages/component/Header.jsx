import { backendUrl } from '../../../../config.js';
import React, { useEffect, useState } from 'react';
import Logo from '/images/Logo.png';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  Nav,
  Navbar,
  Container,
  Dropdown,
  Image,
  Card,
  Form,
  Button,
} from 'react-bootstrap';
import { IoIosLogIn } from 'react-icons/io';
import { CiShoppingCart, CiShop, CiUser } from 'react-icons/ci';
import { RiAdminLine } from 'react-icons/ri';
import { LiaBookSolid } from 'react-icons/lia';
import { BsTrash, BsHeart } from 'react-icons/bs';

import { useCart } from '../Context/CartContext.jsx';
import { useAuth } from '../Context/AuthContext.jsx';

function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  let hideDropdownTimeout;

  //localstorage cart
  const { cartItems, setCartItems } = useCart();

  const { authState } = useAuth();
  if (!authState) {
    console.error('authState is undefined'); // 可以加个调试信息
  }
  console.log('anyone log in:', authState?.isAuthenticated);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    console.log('Loaded cart from local storage:', storedCart); // Debug the loaded cart
    setCartItems(storedCart);
  }, [setCartItems]);

  const showDropdown = () => {
    clearTimeout(hideDropdownTimeout);
    setDropdownOpen(true);
  };

  const hideDropdown = () => {
    // Wait for 100 milliseconds before hiding the dropdown to account for mouse transition between elements
    hideDropdownTimeout = setTimeout(() => {
      setDropdownOpen(false);
    }, 100);
  };

  const handleQtyChange = async (id, quantity) => {
    if (isNaN(quantity) || quantity < 1) {
      quantity = 1; // Ensure quantity is at least 1
    }
    const updateQtyCart = cartItems.map((item) =>
      item._id === id ? { ...item, quantity: quantity } : item
    );
    setCartItems(updateQtyCart);
    console.log(
      'handle Local storage cart items QtyChange:',
      JSON.parse(localStorage.getItem('cartItems'))
    );
  };

  const removeItemFromLocalStorage = (itemId) => {
    let localstorageCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    localstorageCart = localstorageCart.filter((item) => item._id !== itemId);

    localStorage.setItem('cartItems', JSON.stringify(localstorageCart));
    setCartItems(localstorageCart); // 更新狀態
  };
  const handleDelete = async (itemId) => {
    removeItemFromLocalStorage(itemId);
    console.log('Deleting item with id:', itemId);
    if (authState.isAuthenticated) {
      try {
        const token = localStorage.getItem('token'); // Retrieve the token
        console.log('token:', token);
        if (!token) {
          console.warn('Access token');
          return;
        }
        await axios.delete(`${backendUrl}/api/member/cart/${itemId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            data: { itemId },
          },
        });
        console.log('item in Server cart deleted successfully.');
      } catch (error) {
        console.error('Error deleting server cart:', error);
        console.error(
          'Error details:',
          error.response ? error.response.data : error.message
        );
      }
    }
  };

  return (
    <div className='header'>
      <Navbar collapseOnSelect expand='lg' className='bg-primary' sticky='top'>
        <Container fluid='md' className='justify-content-between'>
          <Navbar.Brand as={Link} to='/' className='logo'>
            <img src={Logo} alt='logo' />
            <h1> Pet's Love</h1>
          </Navbar.Brand>
          {/* Dropdown Menu for lg sizes */}
          <Navbar id='responsive-navbar-nav' className='justify-content-end'>
            <Nav className='navbar-icons '>
              <Nav.Link className='nav-link' eventKey={2} as={Link} to='/shop'>
                <CiShop className='icon' size={32} /> <span> shop</span>
              </Nav.Link>
              <Nav.Link className='nav-link' eventKey={2} as={Link} to='/blog'>
                <LiaBookSolid className='icon' size={32} />
                <span> Blog</span>
              </Nav.Link>
              {/* <Cart /> */}
              <div
                className='cart-toggle'
                onMouseEnter={showDropdown}
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <Nav.Link
                  eventKey={2}
                  as={Link}
                  to='/users/member/cart'
                  className='p-0 nav-link position-relative'
                >
                  <CiShoppingCart size={32} className=' icon' />
                  <div className='nav-cart-count'>
                    {Array.isArray(cartItems)
                      ? cartItems.reduce((total, item) => {
                          const quantity = parseInt(item.quantity, 10) || 1;

                          console.log(
                            'Item quantity show in the header:',
                            item.quantity
                          );
                          return total + item.quantity;
                        }, 0)
                      : 0}
                  </div>
                </Nav.Link>
                <div
                  className={`cart-dropdown ${dropdownOpen ? 'show' : ''}`}
                  onMouseLeave={hideDropdown}
                >
                  <div className='cart-dropdown '>
                    {cartItems && cartItems.length > 0 ? (
                      cartItems.map((item) => {
                        const price = Number(item.price) || 0;
                        const quantity = Number(item.quantity) || 0;
                        const totalPrice = price * quantity;
                        return (
                          <Dropdown.Item key={item._id} className='p-0 '>
                            <Card className='mb-3 border-0' key={item._id}>
                              <Card.Body className='d-flex p-3'>
                                <Image
                                  src={`${backendUrl}/adminProducts/${item.image}`}
                                  className='card-img-top object-fit product-img me-2'
                                  alt={item.productName}
                                  style={{ width: '60px', height: '60px' }}
                                />

                                <div>
                                  <div className='p-0'>
                                    <Card.Title>{item.productName}</Card.Title>
                                  </div>
                                  <ul className='d-flex align-items-center justify-content-around'>
                                    <li>
                                      {' '}
                                      <Card.Text>{`€${price}/pc`}</Card.Text>
                                    </li>
                                    <li className='p-0'>
                                      <Form.Control
                                        className='countInput'
                                        type='number'
                                        value={item.quantity || 1}
                                        onChange={(e) =>
                                          handleQtyChange(
                                            item._id,
                                            parseInt(e.target.value, 10) || 1
                                          )
                                        }
                                        min='1'
                                      />
                                    </li>

                                    <li>
                                      <Card.Text>€{totalPrice}</Card.Text>
                                    </li>
                                    <li>
                                      <Button
                                        onClick={() => handleDelete(item._id)}
                                      >
                                        <BsTrash />
                                      </Button>
                                    </li>
                                  </ul>
                                </div>
                              </Card.Body>
                            </Card>
                          </Dropdown.Item>
                        );
                      })
                    ) : (
                      <Dropdown.Item href='#'>Your cart is empty</Dropdown.Item>
                    )}
                  </div>
                </div>
              </div>
              {authState && authState.isAuthenticated ? (
                <Nav.Link
                  to='/users/member/myProfile'
                  className='nav-link'
                  eventKey={2}
                  as={Link}
                  onClick={() =>
                    console.log('Navigating to My Profile', authState)
                  } // Debug line
                >
                  <CiUser className='nav-login-btn icon' />
                </Nav.Link>
              ) : (
                <Nav.Link
                  to='/users/login'
                  className='nav-link'
                  eventKey={2}
                  as={Link}
                >
                  <IoIosLogIn className='nav-login-btn icon' />
                </Nav.Link>
              )}
            </Nav>
          </Navbar>{' '}
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
