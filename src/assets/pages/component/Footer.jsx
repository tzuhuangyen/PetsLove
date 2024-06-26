import React from 'react';
import { Link } from 'react-router-dom';
import fb from '/images/fb.png';
import line from '/images/line.png';
import ig from '/images/ig.png';
import Logo from '/images/Logo.png';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { RiAdminLine } from 'react-icons/ri';

const Footer = () => {
  return (
    <>
      <div className='footer'>
        <Container fluid>
          <div className='container-lg d-flex justify-content-between align-items-center'>
            <Navbar.Brand
              as={Link}
              to='/'
              className='d-flex align-items-center '
            >
              <img src={Logo} alt='logo' className='logo' />
              <h1 className='logoH1 animate__animated animate__backInLeft animate__slow d-sm-none d-md-block'>
                Pet's Love
              </h1>
            </Navbar.Brand>

            <ul className='social d-flex '>
              <li>
                <a href='#'></a>
                <img src={fb} alt='fb' />
              </li>
              <li>
                <a href='#'></a>
                <img src={ig} alt='ig' />
              </li>
              <li>
                <a href='#'></a>
                <img src={line} alt='line' />
              </li>
            </ul>
            <Nav.Link as={Link} to='/admin/products' className='icon-button'>
              <RiAdminLine size={24} />
            </Nav.Link>
          </div>
          <div className='copyRight text-center'>©2024 By Yennefer</div>
        </Container>
      </div>
    </>
  );
};
export default Footer;
