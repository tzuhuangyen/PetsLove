import { backendUrl } from '../../../../config';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ListGroup } from 'react-bootstrap';
import React from 'react';
import { userAuth } from '../Context/AuthContext';

const Logout = () => {
  const { authState, logout } = userAuth();
  console.log('anyone log in:', authState.isAuthenticated);
  //logout from db base

  //logout from local

  return (
    <Link>
      <ListGroup.Item action onClick={logout}>
        Log Out
      </ListGroup.Item>
    </Link>
  );
};

export default Logout;
