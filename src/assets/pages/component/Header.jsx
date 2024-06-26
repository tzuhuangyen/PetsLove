import { backendUrl } from '../../../../config.js';
import React, { useEffect, useState, useContext } from 'react';
import Logo from '../../../../public/images/Logo.png';
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
import { CartContext, useCart } from '../Context/CartContext.jsx';
import { AuthContext } from '../Context/AuthContext.jsx';

function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  let hideDropdownTimeout;
  const [token, setToken] = useState(localStorage.getItem('token'));

  const contextValue = useContext(AuthContext);
  console.log(contextValue); // Check what you're getting here
  //localstorage cart
  const { localCart, setLocalCart } = useCart();
  console.log('get localCart:', localCart);
  const { authState } = useContext(AuthContext);
  console.log('anyone log in:', authState.isAuthenticated);
  //get Login User CartItems
  // const getLoginUserCartItems = async () => {
  //   try {
  //     if (token) {
  //       const response = await axios.get(
  //         `${backendUrl}/api/users/member/cart`,
  //         {
  //           headers: { Authorization: `Bearer ${token}` },
  //         }
  //       );
  //       console.log('UserCart', response.data.cart);
  //       console.log('fetch All CartItems:', response.data.cart);
  //       setCartItems(response.data.cart);
  //     } else {
  //       console.log('no token,no user login yet');
  //     }
  //   } catch (error) {
  //     console.error('fetching no cartItems:', error);
  //     console.dir('Error fetching cartItems or no user login:', error);
  //     console.error(
  //       'Error details:',
  //       error.response ? error.response.data : error.message
  //     );
  //   }
  // };
  // useEffect(() => {
  //   getLoginUserCartItems();
  // }, [token]);

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
    if (quantity < 1) {
      quantity = 1; // Ensure quantity is at least 1
    }
    const updateQtyCart = localCart.map((item) =>
      item._id === id ? { ...item, quantity: quantity } : item
    );
    setLocalCart(updateQtyCart);
    console.log(`Price: ${item.price}, Quantity:
      ${item.quantity}`);
    console.log('updateQty localCart:', updateQtyCart);

    //updateCartItemInDatabase
    // try {
    //   const response = await axios.patch(
    //     `${backendUrl}/api/users/member/cart/${id}`,
    //     { quantity },
    //     {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //         'Content-Type': 'application/json',
    //       },
    //     }
    //   );
    //   if (!response.ok) {
    //     throw new Error('Failed to update cart item');
    //   }

    //   const updatedCart = await response.json();
    //   console.log('Successfully updated item quantity:', response.data);
    // } catch (error) {
    //   console.error('Failed to update item quantity:', error);
    // }
  };

  const handleDelete = (id) => {
    console.log('Deleting item with id:', id);

    const updateDeleteItem = localCart.filter((item) => item._id !== id);
    setLocalCart(updateDeleteItem);

    console.log('Cart after deletion:', updateDeleteItem);
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
                    {/* <div className='nav-cart-count'>10</div> */}
                    {Array.isArray(localCart)
                      ? localCart.reduce(
                          (total, item) => total + (item.quantity || 0),
                          0
                        )
                      : 0}
                  </div>
                </Nav.Link>
                <div
                  className={`cart-dropdown ${dropdownOpen ? 'show' : ''}`}
                  onMouseLeave={hideDropdown}
                >
                  <div className='cart-dropdown '>
                    {localCart && localCart.length > 0 ? (
                      localCart.map((item, index) => (
                        <Dropdown.Item key={index} className='p-0 '>
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
                                    <Card.Text>{`€${item.price}/pc`}</Card.Text>
                                  </li>
                                  <li className='p-0'>
                                    <Form.Control
                                      className='countInput'
                                      type='number'
                                      value={item.quantity}
                                      onChange={(e) =>
                                        handleQtyChange(
                                          item._id,
                                          parseInt(e.target.value)
                                        )
                                      }
                                      min='1'
                                    />
                                  </li>

                                  <li>
                                    <Card.Text>
                                      €
                                      {Number(item.price) *
                                        Number(item.quantity)}
                                    </Card.Text>
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
                      ))
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
                >
                  <CiUser className='nav-login-btn icon' />
                </Nav.Link>
              ) : (
                <Nav.Link
                  to='/users/login '
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
